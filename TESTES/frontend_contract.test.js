const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const site = path.join(root, 'SITE', 'publicacao');
const read = (file) => fs.readFileSync(path.join(site, file), 'utf8');
const adminHtml = read('admin.html');
const adminJs = read('admin-real.js');
const appJs = read('app.js');
const worker = read('service-worker.js');
const management = fs.readFileSync(path.join(root, 'CODIGO', 'sheets-api', 'Management.gs'), 'utf8');

assert.match(adminHtml, /admin-real\.js\?v=20260807-4/);
assert.match(adminHtml, /admin-overrides\.css\?v=20260807-1/);
assert.match(adminHtml, /id="promoterDrawer"/);
assert.match(adminHtml, /data-view="team"[^>]*>.*Equipe e KBDs/);
assert.doesNotMatch(adminHtml, /data-view="content"|data-page="content"/);
assert.doesNotMatch(adminHtml, /admin\.js|analytics|healthValue|score-ring/);
assert.doesNotMatch(adminJs, /Math\.random|hashNumber|Operação saudável|84|86|74|61/);
assert.match(worker, /admin-real\.js\?v=20260807-4/);
assert.match(worker, /admin-overrides\.css\?v=20260807-1/);
assert.match(adminJs, /action:'promoterDetail'/);
assert.match(adminJs, /data-promoter=/);
assert.match(adminJs, /Object\.entries\(groups\)/);
assert.doesNotMatch(adminJs, /contentView|renderManagerContent/);
assert.match(adminJs, /Promotores distintos vinculados no catálogo vigente/);
assert.match(adminJs, /points\('activePromoters'\)/);
assert.doesNotMatch(adminJs, /points\('accesses'\)/);
assert.match(adminJs, /attentionPeopleCount/);
assert.doesNotMatch(worker, /admin\.js/);
assert.match(worker, /req\.mode === "navigate"/);
assert.doesNotMatch(appJs.slice(appJs.indexOf('async function entrar()'), appJs.indexOf('function renderHome()')), /ALLOWED_SECTORS_NORMALIZED/);
assert.doesNotMatch(appJs.slice(appJs.indexOf('function prepareEventPayload'), appJs.indexOf('function readEventQueue')), /authToken/);

for (const file of ['index.html', 'home.html', 'marca.html', 'kbd.html', 'quiz.html', 'novidades.html', 'checklist.html', 'admin.html']) {
  assert.match(read(file), /app\.js\?v=20260806-6/, `${file} precisa carregar o app 2.4`);
}

const activeBlock = management.match(/const ACTIVE_KBDS = \[([\s\S]*?)\n\];/)[1];
const activeIds = [...activeBlock.matchAll(/kbdId:\s*"([^"]+)"/g)].map((match) => match[1]);
const contentBlock = appJs.match(/const CONTENT = \{([\s\S]*?)\n\};/)[1];
assert.equal(activeIds.length, 9);
for (const id of activeIds) {
  assert.match(contentBlock, new RegExp(`\\bid:\\s*"${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`), `KBD ${id} precisa existir no app`);
}

console.log('frontend_contract: OK');
