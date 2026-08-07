const MANAGEMENT_CYCLE = {
  id: "2026-H2",
  name: "Julho–Dezembro 2026",
  startAt: "2026-07-01T00:00:00-03:00",
  endAt: "2027-01-01T00:00:00-03:00"
};

// Fonte oficial do denominador gerencial: os 9 KBDs publicados no app.
const ACTIVE_KBDS = [
  { brandId: "tampax", brand: "TAMPAX", kbdId: "ponto-natural", kbd: "Bandeja no Ponto Natural" },
  { brandId: "pantene", brand: "PANTENE", kbdId: "bond-repair", kbd: "Bond Repair — 20% do Espaço" },
  { brandId: "pantene", brand: "PANTENE", kbdId: "finalizadores", kbd: "Finalizadores com Espaço Garantido" },
  { brandId: "pampers", brand: "PAMPERS", kbdId: "vale-night", kbd: "Vale Night — Materiais na Gôndola" },
  { brandId: "pampers", brand: "PAMPERS", kbdId: "vale-night-ponto-extra", kbd: "Vale Night — Ponto Extra" },
  { brandId: "secret", brand: "SECRET", kbdId: "frentes-bandejas", kbd: "Frentes ou Bandejas por Canal" },
  { brandId: "oral-b", brand: "ORAL-B", kbdId: "branqueamento", kbd: "60% de Branqueamento" },
  { brandId: "gillette", brand: "GILLETTE", kbdId: "mach3-presto3", kbd: "Pontos de Contato — Mach3 e Presto3" },
  { brandId: "venus", brand: "VENUS", kbdId: "tres-pontos", kbd: "3 Pontos de Contato" }
];

function buildManagementReport_(teamRows, start, end) {
  const book = getBook_();
  const cycleStart = new Date(MANAGEMENT_CYCLE.startAt);
  const cycleEndLimit = new Date(MANAGEMENT_CYCLE.endAt);
  const cycleEnd = end < cycleEndLimit ? end : cycleEndLimit;
  const sessions = rowsInPeriod_(book.getSheetByName(TABLES.sessions.name), start, end);
  const quizzes = rowsInPeriod_(book.getSheetByName(TABLES.quizProgress.name), cycleStart, cycleEnd);
  const videos = rowsInPeriod_(book.getSheetByName(TABLES.videos.name), cycleStart, cycleEnd);
  const operationalQuizzes = quizzes.filter(function (row) {
    const date = managementDate_(row[0]);
    return date && date >= start && date <= end;
  });
  const teamBySector = {};
  const peopleBySector = {};
  const activeKbdById = {};
  const activeKbdByName = {};

  ACTIVE_KBDS.forEach(function (item) {
    activeKbdById[item.kbdId] = item;
    activeKbdByName[normalizeManagementText_(item.kbd)] = item;
  });

  teamRows.forEach(function (row) {
    const sector = normalizeSector_(row.promoter);
    if (!sector || teamBySector[sector]) return;
    const regionalRaw = text_(row.regional).trim().toUpperCase();
    const regional = regionalRaw === "SPI" ? "SP" : regionalRaw;
    teamBySector[sector] = row;
    peopleBySector[sector] = {
      sector: sector,
      coordinator: normalizeSector_(row.coordinator),
      regional: regional,
      accesses: 0,
      activeDaysMap: {},
      lastAccessAt: null,
      latestQuizzes: {},
      videoByKbd: {}
    };
  });

  sessions.forEach(function (row) {
    const sector = normalizeSector_(row[2]);
    const person = peopleBySector[sector];
    if (!person) return;
    const receivedAt = managementDate_(row[0]);
    person.accesses += 1;
    if (receivedAt) {
      const day = Utilities.formatDate(receivedAt, REPORT_CONFIG.timeZone, "yyyy-MM-dd");
      person.activeDaysMap[day] = true;
      if (!person.lastAccessAt || receivedAt > person.lastAccessAt) person.lastAccessAt = receivedAt;
    }
  });

  quizzes.forEach(function (row) {
    const sector = normalizeSector_(row[2]);
    const kbdId = text_(row[5]).trim();
    const person = peopleBySector[sector];
    if (!person || !activeKbdById[kbdId]) return;
    const receivedAt = managementDate_(row[0]);
    const previous = person.latestQuizzes[kbdId];
    const completedAt = managementDate_(row[10]) || receivedAt;
    if (!previous || (completedAt && completedAt >= previous.completedAt)) {
      person.latestQuizzes[kbdId] = {
        receivedAt: receivedAt || start,
        completedAt: completedAt || receivedAt || start,
        correct: Math.max(0, number_(row[7])),
        total: Math.max(0, number_(row[8])),
        percent: clampPercent_(row[9])
      };
    }
  });

  videos.forEach(function (row) {
    const sector = normalizeSector_(row[2]);
    const person = peopleBySector[sector];
    if (!person) return;
    const kbdMeta = activeKbdByName[normalizeManagementText_(row[4])];
    if (!kbdMeta) return;
    const percent = clampPercent_(row[9]);
    person.videoByKbd[kbdMeta.kbdId] = Math.max(number_(person.videoByKbd[kbdMeta.kbdId]), percent);
  });

  const people = Object.keys(peopleBySector).map(function (sector) {
    const item = peopleBySector[sector];
    const quizItems = Object.keys(item.latestQuizzes).map(function (kbdId) { return item.latestQuizzes[kbdId]; });
    const completedKbdCount = quizItems.length;
    const correct = quizItems.reduce(function (sum, quiz) { return sum + quiz.correct; }, 0);
    const questions = quizItems.reduce(function (sum, quiz) { return sum + quiz.total; }, 0);
    const videoPercentTotal = ACTIVE_KBDS.reduce(function (sum, kbd) { return sum + number_(item.videoByKbd[kbd.kbdId]); }, 0);
    return {
      sector: item.sector,
      coordinator: item.coordinator,
      regional: item.regional,
      accesses: item.accesses,
      activeDays: Object.keys(item.activeDaysMap).length,
      lastAccessAt: item.lastAccessAt ? item.lastAccessAt.toISOString() : null,
      completedKbdCount: completedKbdCount,
      eligibleKbdCount: ACTIVE_KBDS.length,
      completionRate: managementPercent_(completedKbdCount, ACTIVE_KBDS.length),
      correct: correct,
      questions: questions,
      accuracy: questions ? managementPercent_(correct, questions) : null,
      videoAveragePercent: Math.round(videoPercentTotal / ACTIVE_KBDS.length)
    };
  }).sort(function (a, b) { return a.sector.localeCompare(b.sector); });

  const totalCompleted = people.reduce(function (sum, person) { return sum + person.completedKbdCount; }, 0);
  const totalEligible = people.length * ACTIVE_KBDS.length;
  const totalCorrect = people.reduce(function (sum, person) { return sum + person.correct; }, 0);
  const totalQuestions = people.reduce(function (sum, person) { return sum + person.questions; }, 0);
  const activePromoters = people.filter(function (person) { return person.accesses > 0; }).length;

  return {
    definitions: {
      accesses: "Quantidade de logins (session_start) recebidos no período.",
      activePromoters: "Promotores vinculados com ao menos um login no período.",
      completion: "Quiz mais recente de cada promotor por KBD no ciclo, dividido pelos 9 KBDs publicados.",
      accuracy: "Acertos divididos pelas perguntas do quiz mais recente por promotor e KBD no ciclo.",
      video: "Maior percentual assistido por promotor e KBD no ciclo; KBD sem evento vale zero."
    },
    totals: {
      linkedPromoters: people.length,
      activePromoters: activePromoters,
      accesses: people.reduce(function (sum, person) { return sum + person.accesses; }, 0),
      completedKbdCount: totalCompleted,
      eligibleKbdCount: totalEligible,
      completionRate: managementPercent_(totalCompleted, totalEligible),
      correct: totalCorrect,
      questions: totalQuestions,
      accuracy: totalQuestions ? managementPercent_(totalCorrect, totalQuestions) : null,
      videoAveragePercent: people.length ? Math.round(people.reduce(function (sum, person) { return sum + person.videoAveragePercent; }, 0) / people.length) : 0
    },
    people: people,
    weeklyTrend: buildManagementTrend_(sessions, operationalQuizzes, teamBySector, activeKbdById, start, end),
    contentPerformance: buildContentPerformance_(peopleBySector),
    regionalPerformance: buildRegionalPerformance_(people),
    attention: buildManagementAttention_(people),
    dataAvailability: {
      sessions: true,
      quizzes: true,
      videos: true,
      contentViews: false,
      checklist: false,
      activityPeriod: { start: start.toISOString(), end: end.toISOString() },
      progressPeriod: { start: cycleStart.toISOString(), end: cycleEnd.toISOString() }
    }
  };
}

function buildManagementTrend_(sessions, quizzes, teamBySector, activeKbdById, start, end) {
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const bucketCount = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / weekMs));
  const buckets = [];
  for (let index = 0; index < bucketCount; index += 1) {
    const bucketStart = new Date(start.getTime() + index * weekMs);
    const bucketEnd = new Date(Math.min(end.getTime(), bucketStart.getTime() + weekMs));
    buckets.push({
      start: bucketStart.toISOString(),
      end: bucketEnd.toISOString(),
      label: Utilities.formatDate(bucketStart, REPORT_CONFIG.timeZone, "dd/MM"),
      accesses: 0,
      activeMap: {},
      quizAttempts: 0
    });
  }

  sessions.forEach(function (row) {
    const sector = normalizeSector_(row[2]);
    if (!teamBySector[sector]) return;
    const date = managementDate_(row[0]);
    const index = date ? Math.floor((date.getTime() - start.getTime()) / weekMs) : -1;
    if (index < 0 || index >= buckets.length) return;
    buckets[index].accesses += 1;
    buckets[index].activeMap[sector] = true;
  });

  quizzes.forEach(function (row) {
    const sector = normalizeSector_(row[2]);
    const kbdId = text_(row[5]).trim();
    if (!teamBySector[sector] || !activeKbdById[kbdId]) return;
    const date = managementDate_(row[0]);
    const index = date ? Math.floor((date.getTime() - start.getTime()) / weekMs) : -1;
    if (index < 0 || index >= buckets.length) return;
    buckets[index].quizAttempts += 1;
  });

  return buckets.map(function (bucket) {
    return {
      start: bucket.start,
      end: bucket.end,
      label: bucket.label,
      accesses: bucket.accesses,
      activePromoters: Object.keys(bucket.activeMap).length,
      quizAttempts: bucket.quizAttempts
    };
  });
}

function buildContentPerformance_(peopleBySector) {
  return ACTIVE_KBDS.map(function (kbd) {
    let completed = 0;
    let correct = 0;
    let questions = 0;
    let videoPercentTotal = 0;
    Object.keys(peopleBySector).forEach(function (sector) {
      const person = peopleBySector[sector];
      const quiz = person.latestQuizzes[kbd.kbdId];
      if (quiz) {
        completed += 1;
        correct += quiz.correct;
        questions += quiz.total;
      }
      videoPercentTotal += number_(person.videoByKbd[kbd.kbdId]);
    });
    const eligible = Object.keys(peopleBySector).length;
    return {
      brandId: kbd.brandId,
      brand: kbd.brand,
      kbdId: kbd.kbdId,
      kbd: kbd.kbd,
      eligiblePromoters: eligible,
      completedPromoters: completed,
      completionRate: managementPercent_(completed, eligible),
      correct: correct,
      questions: questions,
      accuracy: questions ? managementPercent_(correct, questions) : null,
      videoAveragePercent: eligible ? Math.round(videoPercentTotal / eligible) : 0
    };
  });
}

function buildRegionalPerformance_(people) {
  const regions = {};
  people.forEach(function (person) {
    const key = person.regional || "SEM REGIONAL";
    if (!regions[key]) regions[key] = { regional: key, linkedPromoters: 0, activePromoters: 0, completed: 0, eligible: 0, correct: 0, questions: 0 };
    const region = regions[key];
    region.linkedPromoters += 1;
    if (person.accesses > 0) region.activePromoters += 1;
    region.completed += person.completedKbdCount;
    region.eligible += person.eligibleKbdCount;
    region.correct += person.correct;
    region.questions += person.questions;
  });
  return Object.keys(regions).map(function (key) {
    const region = regions[key];
    return {
      regional: region.regional,
      linkedPromoters: region.linkedPromoters,
      activePromoters: region.activePromoters,
      completionRate: managementPercent_(region.completed, region.eligible),
      accuracy: region.questions ? managementPercent_(region.correct, region.questions) : null
    };
  }).sort(function (a, b) { return b.completionRate - a.completionRate || a.regional.localeCompare(b.regional); });
}

function buildManagementAttention_(people) {
  const inactive = people.filter(function (person) { return person.accesses === 0; }).length;
  const notStarted = people.filter(function (person) { return person.completedKbdCount === 0; }).length;
  const lowCompletion = people.filter(function (person) { return person.completedKbdCount > 0 && person.completionRate < 50; }).length;
  const lowAccuracy = people.filter(function (person) { return person.questions > 0 && person.accuracy < 70; }).length;
  return [
    { id: "inactive", severity: "high", label: "Sem login no período", count: inactive },
    { id: "not-started", severity: "high", label: "Nenhum KBD concluído", count: notStarted },
    { id: "low-completion", severity: "medium", label: "Andamento abaixo de 50%", count: lowCompletion },
    { id: "low-accuracy", severity: "medium", label: "Acerto abaixo de 70%", count: lowAccuracy }
  ].filter(function (item) { return item.count > 0; });
}

function managementPercent_(numerator, denominator) {
  return denominator ? Math.round(number_(numerator) * 100 / number_(denominator)) : 0;
}

function managementDate_(value) {
  const date = value instanceof Date ? value : new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

function normalizeManagementText_(value) {
  return text_(value).trim().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
}
