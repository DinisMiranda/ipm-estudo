// Função Vercel: assistente da sebenta.
// 1) as siglas da pergunta são expandidas (VNI → ventilação não invasiva);
// 2) a pesquisa (api/_pesquisa.js) escolhe as páginas da sebenta que melhor correspondem;
// 3) o Gemini responde APENAS com o texto dessas páginas e diz em que páginas está.
const { pesquisar } = require("./_pesquisa.js");
const { geminiJSON, groqJSON } = require("./_gemini.js");
const { tokens } = require("./_pesquisa.js");
// flash-lite primeiro: responde em segundos e chega para resumir excertos; o flash fica de reserva
const RAPIDO = ["gemini-3.5-flash-lite", "gemini-flash-lite-latest", "gemini-3.1-flash-lite"];

const hits = new Map();
function limited(ip) {
  const now = Date.now(), win = 60_000, max = 20;
  const arr = (hits.get(ip) || []).filter(t => now - t < win);
  arr.push(now); hits.set(ip, arr);
  return arr.length > max;
}
const clip = (s, n) => String(s || "").slice(0, n);

// Siglas frequentes na sebenta: a pesquisa procura a sigla e também o nome por extenso.
// (Antes havia uma chamada extra ao Gemini para isto; com o dicionário a resposta é mais rápida.)
const SIGLAS = {
  vni: "ventilação não invasiva", vmi: "ventilação mecânica invasiva", vm: "ventilação mecânica",
  pac: "pneumonia adquirida na comunidade", pn: "pneumonia", tep: "tromboembolismo pulmonar embolia",
  tvp: "trombose venosa profunda", dpoc: "doença pulmonar obstrutiva crónica", ir: "insuficiência respiratória",
  ira: "insuficiência respiratória aguda", ic: "insuficiência cardíaca", eap: "edema agudo do pulmão",
  ards: "síndrome de dificuldade respiratória aguda", sdra: "síndrome de dificuldade respiratória aguda",
  vih: "VIH HIV SIDA", hiv: "VIH HIV SIDA", sida: "VIH HIV SIDA", tb: "tuberculose", pcp: "pneumocistose Pneumocystis",
  eam: "enfarte agudo do miocárdio", sca: "síndrome coronária aguda", hta: "hipertensão arterial", avc: "acidente vascular cerebral",
  itu: "infeção do trato urinário", fa: "fibrilhação auricular", uci: "unidade de cuidados intensivos", dpi: "doença pulmonar intersticial",
  pfr: "provas funcionais respiratórias", sirs: "síndrome de resposta inflamatória sistémica sépsis", o2: "oxigenoterapia oxigénio"
};
function expandir(texto) {
  const extra = [];
  for (const w of String(texto).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").match(/[a-z0-9]+/g) || []) {
    if (SIGLAS[w]) extra.push(SIGLAS[w]);
  }
  if (/\b(internar|hospitali|internamento)/i.test(texto)) extra.push("internamento hospitalização critérios de gravidade decisão");
  if (/\b(meter|p[oô]r|usar|indica)/i.test(texto)) extra.push("indicações");
  return extra.join(" ");
}

async function responder(pergunta, historico) {
  const hist = (historico || []).slice(-4).map(h => `Estudante: ${clip(h.q, 300)}\nAssistente: ${clip(h.a, 600)}`).join("\n");
  const anterior = (historico || []).slice(-1)[0];
  const paginas = pesquisar([
    { texto: pergunta, peso: 1 },
    { texto: expandir(pergunta), peso: 0.9 },
    // perguntas de seguimento ("e na asma?"): a pergunta anterior também conta, com menos peso
    ...(anterior ? [{ texto: clip(anterior.q, 300) + " " + expandir(anterior.q), peso: 0.4 }] : [])
  ], 6);
  if (!paginas.length) {
    return { resposta: "Não encontrei nada sobre isso na sebenta. Experimenta escrever de outra forma, por exemplo com o nome da doença.", paginas: [] };
  }
  const excertos = paginas.map(x => `=== PÁGINA ${x.p} ===\n${x.texto}`).join("\n\n");
  const system = [
    "És o assistente de estudo do IPM Estudo, para estudantes de Introdução à Prática Médica em Portugal.",
    "Respondes SÓ com o que está nos excertos da sebenta que recebes. Não acrescentes conhecimento de fora, valores, doses nem critérios que não estejam nos excertos.",
    "Se os excertos não responderem à pergunta, diz isso claramente numa frase (ex.: \"A sebenta não fala disso nas páginas que encontrei.\") e, se houver algo próximo, diz o que é.",
    "Escreve em português de Portugal, direto e curto, a falar com o estudante (tu). Usa listas com \"- \" para critérios e indicações. Usa **negrito** só nos títulos que separam grupos (ex.: **DPOC:**), nunca nos itens das listas. Copia os valores e limiares exatamente como estão (ex.: PaCO2 > 55 mmHg).",
    "Os excertos vêm de notas e podem ter erros de digitação: corrige-os sem mudar o sentido.",
    "Em \"paginas\" pões os números das páginas de onde tiraste a informação (só as que usaste).",
    "Responde só com JSON: {\"resposta\": \"...\", \"paginas\": [n, ...]}"
  ].join("\n");
  const prompt = `EXCERTOS DA SEBENTA:\n${excertos}\n\n${hist ? "CONVERSA ANTERIOR:\n" + hist + "\n\n" : ""}PERGUNTA: ${pergunta}`;
  // 1.º Gemini, 2.º Groq, 3.º o próprio texto da sebenta (sem IA), para nunca ficar sem resposta
  let j = null, falha = null;
  try { j = await geminiJSON(system, prompt, { maxTokens: 1200, prefer: RAPIDO, timeout: 12000, budget: 22000 }); }
  catch (e) { falha = e; }
  if (!j && process.env.GROQ_API_KEY) {
    try { j = await groqJSON(system, prompt, { timeout: 20000 }); }
    catch (e) { console.error("groq", e.message, e.detail || ""); }
  }
  if (!j) {
    if (falha && falha.detail) console.error("gemini", falha.message, falha.detail);
    return semIA(pergunta, paginas);
  }
  const validas = new Set(paginas.flatMap(x => [x.p, x.p + 1]));
  const usadas = [...new Set((Array.isArray(j.paginas) ? j.paginas : []).map(Number).filter(n => validas.has(n)))].sort((a, b) => a - b);
  return { resposta: clip(j.resposta || "Desculpa, não consegui responder. Tenta outra vez.", 4000), paginas: usadas };
}

// Sem IA: mostra os trechos das páginas encontradas onde a pergunta mais aparece.
function semIA(pergunta, paginas) {
  const q = new Set(tokens(pergunta + " " + expandir(pergunta)));
  const trechos = [];
  for (const pg of paginas.slice(0, 2)) {
    const linhas = pg.texto.split("\n").filter(l => l.trim() && !/^\[continua/.test(l));
    let melhor = 0, idx = 0;
    linhas.forEach((l, i) => {
      const janela = linhas.slice(i, i + 8).join(" ");
      const n = tokens(janela).filter(w => q.has(w)).length;
      if (n > melhor) { melhor = n; idx = i; }
    });
    if (!melhor) continue;
    const ini = Math.max(0, idx - 1);
    trechos.push({ p: pg.p, txt: linhas.slice(ini, ini + 14).map(l => l.trim()).join("\n") });
  }
  if (!trechos.length) return { resposta: "A IA está indisponível neste momento e não encontrei nada claro sobre isso. Tenta outra vez daqui a pouco.", paginas: [], semIA: true };
  const corpo = trechos.map(t => `**Página ${t.p}:**\n${t.txt.replace(/^-\s*/gm, "- ")}`).join("\n\n");
  return {
    resposta: "A IA está sobrecarregada, por isso aqui fica o texto da sebenta que encontrei (sem resumo):\n\n" + corpo,
    paginas: trechos.map(t => t.p), semIA: true
  };
}

module.exports = async (req, res) => {
  res.setHeader("cache-control", "no-store");
  try {
    if (req.method === "GET") return res.status(200).json({ gemini: !!process.env.GEMINI_API_KEY, groq: !!process.env.GROQ_API_KEY });
    if (req.method !== "POST") return res.status(405).json({ erro: "Método não permitido." });
    const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "local";
    if (limited(ip)) return res.status(429).json({ erro: "Demasiadas perguntas seguidas. Espera um minuto." });
    const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const pergunta = clip(b.pergunta, 500).trim();
    if (!pergunta) return res.status(400).json({ erro: "Escreve uma pergunta." });
    return res.status(200).json(await responder(pergunta, Array.isArray(b.historico) ? b.historico : []));
  } catch (e) {
    if (e.detail) console.error(e.message, e.detail);
    return res.status(e.status || 500).json({ erro: e.message || "Erro inesperado." });
  }
};
