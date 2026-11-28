/* Teacher Dario · Downloadable PDF books: a download bar at the top of each course view.
   The PDFs live in the GitHub repository (same folder as index.html). */
(function () {
  const RAW = "https://github.com/Teacherdario/student-lesson-dashboard/raw/main/";
  const LV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const B = {
    SB: l => [`student-book-${l.toLowerCase()}.pdf`, `Student Book ${l}`, `Libro del alumno ${l}`],
    WB: l => [`vocabulary-workbook-${l.toLowerCase()}.pdf`, `Vocabulary Workbook ${l}`, `Cuaderno de vocabulario ${l}`],
    PIC: l => [`picture-dictionary-${l.toLowerCase()}.pdf`, `Picture Dictionary ${l}`, `Diccionario ilustrado ${l}`],
    PET: () => ["pet-study-book.pdf", "B1 Preliminary (PET) Study Book", "Libro de estudio PET"],
    FCE: () => ["fce-study-book.pdf", "B2 First (FCE) Study Book", "Libro de estudio FCE"],
    VERB: () => ["verbs-book.pdf", "Verbs Book", "Libro de verbos"],
    VOC: () => ["vocabulary-book.pdf", "Vocabulary Book", "Libro de vocabulario"],
    START: () => ["starter-level-0.pdf", "Starter · Level 0", "Nivel 0"],
    SPK: () => ["speaking-course.pdf", "Speaking Course", "Curso de expresión oral"],
    FARM1: () => ["field-machine-english-year-1.pdf", "Field & Machine English · Year 1", "Inglés para el campo · Año 1"],
    FARM2: () => ["field-machine-english-year-2.pdf", "Field & Machine English · Year 2", "Inglés para el campo · Año 2"]
  };
  const WK = () => (window.WORK ? WORK.courses : []).filter(c => c.list.length);
  const wkBooks = c => c.cid === "farm" ? [B.FARM1(), B.FARM2()] : [1, 2].map(y => [c.cfg.pdf + "-year-" + y + ".pdf", c.cfg.en + " · Year " + y, c.cfg.es + " · Año " + y]);
  const WCODES = () => WK().map(c => c.code);
  const codes = () => (window.TD_CODES || []).map(String);
  const all = () => !codes().length;
  const has = x => all() || codes().some(c => c === x || c.startsWith(x + ":"));
  const okLv = l => all() || codes().includes(l) || codes().some(c => c.endsWith(":" + l));
  function list() {
    const out = [];
    if (has("A0")) out.push(B.START());
    LV.forEach(l => { if (all() || codes().includes(l)) out.push(B.SB(l)); });
    if (has("PET")) out.push(B.PET()); if (has("FCE")) out.push(B.FCE());
    LV.forEach(l => { if (okLv(l)) out.push(B.PIC(l)); });
    LV.forEach(l => { if (okLv(l)) out.push(B.WB(l)); });
    if (has("VOC")) out.push(B.VOC()); if (has("VERB")) out.push(B.VERB());
    WK().forEach(c => { if (codes().includes(c.code)) out.push(...wkBooks(c)); });
    if (!codes().length || codes().some(c => !WCODES().includes(c))) out.push(B.SPK());
    return out;
  }
  const esc = t => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const link = (b, main) => `<a class="pdfb-a${main ? " main" : ""}" href="${RAW + b[0]}" target="_blank" rel="noopener" download="${b[0]}">📥 ${esc(b[1])} <small>PDF · ${esc(b[2])}</small></a>`;
  function forView(id) {
    try {
      if (id === "book") { const c = window.BOOK && BOOK.state ? BOOK.state().c : ""; if (LV.includes(c)) return [B.SB(c)]; if (B[c]) return [B[c]()]; return []; }
      if (id === "starter") return [B.START()];
      if (id === "speak") return [B.SPK()];
      if (id === "vocab") { const l = typeof S !== "undefined" && S.voc ? S.voc.lv : "A1"; const pl = l === "PET" ? "B1" : l === "FCE" ? "B2" : l; const L2 = LV.includes(pl) ? pl : "A1"; return [B.PIC(L2), B.WB(L2), B.VOC()]; }
      if (id === "verbs") return [B.VERB()];
      if (id === "pet") return [B.PET(), B.SPK()];
      if (id === "fce") return [B.FCE(), B.SPK()];
      const wc = window.WORK && WORK.byView(id); if (wc) return wkBooks(wc);
    } catch (e) { }
    return null;
  }
  function bar(id) {
    const main = forView(id); if (!main) return "";
    const rest = list().filter(b => !main.some(m => m[0] === b[0]));
    return `<div class="pdfb" data-nowp data-pdfb="${id}:${main.map(m => m[0]).join(",")}"><div class="pdfb-row">${main.map(b => link(b, true)).join("")}</div>${rest.length ? `<details class="pdfb-more"><summary>📚 All PDF books · Todos los libros PDF (${rest.length + main.length})</summary><div class="pdfb-row">${rest.map(b => link(b)).join("")}</div><p class="pdfb-note">Print them or study offline. · Imprímelos o estudia sin internet.</p></details>` : ""}</div>`;
  }
  const IDS = () => ["book", "starter", "speak", "vocab", "verbs", "pet", "fce", ...(window.WORK ? WORK.courses.map(c => c.view) : ["farm"])];
  let busy = false;
  function ensure() {
    if (busy) return; busy = true;
    try {
      IDS().forEach(id => {
        const sec = document.getElementById("v-" + id); if (!sec || !sec.firstElementChild) return;
        const html = bar(id); const cur = sec.querySelector(":scope > .pdfb");
        const sig = (html.match(/data-pdfb="([^"]*)"/) || [])[1];
        if (cur && cur.dataset.pdfb === sig) { if (sec.firstElementChild !== cur && sec.querySelector(":scope > .head")) { } return; }
        if (cur) cur.remove();
        if (!html) return;
        const head = sec.querySelector(":scope > .head");
        if (head) head.insertAdjacentHTML("afterend", html); else sec.insertAdjacentHTML("afterbegin", html);
      });
    } catch (e) { }
    busy = false;
  }
  let t = 0; const mo = new MutationObserver(() => { if (busy) return; clearTimeout(t); t = setTimeout(ensure, 60); });
  mo.observe(document.body, { childList: true, subtree: true });
  setTimeout(ensure, 300);
  window.PDFBOOKS = { list, RAW };
  const css = document.createElement("style");
  css.textContent = `.pdfb{margin:8px 0 14px}.pdfb-row{display:flex;flex-wrap:wrap;gap:8px}
.pdfb-a{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:6px 12px;border:1px solid var(--line,#ddd);border-radius:12px;background:var(--surface,#fff);color:inherit;text-decoration:none;font-weight:700;font-size:.9rem}
.pdfb-a small{font-weight:400;color:var(--muted,#666)}.pdfb-a.main{border-color:#1c7ed6;background:#1c7ed612}
.pdfb-a:hover{border-color:#1c7ed6}.pdfb-more{margin-top:8px}.pdfb-more summary{cursor:pointer;font-weight:700;font-size:.9rem;color:var(--muted,#555)}.pdfb-more .pdfb-row{margin-top:8px}.pdfb-note{font-size:.8rem;color:var(--muted,#666);margin:6px 0 0}
@media print{.pdfb{display:none!important}}`;
  document.head.appendChild(css);
})();
