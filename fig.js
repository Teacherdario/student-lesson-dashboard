/* IPA -> Spanish-friendly figured pronunciation (pronunciación figurada) */
window.FIGURADA = (function () {
  const MULTI = ["tʃ", "dʒ", "eɪ", "aɪ", "ɔɪ", "əʊ", "oʊ", "aʊ", "ɪə", "eə", "ʊə", "iː", "ɑː", "ɔː", "uː", "ɜː", "ɝː"];
  const V = { "iː": "ii", "ɪ": "i", "i": "i", "e": "e", "ɛ": "e", "æ": "a", "ɑː": "aa", "ɑ": "a", "ɒ": "o", "ɔː": "oo", "ɔ": "o", "ʊ": "u", "uː": "uu", "u": "u", "ʌ": "a", "ɜː": "er", "ɝː": "er", "ɝ": "er", "ɚ": "er", "ə": "e", "ɐ": "a", "ᵻ": "i", "eɪ": "ei", "aɪ": "ai", "ɔɪ": "oi", "əʊ": "ou", "oʊ": "ou", "aʊ": "au", "ɪə": "ir", "eə": "er", "ʊə": "ur", "a": "a", "o": "o" };
  const C = { "p": "p", "b": "b", "t": "t", "d": "d", "k": "k", "g": "g", "ɡ": "g", "f": "f", "v": "v", "θ": "z", "ð": "d", "s": "s", "z": "s", "ʃ": "sh", "ʒ": "sh", "h": "j", "tʃ": "ch", "dʒ": "y", "m": "m", "n": "n", "ŋ": "ng", "l": "l", "ɫ": "l", "r": "r", "ɹ": "r", "j": "y", "w": "u", "x": "j", "ʔ": "" };
  const ONSET2 = ["pl", "pr", "tr", "kl", "kr", "bl", "br", "dr", "gr", "gl", "fr", "fl", "θr", "ʃr", "st", "sp", "sk", "sm", "sn", "sw", "tw", "kw", "sl", "dw", "pj", "bj", "kj", "fj", "mj", "nj", "hj", "vj"];
  function tokens(w) {
    const out = []; let i = 0;
    while (i < w.length) {
      const ch = w[i];
      if (ch === "ˈ" || ch === "ˌ") { out.push({ s: ch }); i++; continue; }
      if (ch === "ː" || ch === "̩" || ch === "(" || ch === ")" || ch === "." || ch === "‿" || ch === "̯") { i++; continue; }
      let m = MULTI.find(x => w.startsWith(x, i));
      const p = m || ch; i += p.length;
      if (V[p] != null) out.push({ v: p });
      else if (C[p] != null) out.push({ c: p });
    }
    return out;
  }
  function word(ipa, phrase) {
    const tk = tokens(ipa);
    const last = tk[tk.length - 1], prev = tk[tk.length - 2];
    if (last && prev && last.c && /^[lnm]$/.test(last.c) && prev.c) tk.splice(tk.length - 1, 0, { v: "ə" });
    const nuc = tk.map((t, i) => t.v ? i : -1).filter(i => i >= 0);
    if (!nuc.length) return tk.map(t => C[t.c] || "").join("");
    const cuts = []; // index where a new syllable starts
    for (let n = 1; n < nuc.length; n++) {
      const a = nuc[n - 1], b = nuc[n]; const mid = [];
      for (let i = a + 1; i < b; i++) mid.push(i);
      const st = mid.find(i => tk[i].s);
      if (st != null) { cuts.push(st); continue; }
      const cons = mid.filter(i => tk[i].c);
      if (cons.length === 0) { cuts.push(b); continue; }
      if (cons.length === 1) { cuts.push(cons[0]); continue; }
      const l2 = tk[cons[cons.length - 2]].c + tk[cons[cons.length - 1]].c;
      cuts.push(ONSET2.includes(l2) ? cons[cons.length - 2] : cons[cons.length - 1]);
    }
    const syl = []; let start = 0;
    [...cuts, tk.length].forEach(c => { syl.push(tk.slice(start, c)); start = c; });
    const hasStress = tk.some(t => t.s === "ˈ");
    return syl.map((s, si) => {
      const stressed = s.some(t => t.s === "ˈ") || (syl.length === 1 && (s.some(t => t.s === "ˌ") || (!hasStress && !phrase)));
      let txt = "";
      s.forEach((t, k) => {
        if (t.v) { let x = V[t.v]; if (t.v === "ə" && si === 0 && !txt) x = "a"; txt += x; }
        else if (t.c) {
          let x = C[t.c]; const nx = s.slice(k + 1).find(q => q.v || q.c);
          if (t.c === "g" || t.c === "ɡ") { if (nx && nx.v && /^[ei]/.test(V[nx.v])) x = "gu"; }
          if (t.c === "w" && nx && nx.v && /^u/.test(V[nx.v])) x = "";
          if (t.c === "dʒ" && !nx && si === syl.length - 1) x = "ch";
          txt += x;
        }
      });
      return stressed ? txt.toUpperCase() : txt;
    }).filter(Boolean).join("-");
  }
  return function (ipa) {
    if (!ipa) return "";
    const ws = String(ipa).replace(/[\/\[\]]/g, "").split(/[\s,]+/).filter(Boolean); const ph = ws.length > 1 && /ˈ/.test(ipa);
    return ws.map(w => word(w, ph)).join(" ");
  };
})();
