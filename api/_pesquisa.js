// Pesquisa por palavras (BM25) nas páginas da sebenta. Sem dependências.
// Cada página é indexada junto com o início da seguinte, porque as secções
// muitas vezes continuam na página a seguir.
const PAGES = require("./_sebenta.json");

const STOP = new Set(("a o e é de da do das dos em no na nos nas um uma uns umas por para com sem que se ou ao aos à às " +
  "como mais menos muito pouco qual quais quando onde quem são ser ter tem há pelo pela pelos pelas este esta isto esse essa isso " +
  "eu tu ele ela nós vós eles elas me te lhe nos vos lhes meu minha seu sua já não sim também mas até sobre entre após depois antes " +
  "the and of").split(" "));

const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
// "radical" simples: os primeiros 6 caracteres juntam internar/internamento, ventilação/ventilatório, etc.
const stem = w => (w.length > 6 ? w.slice(0, 6) : w.replace(/s$/, ""));
function tokens(s) {
  return (norm(s).match(/[a-z0-9]+/g) || []).filter(w => (w.length > 1 || /\d/.test(w)) && !STOP.has(w)).map(stem);
}

const TAIL = 700;
const DOCS = PAGES.map((pg, i) => {
  const next = PAGES[i + 1] && PAGES[i + 1].p === pg.p + 1 ? PAGES[i + 1].t.slice(0, TAIL) : "";
  const tf = new Map();
  const tk = tokens(pg.t + "\n" + next);
  for (const w of tk) tf.set(w, (tf.get(w) || 0) + 1);
  return { p: pg.p, t: pg.t, next, tf, len: tk.length };
});
const N = DOCS.length;
const AVG = DOCS.reduce((s, d) => s + d.len, 0) / N;
const DF = new Map();
for (const d of DOCS) for (const w of d.tf.keys()) DF.set(w, (DF.get(w) || 0) + 1);

// termos: [{ texto, peso }]. Devolve as k páginas com melhor pontuação.
function pesquisar(termos, k = 6) {
  const q = new Map();
  for (const { texto, peso } of termos) for (const w of tokens(texto)) q.set(w, Math.max(q.get(w) || 0, peso));
  // frases de duas palavras seguidas (ex.: "nao invasiva") valem um bónus
  const pares = [];
  for (const { texto, peso } of termos) {
    const t = tokens(texto);
    for (let i = 0; i + 1 < t.length; i++) pares.push([t[i] + " " + t[i + 1], peso]);
  }
  const k1 = 1.4, b = 0.7;
  const scored = DOCS.map(d => {
    let s = 0;
    for (const [w, peso] of q) {
      const f = d.tf.get(w);
      if (!f) continue;
      const idf = Math.log(1 + (N - DF.get(w) + 0.5) / (DF.get(w) + 0.5));
      s += peso * idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * d.len / AVG));
    }
    if (s && pares.length) {
      const flat = tokens(d.t + " " + d.next).join(" ");
      for (const [par, peso] of pares) if (flat.includes(par)) s += 0.6 * peso;
    }
    return { d, s };
  }).filter(x => x.s > 0);
  scored.sort((a, b) => b.s - a.s);
  return scored.slice(0, k).map(({ d, s }) => ({ p: d.p, texto: d.t + (d.next ? "\n[continua na página " + (d.p + 1) + "]\n" + d.next : ""), score: s }));
}

module.exports = { pesquisar, tokens, PAGINAS: N };
