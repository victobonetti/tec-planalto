/* TEC Planalto: modo de leitura com a cara da Constituição no site do Planalto e referências
   clicáveis aos artigos da CF e da Constituição de Santa Catarina.
   - Liga e desliga: botão ¶ no canto, ícone da extensão ou Alt+P. A preferência fica em chrome.storage.
   - "art. 167, VII", "arts. 5º, XI", "CE/SC, art. 85" viram link: o mouse mostra o texto vigente,
     o clique fixa o quadro. Inciso e alínea vêm com o caput (ou o parágrafo) que lhes dá sentido.
   Nada é enviado a lugar nenhum: o texto da lei vem do arquivo lei.json da própria extensão. */
(() => {
  "use strict";
  const html = document.documentElement;
  const CHAVE = "tecf";

  /* ---------------- liga / desliga ---------------- */
  let botao = null;
  /* ---------------- aba do navegador ----------------
     Ligado: título "Constituição" (como a página da CF no Planalto) e ícone §. Desligado: volta o do site.
     O TEC troca o título a cada questão; o observador reaplica o nosso. */
  const TITULO = "Constituição";
  const FAVICON = "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#fff"/>' +
    '<text x="16" y="25" font-family="Arial,Helvetica,sans-serif" font-size="27" font-weight="700" text-anchor="middle" fill="#000">§</text></svg>');
  let ligado = false, tituloOriginal = null, obsTitulo = null;
  function aba(on) {
    const head = document.head;
    if (!head) return;
    if (on) {
      if (tituloOriginal === null) tituloOriginal = document.title;
      if (document.title !== TITULO) document.title = TITULO;
      // Ícones do site ficam inertes (rel trocado) para o navegador usar o nosso.
      for (const l of head.querySelectorAll('link[rel~="icon"]:not(#tecf-icone)')) { l.dataset.tecfRel = l.rel; l.rel = "tecf-icone-original"; }
      if (!document.getElementById("tecf-icone")) {
        const l = document.createElement("link"); l.id = "tecf-icone"; l.rel = "icon"; l.type = "image/svg+xml"; l.href = FAVICON; head.appendChild(l);
      }
      if (!obsTitulo) {
        obsTitulo = new MutationObserver(() => {
          if (!ligado) return;
          if (document.title !== TITULO) { tituloOriginal = document.title; document.title = TITULO; }
          // O site pode recolocar os próprios ícones ao navegar.
          for (const l of head.querySelectorAll('link[rel~="icon"]:not(#tecf-icone)')) { l.dataset.tecfRel = l.rel; l.rel = "tecf-icone-original"; }
        });
        obsTitulo.observe(head, { childList: true, subtree: true, characterData: true });
      }
    } else {
      if (tituloOriginal !== null && document.title === TITULO) document.title = tituloOriginal;
      tituloOriginal = null;
      document.getElementById("tecf-icone")?.remove();
      for (const l of head.querySelectorAll('link[rel="tecf-icone-original"]')) { l.rel = l.dataset.tecfRel || "icon"; delete l.dataset.tecfRel; }
    }
  }

  const aplicar = (on) => {
    ligado = on;
    html.classList.toggle("tecf", on);
    aba(on);
    if (document.body) semDicas();
    if (botao) {
      botao.setAttribute("aria-pressed", String(on));
      botao.setAttribute("aria-label", on ? "Sair do modo Planalto (Alt+P)" : "Modo Planalto (Alt+P)");
    }
  };
  const alternar = () => chrome.storage.local.get({ [CHAVE]: true }, (r) => chrome.storage.local.set({ [CHAVE]: !r[CHAVE] }));
  chrome.storage.local.get({ [CHAVE]: true }, (r) => aplicar(r[CHAVE]));
  chrome.storage.onChanged.addListener((m, area) => { if (area === "local" && CHAVE in m) aplicar(m[CHAVE].newValue); });
  addEventListener("keydown", (e) => {
    if (!e.altKey || e.ctrlKey || e.metaKey || e.code !== "KeyP") return;
    if (e.target.closest && e.target.closest("input, textarea, [contenteditable='true']")) return;
    e.preventDefault(); alternar();
  }, true);

  /* ---------------- referências ---------------- */
  // Onde procurar: enunciado, alternativas, comentário do professor, fórum e teoria.
  const ALVOS = [
    ".questao-enunciado-texto", ".questao-enunciado-alternativa-texto",
    ".questao-complementos-comentario-conteudo-texto", ".discussao-comentario-post-texto", ".conteudo-aba-teoria",
  ].join(",");
  // Mesmo padrão da Campanha Constitucional do portal, aceitando também "artigo 5º".
  const REF_RE = /(CE\/SC,\s*)?\b([Aa])(?:rts?\.|rtigos?)\s*(\d+(?:-[A-Z])?)(?![\d-])(?!º?\s*(?:a|e)\s*\d)º?((?:,\s*(?:§§?\s*\d+º?(?:\s*e\s*\d+º?)?|parágrafo único|caput|[IVXLC]+(?:-[A-Z])?(?![a-zà-ú])|[a-z](?=[).;:,]|$)))*)(\s+da\s+(?:CE\/SC|CF|Constituição Federal|Constituição da República))?/g;
  // Depois da referência: "da Lei 11.417", "do ADCT", "do CTN"... não é a CF.
  const OUTRA_DEPOIS = /^,?\s*(?:d[aoe]s?|desta|deste|dessa|desse|nesta|neste|na|no)\s+(?:Lei|LC\b|L\.|Decreto|CTN|C[óo]digo|ADCT|Ato das Disposi|Regimento|Estatuto|Resolu|Emenda|EC\b|Instru|Portaria|CLT|CPC|CPP|CP\b|CC\b|LRF|LINDB|Conven|Carta|Constitui[çc][ãa]o (?:Estadual|do Estado|Paulista|Mineira|Fluminense|Ga[úu]cha|de \d))/i;
  const CE_DEPOIS = /^,?\s*da\s+(?:Constitui[çc][ãa]o (?:do Estado de Santa Catarina|Catarinense|de Santa Catarina)|CE\/SC|CESC)\b/i;
  // Antes da referência: "Lei 8.112, art. 5º", "CTN, art. 142", "ADCT, art. 113".
  // Sensível a maiúsculas: "nos termos da lei, art. 5º" não é outra lei.
  const OUTRA_ANTES = /(?:\bLei\b|\bLC\b|Decreto|CTN|ADCT|C[óo]digo|CLT|Regimento|Estatuto|Resolu[çc][ãa]o|Emenda Constitucional)[^.;:()\n]{0,25}$/;
  const AUTONOMOS = new Set(["cf:5", "cf:37"]); // incisos que são frases completas: dispensam o caput

  let LEI = null;
  fetch(chrome.runtime.getURL("lei.json")).then((r) => r.json()).then((d) => { LEI = d; varrer(); }).catch(() => {});

  const NIVEL = (l) => /^(§|Parágrafo único)/.test(l) ? 1 : /^[IVXLC]+(?:-[A-Z])?\s*[-–]/.test(l) ? 2 : /^[a-z]\)/.test(l) ? 3 : 0;

  function parseRef(m, depois) {
    const src = m[1] || /CE\/SC/.test(m[5] || "") || CE_DEPOIS.test(depois) ? "ce" : "cf";
    const partes = (m[4] || "").split(",").map((x) => x.trim()).filter(Boolean)
      .map((x) => x.replace(/^§§/, "§").replace(/\s*e\s*\d+º?$/, ""));
    return { src, art: m[3], partes };
  }

  /* Trecho do dispositivo: contexto (caput, parágrafo, inciso da alínea) + o dispositivo e seus filhos. */
  function trecho(src, art, partes) {
    const L = LEI && LEI[src] && LEI[src][art];
    if (!L) return null;
    let alvo = 0, ini = 1, fim = L.length;
    const fimBloco = (j, nv) => { let k = j + 1; while (k < L.length && NIVEL(L[k]) > nv) k++; return k; };
    const primeiroPar = L.findIndex((l, k) => k > 0 && NIVEL(l) === 1);
    if (primeiroPar > 0) fim = primeiroPar;
    const cadeia = [];
    for (const p of partes) {
      let re, nv;
      if (/^§/.test(p)) { re = new RegExp("^§\\s*" + p.match(/\d+/)[0] + "(?:º|°|\\.|\\s|-)"); nv = 1; ini = 1; fim = L.length; }
      else if (/^par/i.test(p)) { re = /^Parágrafo único/; nv = 1; ini = 1; fim = L.length; }
      else if (p === "caput") { alvo = 0; continue; }
      else if (/^[IVXLC]/.test(p)) { re = new RegExp("^" + p + "\\s*[-–]"); nv = 2; }
      else { re = new RegExp("^" + p + "\\)"); nv = 3; }
      let j = -1;
      for (let k = ini; k < fim; k++) if (re.test(L[k])) { j = k; break; }
      if (j < 0) return null;
      cadeia.push(j); alvo = j; ini = j + 1; fim = fimBloco(j, nv);
    }
    const ctx = [];
    if (alvo > 0 && NIVEL(L[alvo]) >= 2) {
      const dentroDePar = cadeia.some((j) => NIVEL(L[j]) === 1);
      if (!dentroDePar && !AUTONOMOS.has(src + ":" + art)) ctx.push(L[0]);
      for (const j of cadeia.slice(0, -1)) ctx.push(L[j]);
    }
    const nv = NIVEL(L[alvo]), corpo = [L[alvo]];
    const ate = alvo === 0 ? (primeiroPar > 0 ? primeiroPar : L.length) : fimBloco(alvo, nv);
    for (let k = alvo + 1; k < ate && corpo.length < 14; k++) corpo.push(L[k]);
    if (ate - alvo > 14) corpo.push("…");
    return { ctx, corpo };
  }

  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function linkar(raiz) {
    const w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => {
        const p = n.parentElement;
        if (!p || p.closest(".tecf-ref, #tecf-pop, script, style, textarea, input, a, button")) return NodeFilter.FILTER_REJECT;
        REF_RE.lastIndex = 0;
        return REF_RE.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    const nos = [];
    while (w.nextNode()) nos.push(w.currentNode);
    for (const n of nos) {
      const t = n.nodeValue, f = document.createDocumentFragment();
      let i = 0, m;
      REF_RE.lastIndex = 0;
      while ((m = REF_RE.exec(t))) {
        const antes = t.slice(Math.max(0, m.index - 40), m.index), depois = t.slice(m.index + m[0].length, m.index + m[0].length + 60);
        const explicitaCF = /CF|Federal|República/.test(m[5] || "");
        if (!explicitaCF && !m[1]) {
          if (OUTRA_DEPOIS.test(depois) && !CE_DEPOIS.test(depois)) continue;
          if (OUTRA_ANTES.test(antes)) continue;
          // "“Art. 1º As concessionárias..." é cabeçalho de lei citada no enunciado, não a CF.
          if (m[2] === "A" && !m[4] && /["“'‘]\s*$/.test(antes)) continue;
        }
        const r = parseRef(m, depois);
        if (!LEI[r.src] || !LEI[r.src][r.art]) continue;
        f.append(t.slice(i, m.index));
        const sp = document.createElement("span");
        sp.className = "tecf-ref"; sp.tabIndex = 0; sp.textContent = m[0];
        sp.dataset.ref = JSON.stringify(r);
        sp.setAttribute("role", "button");
        sp.setAttribute("aria-label", "Ver o texto de " + m[0].trim());
        f.append(sp);
        i = m.index + m[0].length;
      }
      if (i) { f.append(t.slice(i)); n.replaceWith(f); }
    }
  }

  // O site separa os parágrafos com nós de texto só de &nbsp;, que viram linhas em branco.
  // Embrulhados em .tecf-vazio, somem no modo Planalto e voltam ao desligar.
  const BLOCO = /^(P|DIV|UL|OL|LI|TABLE|BLOCKQUOTE|H[1-6]|PRE|FIGURE)$/;
  function esconderVazios(raiz) {
    for (const n of [...raiz.childNodes]) {
      if (n.nodeType !== 3 || n.nodeValue.trim() || !n.nodeValue.includes("\u00a0")) continue;
      const a = n.previousElementSibling, d = n.nextElementSibling;
      if (!(a && BLOCO.test(a.tagName)) && !(d && BLOCO.test(d.tagName))) continue;
      const sp = document.createElement("span"); sp.className = "tecf-vazio"; n.replaceWith(sp); sp.append(n);
    }
  }

  /* ---------------- ícones viram palavras ----------------
     No modo Planalto não há ícones: cada botão que era só ícone ganha um rótulo (data-tecf-rotulo,
     mostrado pelo CSS) e as ferramentas que não servem à leitura somem (data-tecf-ocultar). */
  const ROTULOS = [
    ["abrirComplemento('comentario')", "G"], ["abrirComplemento('teoria')", "Teoria"],
    ["abrirComplemento('discussao')", ""], ["abrirComplemento('desempenho')", "Desempenho"],
    ["abrirComplemento('detalhes')", "Informações"], ["exibirFavorita", "Favoritar"], ["exibirAnotacao", "Anotar"],
    ["abrirQuestaoPorNumero", "Ir para…"], ["questaoAnterior", "<"], ["questaoSeguinte", ">"],
    ["questaoAleatoria", "Aleatória"], ["questaoNaoResolvida", "Não resolvida"], ["questaoDoTopicoAnterior", "<<"],
    ["questaoDoTopicoSeguinte", ">>"], ["desfazerUltimaQuestao", "Desfazer"], ["questaoProximaFavorita", "Próxima favorita"],
    ["questaoProximaAnotada", "Próxima anotada"], ["votarComentarioAprovar", "Gostei"], ["votarComentarioRejeitar", "Não gostei"],
    ["fecharComplemento", "Fechar"],
  ];
  const OCULTAR = ["alternarExibirAssunto(false)", "alternarExibirConcurso(false)", "toggleModoLeitura", "mostrarDropdownExpandirQuestao",
    "expandirTamanhoHorizontal", "reduzirTamanhoHorizontal", "voltarTamanhoHorizontalPadrao"];
  const limparTitulo = (t) => t.replace(/\s*-\s*Atalho:.*$/i, "").replace(/\s*\((?:Tecla|Seta)[^)]*\)/i, "")
    .replace(/\s+deste caderno\.?$/i, "").replace(/^menu opções$/i, "Mais opções").trim();
  function rotular() {
    for (const el of document.querySelectorAll("button, a, [ng-click]")) {
      if (el.id === "tecf-botao" || el.closest("#tecf-pop, #tec-cookie-banner, .questao-enunciado-alternativas")) continue;
      const ng = el.getAttribute("ng-click") || "", titulo = el.getAttribute("title") || el.dataset.tecfTitulo || el.getAttribute("uib-tooltip") || "";
      if (OCULTAR.some((x) => ng.includes(x)) || /^Foto do usuário/i.test(titulo)) { el.setAttribute("data-tecf-ocultar", ""); continue; }
      const ind = el.querySelector(".questao-complementos-menu-indicador");
      const proprio = (el.textContent.replace(ind ? ind.textContent : "", "")).trim();
      const mapa = ROTULOS.find(([k]) => ng.includes(k));
      let r = null;
      if (mapa && !proprio) r = mapa[1] || (ng.includes("discussao") && !ind ? "(0)" : null);
      else if (!proprio && titulo) r = limparTitulo(titulo);
      else if (!proprio && el.classList.contains("botao-fechar")) r = "Fechar";
      if (r && el.getAttribute("data-tecf-rotulo") !== r) el.setAttribute("data-tecf-rotulo", r);
      else if (!r && mapa && el.hasAttribute("data-tecf-rotulo")) el.removeAttribute("data-tecf-rotulo");
    }
  }

  // Ícones vazios (glyphicon, font awesome, sprites "icone") somem; os que têm texto dentro, como o
  // contador do fórum, ficam.
  const ICONE = /(^|\s)(glyphicon|fa|fa-[\w-]+|icone[\w-]*|icon-[\w-]+)(\s|$)/;
  function esconderIcones() {
    for (const el of document.querySelectorAll("i, span, em, b")) {
      if (el.hasAttribute("data-tecf-ocultar") || !ICONE.test(el.className || "")) continue;
      if (el.textContent.trim() || el.hasAttribute("ng-click") || el.closest("#tecf-pop, #tec-cookie-banner")) continue;
      el.setAttribute("data-tecf-ocultar", "");
    }
  }

  // Sem dicas ao passar o mouse: com o modo ligado, o title sai (guardado em data-tecf-titulo) e volta ao desligar.
  function semDicas() {
    if (ligado) for (const el of document.body.querySelectorAll("[title]")) { el.dataset.tecfTitulo = el.title; el.removeAttribute("title"); }
    else for (const el of document.body.querySelectorAll("[data-tecf-titulo]")) { el.title = el.dataset.tecfTitulo; delete el.dataset.tecfTitulo; }
  }

  function varrer() {
    if (!document.body) return;
    semDicas();
    esconderIcones();
    rotular();
    document.querySelectorAll(ALVOS).forEach((el) => { esconderVazios(el); if (LEI) linkar(el); });
  }

  /* ---------------- quadro com o texto ---------------- */
  let pop = null, fixo = null, timer = null;
  function quadro() {
    if (pop) return pop;
    pop = document.createElement("div");
    pop.id = "tecf-pop"; pop.setAttribute("role", "dialog"); pop.hidden = true;
    document.body.appendChild(pop);
    pop.addEventListener("mouseenter", () => clearTimeout(timer));
    pop.addEventListener("mouseleave", () => { timer = setTimeout(() => fechar(false), 200); });
    return pop;
  }
  function mostrar(el, fixar) {
    const r = JSON.parse(el.dataset.ref), tx = trecho(r.src, r.art, r.partes), q = quadro();
    const nome = (r.src === "ce" ? "CE/SC, art. " : "CF, art. ") + r.art + (r.partes.length ? ", " + r.partes.join(", ") : "");
    const linha = (l, cls) => `<p class="tecf-l n${NIVEL(l)}${cls ? " " + cls : ""}">${esc(l)}</p>`;
    q.innerHTML = `<div class="tecf-h"><b>${esc(nome)}</b><button class="tecf-x" aria-label="Fechar">×</button></div>` +
      (tx
        ? tx.ctx.map((l) => linha(l, "tecf-ctx")).join("") + (tx.ctx.length ? '<p class="tecf-l tecf-sep">…</p>' : "") + tx.corpo.map((l) => linha(l)).join("")
        : '<p class="tecf-l">Trecho não encontrado neste artigo.</p>') +
      "";
    q.hidden = false; fixo = fixar ? el : null;
    const b = el.getBoundingClientRect(), w = Math.min(520, innerWidth - 24);
    q.style.width = w + "px";
    q.style.left = Math.min(Math.max(12, b.left), innerWidth - w - 12) + "px";
    q.style.top = b.bottom + 8 + "px";
    const h = q.offsetHeight;
    if (b.bottom + 8 + h > innerHeight - 8 && b.top - h - 8 > 8) q.style.top = b.top - h - 8 + "px";
    q.querySelector(".tecf-x").onclick = (e) => { e.stopPropagation(); fechar(true); };
  }
  const fechar = (forca) => { if (pop && (forca || !fixo)) { pop.hidden = true; if (forca) fixo = null; } };

  // Captura: o clique na referência não pode marcar a alternativa nem acionar o site.
  document.addEventListener("click", (e) => {
    const el = e.target.closest && e.target.closest(".tecf-ref");
    if (el) { e.preventDefault(); e.stopPropagation(); mostrar(el, true); return; }
    if (fixo && !(e.target.closest && e.target.closest("#tecf-pop"))) fechar(true);
  }, true);
  document.addEventListener("mouseover", (e) => {
    const el = e.target.closest && e.target.closest(".tecf-ref");
    if (!el || fixo) return;
    clearTimeout(timer); timer = setTimeout(() => mostrar(el, false), 120);
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest && e.target.closest(".tecf-ref")) { clearTimeout(timer); timer = setTimeout(() => fechar(false), 200); }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fechar(true);
    if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("tecf-ref")) { e.preventDefault(); mostrar(e.target, true); }
  });
  addEventListener("scroll", () => { if (!fixo) fechar(false); }, { passive: true });

  /* ---------------- início ---------------- */
  function iniciar() {
    botao = document.createElement("button");
    botao.id = "tecf-botao"; botao.type = "button"; botao.textContent = "¶";
    botao.onclick = alternar;
    document.body.appendChild(botao);
    chrome.storage.local.get({ [CHAVE]: true }, (r) => aplicar(r[CHAVE]));
    // O TEC troca a questão sem recarregar a página: novas questões e comentários são varridos aqui.
    let pend = null;
    new MutationObserver(() => { clearTimeout(pend); pend = setTimeout(varrer, 150); })
      .observe(document.body, { childList: true, subtree: true });
    varrer();
  }
  if (document.body) iniciar(); else addEventListener("DOMContentLoaded", iniciar, { once: true });
})();
