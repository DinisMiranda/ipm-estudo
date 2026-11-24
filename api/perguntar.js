// Função Vercel: assistente da sebenta.
// 1) o Gemini transforma a pergunta em termos de pesquisa (expande siglas como VNI, PAC, TEP);
// 2) a pesquisa (api/_pesquisa.js) escolhe as páginas da sebenta que melhor correspondem;
// 3) o Gemini responde APENAS com o texto dessas páginas e diz em que páginas está.
const { pesquisar } = require("./_pesquisa.js");
const { geminiJSON, LITE, FLASH } = require("./_gemini.js");

const hits = new Map();
function limited(ip) {
  const now = Date.now(), win = 60_000, max = 20;
  const arr = (hits.get(ip) || []).filter(t => now - t < win);
  arr.push(now); hits.set(ip, arr);
  return arr.length > max;
}
const clip = (s, n) => String(s || "").slice(0, n);

async function termosDePesquisa(pergunta, hist) {
  const system = [
    "Ajudas a pesquisar numa sebenta de Introdução à Prática Médica escrita em português de Portugal (infecciologia, pneumologia, saúde pública, cardiovascular, semiologia).",
    "Recebes a pergunta de um estudante (e, se houver, a conversa anterior, para perceberes perguntas de seguimento como \"e na DPOC?\").",
    "Devolve termos de pesquisa como a sebenta os escreveria: o tema principal, siglas por extenso e também a sigla (ex.: VNI e ventilação não invasiva; PAC e pneumonia adquirida na comunidade), sinónimos e palavras que costumam aparecer na resposta (ex.: internar → internamento, hospitalizar, critérios de gravidade, CURB-65).",
    "Responde só com JSON: {\"tema\": \"pergunta reescrita de forma autónoma\", \"termos\": [\"...\", ...]} com 3 a 10 termos."
  ].join("\n");
  const prompt = (hist ? "CONVERSA ANTERIOR:\n" + hist + "\n\n" : "") + "PERGUNTA: " + pergunta;
  try {
    const j = await geminiJSON(system, prompt, { maxTokens: 300, prefer: LITE, timeout: 12000 });
    return { tema: clip(j.tema, 300) || pergunta, termos: (Array.isArray(j.termos) ? j.termos : []).slice(0, 12).map(t => clip(t, 80)) };
  } catch (e) {
    if (e.status === 429 || e.status === 503) throw e;
    return { tema: pergunta, termos: [] }; // sem expansão, pesquisa só com a pergunta
  }
}

async function responder(pergunta, historico) {
  const hist = (historico || []).slice(-4).map(h => `Estudante: ${clip(h.q, 300)}\nAssistente: ${clip(h.a, 600)}`).join("\n");
  const { tema, termos } = await termosDePesquisa(pergunta, hist);
  const paginas = pesquisar([
    { texto: pergunta, peso: 1 },
    { texto: tema, peso: 1 },
    ...termos.map(t => ({ texto: t, peso: 0.8 }))
  ], 6);
  if (!paginas.length) {
    return { resposta: "Não encontrei nada sobre isso na sebenta. Experimenta escrever de outra forma, por exemplo com o nome da doença.", paginas: [] };
  }
  const excertos = paginas.map(x => `=== PÁGINA ${x.p} ===\n${x.texto}`).join("\n\n");
  const system = [
    "És o assistente de estudo do IPM Estudo, para estudantes de Introdução à Prática Médica em Portugal.",
    "Respondes SÓ com o que está nos excertos da sebenta que recebes. Não acrescentes conhecimento de fora, valores, doses nem critérios que não estejam nos excertos.",
    "Se os excertos não responderem à pergunta, diz isso claramente numa frase (ex.: \"A sebenta não fala disso nas páginas que encontrei.\") e, se houver algo próximo, diz o que é.",
    "Escreve em português de Portugal, direto e curto, a falar com o estudante (tu). Usa listas com \"- \" para critérios e indicações, e **negrito** só para os títulos das listas ou valores-chave. Copia os valores e limiares exatamente como estão (ex.: PaCO2 > 55 mmHg).",
    "Os excertos vêm de notas e podem ter erros de digitação: corrige-os sem mudar o sentido.",
    "Em \"paginas\" pões os números das páginas de onde tiraste a informação (só as que usaste).",
    "Responde só com JSON: {\"resposta\": \"...\", \"paginas\": [n, ...]}"
  ].join("\n");
  const prompt = `EXCERTOS DA SEBENTA:\n${excertos}\n\n${hist ? "CONVERSA ANTERIOR:\n" + hist + "\n\n" : ""}PERGUNTA: ${pergunta}`;
  const j = await geminiJSON(system, prompt, { maxTokens: 1200, prefer: FLASH, timeout: 25000 });
  const validas = new Set(paginas.flatMap(x => [x.p, x.p + 1]));
  const usadas = [...new Set((Array.isArray(j.paginas) ? j.paginas : []).map(Number).filter(n => validas.has(n)))].sort((a, b) => a - b);
  return { resposta: clip(j.resposta || "Desculpa, não consegui responder. Tenta outra vez.", 4000), paginas: usadas };
}

module.exports = async (req, res) => {
  res.setHeader("cache-control", "no-store");
  try {
    if (req.method === "GET") return res.status(200).json({ ia: !!process.env.GEMINI_API_KEY });
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
