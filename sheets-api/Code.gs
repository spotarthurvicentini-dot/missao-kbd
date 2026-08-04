const API_VERSION = "2.0.0";

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
    headers: ["Recebido em", "Event ID", "Setor", "Marca", "KBD", "Video ID", "Evento do vídeo", "Segundos assistidos", "Duração", "Percentual", "Concluído", "Sessão", "Dispositivo"]
  },
  completions: {
    name: "Conclusoes",
    headers: ["Recebido em", "Event ID", "Setor", "Marca", "KBDs concluídos", "KBDs totais", "Acertos", "Perguntas", "Percentual", "Resultados", "Sessão", "Dispositivo"]
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
  return "API Missão KBD configurada.";
}

function doGet() {
  return json_({
    ok: true,
    service: "Missão KBD Sheets API",
    version: API_VERSION,
    timestamp: new Date().toISOString()
  });
}

function doPost(e) {
  const receivedAt = new Date();
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(15000);
    const payload = parsePayload_(e);
    validatePayload_(payload);

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
      safeJson_(payload)
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
      append_(sheets.videos, [receivedAt, eventId, text_(payload.setor), text_(payload.marca), text_(payload.kbd), text_(payload.videoId), text_(payload.videoEvent), number_(payload.watchedSeconds), number_(payload.durationSeconds), number_(payload.percentage), text_(payload.completed), text_(payload.sessionId), text_(payload.deviceId)]);
    } else if (eventType === "brand_completion") {
      destination = TABLES.completions.name;
      append_(sheets.completions, [receivedAt, eventId, text_(payload.setor), text_(payload.marca), number_(payload.kbdsConcluidos), number_(payload.kbdsTotal), number_(payload.acertosMarca), number_(payload.perguntasMarca), number_(payload.percentualMarca), text_(payload.resultados), text_(payload.sessionId), text_(payload.deviceId)]);
    }

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

function getBook_() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  if (!book) throw new Error("Abra a planilha e crie este script em Extensões > Apps Script.");
  return book;
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
