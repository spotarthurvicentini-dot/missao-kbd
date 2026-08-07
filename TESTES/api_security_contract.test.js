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
  ACTIVE_KBDS: [
    { kbdId: 'bond-repair' },
    { kbdId: 'branqueamento' },
  ],
};
vm.createContext(context);
vm.runInContext(codeSource, context, { filename: 'Code.gs' });

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

console.log('api_security_contract: OK');
