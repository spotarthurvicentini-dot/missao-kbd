const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const codeSource = fs.readFileSync(path.join(__dirname, '..', 'CODIGO', 'sheets-api', 'Code.gs'), 'utf8');
const context = {
  console,
  Date,
  Math,
  Object,
  Number,
  String,
  JSON,
  Boolean,
  Array,
  Map,
  Set,
  isNaN,
  MANAGEMENT_CYCLE: { id: '2026-08', name: 'Agosto 2026' },
  ACTIVE_KBDS: [
    { kbdId: 'bond-repair' },
    { kbdId: 'branqueamento' },
  ],
};
vm.createContext(context);
vm.runInContext(codeSource, context, { filename: 'Code.gs' });

assert.equal(context.resolveExecutive_('SPICOORD19', 'SPI001'), 'EXECUTIVO3');
assert.equal(context.resolveExecutive_('SCCOORD08', 'SC271'), 'EXECUTIVO2', 'exceção por setor deve prevalecer sobre o coordenador');
assert.match(codeSource, /GLOBAL_MANAGER_USER\s*=\s*"GESTOR"/);
assert.match(codeSource, /user === GLOBAL_MANAGER_USER/);

const stored = context.eventPayloadForStorage_({
  eventType: 'quiz_completion',
  setor: 'SPI001',
  authToken: 'secret-bearer',
  token: 'another-secret',
  password: 'never-store',
  kbdId: 'bond-repair',
});
assert.equal(stored.authToken, undefined);
assert.equal(stored.token, undefined);
assert.equal(stored.password, undefined);
assert.equal(stored.kbdId, 'bond-repair');

assert.doesNotThrow(() => context.validateEventBusiness_({
  eventType: 'quiz_completion', kbdId: 'bond-repair', total: 4, acertos: 3, percentual: 75,
}));
assert.throws(() => context.validateEventBusiness_({
  eventType: 'quiz_completion', kbdId: 'inexistente', total: 4, acertos: 3, percentual: 75,
}), /KBD inválido/);
assert.throws(() => context.validateEventBusiness_({
  eventType: 'quiz_completion', kbdId: 'bond-repair', total: 0, acertos: 0, percentual: 0,
}), /Resultado de quiz inválido/);
assert.throws(() => context.validateEventBusiness_({
  eventType: 'quiz_completion', kbdId: 'bond-repair', total: 4, acertos: 5, percentual: 100,
}), /Resultado de quiz inválido/);
assert.throws(() => context.validateEventBusiness_({
  eventType: 'video_progress', kbdId: 'bond-repair', percentage: 120,
}), /Percentual de vídeo inválido/);

context.getAuthSession_ = () => ({ user: 'RSCOORD02', role: 'manager' });
context.normalizeSector_ = (value) => String(value || '').trim().toUpperCase();
context.getManagedTeam_ = () => [{ promoter: 'RS03', coordinator: 'RSCOORD02', regional: 'RS' }];
context.buildManagementReport_ = () => ({
  people: [{ sector: 'RS03', completedKbdCount: 1, eligibleKbdCount: 9 }],
  contentPerformance: [{ brand: 'PAMPERS', kbd: 'Pampers Premium Care', completedPromoters: 1 }],
});
assert.throws(() => context.getPromoterDetail_('RSCOORD02', 'SPI145', 'valid-token'), /fora da equipe autorizada/);
const detail = context.getPromoterDetail_('RSCOORD02', 'RS03', 'valid-token');
assert.equal(detail.promoter, 'RS03');
assert.equal(detail.kbds[0].brand, 'PAMPERS');

console.log('api_security_contract: OK');
