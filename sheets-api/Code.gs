const API_VERSION = "2.0.0";
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
