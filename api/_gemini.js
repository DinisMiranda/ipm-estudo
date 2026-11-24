// Chamada ao Gemini que devolve JSON, com modelos alternativos se o primeiro falhar.
// Usada pelo assistente da sebenta (api/perguntar.js).
const LITE = ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3.5-flash"];
const FLASH = ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];

async function geminiJSON(system, prompt, { maxTokens = 900, prefer = FLASH, temperature = 0.2, timeout = 20000 } = {}) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) { const e = new Error("A IA ainda não está configurada (falta a chave do Gemini no Vercel)."); e.status = 503; throw e; }
  const call = m => {
    const generationConfig = { responseMimeType: "application/json", temperature, maxOutputTokens: Math.max(maxTokens, 2048) };
    if (/^gemini-2\.5-flash/.test(m)) generationConfig.thinkingConfig = { thinkingBudget: 0 };
    return fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(m)}:generateContent`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig }),
      signal: AbortSignal.timeout(timeout)
    }).catch(err => ({ ok: false, status: err.name === "TimeoutError" ? 504 : 502, text: async () => String(err) }));
  };
  const order = [...new Set([process.env.GEMINI_MODEL, ...prefer].filter(Boolean))];
  let r;
  for (const m of order.slice(0, 3)) {
    r = await call(m);
    if (r.ok || r.status === 429 || r.status === 400 || r.status === 403) break;
  }
  if (!r.ok) {
    const body = (await r.text()).slice(0, 400);
    const e = new Error(r.status === 429 ? "O limite gratuito do Gemini foi atingido. Tenta daqui a um minuto." : "O serviço de IA não respondeu (" + r.status + ").");
    e.status = r.status === 429 ? 429 : 502; e.detail = body; throw e;
  }
  const j = await r.json();
  const txt = ((j.candidates || [])[0]?.content?.parts || []).filter(p => !p.thought).map(p => p.text || "").join("").trim();
  try { return JSON.parse(txt.replace(/^```(?:json)?\s*|\s*```$/g, "")); }
  catch { const e = new Error("A IA devolveu uma resposta inválida. Tenta outra vez."); e.status = 502; e.detail = txt.slice(0, 300); throw e; }
}

module.exports = { geminiJSON, LITE, FLASH };
