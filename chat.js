/* Assistente da sebenta: robô fixo no canto da página que abre uma caixa de chat.
   As respostas vêm de /api/perguntar, que só usa o texto da sebenta e indica as páginas.
   Basta incluir <script src="/chat.js" defer></script> numa página. */
(() => {
  if (window.__ipmChat) return;
  window.__ipmChat = true;

  const API = "/api/perguntar";
  const PDF = "/Sebenta_Chefe_IPM.pdf";
  const KEY = "ipm-chat-v1";
  const SUGESTOES = [
    "Quando internar uma pneumonia?",
    "Indicações para VNI",
    "Critérios de malária grave",
    "Profilaxia da pneumocistose"
  ];

  const ROBO = `
<svg class="ic-robo" viewBox="0 0 120 120" aria-hidden="true">
  <ellipse class="ic-sombra" cx="60" cy="112" rx="26" ry="4.5"/>
  <g class="ic-corpo">
    <g class="ic-braco">
      <rect x="88" y="34" width="13" height="30" rx="6.5" fill="#fff" stroke="#1c3f7a" stroke-width="3"/>
      <circle cx="94.5" cy="32" r="8" fill="#7cc0ff" stroke="#1c3f7a" stroke-width="3"/>
    </g>
    <line x1="60" y1="22" x2="60" y2="11" stroke="#1c3f7a" stroke-width="3" stroke-linecap="round"/>
    <circle class="ic-antena" cx="60" cy="9" r="5" fill="#fff" stroke="#1c3f7a" stroke-width="3"/>
    <clipPath id="ic-cabeca"><circle cx="60" cy="60" r="36"/></clipPath>
    <circle cx="60" cy="60" r="36" fill="#fff"/>
    <g clip-path="url(#ic-cabeca)">
      <rect x="20" y="74" width="80" height="30" fill="#7cc0ff"/>
      <path d="M24 74 Q60 82 96 74" fill="none" stroke="#1c3f7a" stroke-width="2.5" opacity=".35"/>
      <ellipse cx="44" cy="40" rx="14" ry="7" fill="#e8f3ff"/>
    </g>
    <circle cx="60" cy="60" r="36" fill="none" stroke="#1c3f7a" stroke-width="3"/>
    <rect x="34" y="42" width="52" height="28" rx="14" fill="#1f56b8" stroke="#1c3f7a" stroke-width="3"/>
    <rect x="40" y="46" width="14" height="4" rx="2" fill="#5d8fe6" opacity=".7"/>
    <g class="ic-olhos" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="44,61 49,55 54,61"/>
      <polyline points="66,61 71,55 76,61"/>
    </g>
    <circle cx="23" cy="60" r="6" fill="#7cc0ff" stroke="#1c3f7a" stroke-width="3"/>
    <path d="M23 66 C 22 82, 34 92, 46 90" fill="none" stroke="#1c3f7a" stroke-width="3" stroke-linecap="round"/>
    <circle cx="48" cy="89.5" r="4.5" fill="#d7e6f7" stroke="#1c3f7a" stroke-width="2.5"/>
    <circle cx="72" cy="87" r="8" fill="#fff" stroke="#1c3f7a" stroke-width="2.5"/>
    <path d="M72 91.5 l-4.2-4.1 a2.5 2.5 0 0 1 4.2-3 a2.5 2.5 0 0 1 4.2 3 z" fill="#e5484d"/>
  </g>
</svg>`;

  const css = `
.ic-fab{position:fixed;right:max(18px,env(safe-area-inset-right,0px));bottom:max(14px,env(safe-area-inset-bottom,0px));z-index:900;width:84px;height:84px;padding:0;border:0;background:none;cursor:pointer;-webkit-tap-highlight-color:transparent}
.ic-fab:focus-visible{outline:2px solid var(--accent,#0e6a63);outline-offset:2px;border-radius:50%}
.ic-robo{width:100%;height:100%;overflow:visible;display:block}
.ic-sombra{fill:#0b1f3a;opacity:.16;transform-origin:60px 112px;animation:ic-sombra 3.2s ease-in-out infinite}
.ic-corpo{animation:ic-flutua 3.2s ease-in-out infinite}
.ic-braco{transform-origin:94px 60px;transform:rotate(-8deg);transition:transform .3s}
.ic-fab:hover .ic-braco,.ic-fab.ic-ola .ic-braco{animation:ic-acena .9s ease-in-out 2}
.ic-olhos{transform-origin:60px 58px;animation:ic-pisca 5s infinite}
.ic-fab[aria-expanded="true"] .ic-olhos{animation:none}
@keyframes ic-flutua{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes ic-sombra{0%,100%{transform:scaleX(1);opacity:.16}50%{transform:scaleX(.8);opacity:.1}}
@keyframes ic-acena{0%,100%{transform:rotate(-8deg)}25%{transform:rotate(-30deg)}75%{transform:rotate(12deg)}}
@keyframes ic-pisca{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.15)}}
.ic-balao{position:fixed;right:calc(max(18px,env(safe-area-inset-right,0px)) + 88px);bottom:calc(max(14px,env(safe-area-inset-bottom,0px)) + 40px);z-index:900;background:var(--paper,#fff);color:var(--ink,#16201d);border:1px solid var(--line,#dde3e0);border-radius:12px 12px 4px 12px;padding:8px 12px;font:500 13px/1.3 var(--f-body,system-ui,sans-serif);box-shadow:0 6px 20px rgba(10,30,40,.12);white-space:nowrap;opacity:0;transform:translateY(6px);transition:opacity .25s,transform .25s;pointer-events:none}
.ic-balao.ic-vis{opacity:1;transform:none}
.ic-painel{position:fixed;right:max(18px,env(safe-area-inset-right,0px));bottom:calc(max(14px,env(safe-area-inset-bottom,0px)) + 92px);z-index:901;width:min(390px,calc(100vw - 32px));height:min(580px,calc(100dvh - 130px));display:flex;flex-direction:column;background:var(--paper,#fff);color:var(--ink,#16201d);border:1px solid var(--line,#dde3e0);border-radius:16px;box-shadow:0 18px 50px rgba(10,30,40,.22);font:400 14px/1.5 var(--f-body,system-ui,sans-serif);overflow:hidden;transform-origin:calc(100% - 40px) calc(100% + 40px);opacity:0;transform:scale(.92) translateY(8px);visibility:hidden;transition:opacity .2s,transform .25s cubic-bezier(.22,1,.36,1),visibility 0s .25s}
.ic-painel.ic-aberto{opacity:1;transform:none;visibility:visible;transition:opacity .2s,transform .25s cubic-bezier(.22,1,.36,1),visibility 0s}
.ic-topo{display:flex;align-items:center;gap:10px;padding:12px 12px 12px 16px;border-bottom:1px solid var(--line,#dde3e0)}
.ic-topo b{font:500 18px/1.2 var(--f-display,Georgia,serif);display:block}
.ic-topo small{color:var(--muted,#5b6a65);font-size:12px}
.ic-topo .ic-acoes{margin-left:auto;display:flex;gap:4px}
.ic-ib{border:0;background:none;color:var(--muted,#5b6a65);width:32px;height:32px;border-radius:8px;display:grid;place-items:center;cursor:pointer}
.ic-ib:hover{background:var(--raise,#e5ebe8);color:var(--ink,#16201d)}
.ic-ib svg{width:18px;height:18px}
.ic-log{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;overscroll-behavior:contain}
.ic-msg{max-width:88%;padding:9px 13px;border-radius:14px;word-wrap:break-word}
.ic-msg p{margin:0 0 6px}.ic-msg p:last-child{margin:0}
.ic-msg ul{margin:4px 0 6px;padding-left:18px}.ic-msg li{margin:2px 0}
.ic-eu{align-self:flex-end;background:var(--accent,#0e6a63);color:var(--accent-ink,#fff);border-bottom-right-radius:4px}
.ic-ele{align-self:flex-start;background:var(--raise,#e5ebe8);border-bottom-left-radius:4px}
.ic-erro{align-self:flex-start;background:var(--warn-soft,#f8e9df);color:var(--warn,#b0561c)}
.ic-pags{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.ic-pags a{font:500 12px/1 var(--f-mono,ui-monospace,monospace);text-decoration:none;color:var(--accent,#0e6a63);background:var(--paper,#fff);border:1px solid var(--line,#dde3e0);border-radius:999px;padding:5px 9px}
.ic-pags a:hover{border-color:var(--accent,#0e6a63)}
.ic-vazio{color:var(--muted,#5b6a65);font-size:13px}
.ic-vazio p{margin:0 0 10px}
.ic-sug{display:flex;flex-wrap:wrap;gap:6px}
.ic-sug button{border:1px solid var(--line,#dde3e0);background:var(--paper,#fff);color:var(--ink,#16201d);border-radius:999px;padding:6px 11px;font:inherit;font-size:13px;cursor:pointer}
.ic-sug button:hover{background:var(--accent-soft,#e2f0ee);border-color:var(--accent,#0e6a63)}
.ic-dots{display:inline-flex;gap:4px;padding:4px 0}
.ic-dots i{width:7px;height:7px;border-radius:50%;background:var(--muted,#5b6a65);animation:ic-dot 1.2s infinite}
.ic-dots i:nth-child(2){animation-delay:.15s}.ic-dots i:nth-child(3){animation-delay:.3s}
@keyframes ic-dot{0%,60%,100%{opacity:.25;transform:none}30%{opacity:1;transform:translateY(-3px)}}
.ic-form{display:flex;gap:8px;padding:12px;border-top:1px solid var(--line,#dde3e0)}
.ic-form textarea{flex:1;resize:none;border:1px solid var(--line,#dde3e0);background:var(--bg,#eef2f0);color:inherit;border-radius:10px;padding:9px 12px;font:inherit;max-height:120px;min-height:40px}
.ic-form textarea:focus{outline:2px solid var(--accent,#0e6a63);outline-offset:-1px}
.ic-form button{border:0;background:var(--accent,#0e6a63);color:var(--accent-ink,#fff);border-radius:10px;width:42px;display:grid;place-items:center;cursor:pointer;flex:none}
.ic-form button:disabled{opacity:.45;cursor:default}
.ic-form button svg{width:18px;height:18px}
.ic-aviso{font-size:11px;color:var(--muted,#5b6a65);padding:0 14px 10px;margin-top:-4px}
@media (max-width:560px){
  .ic-fab{width:68px;height:68px}
  .ic-painel{right:0;left:0;bottom:0;width:100%;height:min(88dvh,100dvh - env(safe-area-inset-top,0px));border-radius:16px 16px 0 0;transform-origin:50% 100%}
  .ic-painel.ic-aberto ~ .ic-fab{display:none}
  .ic-balao{right:92px;bottom:40px}
}
@media (prefers-reduced-motion:reduce){
  .ic-corpo,.ic-sombra,.ic-olhos,.ic-dots i{animation:none!important}
  .ic-fab:hover .ic-braco,.ic-fab.ic-ola .ic-braco{animation:none}
  .ic-painel{transition:none}
}
@media print{.ic-fab,.ic-painel,.ic-balao{display:none!important}}`;

  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  const painel = document.createElement("section");
  painel.className = "ic-painel";
  painel.id = "ic-painel";
  painel.setAttribute("role", "dialog");
  painel.setAttribute("aria-label", "Assistente da sebenta");
  painel.innerHTML = `
  <div class="ic-topo">
    <div><b>Assistente da sebenta</b><small>Respostas tiradas da sebenta, com as páginas</small></div>
    <div class="ic-acoes">
      <button class="ic-ib" type="button" data-limpar title="Nova conversa" aria-label="Nova conversa"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></button>
      <button class="ic-ib" type="button" data-fechar title="Fechar" aria-label="Fechar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>
  </div>
  <div class="ic-log" aria-live="polite"></div>
  <form class="ic-form">
    <textarea rows="1" maxlength="500" placeholder="Pergunta, por ex.: critérios para VNI" aria-label="A tua pergunta"></textarea>
    <button type="submit" aria-label="Enviar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
  </form>
  <div class="ic-aviso">Para estudar. Não usar em decisões sobre doentes reais.</div>`;

  const fab = document.createElement("button");
  fab.className = "ic-fab";
  fab.type = "button";
  fab.setAttribute("aria-label", "Abrir o assistente da sebenta");
  fab.setAttribute("aria-expanded", "false");
  fab.setAttribute("aria-controls", "ic-painel");
  fab.innerHTML = ROBO;

  const balao = document.createElement("div");
  balao.className = "ic-balao";
  balao.textContent = "Dúvidas? Pergunta-me!";

  // espaço no fim da página para o robô não tapar os últimos botões
  const espaco = document.createElement("div");
  espaco.setAttribute("aria-hidden", "true");
  espaco.style.height = "96px";

  document.body.append(espaco, painel, fab, balao);

  const log = painel.querySelector(".ic-log");
  const form = painel.querySelector(".ic-form");
  const ta = form.querySelector("textarea");
  const enviar = form.querySelector("button");

  let hist = [];
  try { hist = JSON.parse(sessionStorage.getItem(KEY) || "[]"); if (!Array.isArray(hist)) hist = []; } catch { hist = []; }
  const guardar = () => { try { sessionStorage.setItem(KEY, JSON.stringify(hist.slice(-30))); } catch {} };
  let aCarregar = false;

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // markdown mínimo: parágrafos, listas com "- " ou "* ", **negrito**
  function md(txt) {
    const inl = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
    let out = "", lista = false;
    for (const raw of String(txt).split(/\n/)) {
      const l = raw.trim();
      const m = l.match(/^[-*•]\s+(.*)$/);
      if (m) { if (!lista) { out += "<ul>"; lista = true; } out += "<li>" + inl(m[1]) + "</li>"; continue; }
      if (lista) { out += "</ul>"; lista = false; }
      if (l) out += "<p>" + inl(l) + "</p>";
    }
    return out + (lista ? "</ul>" : "");
  }

  function bolha(cls, html) {
    const d = document.createElement("div");
    d.className = "ic-msg " + cls;
    d.innerHTML = html;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
    return d;
  }
  const pags = ps => ps && ps.length
    ? `<div class="ic-pags">${ps.map(p => `<a href="${PDF}#page=${p}" target="_blank" rel="noopener" title="Abrir a sebenta na página ${p}">p. ${p}</a>`).join("")}</div>` : "";

  function desenhar() {
    log.innerHTML = "";
    if (!hist.length) {
      const v = document.createElement("div");
      v.className = "ic-vazio";
      v.innerHTML = `<p>Olá! Pergunta-me qualquer coisa da sebenta e eu procuro por ti, com as páginas onde está.</p><div class="ic-sug">${SUGESTOES.map(s => `<button type="button">${esc(s)}</button>`).join("")}</div>`;
      v.querySelectorAll("button").forEach(b => b.addEventListener("click", () => perguntar(b.textContent)));
      log.appendChild(v);
      return;
    }
    for (const h of hist) {
      bolha("ic-eu", "<p>" + esc(h.q) + "</p>");
      bolha("ic-ele", md(h.a) + pags(h.p));
    }
  }

  async function perguntar(q) {
    q = String(q || "").trim();
    if (!q || aCarregar) return;
    aCarregar = true; enviar.disabled = true;
    if (!hist.length) log.innerHTML = "";
    bolha("ic-eu", "<p>" + esc(q) + "</p>");
    const espera = bolha("ic-ele", '<span class="ic-dots" aria-label="A procurar"><i></i><i></i><i></i></span>');
    ta.value = ""; ajustar();
    try {
      const r = await fetch(API, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ pergunta: q, historico: hist.slice(-4).map(h => ({ q: h.q, a: h.a })) })
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.erro || "Não consegui responder (" + r.status + ").");
      espera.innerHTML = md(j.resposta) + pags(j.paginas);
      hist.push({ q, a: j.resposta, p: j.paginas || [] });
      guardar();
    } catch (e) {
      espera.className = "ic-msg ic-erro";
      espera.textContent = e.message === "Failed to fetch" ? "Sem ligação. Verifica a internet e tenta outra vez." : e.message;
    } finally {
      aCarregar = false; enviar.disabled = !ta.value.trim();
      log.scrollTop = log.scrollHeight;
    }
  }

  function ajustar() {
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
    enviar.disabled = aCarregar || !ta.value.trim();
  }
  ta.addEventListener("input", ajustar);
  ta.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); perguntar(ta.value); } });
  form.addEventListener("submit", e => { e.preventDefault(); perguntar(ta.value); });

  function abrir(v) {
    painel.classList.toggle("ic-aberto", v);
    fab.setAttribute("aria-expanded", String(v));
    fab.setAttribute("aria-label", v ? "Fechar o assistente da sebenta" : "Abrir o assistente da sebenta");
    balao.classList.remove("ic-vis");
    if (v) { desenhar(); setTimeout(() => ta.focus(), 50); }
  }
  fab.addEventListener("click", () => abrir(!painel.classList.contains("ic-aberto")));
  painel.querySelector("[data-fechar]").addEventListener("click", () => { abrir(false); fab.focus(); });
  painel.querySelector("[data-limpar]").addEventListener("click", () => { hist = []; guardar(); desenhar(); ta.focus(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && painel.classList.contains("ic-aberto")) { abrir(false); fab.focus(); } });
  ajustar();

  // cumprimenta uma vez por sessão
  let visto = false;
  try { visto = sessionStorage.getItem(KEY + "-ola") === "1"; sessionStorage.setItem(KEY + "-ola", "1"); } catch {}
  if (!visto) {
    setTimeout(() => {
      if (painel.classList.contains("ic-aberto")) return;
      fab.classList.add("ic-ola"); balao.classList.add("ic-vis");
      setTimeout(() => { fab.classList.remove("ic-ola"); balao.classList.remove("ic-vis"); }, 4500);
    }, 1500);
  }
})();
