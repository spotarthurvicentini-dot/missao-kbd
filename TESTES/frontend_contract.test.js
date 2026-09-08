const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const site = path.join(root, 'SITE', 'publicacao');
const read = (file) => fs.readFileSync(path.join(site, file), 'utf8');
const adminHtml = read('admin.html');
const adminJs = read('admin-real.js');
const appJs = read('app.js');
const quizzesJs = read('quizzes.js');
const worker = read('service-worker.js');
const management = fs.readFileSync(path.join(root, 'CODIGO', 'sheets-api', 'Management.gs'), 'utf8');

assert.match(adminHtml, /admin-real\.js\?v=20260908-6/);
assert.match(adminHtml, /admin-overrides\.css\?v=20260908-3/);
assert.match(adminHtml, /id="promoterDrawer"/);
assert.match(adminHtml, /data-view="team"[^>]*>.*Equipe e KBDs/);
assert.doesNotMatch(adminHtml, /data-view="content"|data-page="content"/);
assert.doesNotMatch(adminHtml, /admin\.js|analytics|healthValue|score-ring/);
assert.doesNotMatch(adminJs, /Math\.random|hashNumber|Operação saudável|84|86|74|61/);
assert.match(worker, /admin-real\.js\?v=20260908-6/);
assert.match(worker, /admin-overrides\.css\?v=20260908-3/);
assert.match(adminJs, /action:'promoterDetail'/);
assert.match(adminJs, /data-promoter=/);
assert.match(adminJs, /Object\.entries\(groups\)/);
assert.doesNotMatch(adminJs, /contentView|renderManagerContent/);
assert.match(adminJs, /1\. Executivo/);
assert.match(adminJs, /2\. Coordenador/);
assert.match(adminJs, /3\. Setor/);
assert.match(adminJs, /person\.executive===teamExecutiveFilter/);
assert.match(adminJs, /person\.coordinator===teamCoordinatorFilter/);
assert.match(adminJs, /person\.sector===teamSectorFilter/);
assert.match(adminJs, /Promotores distintos vinculados no catálogo vigente/);
assert.match(adminJs, /points\('activePromoters'\)/);
assert.doesNotMatch(adminJs, /points\('accesses'\)/);
assert.match(adminJs, /attentionPeopleCount/);
assert.doesNotMatch(worker, /admin\.js/);
assert.match(worker, /req\.mode === "navigate"/);
assert.match(worker, /app\.js\?v=20260814-13/);
assert.match(worker, /style\.css\?v=20260807-2/);
assert.doesNotMatch(appJs.slice(appJs.indexOf('async function entrar()'), appJs.indexOf('function renderHome()')), /ALLOWED_SECTORS_NORMALIZED/);
assert.doesNotMatch(appJs.slice(appJs.indexOf('function prepareEventPayload'), appJs.indexOf('function readEventQueue')), /authToken/);

for (const file of ['index.html', 'home.html', 'marca.html', 'kbd.html', 'quiz.html', 'novidades.html', 'checklist.html', 'admin.html']) {
  assert.match(read(file), /app\.js\?v=20260814-13/, `${file} precisa carregar a versão atual do app`);
}

assert.match(appJs, /const REQUIRED_VIDEO_PERCENTAGE_FOR_QUIZ = 100/);
assert.match(appJs, /percentage >= REQUIRED_VIDEO_PERCENTAGE_FOR_QUIZ/);
assert.match(appJs, /if \(!isVideoCompleteForQuiz\(marcaId, kbdId\)\)/, 'a URL direta do quiz também precisa ser bloqueada');
assert.match(appJs, /Assista 100% do vídeo para liberar o quiz/);
assert.doesNotMatch(appJs, /percentage >= 80/);

const loginBlock = appJs.slice(appJs.indexOf('async function entrar()'), appJs.indexOf('function renderHome()'));
assert.match(loginBlock, /AbortController/);
assert.match(loginBlock, /signal:\s*controller\.signal/);
assert.match(loginBlock, /clearTimeout\(timeout\)/);
assert.doesNotMatch(loginBlock, /await syncProgressFromServer/);
assert.match(loginBlock, /sessionStorage\.setItem\(PROGRESS_SYNC_AFTER_LOGIN_KEY/);
const homeBlock = appJs.slice(appJs.indexOf('function renderHome()'), appJs.indexOf('function renderMarca()'));
assert.match(homeBlock, /syncProgressFromServer\(getSetor\(\)\)/);

const activeBlock = management.match(/const ACTIVE_KBDS = \[([\s\S]*?)\n\];/)[1];
const activeIds = [...activeBlock.matchAll(/kbdId:\s*"([^"]+)"/g)].map((match) => match[1]);
const contentBlock = appJs.match(/const CONTENT = \{([\s\S]*?)\n\};/)[1];
assert.equal(activeIds.length, 9);
for (const id of activeIds) {
  assert.match(contentBlock, new RegExp(`\\bid:\\s*"${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`), `KBD ${id} precisa existir no app`);
}

const quizContext = {};
quizContext.window = quizContext;
vm.runInNewContext(`${quizzesJs}\n;globalThis.__QUIZZES__ = QUIZZES;`, quizContext);
const quizIds = Object.values(quizContext.__QUIZZES__).flatMap((brand) => Object.keys(brand)).sort();
assert.equal(quizIds.length, 9, 'somente os 9 KBDs atuais podem ter quiz');
assert.deepEqual(quizIds, activeIds.slice().sort(), 'os quizzes precisam corresponder exatamente aos 9 KBDs ativos');
const guiaBlock = appJs.match(/const GUIA_KBDS = \[([\s\S]*?)\n\];/)[1];
const guiaIds = [...guiaBlock.matchAll(/id:\s*"([^"]+)"/g)].map((match) => match[1]);
const guiaImages = [...guiaBlock.matchAll(/imagem:\s*"([^"]+)"/g)].map((match) => match[1]);
assert.equal(guiaIds.length, 25, 'a Consulta precisa corresponder aos 25 KBDs do guia de campo');
assert.equal(new Set(guiaIds).size, 25, 'os KBDs do guia precisam ter IDs únicos');
assert.equal(new Set(guiaImages).size, 25, 'cada KBD do guia precisa ter sua própria imagem');
for (const image of guiaImages) {
  assert.ok(fs.existsSync(path.join(site, image)), `imagem do guia não encontrada: ${image}`);
  assert.ok(worker.includes(`./${image}`), `imagem do guia ausente no cache offline: ${image}`);
}
for (const retired of ['pantene-top-versoes', 'pantene-rio-cachoeira', 'venus-sistemas-ganchos']) {
  assert.ok(!guiaIds.includes(retired), `KBD retirado não pode aparecer na Consulta: ${retired}`);
}
assert.doesNotMatch(appJs, /const LEGACY_KBDS/);
assert.doesNotMatch(worker, /kbds\/(consulta|referencias-2026)\//);
assert.doesNotMatch(appJs, /status:\s*"alterado"|Alterados\s*•/);
assert.match(appJs, /id:\s*"frentes-bandejas"[^\n]*status:\s*"novo"/);
assert.match(appJs, /id:\s*"mach3-presto3"[^\n]*status:\s*"novo"/);
assert.match(appJs, /Novos • \$\{NOVIDADES\.novos\.length\}/);
assert.match(appJs, /\["novo", "transformacional"\]\.forEach/);
assert.doesNotMatch(appJs, /statusCounts\.kbd|0 KBDs/);
assert.match(appJs, /Canais: \$\{escapeHtml\(quizState\.kbdAtual\.canais/);
assert.match(read('checklist.html'), /Missão KBD • Consulta/);

const coreAssetBlock = worker.match(/const CORE_ASSETS = \[([\s\S]*?)\n\];/)[1];
const coreAssets = [...coreAssetBlock.matchAll(/"\.\/([^"?]+)(?:\?[^"\n]+)?"/g)].map((match) => match[1]);
for (const asset of coreAssets) {
  assert.ok(fs.existsSync(path.join(site, asset)), `asset do service worker não encontrado: ${asset}`);
}

console.log('frontend_contract: OK');
