const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyxQ-b_cU7ciBGCuRav6BVf4gY0Xy0Qp5oKa1T0SVIv0gkvb6P9N57BkjqnMSPfshnV/exec";

const ALLOWED_SECTORS = ["PROJ-MAIS-RS01","PROJ-MAIS-RS04","PROJ-MAIS-SC01","PROJ-MAIS-SC05","PROJ-MAIS-SC06","PROJ-MAIS-SC11","PROJ-MAIS-SC13","PROJ-MAIS-SC15","PROJ-MAIS-SC18","PROJ-MAIS-SC19","RS03","RS07","RS08","RS09","RS102","RS109","RS111","RS113","RS115","RS12","RS122","RS123","RS129","RS13","RS131","RS133","RS134","RS135","RS136","RS137","RS138","RS139","RS14","RS140","RS141","RS142","RS143","RS144","RS145","RS146","RS147","RS148","RS149","RS15","RS150","RS151","RS152","RS153","RS154","RS155","RS156","RS157","RS158","RS16","RS160","RS161","RS163","RS165","RS166","RS167","RS168","RS170","RS171","RS172","RS173","RS174","RS175","RS176","RS177","RS178","RS179","RS180","RS181","RS182","RS183","RS185","RS186","RS187","RS188","RS190","RS192","RS193","RS194","RS195","RS196","RS198","RS199","RS200","RS201","RS202","RS203","RS204","RS22","RS26","RS27","RS28","RS30","RS32","RS33","RS35","RS37","RS38","RS40","RS41","RS44","RS47","RS48","RS53","RS57","RS59","RS60","RS61","RS62","RS63","RS64","RS66","RS69","RS74","RS75","RS80","RS83","RS85","RS87","RS91","RS93","RS95","RS97","SC07","SC08","SC102","SC103","SC109","SC113","SC121","SC124","SC126","SC127","SC129","SC13","SC130","SC131","SC132","SC133","SC134","SC136","SC137","SC138","SC139","SC140","SC141","SC143","SC144","SC146","SC147","SC148","SC154","SC155","SC156","SC159","SC160","SC161","SC162","SC163","SC164","SC165","SC166","SC167","SC170","SC176","SC181","SC182","SC186","SC187","SC189","SC19","SC190","SC192","SC193","SC194","SC195","SC198","SC20","SC200","SC204","SC206","SC207","SC208","SC21","SC210","SC211","SC212","SC216","SC219","SC222","SC223","SC225","SC227","SC229","SC230","SC232","SC236","SC239","SC24","SC241","SC243","SC244","SC246","SC247","SC248","SC250","SC251","SC252","SC253","SC254","SC255","SC257","SC27","SC29","SC31","SC34","SC37","SC40","SC51","SC61","SC62","SC63","SC64","SC67","SC80","SC85","SC92","SC95","SC98","SCCOORD05","SCCOORD04","SCCOORD01","RSCOORD07","RSCOORD06","SCCOORD07","SCCOORD06","RSCOORD04","RSCOORD03","RSCOORD02","RSCOORD01","PROJ-MAIS-COORDSC01","PROJ-MAIS-COORDRS01","EXECUTIVO 2","RSESPGILLETTE1","RS243","RS242","RS241","RS240","RS245","RS246","RS247","RS205","SC258","SC259","RS239","SC261","SC262","SC263","SC264","SC265","SC267","SC269","SC270","SC271","SC272","SC273","SC274","SC275","RS248","RS249","RS250","RS251","RS252","RS253","RS244","RS254","RS255","RS256","RS257","RS258","RS259","RS260","RS261","RS262","RS263","RS264","RS265","RS266","RS267","RS268","RS269","RS270","RS271","RS272","RS273","RS274","RS275","RS276","RS277","RS278","SC15","SC256","RS279","SC284","RS280","RS281","SC280","SC282","SC281","SC283","PR02","PR03","PR04","PR08","PR09","PR10","PR100","PR101","PR102","PR105","PR106","PR107","PR109","PR11","PR112","PR114","PR115","PR116","PR117","PR118","PR12","PR120","PR122","PR123","PR124","PR125","PR126","PR127","PR128","PR130","PR132","PR133","PR134","PR135","PR137","PR138","PR140","PR142","PR145","PR147","PR148","PR149","PR15","PR150","PR151","PR152","PR153","PR155","PR156","PR157","PR159","PR16","PR160","PR161","PR164","PR165","PR167","PR168","PR169","PR17","PR170","PR171","PR172","PR173","PR175","PR176","PR177","PR178","PR179","PR18","PR180","PR181","PR182","PR185","PR187","PR188","PR189","PR190","PR191","PR192","PR193","PR195","PR196","PR197","PR198","PR199","PR20","PR200","PR201","PR206","PR207","PR208","PR21","PR210","PR213","PR214","PR215","PR216","PR217","PR218","PR219","PR221","PR222","PR223","PR224","PR226","PR227","PR228","PR229","PR23","PR230","PR231","PR232","PR24","PR25","PR26","PR27","PR28","PR33","PR34","PR35","PR38","PR39","PR41","PR43","PR46","PR48","PR49","PR51","PR52","PR53","PR55","PR57","PR58","PR59","PR63","PR64","PR65","PR67","PR69","PR70","PR72","PR74","PR75","PR77","PR79","PR81","PR84","PR86","PR87","PR89","PR90","PR91","PR93","PR95","PR98","PR99","PROJ-MAIS-PR03","PROJ-MAIS-PR04","PROJ-MAIS-PR05","PROJ-MAIS-PR07","PROJ-MAIS-PR10","PROJ-MAIS-PR12","PROJ-MAIS-PR26","PROJ-MAIS-PR31","PROJ-MAIS-PR35","PROJ-MAIS-SC07","PROJ-MAIS-SC17","SC02","SC03","SC104","SC105","SC107","SC128","SC135","SC142","SC145","SC149","SC150","SC151","SC152","SC153","SC157","SC16","SC168","SC169","SC172","SC173","SC174","SC175","SC177","SC178","SC179","SC180","SC188","SC191","SC196","SC199","SC201","SC202","SC203","SC205","SC209","SC213","SC214","SC215","SC217","SC218","SC220","SC221","SC224","SC226","SC231","SC233","SC234","SC235","SC237","SC238","SC240","SC242","SC249","SC30","SC33","SC36","SC44","SC55","SC58","SC70","SC71","SC76","SC83","SCCOORD03","SCCOORD02","PRCOORD06","PRCOORD05","PRCOORD04","PRCOORD03","PRCOORD02","PRCOORD01","PRCOORD07","PROJ-MAIS-COORDPR01","EXECUTIVO 1","PRESPGILLETTE1","PR236","PR235","PR234","PR240","PR241","PR233","PR237","PR239","PR238","SC260","PR243","PR244","PR245","PR246","PR247","PR248","PR249","PR250","PR251","PR252","PR253","PR254","PR255","PR256","PR257","PR258","PR259","PR260","PR261","PR262","PR263","PR264","SC266","SC268","SC276","PR265","PR266","PR267","SC277","PR01","PR05","PR19","PR242","PRCOORD08","SC278","PR268","PR269","SC285","SC286","PR270","PROJ-MAIS-SPI04","PROJ-MAIS-SPI05","PROJ-MAIS-SPI23","PROJ-MAIS-SPI24","PROJ-MAIS-SPI27","PROJ-MAIS-SPI32","PROJ-MAIS-SPI34","PROJ-MAIS-SPI41","PROJ-MAIS-SPI48","PROJ-MAIS-SPI49","PROJ-MAIS-SPI56","PROJ-MAIS-SPI57","PROJ-MAIS-SPI60","PROJ-MAIS-SPI64","PROJ-MAIS-SPI65","SPI05","SPI10","SPI107","SPI109","SPI114","SPI115","SPI117","SPI125","SPI127","SPI130","SPI135","SPI14","SPI144","SPI145","SPI147","SPI149","SPI15","SPI163","SPI164","SPI166","SPI175","SPI181","SPI183","SPI184","SPI186","SPI188","SPI189","SPI193","SPI194","SPI196","SPI201","SPI207","SPI210","SPI211","SPI221","SPI224","SPI227","SPI230","SPI233","SPI237","SPI239","SPI240","SPI245","SPI252","SPI256","SPI257","SPI259","SPI267","SPI270","SPI272","SPI273","SPI275","SPI282","SPI285","SPI286","SPI287","SPI290","SPI291","SPI294","SPI297","SPI305","SPI307","SPI311","SPI314","SPI315","SPI316","SPI317","SPI321","SPI322","SPI324","SPI327","SPI331","SPI334","SPI336","SPI337","SPI339","SPI341","SPI342","SPI343","SPI344","SPI356","SPI357","SPI358","SPI364","SPI365","SPI366","SPI368","SPI369","SPI370","SPI371","SPI373","SPI378","SPI381","SPI382","SPI383","SPI39","SPI391","SPI393","SPI396","SPI40","SPI401","SPI409","SPI410","SPI412","SPI415","SPI422","SPI437","SPI439","SPI440","SPI442","SPI443","SPI448","SPI455","SPI457","SPI458","SPI463","SPI466","SPI47","SPI474","SPI478","SPI492","SPI494","SPI496","SPI497","SPI499","SPI500","SPI503","SPI505","SPI510","SPI511","SPI513","SPI514","SPI515","SPI516","SPI518","SPI519","SPI521","SPI522","SPI523","SPI525","SPI526","SPI529","SPI532","SPI540","SPI541","SPI542","SPI544","SPI545","SPI550","SPI551","SPI552","SPI553","SPI554","SPI56","SPI560","SPI562","SPI563","SPI564","SPI565","SPI566","SPI569","SPI570","SPI571","SPI572","SPI574","SPI577","SPI578","SPI58","SPI64","SPI66","SPI68","SPI73","SPI79","SPI83","SPI86","SPI91","SPI95","SPI97","SPICOORD19","SPICOORD15","SPICOORD07","SPICOORD06","SPICOORD04","SPICOORD03","SPICOORD12","SPICOORD11","SPICOORD10","SPICOORD02","EXECUTIVO 3","SPI582","SPI587","SPI588","SPI586","SPI585","SPI584","SPI583","SPI592","SPI610","SPI612","SPI614","SPI615","SPI616","SPI617","SPI589","SPI618","SPI619","SPI620","SPI621","SPI622","SPI623","SPI624","SPI625","SPI627","SPI590","SPI591","SPICOORD23","PROJ-MAIS-SPI03","PROJ-MAIS-SPI06","PROJ-MAIS-SPI08","PROJ-MAIS-SPI09","PROJ-MAIS-SPI10","PROJ-MAIS-SPI13","PROJ-MAIS-SPI26","PROJ-MAIS-SPI37","PROJ-MAIS-SPI43","PROJ-MAIS-SPI44","PROJ-MAIS-SPI47","PROJ-MAIS-SPI52","PROJ-MAIS-SPI58","PROJ-MAIS-SPI59","PROJ-MAIS-SPI63","PROJ-MAIS-SPI66","PROJ-MAIS-SPI67","PROJ-MAIS-SPI70","SPI02","SPI04","SPI06","SPI09","SPI104","SPI11","SPI112","spi116","SPI118","SPI119","SPI12","SPI120","SPI121","SPI13","SPI131","SPI136","SPI138","SPI141","SPI142","SPI143","SPI146","SPI148","SPI156","SPI161","SPI162","SPI168","SPI170","SPI172","SPI176","SPI177","SPI179","SPI182","SPI187","SPI190","SPI195","SPI198","SPI199","SPI20","SPI200","SPI203","SPI214","SPI215","SPI219","SPI222","SPI225","SPI234","SPI238","SPI24","SPI243","SPI25","SPI250","SPI255","SPI258","SPI260","SPI263","SPI266","SPI268","SPI28","SPI283","SPI284","SPI288","SPI292","SPI296","SPI298","SPI30","SPI304","SPI306","SPI310","SPI313","SPI318","SPI319","SPI323","SPI325","SPI326","SPI329","SPI330","SPI332","SPI345","SPI347","SPI348","SPI352","SPI354","SPI355","SPI360","SPI362","SPI363","SPI367","SPI37","SPI375","SPI379","SPI384","SPI385","SPI386","SPI387","SPI389","SPI390","SPI394","SPI395","SPI400","SPI402","SPI403","SPI404","SPI406","SPI407","SPI41","SPI411","SPI413","SPI414","SPI416","SPI417","SPI418","SPI419","SPI420","SPI421","SPI424","SPI425","SPI426","SPI429","SPI432","SPI434","SPI435","SPI438","SPI441","SPI444","SPI445","SPI446","SPI449","SPI450","SPI451","SPI452","SPI454","SPI456","SPI459","SPI460","SPI461","SPI462","SPI464","SPI465","SPI467","SPI468","SPI471","SPI473","SPI475","SPI476","SPI477","SPI479","SPI485","SPI486","SPI487","SPI488","SPI489","SPI490","SPI491","SPI493","SPI495","SPI501","SPI506","SPI507","SPI508","SPI509","SPI517","SPI52","SPI520","SPI524","SPI527","SPI528","SPI530","SPI533","SPI534","SPI535","SPI536","SPI538","SPI539","SPI54","SPI543","SPI546","SPI547","SPI548","SPI549","SPI555","SPI557","SPI558","SPI559","SPI561","spi567","SPI568","SPI57","SPI573","SPI575","SPI579","SPI581","SPI59","SPI62","SPI67","SPI69","SPI72","SPI76","SPI77","SPI80","SPI82","SPI88","SPI98","SPI99","SPICOORD21","SPICOORD20","SPICOORD18","SPICOORD17","SPICOORD16","SPICOORD14","SPICOORD05","SPICOORD01","PROJ-MAIS-COORDSPI01","EXECUTIVO 4","SPESPGILLETTE1","SPI593","SPI594","SPI595","SPI596","SPI597","SPI598","SPI600","SPI601","SPI602","SPI603","SPI604","SPI605","SPI606","SPI607","SPI608","SPI609","SPI611","SPI613","SPI626","SPI628","SPI08","SPICOORD22","SPI629","SPIESPGILLETTE2","SPIESPGILLETTE3","SCESPGILLETTE1"];

function normalizeSector(value) {
  return String(value || "").trim().toUpperCase().replace(/\s+/g, "");
}

const ALLOWED_SECTORS_NORMALIZED = new Set(ALLOWED_SECTORS.map((sector) => normalizeSector(sector)));

const CICLO_INFO = {
  titulo: "Julho–Dezembro 2026",
  foco: "Entender o que é novo, o que mudou e como executar corretamente na loja.",
};

const CONTENT = {
  marcas: [
    { id: "tampax", nome: "TAMPAX", logo: "logos/tampax.png", kbds: [
      { id: "ponto-natural", nome: "Bandeja no Ponto Natural", status: "novo", canais: "DPP",
        resumo: "No canal DPP, a loja deve possuir bandeja de Tampax executada no ponto natural de absorventes internos.",
        comoConta: ["Bandeja de Tampax posicionada dentro da categoria de absorventes internos", "Produto abastecido e visível"],
        erroComum: ["Bandeja no ponto extra (fora da categoria)", "Bandeja fora da categoria de absorventes internos", "Bandeja vazia", "Execução fora do ponto natural"],
        produtosValidos: ["Tampax Compak Super", "Tampax Compak Intenso", "Tampax Compak Muito Intenso"],
        focoPromotor: "Garantir bandeja abastecida e bem posicionada no ponto natural.",
        videoUrl: "", imagens: ["kbds/pilulas/pilula-tampax-ponto-natural.jpg"] },
    ] },
    { id: "downy", nome: "DOWNY", logo: "logos/downy.png", kbds: [
      { id: "sos-mensal", nome: "Objetivo Mensal de SOS", status: "transformacional", canais: "Todos, exceto DPP e Perfumaria",
        resumo: "Bater o objetivo mensal de SOS de Downy nos canais elegíveis.",
        comoConta: ["Considerar o objetivo mensal de SOS definido para a operação", "Aplicar somente nos canais elegíveis"],
        erroComum: ["Aplicar a leitura em DPP ou Perfumaria", "Usar uma meta diferente do objetivo mensal vigente"],
        focoPromotor: "Acompanhar e executar o objetivo mensal de SOS de Downy.",
        videoUrl: "", imagens: [] },
    ] },
    { id: "pantene", nome: "PANTENE", logo: "logos/pantene.png", kbds: [
      { id: "bond-repair", nome: "Bond Repair — 20% do Espaço", status: "transformacional", canais: "Todos os canais",
        resumo: "Garantir pelo menos 20% do espaço de Pantene na gôndola para Bond Repair, excluindo packs.",
        comoConta: ["Medição em centímetros", "Considerar apenas Pantene Bond Repair", "Excluir packs do cálculo"],
        erroComum: ["Contar packs para completar o percentual"],
        focoPromotor: "Garantir no mínimo 20% do espaço de Pantene para Bond Repair.",
        videoUrl: "", imagens: ["kbds/bond repair pantene.jpg"] },
      { id: "finalizadores", nome: "Finalizadores com Espaço Garantido", status: "novo", canais: "DPP, C&C, NMR/GMR, CLUB, LASA, HFS e Perfumaria",
        resumo: "Óleo, Sérum e Leave-in agora precisam ter quantidade mínima de frentes na gôndola: 8 em DPP, 6 nos demais canais.",
        comoConta: ["Cada produto voltado para frente = 1 frente", "Contar apenas frentes visíveis na gôndola", "Não duplicar a mesma frente", "Meta DPP: pelo menos 8 frentes", "Meta demais canais elegíveis: pelo menos 6 frentes"],
        erroComum: ["Produto fora da gôndola", "Produto em clipstrip, checkout, ilha ou display", "Contar a mesma frente duas vezes", "Somar produtos que não são finalizadores"],
        focoPromotor: "Garantir finalizadores abastecidos e com a quantidade mínima de frentes na gôndola.",
        videoUrl: "", imagens: ["kbds/pilulas/pilula-pantene-finalizadores.jpg"] },
    ] },
    { id: "pampers", nome: "PAMPERS", logo: "logos/pampers.png", kbds: [
      { id: "vale-night", nome: "Vale Night — Materiais na Gôndola", status: "transformacional", canais: "C&C, NMR/GMR, CLUB, LASA, HFS e Perfumaria",
        resumo: "A gôndola de Pampers possui materiais de Vale Night com ícone de mamadeira.",
        comoConta: ["Verificar presença do material de Vale Night com ícone de mamadeira na gôndola"],
        erroComum: ["Gôndola sem o material de comunicação Vale Night", "Aplicar a leitura no canal DPP"],
        focoPromotor: "Garantir materiais de Vale Night com ícone de mamadeira na gôndola.",
        videoUrl: "", imagens: ["kbds/vale night SOS pampers.jpg"] },
    ] },
    { id: "secret", nome: "SECRET", logo: "logos/secret.png", kbds: [
      { id: "frentes-bandejas", nome: "Frentes ou Bandejas por Canal", status: "alterado", canais: "Todos os canais elegíveis",
        resumo: "Secret passa a considerar frentes na gôndola ou bandejas, com metas diferentes por canal.",
        comoConta: ["DPP e HFS: 10 frentes visíveis OU 2 bandejas", "C&C, NMR/GMR, CLUB, LASA e Perfumaria: 15 frentes visíveis OU 3 bandejas"],
        erroComum: ["Contar produto fora da gôndola", "Bandeja vazia ou mal posicionada", "Misturar bandejas e frentes sem respeitar a regra do canal"],
        focoPromotor: "Entender a regra do canal e garantir a quantidade correta de frentes ou bandejas.",
        videoUrl: "", imagens: ["kbds/pilulas/pilula-secret-frentes-bandejas.jpg", "kbds/2 bandejas secret.jpg", "kbds/15 frentes secret.jpg"] },
    ] },
    { id: "oral-b", nome: "ORAL-B", logo: "logos/oral-b.png", kbds: [
      { id: "branqueamento", nome: "60% de Branqueamento", status: "transformacional", canais: "Todos os canais",
        resumo: "A gôndola de pastas Oral-B possui pelo menos 60% com pastas de branqueamento.",
        comoConta: ["Medir a proporção de pastas de branqueamento na gôndola de pastas"],
        erroComum: ["Contar pastas fora da linha branqueamento"],
        focoPromotor: "Garantir pelo menos 60% da gôndola de pastas com branqueamento.",
        videoUrl: "", imagens: ["kbds/branqueamento oral-b.jpg"] },
    ] },
    { id: "gillette", nome: "GILLETTE", logo: "logos/gillette.png", kbds: [
      { id: "mach3-presto3", nome: "Pontos de Contato — Mach3 e Presto3", status: "alterado", canais: "C&C, NMR/GMR, LASA, HFS, Perfumaria e DPP",
        resumo: "Agora C&C, NMR/GMR, LASA, HFS e PERFUMARIA exigem 3 pontos de contato; em DPP continuam 2 pontos.",
        comoConta: ["Itens Mach3 Sensitive / Presto3 Sensitive com 4 unidades ou mais", "3 pontos de contato em C&C, NMR/GMR, LASA, HFS e PERFUMARIA", "2 pontos de contato em DPP", "Sempre fora do ponto natural"],
        erroComum: ["Produto no checkout", "Produto no ponto natural", "Contar o mesmo ponto duas vezes", "Usar item fora do foco (menos de 4 unidades)"],
        focoPromotor: "Garantir a quantidade correta de pontos de contato com Mach3 e Presto3 Sensitive.",
        videoUrl: "", imagens: ["kbds/pilulas/pilula-gillette-mach3-presto3.jpg", "kbds/KBD GILLETTE  2 PONTOS DE CONTATO .jpg"] },
    ] },
    { id: "venus", nome: "VENUS", logo: "logos/venus.png", kbds: [
      { id: "tres-pontos", nome: "3 Pontos de Contato", status: "transformacional", canais: "Todos os canais elegíveis",
        resumo: "Venus passou a exigir pelo menos 3 pontos de contato em todos os canais elegíveis (antes eram 2, só em DPP e Perfumaria).",
        comoConta: ["Pelo menos 3 pontos de contato, fora do ponto natural e fora do checkout", "Cada execução separada = 1 ponto", "Priorizar Venus Pele Sensível e Venus Suave"],
        erroComum: ["Produto no checkout", "Produto no ponto natural", "Contar o mesmo ponto duas vezes", "Usar item fora da linha Venus"],
        focoPromotor: "Garantir 3 pontos de contato de Venus, fora do ponto natural e fora do checkout.",
        videoUrl: "", imagens: ["kbds/pilulas/pilula-venus-3pontos.jpg", "kbds/KBD VENUS  2 PONTOS DE CONTATO .jpg"] },
    ] },
  ],
};

const NOVIDADES = {
  novos: [
    { marca: "Tampax", texto: "Bandeja no ponto natural em DPP" },
    { marca: "Pantene", texto: "8 frentes de finalizadores em DPP ou 6 nos demais canais elegíveis" },
  ],
  alterados: [
    { marca: "Secret", texto: "Agora pode bater o KBD por frentes ou bandejas" },
    { marca: "Gillette", texto: "Mach3 / Presto3: 3 pontos na maioria dos canais e 2 em DPP" },
  ],
  transformacionais: [
    { marca: "Downy", texto: "Objetivo mensal de SOS" },
    { marca: "Pantene", texto: "20% de Bond Repair, excluindo packs" },
    { marca: "Venus", texto: "3 pontos de contato nos canais elegíveis" },
    { marca: "Oral-B", texto: "60% do espaço de branqueamento" },
    { marca: "Pampers", texto: "Materiais Vale Night na gôndola" },
  ],
};

const CHECKLIST_ITEMS = [
  { id: "chk01", marca: "tampax", marcaNome: "Tampax • Novo", texto: "Existe bandeja de Tampax abastecida no ponto natural em DPP?" },
  { id: "chk02", marca: "pantene", marcaNome: "Pantene • Novo", texto: "Há 8 frentes de finalizadores em DPP ou 6 nos demais canais elegíveis?" },
  { id: "chk03", marca: "secret", marcaNome: "Secret • Alterado", texto: "A execução atingiu a meta de frentes ou bandejas correspondente ao canal?" },
  { id: "chk04", marca: "gillette", marcaNome: "Gillette • Alterado", texto: "Mach3 e Presto3 possuem 3 pontos de contato ou 2 em DPP?" },
  { id: "chk05", marca: "downy", marcaNome: "Downy • Transformacional", texto: "O objetivo mensal de SOS foi atingido no canal elegível?" },
  { id: "chk06", marca: "pantene", marcaNome: "Pantene • Transformacional", texto: "Bond Repair possui pelo menos 20% do espaço, excluindo packs?" },
  { id: "chk07", marca: "venus", marcaNome: "Venus • Transformacional", texto: "Existem 3 pontos de contato válidos nos canais elegíveis?" },
  { id: "chk08", marca: "oral-b", marcaNome: "Oral-B • Transformacional", texto: "Pastas de branqueamento ocupam pelo menos 60% do espaço?" },
  { id: "chk09", marca: "pampers", marcaNome: "Pampers • Transformacional", texto: "A gôndola possui materiais Vale Night com ícone de mamadeira?" },
];

const ICONS = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5"></path><path d="M5 9.8V21h14V9.8"></path><path d="M9 21v-6h6v6"></path></svg>',
  grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect></svg>',
  quiz: '<svg viewBox="0 0 24 24"><path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 2-3 4"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="10"></circle></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"></path></svg>',
  menu: '<svg viewBox="0 0 24 24"><path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h16"></path></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M10 17l5-5-5-5"></path><path d="M15 12H3"></path><path d="M12 4h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path></svg>',
  arrowRight: '<svg viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>',
  video: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="15" height="14" rx="2"></rect><path d="m17 10 5-3v10l-5-3z"></path></svg>',
  image: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="m21 15-5-5L5 21"></path></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="m20 6-11 11-5-5"></path></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
  trophy: '<svg viewBox="0 0 24 24"><path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"></path><path d="M5 6H3a2 2 0 0 0 0 4h2"></path><path d="M19 6h2a2 2 0 1 1 0 4h-2"></path></svg>',
  refresh: '<svg viewBox="0 0 24 24"><path d="M21 2v6h-6"></path><path d="M3 22v-6h6"></path><path d="M20.49 9A9 9 0 0 0 5 5.5L3 8"></path><path d="M3.51 15A9 9 0 0 0 19 18.5L21 16"></path></svg>',
  target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1"></circle></svg>',
  sparkles: '<svg viewBox="0 0 24 24"><path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M3 12h4"></path><path d="M17 12h4"></path><path d="m5.6 5.6 2.8 2.8"></path><path d="m15.6 15.6 2.8 2.8"></path><path d="m18.4 5.6-2.8 2.8"></path><path d="m8.4 15.6-2.8 2.8"></path></svg>',
  list: '<svg viewBox="0 0 24 24"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6h.01"></path><path d="M4 12h.01"></path><path d="M4 18h.01"></path></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>',
  swap: '<svg viewBox="0 0 24 24"><path d="M7 4v10"></path><path d="m3 10 4 4 4-4"></path><path d="M17 20V10"></path><path d="m21 14-4-4-4 4"></path></svg>',
  bolt: '<svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6z"></path></svg>',
};

const STATUS_META = {
  novo: { label: "Novo", plural: "Novos", className: "status-novo", description: "KBDs que entram neste ciclo" },
  alterado: { label: "Alterado", plural: "Alterados", className: "status-mudou", description: "KBDs com regra atualizada" },
  transformacional: { label: "Transformacional", plural: "Transformacionais", className: "status-transformacional", description: "KPIs identificados pelo selo transformacional" },
};

function getStatusMeta(status) { return STATUS_META[status] || STATUS_META.transformacional; }

let quizState = { marcaAtual: null, kbdAtual: null, perguntaIndex: 0, acertos: 0, total: 0, perguntas: [], selectedOption: null, answeredCurrent: false, respostasDetalhadas: [] };

function getSetor() { return (localStorage.getItem("SETOR") || "").trim(); }
function ensureSetor() { if (!getSetor()) window.location.href = "index.html"; }
function qs() { return new URLSearchParams(window.location.search); }
function getCompletedData() { return JSON.parse(localStorage.getItem("QUIZZES_COMPLETED") || "{}"); }
function getQuizResultsData() { return JSON.parse(localStorage.getItem("QUIZ_RESULTS") || "{}"); }
function saveQuizResultsData(data) { localStorage.setItem("QUIZ_RESULTS", JSON.stringify(data)); }
function getSentBrandsData() { return JSON.parse(localStorage.getItem("BRANDS_SENT_TO_SHEETS") || "{}"); }
function saveSentBrandsData(data) { localStorage.setItem("BRANDS_SENT_TO_SHEETS", JSON.stringify(data)); }
function getMarcaById(marcaId) { return CONTENT.marcas.find((m) => m.id === marcaId) || null; }
function getKbdById(marcaId, kbdId) { const marca = getMarcaById(marcaId); return marca ? marca.kbds.find((kbd) => kbd.id === kbdId) || null : null; }
function getAllKbds() { return CONTENT.marcas.flatMap((marca) => marca.kbds.map((kbd) => ({ marca, kbd }))); }
function getAllKbdsTotal() { return getAllKbds().length; }
function hasQuiz(marcaId, kbdId) { return getQuizQuestions(marcaId, kbdId).length > 0; }
function getQuizKbds() { return getAllKbds().filter(({ marca, kbd }) => hasQuiz(marca.id, kbd.id)); }
function getAllKbdsDone() { return getQuizKbds().filter(({ marca, kbd }) => isQuizCompleted(marca.id, kbd.id)).length; }
function getOverallProgress() { const total = getQuizKbds().length; const done = getAllKbdsDone(); return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }; }
function escapeHtml(value) { return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;"); }
function renderIcon(name) { return ICONS[name] || ""; }

const AVAILABLE_KBD_ASSETS = ["kbds/15 frentes secret.jpg","kbds/2 bandejas secret.jpg","kbds/2 pontos de contato oral-b.jpg","kbds/Always.jpg","kbds/bloco azul downy.jpg","kbds/bloco colorido downy.jpg","kbds/bond repair pantene.jpg","kbds/branqueamento oral-b.jpg","kbds/ganchos c8 gillette.jpg","kbds/KBD GILLETTE  2 PONTOS DE CONTATO .jpg","kbds/KBD GILLETTE  CARGA MACH3 C8 (2 GANCHOS).jpg","kbds/KBD VENUS  2 PONTOS DE CONTATO .jpg","kbds/KBD VENUS  CHECKOUT (PELE SENSÍVEL).jpg","kbds/KBD VENUS  SISTEMAS (20_ GANCHOS).jpg","kbds/layout bipe oral-b.jpg","kbds/oleo pantene.jpg","kbds/pants + premium sul pampers.jpg","kbds/pants sp pampers.jpg","kbds/ponto extra - downy.jpg","kbds/ponto extra pampers.jpg","kbds/rio cachoeira dourada pantene.jpg","kbds/top versões pantene .jpg","kbds/vale night ponto extra pammpers .jpg","kbds/vale night SOS pampers.jpg","kbds/pilulas/pilula-pantene-finalizadores.jpg","kbds/pilulas/pilula-tampax-ponto-natural.jpg","kbds/pilulas/pilula-gillette-mach3-presto3.jpg","kbds/pilulas/pilula-secret-frentes-bandejas.jpg","kbds/pilulas/pilula-venus-3pontos.jpg"];

function normalizeAssetName(value) { return String(value || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/#U00f5/gi, "o").replace(/#U00cd/gi, "I").replace(/[^a-zA-Z0-9]+/g, "").toLowerCase(); }
function resolveKbdAsset(path) { const raw = String(path || "").trim(); if (!raw) return raw; if (AVAILABLE_KBD_ASSETS.includes(raw)) return raw; const wanted = normalizeAssetName(raw); const match = AVAILABLE_KBD_ASSETS.find((item) => normalizeAssetName(item) === wanted); return match || raw; }
function assetPath(path) { return String(path || "").split("/").map((part) => encodeURIComponent(part)).join("/"); }
function getBrandThemeClass(marcaId) { return `theme-${marcaId || "default"}`; }
function isQuizCompleted(marcaId, kbdId) { const data = getCompletedData(); return !!(data[marcaId] && data[marcaId][kbdId]); }
function markQuizCompleted(marcaId, kbdId) { const data = getCompletedData(); if (!data[marcaId]) data[marcaId] = {}; data[marcaId][kbdId] = true; localStorage.setItem("QUIZZES_COMPLETED", JSON.stringify(data)); }
function getBrandProgress(marcaId) { const marca = getMarcaById(marcaId); if (!marca) return { done: 0, total: 0, pct: 0 }; const available = marca.kbds.filter((kbd) => hasQuiz(marca.id, kbd.id)); const total = available.length; const done = available.filter((kbd) => isQuizCompleted(marca.id, kbd.id)).length; return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }; }
function getFirstPendingQuiz() { for (const marca of CONTENT.marcas) { const pending = marca.kbds.find((kbd) => hasQuiz(marca.id, kbd.id) && !isQuizCompleted(marca.id, kbd.id)); if (pending) return { marcaId: marca.id, kbdId: pending.id }; } return null; }
function getNextPendingInBrand(marcaId) { const marca = getMarcaById(marcaId); if (!marca) return null; const pending = marca.kbds.find((kbd) => hasQuiz(marca.id, kbd.id) && !isQuizCompleted(marca.id, kbd.id)); return pending ? { marcaId, kbdId: pending.id } : null; }
function findNextBrandWithPending(afterMarcaId) { const idx = CONTENT.marcas.findIndex((m) => m.id === afterMarcaId); for (let i = idx + 1; i < CONTENT.marcas.length; i++) { if (getNextPendingInBrand(CONTENT.marcas[i].id)) return CONTENT.marcas[i].id; } for (let i = 0; i < CONTENT.marcas.length; i++) { if (getNextPendingInBrand(CONTENT.marcas[i].id)) return CONTENT.marcas[i].id; } return null; }
function medalEmoji(pct) { if (pct === 100) return "🥇"; if (pct >= 80) return "🥈"; return "🥉"; }
function getQuizQuestions(marcaId, kbdId) { const byBrand = (window.QUIZZES && window.QUIZZES[marcaId]) || {}; return Array.isArray(byBrand[kbdId]) ? byBrand[kbdId] : []; }
function saveKbdResult(marcaId, kbdId, payload) { const data = getQuizResultsData(); if (!data[marcaId]) data[marcaId] = {}; data[marcaId][kbdId] = payload; saveQuizResultsData(data); }
function getBrandResults(marcaId) { const data = getQuizResultsData(); return data[marcaId] || {}; }
function isBrandSentToSheets(marcaId) { const sent = getSentBrandsData(); return !!sent[marcaId]; }
function markBrandSentToSheets(marcaId) { const sent = getSentBrandsData(); sent[marcaId] = new Date().toISOString(); saveSentBrandsData(sent); }

function fecharImagemExpandida() {
  const existing = document.getElementById("imageLightbox");
  if (existing) existing.remove();
  document.body.style.overflow = "";
}

function abrirImagemExpandida(src, alt) {
  fecharImagemExpandida();

  const overlay = document.createElement("div");
  overlay.id = "imageLightbox";
  overlay.className = "image-lightbox";
  overlay.innerHTML = `
    <button class="image-lightbox-close" type="button" aria-label="Fechar imagem">
      ${renderIcon("x")}
    </button>
    <div class="image-lightbox-stage">
      <img src="${src}" alt="${escapeHtml(alt)}" class="image-lightbox-img">
    </div>
  `;

  const closeBtn = overlay.querySelector(".image-lightbox-close");
  if (closeBtn) closeBtn.onclick = fecharImagemExpandida;

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) fecharImagemExpandida();
  });

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") fecharImagemExpandida();
});

function applyTopbar(config) {
  const topbar = document.querySelector(".topbar");
  const logo = document.getElementById("topbarLogo");
  const eyebrow = document.getElementById("topbarEyebrow");
  const title = document.getElementById("topbarTitle");
  const subtitle = document.getElementById("topbarSubtitle");
  const meta = document.querySelector(".topbar-meta");
  const brand = document.querySelector(".topbar-brand");
  const badge = document.getElementById("topbarSetor");
  const backBtn = document.getElementById("topbarBack");
  const menuBtn = document.getElementById("topbarMenu");
  const logoutBtn = document.getElementById("topbarLogout");
  const minimal = !!config.minimal;

  if (logo && config.logo) logo.src = config.logo;
  if (eyebrow) eyebrow.textContent = config.eyebrow || "Missão KBD";
  if (title) title.textContent = config.title || "Missão KBD";
  if (subtitle) subtitle.textContent = config.subtitle || "Treinamento por marcas";
  if (badge) badge.textContent = getSetor() || "—";
  if (backBtn) backBtn.innerHTML = renderIcon("back");
  if (menuBtn) menuBtn.innerHTML = renderIcon("menu");
  if (logoutBtn) logoutBtn.innerHTML = renderIcon("logout");
  if (topbar) topbar.classList.toggle("topbar-minimal", minimal);
  if (brand) brand.classList.toggle("hidden", minimal);
  if (meta) meta.classList.toggle("hidden", minimal);
  if (logo) logo.classList.toggle("hidden", minimal);
  if (menuBtn) menuBtn.classList.toggle("hidden", minimal || !!config.hideMenu);
  if (logoutBtn) logoutBtn.classList.toggle("hidden", minimal || !!config.hideLogout);

  if (backBtn) {
    if (config.showBack) {
      backBtn.classList.remove("hidden");
      backBtn.onclick = config.onBack || (() => window.history.back());
    } else {
      backBtn.classList.add("hidden");
    }
  }

  if (menuBtn && !menuBtn.classList.contains("hidden")) menuBtn.onclick = () => trocarSetor();
  if (logoutBtn && !logoutBtn.classList.contains("hidden")) logoutBtn.onclick = () => confirmarSaida();
}

function setBottomNav(page) {
  const container = document.getElementById("bottomNav");
  if (!container) return;

  const tabs = [
    { id: "home", label: "Home", icon: "home", href: "home.html" },
    { id: "novidades", label: "Novidades", icon: "sparkles", href: "novidades.html" },
    { id: "checklist", label: "Checklist", icon: "list", href: "checklist.html" },
    { id: "quiz", label: "Quiz", icon: "quiz", href: getPrimaryQuizHref() },
  ];

  container.innerHTML = tabs
    .map(
      (tab) => `
        <a class="bottom-nav-link ${tab.id === page ? "active" : ""}" href="${tab.href}">
          ${renderIcon(tab.icon)}
          <span>${tab.label}</span>
        </a>
      `
    )
    .join("");
}

function criarModal({ icon = "menu", title = "", text = "", buttons = [] }) {
  fecharModal();
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <div class="modal-icon-wrap">${renderIcon(icon)}</div>
        <div>
          <div class="modal-title">${title}</div>
          <div class="modal-text">${text}</div>
        </div>
      </div>
      <div class="modal-actions">
        ${buttons
          .map(
            (button) =>
              `<button class="${button.primary ? "primary-button" : "secondary-button"}" onclick="${button.action}">${button.label}</button>`
          )
          .join("")}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function fecharModal() {
  const modal = document.querySelector(".modal-overlay");
  if (modal) modal.remove();
}

function confirmarSaida() {
  criarModal({
    icon: "logout",
    title: "Sair do app?",
    text: "Você vai precisar informar o setor novamente. O progresso dos quizzes continuará salvo neste aparelho.",
    buttons: [
      { label: "Cancelar", action: "fecharModal()" },
      { label: "Sim, sair", primary: true, action: "sairConfirmado()" }
    ]
  });
}

function sairConfirmado() {
  localStorage.removeItem("SETOR");
  fecharModal();
  window.location.href = "index.html";
}

function trocarSetor() {
  criarModal({
    icon: "refresh",
    title: "Trocar setor",
    text: "Para entrar com outro setor, você precisa sair desta sessão. Seu progresso local não será apagado.",
    buttons: [
      { label: "Continuar aqui", action: "fecharModal()" },
      { label: "Trocar setor", primary: true, action: "sairConfirmado()" }
    ]
  });
}

function entrar() {
  const raw = document.getElementById("setor")?.value || "";
  const normalized = normalizeSector(raw);

  if (!normalized) {
    alert("Insira seu setor para entrar.");
    return;
  }

  if (!ALLOWED_SECTORS_NORMALIZED.has(normalized)) {
    alert("Setor inválido. Verifique o código digitado.");
    return;
  }

  localStorage.setItem("SETOR", normalized);
  window.location.href = "home.html";
}

function renderHome() {
  ensureSetor();
  applyTopbar({ eyebrow: "", title: "", subtitle: "", showBack: false, minimal: true, hideMenu: true, hideLogout: true });
  setBottomNav("home");

  const total = getAllKbdsTotal();
  document.getElementById("heroStats").textContent = `${total} KBDs do ciclo`;
  document.getElementById("heroTrack").style.width = "100%";
  document.getElementById("heroSummary").textContent = "2 novos • 2 alterados • 5 transformacionais";

  const cicloEl = document.getElementById("heroCiclo");
  if (cicloEl) cicloEl.textContent = `Ciclo ${CICLO_INFO.titulo}`;

  const list = document.getElementById("listaMarcas");
  list.innerHTML = "";

  ["novo", "alterado", "transformacional"].forEach((status) => {
    const meta = getStatusMeta(status);
    const items = getAllKbds().filter(({ kbd }) => kbd.status === status);
    const section = document.createElement("section");
    section.className = `home-category home-category-${status}`;
    section.innerHTML = `
      <div class="home-category-head">
        <div>
          <h2 class="section-title">${meta.plural}</h2>
          <p class="section-subtitle">${meta.description}</p>
        </div>
        <span class="status-badge ${meta.className}">${items.length}</span>
      </div>
      <div class="kbd-list"></div>
    `;

    const sectionList = section.querySelector(".kbd-list");
    items.forEach(({ marca, kbd }) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = `kbd-card pending ${getBrandThemeClass(marca.id)}`;
      card.innerHTML = `
        <div class="kbd-main">
          <div class="brand-logo-wrap compact"><img class="brand-logo" src="${marca.logo}" alt="${escapeHtml(marca.nome)}"></div>
          <div class="kbd-info">
            <div class="kbd-badges"><span class="status-badge ${meta.className}">${meta.label}</span></div>
            <div class="kbd-name">${escapeHtml(kbd.nome)}</div>
            <div class="kbd-meta">${escapeHtml(marca.nome)} • ${hasQuiz(marca.id, kbd.id) ? "quiz disponível" : "quiz em preparação"}</div>
          </div>
        </div>
        <span class="card-arrow">${renderIcon("arrowRight")}</span>
      `;
      card.onclick = () => {
        window.location.href = `kbd.html?marca=${encodeURIComponent(marca.id)}&kbd=${encodeURIComponent(kbd.id)}`;
      };
      sectionList.appendChild(card);
    });

    list.appendChild(section);
  });
}

function renderMarca() {
  ensureSetor();
  const marcaId = qs().get("marca");
  const marca = getMarcaById(marcaId);
  if (!marca) return voltarHome();

  applyTopbar({
    logo: marca.logo,
    eyebrow: "Marca",
    title: marca.nome,
    subtitle: `${marca.kbds.length} KBDs disponíveis`,
    showBack: true,
    onBack: voltarHome,
    minimal: true,
    hideMenu: true,
    hideLogout: true
  });

  setBottomNav("marca");

  const progress = getBrandProgress(marca.id);
  document.getElementById("marcaSummaryLabel").textContent = `Setor ${getSetor()}`;
  document.getElementById("marcaSummaryValue").textContent = `${progress.pct}%`;
  document.getElementById("marcaSummaryTrack").style.width = `${progress.pct}%`;

  const chip = document.getElementById("marcaSummaryChip");
  chip.textContent = `${progress.done}/${progress.total} concluídos`;
  chip.className = `summary-chip ${progress.pct === 100 ? "completed" : "pending"}`;

  document.getElementById("marcaSummaryCopy").textContent =
    progress.total === 0
      ? "Os quizzes desta marca ainda estão em preparação."
      : progress.pct === 100
      ? "Marca concluída com sucesso."
      : "Abra um KBD para estudar o conteúdo e responder o quiz.";

  const list = document.getElementById("listaKbds");
  list.innerHTML = "";

  marca.kbds.forEach((kbd, index) => {
    const quizAvailable = hasQuiz(marca.id, kbd.id);
    const done = quizAvailable && isQuizCompleted(marca.id, kbd.id);
    const quizCount = getQuizQuestions(marca.id, kbd.id).length;
    const statusMeta = getStatusMeta(kbd.status);
    const card = document.createElement("button");
    card.type = "button";
    card.className = `kbd-card ${done ? "completed" : "pending"}`;
    card.innerHTML = `
      <div class="kbd-main">
        <div class="summary-card-icon">${renderIcon(done ? "check" : "quiz")}</div>
        <div class="kbd-info">
          <div class="kbd-badges">
            <span class="status-badge ${statusMeta.className}">${statusMeta.label}</span>
          </div>
          <div class="kbd-name">${index + 1}. ${escapeHtml(kbd.nome)}</div>
          <div class="kbd-meta">${quizAvailable ? `${quizCount} perguntas • ${done ? "quiz concluído" : "pendente"}` : "Quiz em preparação"}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="kbd-pill ${done ? "completed" : "pending"}">${quizAvailable ? (done ? "Concluído" : "Responder") : "Estudar"}</span>
        <span class="card-arrow">${renderIcon("arrowRight")}</span>
      </div>
    `;
    card.onclick = () => {
      window.location.href = `kbd.html?marca=${encodeURIComponent(marca.id)}&kbd=${encodeURIComponent(kbd.id)}`;
    };
    list.appendChild(card);
  });
}

function renderKbd() {
  ensureSetor();
  const marcaId = qs().get("marca");
  const kbdId = qs().get("kbd");
  const marca = getMarcaById(marcaId);
  const kbd = getKbdById(marcaId, kbdId);
  if (!marca || !kbd) return voltarHome();

  applyTopbar({
    logo: marca.logo,
    eyebrow: marca.nome,
    title: "Aula KBD",
    subtitle: kbd.nome,
    showBack: true,
    onBack: voltarHome,
    minimal: true,
    hideMenu: true,
    hideLogout: true
  });

  setBottomNav("kbd");

  const quizAvailable = hasQuiz(marca.id, kbd.id);
  const done = quizAvailable && isQuizCompleted(marca.id, kbd.id);
  const brandProgress = getBrandProgress(marca.id);
  const statusMeta = getStatusMeta(kbd.status);

  const badge = document.getElementById("kbdStatusBadge");
  badge.textContent = quizAvailable ? (done ? "Quiz concluído" : "Quiz pendente") : "Quiz em preparação";

  const statusBadgeEl = document.getElementById("kbdStatusPill");
  if (statusBadgeEl) {
    statusBadgeEl.textContent = statusMeta.label;
    statusBadgeEl.className = `status-badge ${statusMeta.className}`;
  }

  document.getElementById("kbdTitle").textContent = `${marca.nome} • ${kbd.nome}`;
  document.getElementById("kbdSubtitle").textContent = quizAvailable
    ? `${getQuizQuestions(marca.id, kbd.id).length} perguntas disponíveis neste KBD • imagens de apoio abaixo`
    : "Conteúdo disponível • vídeo e quiz serão adicionados quando aprovados";
  document.getElementById("kbdTrack").style.width = quizAvailable ? `${brandProgress.pct}%` : "0%";
  document.getElementById("kbdProgressCopy").textContent = quizAvailable
    ? `${brandProgress.done}/${brandProgress.total} KBDs da marca já respondidos`
    : "Quiz em preparação pela área de treinamento";
  const quizButton = document.getElementById("kbdQuizButton");
  quizButton.textContent = quizAvailable ? (done ? "Refazer quiz" : "Responder o Quiz") : "Quiz em preparação";
  quizButton.disabled = !quizAvailable;

  const pilulaBox = document.getElementById("pilulaKbd");
  if (pilulaBox) {
    const hasPilula = kbd.resumo || (kbd.comoConta && kbd.comoConta.length) || (kbd.erroComum && kbd.erroComum.length) || kbd.focoPromotor;
    if (hasPilula) {
      pilulaBox.innerHTML = `
        <div class="pilula-head">
          <div class="pilula-canais">${renderIcon("target")} ${escapeHtml(kbd.canais || "Ver detalhes")}</div>
        </div>
        ${kbd.resumo ? `<p class="pilula-resumo">${escapeHtml(kbd.resumo)}</p>` : ""}
        ${
          kbd.comoConta && kbd.comoConta.length
            ? `
          <div class="pilula-block">
            <div class="pilula-block-title tone-green">${renderIcon("check")} O que conta</div>
            <ul class="pilula-list tone-green">
              ${kbd.comoConta.map((item) => `<li>${renderIcon("check")}<span>${escapeHtml(item)}</span></li>`).join("")}
            </ul>
          </div>
        `
            : ""
        }
        ${
          kbd.erroComum && kbd.erroComum.length
            ? `
          <div class="pilula-block">
            <div class="pilula-block-title tone-red">${renderIcon("x")} Erro comum</div>
            <ul class="pilula-list tone-red">
              ${kbd.erroComum.map((item) => `<li>${renderIcon("x")}<span>${escapeHtml(item)}</span></li>`).join("")}
            </ul>
          </div>
        `
            : ""
        }
        ${
          kbd.produtosValidos && kbd.produtosValidos.length
            ? `
          <div class="pilula-block">
            <div class="pilula-block-title tone-purple">${renderIcon("sparkles")} Produtos válidos</div>
            <div class="novidades-chip-row">
              ${kbd.produtosValidos.map((item) => `<span class="novidades-chip">${escapeHtml(item)}</span>`).join("")}
            </div>
          </div>
        `
            : ""
        }
        ${kbd.focoPromotor ? `<div class="foco-box">${renderIcon("target")}<span><strong>Foco do promotor:</strong> ${escapeHtml(kbd.focoPromotor)}</span></div>` : ""}
      `;
      pilulaBox.classList.remove("hidden");
    } else {
      pilulaBox.classList.add("hidden");
    }
  }

  const videoPlayer = document.getElementById("videoPlayer");
  const videoPlaceholder = document.getElementById("videoPlaceholder");
  const videoUrl = String(kbd.videoUrl || "").trim();

  if (videoUrl) {
    videoPlayer.src = videoUrl;
    videoPlayer.setAttribute("aria-label", `${marca.nome} - ${kbd.nome}`);
    videoPlayer.classList.remove("hidden");
    videoPlaceholder.classList.add("hidden");
    videoPlaceholder.innerHTML = "";
  } else {
    videoPlayer.removeAttribute("src");
    videoPlayer.classList.add("hidden");
    videoPlaceholder.classList.remove("hidden");
    videoPlaceholder.innerHTML = `
      <div class="inline-icon">${renderIcon("video")} Vídeo em breve</div>
      <div class="helper-text">O layout foi mantido para você poder receber o material assim que ele estiver disponível.</div>
    `;
  }

  const imagesBox = document.getElementById("imagensKbd");
  imagesBox.innerHTML = "";

  if (kbd.imagens && kbd.imagens.length) {
    kbd.imagens.forEach((src, index) => {
      const frame = document.createElement("div");
      frame.className = "kbd-visual-card";

      const img = document.createElement("img");
      const resolvedSrc = resolveKbdAsset(src);
      img.src = assetPath(resolvedSrc);
      img.alt = `${marca.nome} - ${kbd.nome} - imagem ${index + 1}`;
      img.loading = "lazy";
      img.style.cursor = "zoom-in";
      img.onclick = () => abrirImagemExpandida(img.src, img.alt);
      img.onerror = () => {
        frame.innerHTML = `
          <div class="image-placeholder">
            <div class="inline-icon">${renderIcon("image")} Imagem não encontrada</div>
            <div class="helper-text">Confirme se o arquivo existe na pasta kbds com este nome: ${escapeHtml(src)}</div>
          </div>
        `;
      };

      frame.appendChild(img);
      imagesBox.appendChild(frame);
    });
  } else {
    imagesBox.innerHTML = `
      <div class="image-placeholder">
        <div class="inline-icon">${renderIcon("image")} Referências visuais em breve</div>
        <div class="helper-text">Este espaço está preparado para imagens de execução, fotos de referência e materiais do KBD.</div>
      </div>
    `;
  }
}

function renderNovidades() {
  ensureSetor();
  applyTopbar({
    logo: "assets/icon-192.png",
    eyebrow: "Missão KBD",
    title: "Novidades do ciclo",
    subtitle: CICLO_INFO.titulo,
    showBack: true,
    onBack: voltarHome,
    minimal: true,
    hideMenu: true,
    hideLogout: true
  });
  setBottomNav("novidades");

  const area = document.getElementById("novidadesArea");
  if (!area) return;

  area.innerHTML = `
    <img class="novidades-mascot" src="assets/mascot-novidades.jpg" alt="Mascote Missão KBD" loading="lazy">

    <div class="section-head" style="padding-top:8px;">
      <h1 class="section-title">Conteúdos do ciclo</h1>
      <p class="section-subtitle">${escapeHtml(CICLO_INFO.foco)}</p>
    </div>

    <div class="novidades-section">
      <div class="novidades-section-title tone-cyan">${renderIcon("sparkles")} Novos • 2</div>
      <div class="novidades-card-list">
        ${NOVIDADES.novos
          .map(
            (item) => `
          <div class="novidades-card">
            <div class="novidades-card-marca">${escapeHtml(item.marca)}</div>
            <div class="novidades-card-texto">${escapeHtml(item.texto)}</div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>

    <div class="novidades-section">
      <div class="novidades-section-title tone-orange">${renderIcon("swap")} Alterados • 2</div>
      <div class="novidades-card-list">
        ${NOVIDADES.alterados
          .map(
            (item) => `
          <div class="novidades-card">
            <div class="novidades-card-marca">${escapeHtml(item.marca)}</div>
            <div class="novidades-card-texto">${escapeHtml(item.texto)}</div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>

    <div class="novidades-section">
      <div class="novidades-section-title tone-green">${renderIcon("target")} Transformacionais • 5</div>
      <div class="novidades-card-list">
        ${NOVIDADES.transformacionais
          .map(
            (item) => `
          <div class="novidades-card">
            <div class="novidades-card-marca">${escapeHtml(item.marca)}</div>
            <div class="novidades-card-texto">${escapeHtml(item.texto)}</div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>

    <div class="action-stack">
      <a class="primary-button" href="checklist.html">Ver checklist completo</a>
    </div>
  `;
}

function getChecklistState() { return JSON.parse(localStorage.getItem("CHECKLIST_STATE") || "{}"); }
function saveChecklistState(data) { localStorage.setItem("CHECKLIST_STATE", JSON.stringify(data)); }
function isChecklistItemChecked(id) { return !!getChecklistState()[id]; }

function toggleChecklistItem(id) {
  const state = getChecklistState();
  state[id] = !state[id];
  saveChecklistState(state);
  renderChecklist();
}

function resetChecklist() {
  criarModal({
    icon: "refresh",
    title: "Reiniciar checklist?",
    text: "Todos os itens marcados nesta visita serão desmarcados.",
    buttons: [
      { label: "Cancelar", action: "fecharModal()" },
      { label: "Reiniciar", primary: true, action: "confirmarResetChecklist()" }
    ]
  });
}

function confirmarResetChecklist() {
  saveChecklistState({});
  fecharModal();
  renderChecklist();
}

function renderChecklist() {
  ensureSetor();
  applyTopbar({
    logo: "assets/icon-192.png",
    eyebrow: "Missão KBD",
    title: "Checklist de visita",
    subtitle: `${CHECKLIST_ITEMS.length} itens • ${CICLO_INFO.titulo}`,
    showBack: true,
    onBack: voltarHome,
    minimal: true,
    hideMenu: true,
    hideLogout: true
  });
  setBottomNav("checklist");

  const area = document.getElementById("checklistArea");
  if (!area) return;

  const state = getChecklistState();
  const doneCount = CHECKLIST_ITEMS.filter((item) => state[item.id]).length;
  const pct = Math.round((doneCount / CHECKLIST_ITEMS.length) * 100);

  area.innerHTML = `
    <div class="summary-card" style="margin:16px 16px 0;">
      <div class="summary-card-top">
        <div>
          <div class="summary-card-label">Progresso da visita</div>
          <div class="summary-card-value">${doneCount}/${CHECKLIST_ITEMS.length}</div>
        </div>
        <div class="summary-card-icon">${renderIcon("list")}</div>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      <p class="helper-text">Salve este checklist no celular e use como consulta rápida durante a visita.</p>
    </div>

    <div class="section-head">
      <h2 class="section-title">Confira os KBDs</h2>
      <p class="section-subtitle">Toque em cada item para marcar como conferido.</p>
    </div>

    <div class="kbd-list" style="gap:8px;">
      ${CHECKLIST_ITEMS.map((item) => {
        const checked = !!state[item.id];
        return `
          <button type="button" class="checklist-item ${checked ? "checked" : ""}" onclick="toggleChecklistItem('${item.id}')">
            <span class="checklist-checkbox">${renderIcon("check")}</span>
            <span class="checklist-copy">
              <span class="checklist-marca">${escapeHtml(item.marcaNome)}</span>
              <span class="checklist-texto">${escapeHtml(item.texto)}</span>
            </span>
          </button>
        `;
      }).join("")}
    </div>

    <div class="action-stack">
      <button class="secondary-button" type="button" onclick="resetChecklist()">${renderIcon("refresh")} Reiniciar checklist</button>
    </div>
  `;
}

function renderQuiz() {
  ensureSetor();
  const marcaId = qs().get("marca");
  const kbdId = qs().get("kbd");

  if (!marcaId || !kbdId) return renderQuizHub();

  const marca = getMarcaById(marcaId);
  const kbd = getKbdById(marcaId, kbdId);
  const perguntas = getQuizQuestions(marcaId, kbdId);

  if (!marca || !kbd) return renderQuizHub();

  applyTopbar({
    logo: marca.logo,
    eyebrow: marca.nome,
    title: "Quiz",
    subtitle: kbd.nome,
    showBack: true,
    onBack: voltarKbd,
    minimal: true,
    hideMenu: true,
    hideLogout: true
  });

  setBottomNav("quiz");

  const area = document.getElementById("quizArea");

  if (!perguntas.length) {
    area.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-top">
          <div class="empty-state-icon">${renderIcon("quiz")}</div>
          <div class="empty-state-copy">
            <h2 class="section-title">Quiz em preparação</h2>
            <p class="empty-state-text">O conteúdo deste KBD já está disponível, mas as perguntas ainda aguardam aprovação da área de treinamento.</p>
          </div>
        </div>
        <div class="action-stack">
          <button class="primary-button" onclick="voltarKbd()">Voltar para o conteúdo</button>
          <a class="secondary-button" href="home.html">Ir para a home</a>
        </div>
      </div>
    `;
    return;
  }

  quizState = {
    marcaAtual: marca,
    kbdAtual: kbd,
    perguntaIndex: 0,
    acertos: 0,
    total: perguntas.length,
    perguntas,
    selectedOption: null,
    answeredCurrent: false,
    respostasDetalhadas: []
  };

  mostrarPergunta();
}

function renderQuizHub() {
  applyTopbar({
    logo: "assets/icon-192.png",
    eyebrow: "Missão KBD",
    title: "Central de Quiz",
    subtitle: "Acompanhe o progresso e continue de onde parou",
    showBack: true,
    onBack: voltarHome
  });

  setBottomNav("quiz");

  const area = document.getElementById("quizArea");
  const overall = getOverallProgress();
  const next = getFirstPendingQuiz();
  const nextMarca = next ? getMarcaById(next.marcaId) : null;
  const nextKbd = next ? getKbdById(next.marcaId, next.kbdId) : null;

  if (overall.total === 0) {
    area.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-top">
          <div class="empty-state-icon">${renderIcon("quiz")}</div>
          <div class="empty-state-copy">
            <h2 class="section-title">Quizzes em preparação</h2>
            <p class="empty-state-text">Os 9 conteúdos do ciclo já estão organizados. As perguntas serão liberadas aqui depois da validação da área de treinamento.</p>
          </div>
        </div>
        <div class="action-stack">
          <a class="primary-button" href="home.html">Estudar os KBDs</a>
          <a class="secondary-button" href="checklist.html">Abrir checklist</a>
        </div>
      </div>
    `;
    return;
  }

  area.innerHTML = `
    <div class="content-stack">
      <div class="summary-card">
        <div class="summary-card-top">
          <div>
            <div class="summary-card-label">Seu progresso geral</div>
            <div class="summary-card-value">${overall.pct}%</div>
          </div>
          <div class="summary-card-icon">${renderIcon("trophy")}</div>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${overall.pct}%"></div>
        </div>
        <div class="helper-text">${overall.done} de ${overall.total} KBDs respondidos neste aparelho.</div>
      </div>

      ${
        next
          ? `
        <div class="question-card">
          <div class="feedback-top">
            <div class="feedback-badge success">${renderIcon("quiz")}</div>
            <div class="feedback-copy">
              <h2 class="section-title">Próximo quiz recomendado</h2>
              <p class="feedback-text">${escapeHtml(nextMarca.nome)} • ${escapeHtml(nextKbd.nome)}</p>
            </div>
          </div>
          <div class="action-stack">
            <a class="primary-button" href="kbd.html?marca=${encodeURIComponent(next.marcaId)}&kbd=${encodeURIComponent(next.kbdId)}">Abrir próximo KBD</a>
            <a class="secondary-button" href="marca.html?marca=${encodeURIComponent(next.marcaId)}">Ver marca</a>
          </div>
        </div>
      `
          : `
        <div class="result-card">
          <div class="result-top">
            <div class="feedback-badge success">${renderIcon("check")}</div>
            <div class="result-copy">
              <h2 class="result-title">Tudo concluído</h2>
              <p class="result-subtitle">Você respondeu todos os quizzes disponíveis. Pode revisar qualquer marca quando quiser.</p>
            </div>
          </div>
          <div class="action-stack">
            <a class="primary-button" href="home.html">Voltar para a home</a>
          </div>
        </div>
      `
      }
    </div>
  `;
}

function mostrarPergunta() {
  const area = document.getElementById("quizArea");
  const perguntaAtual = quizState.perguntas[quizState.perguntaIndex];
  const progresso = Math.round(((quizState.perguntaIndex + 1) / quizState.total) * 100);

  quizState.selectedOption = null;
  quizState.answeredCurrent = false;

  area.innerHTML = `
    <div class="quiz-shell">
      <div class="summary-card">
        <div class="quiz-progress-meta">
          <div>
            <div class="summary-card-label">Pergunta ${quizState.perguntaIndex + 1} de ${quizState.total}</div>
            <div class="helper-text">Selecione uma alternativa e confirme para receber o feedback.</div>
          </div>
          <span class="summary-chip pending">${progresso}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${progresso}%"></div>
        </div>
      </div>

      <div class="question-card">
        <div class="question-helper">${escapeHtml(quizState.marcaAtual.nome)} • ${escapeHtml(quizState.kbdAtual.nome)}</div>
        <h2 class="question-title">${escapeHtml(perguntaAtual.pergunta)}</h2>

        <div class="option-list">
          ${perguntaAtual.alternativas
            .map((alternativa, index) => {
              const letra = String.fromCharCode(65 + index);
              const limpo = String(alternativa).replace(/^[A-D][\.|\)]\s*/, "");
              return `
                <button class="option-button" id="option-${letra}" type="button" onclick="selecionarAlternativa('${letra}')">
                  <span class="option-icon">${letra}</span>
                  <span class="option-copy">
                    <span class="option-label">Alternativa ${letra}</span>
                    <span class="option-text">${escapeHtml(limpo)}</span>
                  </span>
                </button>
              `;
            })
            .join("")}
        </div>

        <div class="action-stack">
          <button id="confirmAnswerButton" class="primary-button" type="button" onclick="confirmarResposta()" disabled>Validar resposta</button>
          <button class="secondary-button" type="button" onclick="voltarKbd()">Voltar para o KBD</button>
        </div>
      </div>

      <div id="feedbackAnchor"></div>
    </div>
  `;
}

function selecionarAlternativa(letra) {
  if (quizState.answeredCurrent) return;

  quizState.selectedOption = letra;
  document.querySelectorAll(".option-button").forEach((button) => button.classList.remove("selected"));

  const target = document.getElementById(`option-${letra}`);
  if (target) target.classList.add("selected");

  document.getElementById("confirmAnswerButton").disabled = false;
}

function normalizeBulletText(value) {
  let text = String(value || "")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/([.;:!?])(?!\s|$)/g, "$1 ")
    .trim();

  text = text.replace(/\bbiotinamina\b/gi, "Biotinamina");

  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getFallbackBulletText() {
  const currentMarcaQuizzes = (window.QUIZZES && window.QUIZZES[quizState.marcaAtual?.id]) || {};
  const allQuestions = Object.values(currentMarcaQuizzes).flat();
  const firstWithJustification = allQuestions.find((item) => item && item.justificativa);
  return firstWithJustification
    ? firstWithJustification.justificativa
    : "Revise o material da marca antes de seguir para garantir a execução correta do KBD.";
}

async function enviarPerguntaParaSheets(payload) {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    console.log("Resposta do Sheets:", text);
  } catch (error) {
    console.error("Erro ao enviar pergunta para o Sheets:", error);
  }
}

function confirmarResposta() {
  if (quizState.answeredCurrent || !quizState.selectedOption) return;

  quizState.answeredCurrent = true;
  const pergunta = quizState.perguntas[quizState.perguntaIndex];
  const acertou = quizState.selectedOption === pergunta.gabarito;

  const respostaCorretaTexto =
    pergunta.alternativas[pergunta.gabarito.charCodeAt(0) - 65] || "";

  const respostaEnviadaTexto =
    pergunta.alternativas[quizState.selectedOption.charCodeAt(0) - 65] || "";

  quizState.respostasDetalhadas.push({
    data: new Date().toLocaleDateString("pt-BR"),
    setor: getSetor(),
    marca: quizState.marcaAtual.nome,
    kbd: quizState.kbdAtual.nome,
    pergunta: pergunta.pergunta,
    respostaCorreta: respostaCorretaTexto.replace(/^[A-D][\.|\)]\s*/, ""),
    respostaEnviada: respostaEnviadaTexto.replace(/^[A-D][\.|\)]\s*/, ""),
    acertou: acertou ? "SIM" : "NÃO",
    score: acertou ? 1 : 0
  });

  enviarPerguntaParaSheets({
    eventType: "question_detail",
    data: new Date().toLocaleDateString("pt-BR"),
    setor: getSetor(),
    marca: quizState.marcaAtual.nome,
    kbd: quizState.kbdAtual.nome,
    pergunta: pergunta.pergunta,
    respostaCorreta: respostaCorretaTexto.replace(/^[A-D][\.|\)]\s*/, ""),
    respostaEnviada: respostaEnviadaTexto.replace(/^[A-D][\.|\)]\s*/, ""),
    acertou: acertou ? "SIM" : "NÃO",
    score: acertou ? 1 : 0
  });

  if (acertou) quizState.acertos += 1;

  document.querySelectorAll(".option-button").forEach((button) => {
    button.classList.add("disabled");
    const id = button.id.replace("option-", "");
    if (id === pergunta.gabarito) button.classList.add("correct");
    if (id === quizState.selectedOption && !acertou) button.classList.add("incorrect");
  });

  document.getElementById("confirmAnswerButton").disabled = true;

  const respostaCerta = pergunta.alternativas[pergunta.gabarito.charCodeAt(0) - 65].replace(/^[A-D][\.|\)]\s*/, "");
  const wrapper = document.querySelector(".quiz-shell");
  const feedback = document.createElement("div");
  const bulletText = normalizeBulletText(pergunta.justificativa || getFallbackBulletText());

  feedback.className = "feedback-card feedback-card-slide";
  feedback.innerHTML = `
    <div class="feedback-top">
      <div class="feedback-badge ${acertou ? "success" : "error"}">${renderIcon(acertou ? "check" : "x")}</div>
      <div class="feedback-copy">
        <h3 class="feedback-title">${acertou ? "Resposta correta" : "Resposta incorreta"}</h3>
        <p class="feedback-text">${acertou ? "Boa! A tela desce para você validar o retorno e seguir para a próxima." : "Veja a alternativa correta e a regra destacada antes de avançar."}</p>
      </div>
    </div>

    <div class="answer-box">
      <div class="option-icon">${pergunta.gabarito}</div>
      <div>
        <div class="answer-label">Resposta correta</div>
        <div class="answer-value">${escapeHtml(respostaCerta)}</div>
      </div>
    </div>

    ${(!acertou || pergunta.justificativa)
      ? `
      <div class="justification-box">
        <div class="bullet-highlight">Bullet importante</div>
        <p class="justification-text">${escapeHtml(bulletText)}</p>
      </div>
    `
      : ""}

    <div class="action-stack">
      <button class="primary-button" type="button" onclick="proximaPergunta()">
        ${quizState.perguntaIndex + 1 < quizState.total ? "Próxima pergunta" : "Ver resultado"}
      </button>
    </div>
  `;

  wrapper.appendChild(feedback);
  const anchor = document.getElementById("feedbackAnchor");
  wrapper.classList.add("quiz-validating");

  setTimeout(() => {
    (anchor || feedback).scrollIntoView({ behavior: "smooth", block: "start" });
  }, 90);
}

function proximaPergunta() {
  quizState.perguntaIndex += 1;
  if (quizState.perguntaIndex < quizState.perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultadoFinal();
  }
}

function mostrarResultadoFinal() {
  const area = document.getElementById("quizArea");
  markQuizCompleted(quizState.marcaAtual.id, quizState.kbdAtual.id);

  const pct = Math.round((quizState.acertos / quizState.total) * 100);
  const medal = medalEmoji(pct);

  saveKbdResult(quizState.marcaAtual.id, quizState.kbdAtual.id, {
    marcaId: quizState.marcaAtual.id,
    marca: quizState.marcaAtual.nome,
    kbdId: quizState.kbdAtual.id,
    kbd: quizState.kbdAtual.nome,
    acertos: quizState.acertos,
    total: quizState.total,
    percentual: pct,
    medalha: medal,
    setor: getSetor(),
    completedAt: new Date().toISOString()
  });

  const nextInBrand = getNextPendingInBrand(quizState.marcaAtual.id);
  const nextBrandId = nextInBrand ? null : findNextBrandWithPending(quizState.marcaAtual.id);

  let primaryHref = "home.html";
  let primaryLabel = "Voltar para a home";
  let secondaryHref = `marca.html?marca=${encodeURIComponent(quizState.marcaAtual.id)}`;
  let secondaryLabel = "Rever a marca";

  if (nextInBrand) {
    primaryHref = `kbd.html?marca=${encodeURIComponent(nextInBrand.marcaId)}&kbd=${encodeURIComponent(nextInBrand.kbdId)}`;
    primaryLabel = "Abrir próximo KBD";
    secondaryHref = `marca.html?marca=${encodeURIComponent(nextInBrand.marcaId)}`;
    secondaryLabel = "Voltar para a marca";
  } else if (nextBrandId) {
    primaryHref = `marca.html?marca=${encodeURIComponent(nextBrandId)}`;
    primaryLabel = "Ir para próxima marca";
    secondaryHref = "home.html";
    secondaryLabel = "Ver todas as marcas";
  }

  const finalBullet = pct < 100 ? normalizeBulletText(getFallbackBulletText()) : "";

  area.innerHTML = `
    <div class="result-card">
      <div class="result-top">
        <div class="medal-emoji">${medal}</div>
        <div class="result-copy">
          <h2 class="result-title">Quiz finalizado</h2>
          <p class="result-subtitle">${escapeHtml(quizState.marcaAtual.nome)} • ${escapeHtml(quizState.kbdAtual.nome)}</p>
        </div>
      </div>

      <div class="result-score">${pct}%</div>
      <div class="helper-text">Você acertou ${quizState.acertos} de ${quizState.total} perguntas.</div>

      ${pct < 100
        ? `
        <div class="justification-box">
          <div class="bullet-highlight">Bullet importante da marca</div>
          <p class="justification-text">${escapeHtml(finalBullet)}</p>
        </div>
      `
        : ""}

      <div class="result-stats">
        <span class="summary-chip completed">Medalha ${medal}</span>
        <span class="summary-chip ${pct === 100 ? "completed" : "pending"}">${pct === 100 ? "Aproveitamento máximo" : "Continue evoluindo"}</span>
      </div>

      <div class="action-stack">
        <a class="primary-button" href="${primaryHref}">${primaryLabel}</a>
        <a class="secondary-button" href="${secondaryHref}">${secondaryLabel}</a>
        <a class="secondary-button" href="home.html">Voltar para a home das marcas</a>
      </div>
    </div>
  `;
}

function voltarHome() { window.location.href = "home.html"; }
function voltarMarca() { const marcaId = qs().get("marca"); window.location.href = marcaId ? `marca.html?marca=${encodeURIComponent(marcaId)}` : "home.html"; }
function voltarKbd() { const marcaId = qs().get("marca"); const kbdId = qs().get("kbd"); window.location.href = marcaId && kbdId ? `kbd.html?marca=${encodeURIComponent(marcaId)}&kbd=${encodeURIComponent(kbdId)}` : "home.html"; }
function irParaQuiz() { const marcaId = qs().get("marca"); const kbdId = qs().get("kbd"); if (!marcaId || !kbdId) return; window.location.href = `quiz.html?marca=${encodeURIComponent(marcaId)}&kbd=${encodeURIComponent(kbdId)}`; }
function getPrimaryQuizHref(currentMarcaId, currentKbdId) { if (currentMarcaId && currentKbdId) { return `quiz.html?marca=${encodeURIComponent(currentMarcaId)}&kbd=${encodeURIComponent(currentKbdId)}`; } const next = getFirstPendingQuiz(); return next ? `quiz.html?marca=${encodeURIComponent(next.marcaId)}&kbd=${encodeURIComponent(next.kbdId)}` : "quiz.html"; }

async function enviarConclusaoMarcaParaSheets(marcaId) {
  if (!marcaId || isBrandSentToSheets(marcaId)) return;

  const marca = getMarcaById(marcaId);
  const progress = getBrandProgress(marcaId);
  const resultados = Object.values(getBrandResults(marcaId));

  if (!marca || progress.done !== progress.total || resultados.length !== progress.total) return;

  const acertosMarca = resultados.reduce((sum, item) => sum + Number(item.acertos || 0), 0);
  const perguntasMarca = resultados.reduce((sum, item) => sum + Number(item.total || 0), 0);
  const percentualMarca = perguntasMarca ? Math.round((acertosMarca / perguntasMarca) * 100) : 0;

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        eventType: "brand_completion",
        setor: getSetor(),
        marcaId: marca.id,
        marca: marca.nome,
        kbdsConcluidos: progress.done,
        kbdsTotal: progress.total,
        acertosMarca,
        perguntasMarca,
        percentualMarca,
        resultados: JSON.stringify(resultados),
        userAgent: navigator.userAgent,
      }),
    });

    markBrandSentToSheets(marcaId);
  } catch (error) {
    console.error(error);
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
