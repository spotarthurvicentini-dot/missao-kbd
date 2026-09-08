const API_VERSION = "2.6.0";
const GLOBAL_MANAGER_USER = "GESTOR";
const EXECUTIVE_BY_COORDINATOR = {
  "PRCOORD02": "EXECUTIVO1", "PRCOORD03": "EXECUTIVO1", "PRCOORD04": "EXECUTIVO1",
  "PRCOORD05": "EXECUTIVO1", "PRCOORD06": "EXECUTIVO1", "PRCOORD07": "EXECUTIVO1",
  "PRCOORD08": "EXECUTIVO1", "PROJ-MAIS-COORDPR01": "EXECUTIVO1", "SCCOORD02": "EXECUTIVO1",
  "SCCOORD03": "EXECUTIVO1", "SCCOORD08": "EXECUTIVO1",
  "PROJ-MAIS-COORDRS01": "EXECUTIVO2", "PROJ-MAIS-COORDSC01": "EXECUTIVO2",
  "RSCOORD01": "EXECUTIVO2", "RSCOORD02": "EXECUTIVO2", "RSCOORD03": "EXECUTIVO2",
  "RSCOORD04": "EXECUTIVO2", "RSCOORD06": "EXECUTIVO2", "RSCOORD07": "EXECUTIVO2",
  "SCCOORD04": "EXECUTIVO2", "SCCOORD05": "EXECUTIVO2", "SCCOORD06": "EXECUTIVO2",
  "SCCOORD07": "EXECUTIVO2",
  "SPICOORD02": "EXECUTIVO3", "SPICOORD04": "EXECUTIVO3", "SPICOORD06": "EXECUTIVO3",
  "SPICOORD10": "EXECUTIVO3", "SPICOORD11": "EXECUTIVO3", "SPICOORD12": "EXECUTIVO3",
  "SPICOORD15": "EXECUTIVO3", "SPICOORD19": "EXECUTIVO3", "SPICOORD20": "EXECUTIVO3",
  "SPICOORD23": "EXECUTIVO3",
  "PROJ-MAIS-COORDSPI01": "EXECUTIVO4", "SPICOORD01": "EXECUTIVO4", "SPICOORD05": "EXECUTIVO4",
  "SPICOORD07": "EXECUTIVO4", "SPICOORD14": "EXECUTIVO4", "SPICOORD16": "EXECUTIVO4",
  "SPICOORD17": "EXECUTIVO4", "SPICOORD18": "EXECUTIVO4", "SPICOORD21": "EXECUTIVO4",
  "SPICOORD22": "EXECUTIVO4"
};
const EXECUTIVE_BY_PROMOTER = { "SC271": "EXECUTIVO2" };
const REPORT_CONFIG = {
  timeZone: "America/Sao_Paulo",
  hour: 8,
  triggerHandler: "sendDailyInteractionReport",
  spreadsheetProperty: "MISSAO_KBD_SPREADSHEET_ID",
  emailProperty: "MISSAO_KBD_REPORT_EMAIL",
  defaultRecipients: ["a.vicentini@spotpromo.com.br", "n.lima@spotpromo.com.br"]
};

const TABLES = {
  events: {
    name: "Eventos",
    headers: ["Recebido em", "Event ID", "Evento", "Data do aparelho", "Setor", "Marca ID", "Marca", "KBD ID", "KBD", "Sessão", "Dispositivo", "Origem", "User Agent", "JSON"]
  },
  sessions: {
    name: "Sessoes",
    headers: ["Recebido em", "Event ID", "Setor", "Sessão", "Dispositivo", "Origem", "User Agent"]
  },
  answers: {
    name: "Respostas",
    headers: ["Recebido em", "Event ID", "Setor", "Marca", "KBD", "Pergunta", "Resposta enviada", "Resposta correta", "Acertou", "Score", "Sessão", "Dispositivo"]
  },
  videos: {
    name: "Videos",
    headers: ["Recebido em", "Event ID", "Setor", "Marca", "KBD", "Video ID", "Evento do vídeo", "Segundos assistidos", "Duração", "Percentual", "Concluído", "Sessão", "Dispositivo", "Marca ID", "KBD ID"]
  },
  completions: {
    name: "Conclusoes",
    headers: ["Recebido em", "Event ID", "Setor", "Marca", "KBDs concluídos", "KBDs totais", "Acertos", "Perguntas", "Percentual", "Resultados", "Sessão", "Dispositivo"]
  },
  quizProgress: {
    name: "Progresso Quiz",
    headers: ["Recebido em", "Event ID", "Setor", "Marca ID", "Marca", "KBD ID", "KBD", "Acertos", "Total", "Percentual", "Concluído em", "Sessão", "Dispositivo"]
  },
  state: {
    name: "_EstadoSetor",
    headers: ["Setor", "Atualizado em", "Quizzes concluídos", "Resultados", "Vídeos"]
  },
  teams: {
    name: "Equipes",
    headers: ["Coordenador", "Promotor", "Regional", "Nome Coordenador"]
  },
  control: {
    name: "_Controle",
    headers: ["Event ID", "Recebido em"]
  }
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Missão KBD")
    .addItem("Preparar abas", "setup")
    .addToUi();
}

function setup() {
  const book = getBook_();
  Object.keys(TABLES).forEach(function (key) {
    ensureSheet_(book, TABLES[key]);
  });
  const control = book.getSheetByName(TABLES.control.name);
  if (control && !control.isSheetHidden()) control.hideSheet();
  const state = book.getSheetByName(TABLES.state.name);
  if (state && !state.isSheetHidden()) state.hideSheet();
  return "API Missão KBD configurada.";
}

function doGet(e) {
  if (e && e.parameter && text_(e.parameter.action) === "dashboard") {
    try {
      return json_({ ok: false, error: "Use uma sessão autenticada para acessar o painel.", version: API_VERSION });
    } catch (error) {
      return json_({ ok: false, error: error && error.message ? error.message : String(error), version: API_VERSION });
    }
  }
  if (e && e.parameter && text_(e.parameter.action) === "progress") {
    return json_({ ok: false, error: "Use uma sessão autenticada para consultar o progresso.", version: API_VERSION });
  }
  return json_({
    ok: true,
    service: "Missão KBD Sheets API",
    version: API_VERSION,
    timestamp: new Date().toISOString()
  });
}

/**
 * Retorna o consolidado usado pela central de gestão.
 * O acesso é restrito aos identificadores gerenciais já adotados pelo app.
 */
function getDashboardReport_(managerSector, requestedDays, token) {
  const session = getAuthSession_(token);
  const manager = normalizeSector_(managerSector);
  if (!session || session.user !== manager || (session.role !== "admin" && session.role !== "manager")) {
    throw new Error("Sessão gerencial inválida ou expirada.");
  }

  const days = Math.max(1, Math.min(180, Math.round(number_(requestedDays) || 30)));
  const end = new Date();
  const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
  const team = getManagedTeam_(manager, session.role);
  const allowedSectors = team.map(function (row) { return row.promoter; });
  const report = buildManagementReport_(team, start, end);

  // O frontend precisa do consolidado, não dos identificadores de dispositivo/sessão.
  return {
    ok: true,
    manager: manager,
    role: session.role,
    allowedSectors: allowedSectors,
    team: team,
    cycle: MANAGEMENT_CYCLE,
    period: { start: start.toISOString(), end: end.toISOString(), days: days },
    report: report,
    updatedAt: end.toISOString(),
    version: API_VERSION
  };
}

function getPromoterDetail_(managerSector, promoterSector, token) {
  const session = getAuthSession_(token);
  const manager = normalizeSector_(managerSector);
  const promoter = normalizeSector_(promoterSector);
  if (!session || session.user !== manager || (session.role !== "admin" && session.role !== "manager")) {
    throw new Error("Sessão gerencial inválida ou expirada.");
  }
  const team = getManagedTeam_(manager, session.role);
  const teamRow = team.find(function (row) { return row.promoter === promoter; });
  if (!teamRow) throw new Error("Promotor fora da equipe autorizada.");

  const end = new Date();
  const start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
  const report = buildManagementReport_([teamRow], start, end);
  return {
    ok: true,
    manager: manager,
    promoter: promoter,
    cycle: MANAGEMENT_CYCLE,
    person: report.people[0],
    kbds: report.contentPerformance,
    updatedAt: end.toISOString(),
    version: API_VERSION
  };
}

function doPost(e) {
  const receivedAt = new Date();
  const lock = LockService.getScriptLock();

  try {
    const payload = parsePayload_(e);
    if (text_(payload.action) === "login") return json_(authenticate_(payload));
    if (text_(payload.action) === "dashboard") {
      return json_(getDashboardReport_(text_(payload.setor), number_(payload.days) || 30, text_(payload.token)));
    }
    if (text_(payload.action) === "promoterDetail") {
      return json_(getPromoterDetail_(text_(payload.setor), text_(payload.promoter), text_(payload.token)));
    }
    if (text_(payload.action) === "progress") {
      return json_(getSectorProgressAuthenticated_(text_(payload.setor), text_(payload.token)));
    }
    if (text_(payload.action) === "setup") {
      return json_(runAuthenticatedSetup_(text_(payload.token)));
    }
    if (text_(payload.action) === "syncTeams") {
      lock.waitLock(15000);
      return json_(syncTeams_(text_(payload.token), payload.rows, text_(payload.mode)));
    }
    validateEventSession_(payload);
    lock.waitLock(15000);
    validatePayload_(payload);
    validateEventBusiness_(payload);

    const book = getBook_();
    const sheets = {};
    Object.keys(TABLES).forEach(function (key) {
      sheets[key] = ensureSheet_(book, TABLES[key]);
    });

    const eventId = text_(payload.eventId) || Utilities.getUuid();
    if (isDuplicate_(sheets.control, eventId)) {
      return json_({ ok: true, duplicate: true, eventId: eventId, version: API_VERSION });
    }

    const eventType = text_(payload.eventType);
    append_(sheets.events, [
      receivedAt,
      eventId,
      eventType,
      text_(payload.timestamp || payload.sentAt || payload.data),
      text_(payload.setor),
      text_(payload.marcaId),
      text_(payload.marca),
      text_(payload.kbdId),
      text_(payload.kbd),
      text_(payload.sessionId),
      text_(payload.deviceId),
      text_(payload.source),
      text_(payload.userAgent),
      safeJson_(eventPayloadForStorage_(payload))
    ]);

    let destination = TABLES.events.name;
    if (eventType === "session_start") {
      destination = TABLES.sessions.name;
      append_(sheets.sessions, [receivedAt, eventId, text_(payload.setor), text_(payload.sessionId), text_(payload.deviceId), text_(payload.source), text_(payload.userAgent)]);
    } else if (eventType === "question_detail") {
      destination = TABLES.answers.name;
      append_(sheets.answers, [receivedAt, eventId, text_(payload.setor), text_(payload.marca), text_(payload.kbd), text_(payload.pergunta), text_(payload.respostaEnviada), text_(payload.respostaCorreta), text_(payload.acertou), number_(payload.score), text_(payload.sessionId), text_(payload.deviceId)]);
    } else if (eventType === "video_progress") {
      destination = TABLES.videos.name;
      append_(sheets.videos, [receivedAt, eventId, text_(payload.setor), text_(payload.marca), text_(payload.kbd), text_(payload.videoId), text_(payload.videoEvent), number_(payload.watchedSeconds), number_(payload.durationSeconds), number_(payload.percentage), text_(payload.completed), text_(payload.sessionId), text_(payload.deviceId), text_(payload.marcaId), text_(payload.kbdId)]);
    } else if (eventType === "brand_completion") {
      destination = TABLES.completions.name;
      append_(sheets.completions, [receivedAt, eventId, text_(payload.setor), text_(payload.marca), number_(payload.kbdsConcluidos), number_(payload.kbdsTotal), number_(payload.acertosMarca), number_(payload.perguntasMarca), number_(payload.percentualMarca), text_(payload.resultados), text_(payload.sessionId), text_(payload.deviceId)]);
    } else if (eventType === "quiz_completion") {
      destination = TABLES.quizProgress.name;
      append_(sheets.quizProgress, [receivedAt, eventId, text_(payload.setor), text_(payload.marcaId), text_(payload.marca), text_(payload.kbdId), text_(payload.kbd), number_(payload.acertos), number_(payload.total), number_(payload.percentual), text_(payload.completedAt || payload.timestamp), text_(payload.sessionId), text_(payload.deviceId)]);
    }

    updateSectorState_(sheets.state, payload, receivedAt);

    append_(sheets.control, [eventId, receivedAt]);
    SpreadsheetApp.flush();

    return json_({
      ok: true,
      eventId: eventId,
      eventType: eventType,
      sheet: destination,
      receivedAt: receivedAt.toISOString(),
      version: API_VERSION
    });
  } catch (error) {
    return json_({
      ok: false,
      error: error && error.message ? error.message : String(error),
      version: API_VERSION
    });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function runAuthenticatedSetup_(token) {
  const session = getAuthSession_(token);
  if (!session || session.role !== "admin") throw new Error("Sessão administrativa inválida ou expirada.");
  return { ok: true, message: setup(), version: API_VERSION };
}

function getSectorProgressAuthenticated_(sectorValue, token) {
  const sector = normalizeSector_(sectorValue);
  const session = getAuthSession_(token);
  if (!session) throw new Error("Sessão inválida ou expirada.");
  const ownProgress = session.role === "promoter" && session.user === sector;
  const managerAccess = session.role === "manager" && getManagedTeam_(session.user, session.role).some(function (row) {
    return row.promoter === sector;
  });
  if (!ownProgress && !managerAccess && session.role !== "admin") throw new Error("Acesso negado ao progresso solicitado.");
  return getSectorProgress_(sector);
}

function validateEventSession_(payload) {
  const session = getAuthSession_(text_(payload.authToken));
  const sector = normalizeSector_(payload.setor);
  const allowedEvents = ["session_start", "question_detail", "video_progress", "brand_completion", "quiz_completion"];
  if (!session || session.user !== sector) throw new Error("Sessão inválida para registrar atividade.");
  if (allowedEvents.indexOf(text_(payload.eventType)) < 0) throw new Error("Tipo de evento não permitido.");
}

function validateEventBusiness_(payload) {
  const eventType = text_(payload.eventType);
  const kbdId = text_(payload.kbdId).trim();
  const contentEvents = ["question_detail", "video_progress", "quiz_completion"];
  if (contentEvents.indexOf(eventType) >= 0 && !isActiveKbd_(kbdId)) throw new Error("KBD inválido ou fora do catálogo ativo.");
  if (eventType === "quiz_completion") {
    const total = number_(payload.total);
    const correct = number_(payload.acertos);
    const percent = number_(payload.percentual);
    if (total <= 0 || correct < 0 || correct > total) throw new Error("Resultado de quiz inválido.");
    if (percent < 0 || percent > 100 || Math.abs(percent - (correct * 100 / total)) > 1) throw new Error("Percentual de quiz inconsistente.");
  }
  if (eventType === "video_progress") {
    const percent = number_(payload.percentage);
    if (percent < 0 || percent > 100) throw new Error("Percentual de vídeo inválido.");
  }
}

function isActiveKbd_(kbdId) {
  return ACTIVE_KBDS.some(function (item) { return item.kbdId === kbdId; });
}

function eventPayloadForStorage_(payload) {
  const copy = {};
  Object.keys(payload).forEach(function (key) {
    if (key !== "authToken" && key !== "token" && key !== "password") copy[key] = payload[key];
  });
  return copy;
}

function authenticate_(payload) {
  const user = normalizeSector_(payload.username);
  const passwordHash = sha256Hex_(text_(payload.password));
  const adminHash = "7c2b1b3006acaae9796c43587668c0f0a8105c2275b7349385eef9d612610ba1";
  const globalManagerHash = "60135cbb5161c11453a26310f3268c340c0aa3c8110636d96fc1bb647715672b";
  const standardHash = "1785521e024adec9c80aa5c8cb3c0e209928256bbbc14dadc2c46e6031c5d188";
  let role = "";

  if (user === GLOBAL_MANAGER_USER && secureEquals_(passwordHash, globalManagerHash)) {
    role = "admin";
  } else if (user === "ADMIN" && secureEquals_(passwordHash, adminHash)) {
    role = "admin";
  } else if (user !== "ADMIN" && secureEquals_(passwordHash, standardHash)) {
    role = getCatalogRole_(user);
  }

  if (!role) return { ok: false, error: "Usuário, setor ou senha inválidos.", version: API_VERSION };

  const token = Utilities.getUuid() + Utilities.getUuid();
  const session = { user: user, role: role, createdAt: new Date().toISOString() };
  CacheService.getScriptCache().put("auth:" + token, JSON.stringify(session), 21600);
  return { ok: true, user: user, role: role, token: token, expiresIn: 21600, version: API_VERSION };
}

function getCatalogRole_(user) {
  if (Object.keys(EXECUTIVE_BY_COORDINATOR).some(function (coordinator) {
    return EXECUTIVE_BY_COORDINATOR[coordinator] === user;
  })) return "manager";
  const book = getBook_();
  const sheet = ensureSheet_(book, TABLES.teams);
  if (sheet.getLastRow() < 2) return "";
  const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
  let promoterFound = false;
  for (let index = 0; index < values.length; index += 1) {
    const coordinator = normalizeSector_(values[index][0]);
    const promoter = normalizeSector_(values[index][1]);
    if (!coordinator || !promoter) continue;
    if (coordinator === user) return "manager";
    if (promoter === user) promoterFound = true;
  }
  return promoterFound ? "promoter" : "";
}

function getAuthSession_(token) {
  const value = CacheService.getScriptCache().get("auth:" + text_(token));
  if (!value) return null;
  try { return JSON.parse(value); } catch (error) { return null; }
}

function getManagedTeam_(manager, role) {
  const book = getBook_();
  const sheet = ensureSheet_(book, TABLES.teams);
  if (sheet.getLastRow() < 2) return [];
  const team = [];
  const seenPromoters = {};
  sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues().forEach(function (row) {
    const coordinator = normalizeSector_(row[0]);
    const promoter = normalizeSector_(row[1]);
    const executive = resolveExecutive_(coordinator, promoter);
    const managerOwnsRow = coordinator === manager || executive === manager;
    if (!promoter || seenPromoters[promoter] || (role !== "admin" && !managerOwnsRow)) return;
    seenPromoters[promoter] = true;
    team.push({
      executive: executive,
      coordinator: coordinator,
      promoter: promoter,
      regional: text_(row[2]).trim().toUpperCase(),
      coordinatorName: text_(row[3]).trim()
    });
  });
  return team;
}

function resolveExecutive_(coordinator, promoter) {
  return EXECUTIVE_BY_PROMOTER[normalizeSector_(promoter)] ||
    EXECUTIVE_BY_COORDINATOR[normalizeSector_(coordinator)] ||
    "SEM EXECUTIVO";
}

function syncTeams_(token, rows, mode) {
  const session = getAuthSession_(token);
  if (!session || session.role !== "admin") throw new Error("Sessão administrativa inválida ou expirada.");
  if (!Array.isArray(rows) || !rows.length || rows.length > 400) throw new Error("Envie entre 1 e 400 vínculos por lote.");

  if (mode !== "replace" && mode !== "append") throw new Error("Modo de sincronização inválido.");

  const book = getBook_();
  const sheet = ensureSheet_(book, TABLES.teams);
  const promoterOwners = {};
  if (mode === "append" && sheet.getLastRow() >= 2) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues().forEach(function (row) {
      const existingCoordinator = normalizeSector_(row[0]);
      const existingPromoter = normalizeSector_(row[1]);
      if (existingCoordinator && existingPromoter) promoterOwners[existingPromoter] = existingCoordinator;
    });
  }

  const values = [];
  rows.forEach(function (row) {
    const coordinator = normalizeSector_(row.coordinator);
    const promoter = normalizeSector_(row.promoter);
    if (!coordinator || !promoter) throw new Error("Vínculo sem coordenador ou promotor.");
    if (promoterOwners[promoter] && promoterOwners[promoter] !== coordinator) {
      throw new Error("Promotor " + promoter + " possui mais de um coordenador.");
    }
    if (promoterOwners[promoter] === coordinator) return;
    promoterOwners[promoter] = coordinator;
    values.push([coordinator, promoter, text_(row.regional || row.state).trim().toUpperCase(), text_(row.coordinatorName).trim()]);
  });
  if (!values.length) return { ok: true, imported: 0, total: Math.max(0, sheet.getLastRow() - 1), version: API_VERSION };

  if (mode === "replace") {
    sheet.clearContents();
    sheet.getRange(1, 1, 1, TABLES.teams.headers.length).setValues([TABLES.teams.headers]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, TABLES.teams.headers.length)
      .setFontWeight("bold")
      .setBackground("#11162F")
      .setFontColor("#FFFFFF");
  }
  sheet.getRange(sheet.getLastRow() + 1, 1, values.length, 4).setValues(values);
  SpreadsheetApp.flush();
  return { ok: true, imported: values.length, total: Math.max(0, sheet.getLastRow() - 1), version: API_VERSION };
}

function sha256Hex_(value) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text_(value), Utilities.Charset.UTF_8)
    .map(function (byte) { return (byte < 0 ? byte + 256 : byte).toString(16).padStart(2, "0"); })
    .join("");
}

function secureEquals_(left, right) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let i = 0; i < left.length; i += 1) difference |= left.charCodeAt(i) ^ right.charCodeAt(i);
  return difference === 0;
}

function emptySectorProgress_() {
  return { completed: {}, results: {}, videos: {} };
}

function parseJsonObject_(value, fallback) {
  try {
    const parsed = JSON.parse(text_(value) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    return fallback;
  }
}

function normalizeSector_(value) {
  return text_(value).trim().toUpperCase().replace(/\s+/g, "");
}

function findSectorStateRow_(sheet, setor) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  const match = sheet.getRange(2, 1, lastRow - 1, 1).createTextFinder(setor).matchEntireCell(true).findNext();
  return match ? match.getRow() : 0;
}

function updateSectorState_(sheet, payload, receivedAt) {
  const eventType = text_(payload.eventType);
  if (eventType !== "quiz_completion" && eventType !== "video_progress") return;

  const setor = normalizeSector_(payload.setor);
  const marcaId = text_(payload.marcaId);
  const kbdId = text_(payload.kbdId);
  if (!setor || !marcaId || !kbdId) return;

  const row = findSectorStateRow_(sheet, setor);
  const current = row ? sheet.getRange(row, 1, 1, 5).getValues()[0] : [setor, "", "{}", "{}", "{}"];
  const completed = parseJsonObject_(current[2], {});
  const results = parseJsonObject_(current[3], {});
  const videos = parseJsonObject_(current[4], {});

  if (eventType === "quiz_completion") {
    if (!completed[marcaId]) completed[marcaId] = {};
    if (!results[marcaId]) results[marcaId] = {};
    completed[marcaId][kbdId] = true;
    results[marcaId][kbdId] = {
      marcaId: marcaId,
      marca: text_(payload.marca),
      kbdId: kbdId,
      kbd: text_(payload.kbd),
      acertos: number_(payload.acertos),
      total: number_(payload.total),
      percentual: number_(payload.percentual),
      medalha: text_(payload.medalha),
      setor: setor,
      completedAt: text_(payload.completedAt || payload.timestamp || receivedAt.toISOString())
    };
  }

  if (eventType === "video_progress") {
    if (!videos[marcaId]) videos[marcaId] = {};
    const previous = videos[marcaId][kbdId] || {};
    videos[marcaId][kbdId] = {
      videoId: text_(payload.videoId),
      watchedSeconds: Math.max(number_(previous.watchedSeconds), number_(payload.watchedSeconds)),
      duration: Math.max(number_(previous.duration), number_(payload.durationSeconds)),
      percentage: Math.max(number_(previous.percentage), number_(payload.percentage)),
      completed: Boolean(previous.completed || text_(payload.completed).toUpperCase() === "SIM"),
      updatedAt: receivedAt.toISOString()
    };
  }

  const values = [setor, receivedAt, JSON.stringify(completed), JSON.stringify(results), JSON.stringify(videos)];
  if (row) sheet.getRange(row, 1, 1, values.length).setValues([values]);
  else append_(sheet, values);
}

function getSectorProgress_(setorValue) {
  const setor = normalizeSector_(setorValue);
  if (!setor) throw new Error("setor é obrigatório.");
  const book = getBook_();
  const sheet = ensureSheet_(book, TABLES.state);
  if (!sheet.isSheetHidden()) sheet.hideSheet();
  const row = findSectorStateRow_(sheet, setor);
  if (!row) return { ok: true, setor: setor, progress: emptySectorProgress_(), updatedAt: null, version: API_VERSION };
  const values = sheet.getRange(row, 1, 1, 5).getValues()[0];
  return {
    ok: true,
    setor: setor,
    progress: {
      completed: parseJsonObject_(values[2], {}),
      results: parseJsonObject_(values[3], {}),
      videos: parseJsonObject_(values[4], {})
    },
    updatedAt: values[1] instanceof Date ? values[1].toISOString() : text_(values[1]),
    version: API_VERSION
  };
}

function getBook_() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  if (book) {
    PropertiesService.getScriptProperties().setProperty(REPORT_CONFIG.spreadsheetProperty, book.getId());
    return book;
  }
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty(REPORT_CONFIG.spreadsheetProperty);
  if (spreadsheetId) return SpreadsheetApp.openById(spreadsheetId);
  throw new Error("Abra a planilha e execute installDailyReport uma vez para vincular o relatório.");
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) throw new Error("Corpo da requisição ausente.");
  if (e.postData.contents.length > 100000) throw new Error("Payload maior que o limite permitido.");
  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    throw new Error("JSON inválido.");
  }
}

function validatePayload_(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Payload inválido.");
  if (!text_(payload.eventType)) throw new Error("eventType é obrigatório.");
  if (!text_(payload.setor)) throw new Error("setor é obrigatório.");
}

function ensureSheet_(book, table) {
  let sheet = book.getSheetByName(table.name);
  if (!sheet) sheet = book.insertSheet(table.name);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, table.headers.length).setValues([table.headers]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, table.headers.length)
      .setFontWeight("bold")
      .setBackground("#11162F")
      .setFontColor("#FFFFFF");
    sheet.autoResizeColumns(1, table.headers.length);
  } else if (sheet.getLastColumn() < table.headers.length) {
    sheet.getRange(1, 1, 1, table.headers.length).setValues([table.headers]);
  }
  return sheet;
}

function isDuplicate_(controlSheet, eventId) {
  const lastRow = controlSheet.getLastRow();
  if (lastRow < 2) return false;
  return Boolean(
    controlSheet
      .getRange(2, 1, lastRow - 1, 1)
      .createTextFinder(eventId)
      .matchEntireCell(true)
      .findNext()
  );
}

function append_(sheet, values) {
  sheet.appendRow(values.map(safeCell_));
}

function safeCell_(value) {
  if (value instanceof Date || typeof value === "number" || typeof value === "boolean") return value;
  const text = text_(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function text_(value) {
  if (value === null || value === undefined) return "";
  return String(value).slice(0, 50000);
}

function number_(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function safeJson_(value) {
  try {
    return JSON.stringify(value).slice(0, 50000);
  } catch (error) {
    return "{}";
  }
}

function json_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

function installDailyReport() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  if (!book) throw new Error("Execute esta função a partir do Apps Script aberto pela planilha.");

  const email = REPORT_CONFIG.defaultRecipients.join(",");

  const properties = PropertiesService.getScriptProperties();
  properties.setProperty(REPORT_CONFIG.spreadsheetProperty, book.getId());
  properties.setProperty(REPORT_CONFIG.emailProperty, email);

  ScriptApp.getProjectTriggers()
    .filter(function (trigger) { return trigger.getHandlerFunction() === REPORT_CONFIG.triggerHandler; })
    .forEach(function (trigger) { ScriptApp.deleteTrigger(trigger); });

  ScriptApp.newTrigger(REPORT_CONFIG.triggerHandler)
    .timeBased()
    .everyDays(1)
    .atHour(REPORT_CONFIG.hour)
    .inTimezone(REPORT_CONFIG.timeZone)
    .create();

  return "Relatório diário instalado para " + email + ", por volta das 08h.";
}

function configureReportRecipients() {
  const recipients = REPORT_CONFIG.defaultRecipients.join(",");
  PropertiesService.getScriptProperties().setProperty(REPORT_CONFIG.emailProperty, recipients);
  return "Destinatários configurados: " + recipients;
}

function sendDailyInteractionReport() {
  const period = previousDayPeriod_();
  return sendInteractionReport_(period, false);
}

function sendCurrentDayInteractionReport() {
  const end = new Date();
  const dateKey = Utilities.formatDate(end, REPORT_CONFIG.timeZone, "yyyy-MM-dd");
  return sendInteractionReport_({
    start: localMidnight_(dateKey),
    end: end,
    label: "Hoje — " + Utilities.formatDate(end, REPORT_CONFIG.timeZone, "dd/MM/yyyy")
  }, false);
}

function sendDailyInteractionReportPreview() {
  const end = new Date();
  const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);
  return sendInteractionReport_({
    start: start,
    end: end,
    label: Utilities.formatDate(start, REPORT_CONFIG.timeZone, "dd/MM HH:mm") + " a " + Utilities.formatDate(end, REPORT_CONFIG.timeZone, "dd/MM HH:mm")
  }, true);
}

function sendInteractionReport_(period, preview) {
  const email = PropertiesService.getScriptProperties().getProperty(REPORT_CONFIG.emailProperty) || REPORT_CONFIG.defaultRecipients.join(",");
  if (!email) throw new Error("E-mail do relatório não configurado. Execute installDailyReport.");

  const report = buildInteractionReport_(period.start, period.end);
  updateDailyReportSheet_(report, period.label);
  const subject = (preview ? "[PRÉVIA] " : "") + "Missão KBD — resumo diário — " + period.label;

  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: buildPlainTextReport_(report, period.label),
    htmlBody: buildHtmlReport_(report, period.label, preview),
    name: "Missão KBD"
  });

  return "Relatório enviado para " + email + ".";
}

function buildInteractionReport_(start, end) {
  const book = getBook_();
  const sessions = rowsInPeriod_(book.getSheetByName(TABLES.sessions.name), start, end);
  const answers = rowsInPeriod_(book.getSheetByName(TABLES.answers.name), start, end);
  const videoEvents = rowsInPeriod_(book.getSheetByName(TABLES.videos.name), start, end);
  const sectors = {};
  const uniqueDevices = {};
  const videoSessions = {};

  function sector_(name) {
    const key = text_(name).trim() || "SEM SETOR";
    if (!sectors[key]) {
      sectors[key] = { setor: key, accesses: 0, devices: {}, answers: 0, correct: 0, videos: 0, videoPercentTotal: 0, completedVideos: 0 };
    }
    return sectors[key];
  }

  sessions.forEach(function (row) {
    const item = sector_(row[2]);
    item.accesses += 1;
    const device = text_(row[4]);
    if (device) {
      item.devices[device] = true;
      uniqueDevices[device] = true;
    }
  });

  answers.forEach(function (row) {
    const item = sector_(row[2]);
    item.answers += 1;
    if (isTrue_(row[8])) item.correct += 1;
    const device = text_(row[11]);
    if (device) {
      item.devices[device] = true;
      uniqueDevices[device] = true;
    }
  });

  videoEvents.forEach(function (row) {
    const setor = text_(row[2]).trim() || "SEM SETOR";
    const key = [setor, row[11], row[12], row[5], row[4]].map(text_).join("|");
    const percent = clampPercent_(row[9]);
    const watched = Math.max(0, number_(row[7]));
    const duration = Math.max(0, number_(row[8]));
    const current = videoSessions[key] || {
      setor: setor,
      marca: text_(row[3]),
      kbd: text_(row[4]),
      videoId: text_(row[5]),
      percent: 0,
      watchedSeconds: 0,
      durationSeconds: 0,
      completed: false,
      sessionId: text_(row[11]),
      deviceId: text_(row[12])
    };
    current.percent = Math.max(current.percent, percent);
    current.watchedSeconds = Math.max(current.watchedSeconds, watched);
    current.durationSeconds = Math.max(current.durationSeconds, duration);
    current.completed = current.completed || isTrue_(row[10]) || percent >= 90;
    videoSessions[key] = current;
  });

  const videos = Object.keys(videoSessions).map(function (key) { return videoSessions[key]; });
  videos.forEach(function (video) {
    const item = sector_(video.setor);
    item.videos += 1;
    item.videoPercentTotal += video.percent;
    if (video.completed) item.completedVideos += 1;
    if (video.deviceId) {
      item.devices[video.deviceId] = true;
      uniqueDevices[video.deviceId] = true;
    }
  });

  const sectorRows = Object.keys(sectors).map(function (key) {
    const item = sectors[key];
    return {
      setor: item.setor,
      accesses: item.accesses,
      devices: Object.keys(item.devices).length,
      answers: item.answers,
      correct: item.correct,
      accuracy: item.answers ? Math.round(item.correct * 100 / item.answers) : 0,
      videos: item.videos,
      videoPercent: item.videos ? Math.round(item.videoPercentTotal / item.videos) : 0,
      completedVideos: item.completedVideos
    };
  }).sort(function (a, b) { return b.accesses - a.accesses || b.answers - a.answers || a.setor.localeCompare(b.setor); });

  const correctTotal = answers.filter(function (row) { return isTrue_(row[8]); }).length;
  const averageVideo = videos.length ? Math.round(videos.reduce(function (sum, video) { return sum + video.percent; }, 0) / videos.length) : 0;

  return {
    bookUrl: book.getUrl(),
    sessions: sessions,
    answers: answers,
    videos: videos,
    sectors: sectorRows,
    totals: {
      accesses: sessions.length,
      sectors: sectorRows.length,
      devices: Object.keys(uniqueDevices).length,
      answers: answers.length,
      correct: correctTotal,
      accuracy: answers.length ? Math.round(correctTotal * 100 / answers.length) : 0,
      videos: videos.length,
      videoPercent: averageVideo,
      completedVideos: videos.filter(function (video) { return video.completed; }).length
    }
  };
}

function rowsInPeriod_(sheet, start, end) {
  if (!sheet || sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues().filter(function (row) {
    const receivedAt = row[0] instanceof Date ? row[0] : new Date(row[0]);
    return !isNaN(receivedAt.getTime()) && receivedAt >= start && receivedAt < end;
  });
}

function previousDayPeriod_() {
  const now = new Date();
  const todayKey = Utilities.formatDate(now, REPORT_CONFIG.timeZone, "yyyy-MM-dd");
  const end = localMidnight_(todayKey);
  const previousKey = Utilities.formatDate(new Date(end.getTime() - 12 * 60 * 60 * 1000), REPORT_CONFIG.timeZone, "yyyy-MM-dd");
  const start = localMidnight_(previousKey);
  return { start: start, end: end, label: Utilities.formatDate(start, REPORT_CONFIG.timeZone, "dd/MM/yyyy") };
}

function localMidnight_(dateKey) {
  const noonUtc = new Date(dateKey + "T12:00:00Z");
  const offset = Utilities.formatDate(noonUtc, REPORT_CONFIG.timeZone, "Z");
  const isoOffset = offset.slice(0, 3) + ":" + offset.slice(3);
  return new Date(dateKey + "T00:00:00" + isoOffset);
}

function updateDailyReportSheet_(report, label) {
  const book = getBook_();
  let sheet = book.getSheetByName("Relatorio Diario");
  if (!sheet) sheet = book.insertSheet("Relatorio Diario");
  sheet.getDataRange().breakApart();
  sheet.clear();

  sheet.getRange(1, 1, 1, 11).merge()
    .setValue("Missão KBD — Relatório Diário — " + label)
    .setBackground("#11162F")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold")
    .setFontSize(16);

  const totals = report.totals;
  sheet.getRange(3, 1, 2, 8).setValues([
    ["Acessos", "Setores", "Dispositivos", "Respostas", "Acertos", "% de acerto", "Vídeos", "% médio assistido"],
    [totals.accesses, totals.sectors, totals.devices, totals.answers, totals.correct, totals.accuracy + "%", totals.videos, totals.videoPercent + "%"]
  ]);
  styleReportHeader_(sheet.getRange(3, 1, 1, 8));

  let row = 6;
  row = writeReportSection_(sheet, row, "RESUMO POR SETOR",
    ["Setor", "Acessos", "Dispositivos", "Respostas", "Acertos", "% de acerto", "Vídeos", "% médio assistido", "Vídeos concluídos"],
    report.sectors.map(function (item) {
      return [item.setor, item.accesses, item.devices, item.answers, item.correct, item.accuracy + "%", item.videos, item.videoPercent + "%", item.completedVideos];
    })
  );

  row = writeReportSection_(sheet, row + 1, "RESPOSTAS DOS QUIZZES",
    ["Recebido em", "Setor", "Marca", "KBD", "Pergunta", "Resposta enviada", "Resposta correta", "Acertou", "Score", "Sessão", "Dispositivo"],
    report.answers.map(function (answer) {
      return [formatReportDate_(answer[0]), answer[2], answer[3], answer[4], answer[5], answer[6], answer[7], answer[8], answer[9], answer[10], answer[11]];
    })
  );

  writeReportSection_(sheet, row + 1, "VÍDEOS ASSISTIDOS",
    ["Setor", "Marca", "KBD", "Video ID", "% máximo assistido", "Segundos assistidos", "Duração", "Concluído", "Sessão", "Dispositivo"],
    report.videos.map(function (video) {
      return [video.setor, video.marca, video.kbd, video.videoId, video.percent + "%", video.watchedSeconds, video.durationSeconds, video.completed ? "SIM" : "NÃO", video.sessionId, video.deviceId];
    })
  );

  sheet.setFrozenRows(1);
  sheet.getDataRange().setVerticalAlignment("middle");
  sheet.autoResizeColumns(1, 11);
  [4, 5, 6, 7].forEach(function (column) {
    if (sheet.getColumnWidth(column) > 320) sheet.setColumnWidth(column, 320);
  });
  SpreadsheetApp.flush();
}

function writeReportSection_(sheet, startRow, title, headers, rows) {
  sheet.getRange(startRow, 1, 1, headers.length).merge()
    .setValue(title)
    .setBackground("#22D3EE")
    .setFontColor("#05070F")
    .setFontWeight("bold");
  sheet.getRange(startRow + 1, 1, 1, headers.length).setValues([headers]);
  styleReportHeader_(sheet.getRange(startRow + 1, 1, 1, headers.length));
  if (rows.length) sheet.getRange(startRow + 2, 1, rows.length, headers.length).setValues(rows.map(function (item) { return item.map(safeCell_); }));
  return startRow + 2 + rows.length;
}

function styleReportHeader_(range) {
  range.setBackground("#171C3D").setFontColor("#FFFFFF").setFontWeight("bold");
}

function formatReportDate_(value) {
  const date = value instanceof Date ? value : new Date(value);
  return isNaN(date.getTime()) ? text_(value) : Utilities.formatDate(date, REPORT_CONFIG.timeZone, "dd/MM/yyyy HH:mm:ss");
}

function buildHtmlReport_(report, label, preview) {
  const totals = report.totals;
  const sectorRows = report.sectors.slice(0, 30).map(function (item) {
    return "<tr>" +
      td_(item.setor, true) + td_(item.accesses) + td_(item.answers) + td_(item.accuracy + "%") + td_(item.videos) + td_(item.videoPercent + "%") +
      "</tr>";
  }).join("") || '<tr><td colspan="6" style="padding:18px;color:#9aa1b7;text-align:center">Nenhuma interação registrada no período.</td></tr>';

  const answerRows = report.answers.slice(-12).reverse().map(function (row) {
    const correct = isTrue_(row[8]);
    return "<tr>" + td_(row[2], true) + td_(row[3]) + td_(row[4]) + td_(row[6]) +
      '<td style="padding:10px 8px;border-bottom:1px solid #252b48;color:' + (correct ? "#22e0a8" : "#ff6b83") + ';font-weight:700">' + (correct ? "Acertou" : "Errou") + "</td></tr>";
  }).join("") || '<tr><td colspan="5" style="padding:18px;color:#9aa1b7;text-align:center">Nenhuma resposta no período.</td></tr>';

  const videoRows = report.videos.slice(0, 12).map(function (video) {
    return "<tr>" + td_(video.setor, true) + td_(video.marca) + td_(video.kbd) +
      '<td style="padding:10px 8px;border-bottom:1px solid #252b48"><div style="font-weight:700;color:#f5f6fb">' + video.percent + '%</div><div style="height:5px;background:#252b48;border-radius:9px;margin-top:5px;overflow:hidden"><div style="width:' + video.percent + '%;height:5px;background:#22d3ee"></div></div></td></tr>';
  }).join("") || '<tr><td colspan="4" style="padding:18px;color:#9aa1b7;text-align:center">Nenhum vídeo assistido no período.</td></tr>';

  return '<!doctype html><html><body style="margin:0;background:#05070f;font-family:Arial,Helvetica,sans-serif;color:#f5f6fb">' +
    '<div style="max-width:760px;margin:0 auto;padding:28px 16px">' +
      '<div style="border:1px solid #252b48;border-radius:22px;overflow:hidden;background:#0d1124">' +
        '<div style="height:6px;background:linear-gradient(90deg,#ff2e9a,#ff8a2e,#ffd60a,#22d3ee)"></div>' +
        '<div style="padding:28px">' +
          '<div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#22d3ee;font-weight:700">SPOT • Missão KBD</div>' +
          '<h1 style="margin:8px 0 5px;font-size:28px;color:#ffffff">Resumo diário de interação</h1>' +
          '<div style="color:#9aa1b7;font-size:14px">' + escapeHtml_(label) + (preview ? " • prévia das últimas 24 horas" : "") + "</div>" +
          '<table role="presentation" width="100%" cellpadding="0" cellspacing="8" style="margin:22px -8px 8px;border-collapse:separate"><tr>' +
            metricCard_("Acessos", totals.accesses, "#22d3ee") + metricCard_("Setores ativos", totals.sectors, "#a855f7") + metricCard_("Respostas", totals.answers, "#ff8a2e") +
          '</tr><tr>' + metricCard_("Taxa de acerto", totals.accuracy + "%", "#22e0a8") + metricCard_("Vídeos", totals.videos, "#ffd60a") + metricCard_("Média assistida", totals.videoPercent + "%", "#ff2e9a") + '</tr></table>' +
          '<div style="margin-top:26px"><h2 style="font-size:18px;margin:0 0 10px">Resumo por setor</h2>' + reportTable_(["Setor", "Acessos", "Respostas", "% acerto", "Vídeos", "% assistido"], sectorRows) + '</div>' +
          '<div style="margin-top:26px"><h2 style="font-size:18px;margin:0 0 10px">Últimas respostas</h2>' + reportTable_(["Setor", "Marca", "KBD", "Resposta", "Resultado"], answerRows) + '</div>' +
          '<div style="margin-top:26px"><h2 style="font-size:18px;margin:0 0 10px">Vídeos assistidos</h2>' + reportTable_(["Setor", "Marca", "KBD", "% assistido"], videoRows) + '</div>' +
          '<div style="margin-top:24px;padding:16px;border-radius:14px;background:#151a35;color:#c8cbda;font-size:13px;line-height:1.5">A aba <strong>Relatorio Diario</strong> da planilha contém o detalhamento por setor, respostas dos quizzes e percentual máximo assistido de cada vídeo.</div>' +
          '<div style="margin-top:18px"><a href="' + escapeHtml_(report.bookUrl) + '" style="display:inline-block;padding:13px 18px;border-radius:12px;background:#22d3ee;color:#05070f;text-decoration:none;font-weight:700">Abrir planilha completa</a></div>' +
        '</div>' +
      '</div>' +
      '<div style="text-align:center;color:#68708d;font-size:11px;padding:16px">Relatório automático • Missão KBD</div>' +
    '</div></body></html>';
}

function buildPlainTextReport_(report, label) {
  const totals = report.totals;
  return [
    "Missão KBD — resumo diário — " + label,
    "Acessos: " + totals.accesses,
    "Setores ativos: " + totals.sectors,
    "Respostas: " + totals.answers,
    "Taxa de acerto: " + totals.accuracy + "%",
    "Vídeos: " + totals.videos,
    "Média assistida: " + totals.videoPercent + "%",
    "Planilha: " + report.bookUrl
  ].join("\n");
}

function metricCard_(label, value, color) {
  return '<td width="33.33%" style="padding:7px"><div style="background:#151a35;border:1px solid #252b48;border-radius:14px;padding:15px"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.7px;color:#9aa1b7">' + escapeHtml_(label) + '</div><div style="font-size:25px;font-weight:800;color:' + color + ';margin-top:5px">' + escapeHtml_(value) + "</div></div></td>";
}

function reportTable_(headers, rows) {
  const head = headers.map(function (header) { return '<th align="left" style="padding:10px 8px;background:#151a35;color:#9aa1b7;font-size:11px;text-transform:uppercase;border-bottom:1px solid #252b48">' + escapeHtml_(header) + "</th>"; }).join("");
  return '<div style="overflow-x:auto;border:1px solid #252b48;border-radius:12px"><table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:12px"><thead><tr>' + head + "</tr></thead><tbody>" + rows + "</tbody></table></div>";
}

function td_(value, strong) {
  return '<td style="padding:10px 8px;border-bottom:1px solid #252b48;color:' + (strong ? "#ffffff" : "#c8cbda") + ";font-weight:" + (strong ? "700" : "400") + '">' + escapeHtml_(value) + "</td>";
}

function escapeHtml_(value) {
  return text_(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isTrue_(value) {
  return ["TRUE", "VERDADEIRO", "SIM", "1", "YES"].indexOf(text_(value).trim().toUpperCase()) >= 0 || value === true;
}

function clampPercent_(value) {
  return Math.max(0, Math.min(100, number_(value)));
}
