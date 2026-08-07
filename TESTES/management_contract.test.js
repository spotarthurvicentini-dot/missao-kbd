const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const managementSource = fs.readFileSync(path.join(__dirname, '..', 'CODIGO', 'sheets-api', 'Management.gs'), 'utf8');
const sheets = {};
const context = {
  console,
  Date,
  Math,
  Object,
  Number,
  String,
  isNaN,
  REPORT_CONFIG: { timeZone: 'America/Sao_Paulo' },
  TABLES: {
    sessions: { name: 'Sessoes' },
    quizProgress: { name: 'Progresso Quiz' },
    videos: { name: 'Videos' },
  },
  Utilities: {
    formatDate(date, _timeZone, format) {
      if (format === 'yyyy-MM-dd') return date.toISOString().slice(0, 10);
      return `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
    },
  },
  getBook_() { return { getSheetByName(name) { return sheets[name] || { rows: [] }; } }; },
  rowsInPeriod_(sheet, start, end) {
    return sheet.rows.filter((row) => {
      const date = new Date(row[0]);
      return date >= start && date <= end;
    });
  },
  normalizeSector_(value) { return String(value || '').trim().toUpperCase().replace(/\s+/g, ''); },
  text_(value) { return value == null ? '' : String(value); },
  number_(value) { const parsed = Number(value); return Number.isFinite(parsed) ? parsed : 0; },
  clampPercent_(value) { return Math.max(0, Math.min(100, Number(value) || 0)); },
};

vm.createContext(context);
vm.runInContext(managementSource, context, { filename: 'Management.gs' });

const team = [
  { coordinator: 'SPICOORD19', promoter: 'SPI001', regional: 'SPI' },
  { coordinator: 'SPICOORD19', promoter: 'SPI002', regional: 'SPI' },
];
const start = new Date('2026-08-01T00:00:00-03:00');
const end = new Date('2026-08-06T23:59:59-03:00');

sheets.Sessoes = { rows: [
  [new Date('2026-08-02T10:00:00-03:00'), 's1', 'SPI001'],
] };
sheets['Progresso Quiz'] = { rows: [
  [new Date('2026-07-10T10:00:00-03:00'), 'q1', 'SPI001', 'pantene', 'PANTENE', 'bond-repair', 'Bond Repair — 20% do Espaço', 3, 4, 75, '2026-07-10T09:55:00-03:00'],
  [new Date('2026-08-03T10:00:00-03:00'), 'q2', 'SPI001', 'pantene', 'PANTENE', 'bond-repair', 'Bond Repair — 20% do Espaço', 4, 4, 100, '2026-08-03T09:55:00-03:00'],
  [new Date('2026-08-04T10:00:00-03:00'), 'q3', 'SPI001', 'oral-b', 'ORAL-B', 'branqueamento', '60% de Branqueamento', 2, 4, 50, '2026-08-04T09:55:00-03:00'],
] };
sheets.Videos = { rows: [
  [new Date('2026-07-15T10:00:00-03:00'), 'v1', 'SPI001', 'PANTENE', 'Bond Repair — 20% do Espaço', 'video', 'progress', 20, 100, 20],
  [new Date('2026-08-05T10:00:00-03:00'), 'v2', 'SPI001', 'PANTENE', 'Bond Repair — 20% do Espaço', 'video', 'progress', 80, 100, 80],
] };

const report = context.buildManagementReport_(team, start, end);
assert.equal(vm.runInContext('ACTIVE_KBDS.length', context), 9, 'o catálogo gerencial precisa ter exatamente 9 KBDs');
assert.equal(report.totals.linkedPromoters, 2);
assert.equal(report.totals.eligibleKbdCount, 18);
assert.equal(report.totals.completedKbdCount, 2, 'o avanço usa a última conclusão por promotor/KBD no ciclo');
assert.equal(report.totals.accuracy, 75, 'o acerto deve ser ponderado pelas perguntas');
assert.equal(report.totals.activePromoters, 1, 'atividade deve usar somente a janela operacional');
assert.equal(report.weeklyTrend.reduce((sum, row) => sum + row.quizAttempts, 0), 2, 'a tendência deve contar tentativas da janela, não do ciclo inteiro');
assert.equal(report.contentPerformance.length, 9);
assert.equal(report.contentPerformance.find((row) => row.kbdId === 'bond-repair').videoAveragePercent, 40);
assert.equal(report.people.find((row) => row.sector === 'SPI001').coordinator, 'SPICOORD19');
assert.equal(report.people.some((row) => row.sector === 'SPICOORD19'), false, 'coordenador não pode virar respondente');

console.log('management_contract: OK');
