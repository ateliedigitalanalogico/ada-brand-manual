/* ============================================================
   ADA - Manual de Marca - Scripts Globais
   v2.1 - Arquitetura multi-pagina + infinite scroll
   ============================================================ */


/* ------------------------------------------------------------
   Utilitarios compartilhados
   ------------------------------------------------------------ */

/**
 * Ativa um painel de preview trocavel (.ppanel) e marca o botao ativo.
 * Usado na secao 01 para alternar modos de cor.
 */
function showP(name, btn) {
  document.querySelectorAll('.ppanel').forEach(function(p) {
    p.classList.remove('on');
  });
  document.querySelectorAll('.ptab').forEach(function(b) {
    b.classList.remove('on');
  });
  var panel = document.getElementById('pp-' + name);
  if (panel) panel.classList.add('on');
  if (btn)   btn.classList.add('on');
}

/**
 * Copia o textContent de um elemento para a area de transferencia.
 * Exibe feedback visual no botao por 2 segundos.
 */
function cp(id, btn) {
  var el = document.getElementById(id);
  if (!el) return;
  var text = el.textContent.trim();
  navigator.clipboard.writeText(text).then(function() {
    var original = btn.textContent;
    btn.textContent = 'Copiado';
    btn.classList.add('done');
    setTimeout(function() {
      btn.textContent = original;
      btn.classList.remove('done');
    }, 2000);
  });
}

/**
 * Copia o textContent de um elemento — variante para prompts.
 * Exibe feedback de cor no botao.
 */
function cpPrompt(id, btn) {
  var el = document.getElementById(id);
  if (!el) return;
  navigator.clipboard.writeText(el.textContent.trim()).then(function() {
    var original = btn.textContent;
    btn.textContent = 'Copiado';
    btn.style.color = 'rgba(100,255,120,.6)';
    setTimeout(function() {
      btn.textContent = original;
      btn.style.color = '';
    }, 2000);
  });
}


/* ------------------------------------------------------------
   Navegacao — menu dropdown
   Item ativo ja vem marcado via classe .active no HTML gerado.
   ------------------------------------------------------------ */

(function() {
  var toggle   = document.getElementById('nav-toggle');
  var dropdown = document.getElementById('nav-dropdown');
  if (!toggle || !dropdown) return;

  function closeMenu() {
    toggle.classList.remove('open');
    dropdown.classList.remove('open');
  }

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('open');
    dropdown.classList.toggle('open');
  });

  dropdown.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-drop-item')) closeMenu();
  });

  var navCurrent = document.getElementById('nav-current');
  if (navCurrent) {
    navCurrent.addEventListener('click', function() {
      toggle.classList.toggle('open');
      dropdown.classList.toggle('open');
    });
  }
})();


/* ------------------------------------------------------------
   Taglines animadas — crossfade duplo
   Funciona na capa (ctag-a / ctag-b) e na secao 07 (.tagline-cycle)
   ------------------------------------------------------------ */

(function() {
  var TAGS = [
    'ANTES DA IA.', 'ANTES DO PROMPT.', 'ANTES DO IMERSIVO.',
    'ANTES DO MAPPING.', 'ANTES DO ALGORITMO.', 'ANTES DA EXPERIÊNCIA.'
  ];

  /* -- Capa: crossfade entre dois slots -- */
  var ta   = document.getElementById('ctag-a');
  var tb   = document.getElementById('ctag-b');
  var idx  = 0;
  var slot = 'a';

  function showTag(text, el) {
    el.textContent = text;
    requestAnimationFrame(function() {
      requestAnimationFrame(function() { el.classList.add('on'); });
    });
  }

  function nextCoverTag() {
    var out = (slot === 'a') ? ta : tb;
    var inn = (slot === 'a') ? tb : ta;
    idx  = (idx + 1) % TAGS.length;
    out.classList.remove('on');
    setTimeout(function() {
      showTag(TAGS[idx], inn);
      slot = (slot === 'a') ? 'b' : 'a';
    }, 900);
  }

  if (ta && tb) {
    showTag(TAGS[0], ta);
    setInterval(nextCoverTag, 3800);
  }

  /* -- Secao 01 e 07: .tagline-cycle -- */
  if (document.querySelector('.tagline-cycle')) {
    startTagCycle(3);
  }
})();


/* ------------------------------------------------------------
   Secao 07 — controle de velocidade
   ------------------------------------------------------------ */

var _tagIdx = 0;
var _TAGS = [
  'ANTES DA IA.', 'ANTES DO PROMPT.', 'ANTES DO IMERSIVO.',
  'ANTES DO MAPPING.', 'ANTES DO ALGORITMO.', 'ANTES DA EXPERIÊNCIA.'
];

/** Inicia (ou reinicia) o ciclo de troca de taglines com a duracao dada em segundos.
    Fade out -> troca texto -> fade in via CSS transition (opacity 0.3s em .tagline-cycle). */
function startTagCycle(durSec) {
  clearInterval(window._tagTimer);
  var fadeMs = 300;
  window._tagTimer = setInterval(function() {
    _tagIdx = (_tagIdx + 1) % _TAGS.length;
    var els = document.querySelectorAll('.tagline-cycle');
    els.forEach(function(el) { el.style.opacity = '0'; });
    setTimeout(function() {
      els.forEach(function(el) {
        el.textContent = _TAGS[_tagIdx];
        el.style.opacity = '1';
      });
    }, fadeMs);
  }, durSec * 1000);
}

/** Aplica nova velocidade de animacao (botoes da secao 07). */
function setSpd(sec, btn) {
  document.querySelectorAll('.spd-btn').forEach(function(b) {
    b.classList.remove('on');
  });
  btn.classList.add('on');
  document.documentElement.style.setProperty('--dur', sec + 's');
  var val = document.getElementById('spd-val');
  if (val) val.textContent = sec + 's';
  startTagCycle(sec);
}


/* ------------------------------------------------------------
   Campo visual da capa — simbolos e linhas flutuantes
   ------------------------------------------------------------ */

(function() {
  var field = document.getElementById('cover-field');
  if (!field) return;

  var SYMS = ['+', '-', '.', 'x', 'o', '-', ';', ':'];

  function isSafe(x, y, W, H) {
    var dx = x - W / 2, dy = y - H / 2;
    return Math.sqrt(dx * dx + dy * dy) > Math.min(W, H) * 0.22;
  }

  function randSafe(W, H, px, py) {
    var x, y, t = 0;
    do {
      x = px + Math.random() * (W - px * 2);
      y = py + Math.random() * (H - py * 2);
      t++;
    } while (!isSafe(x, y, W, H) && t < 80);
    return { x: x, y: y };
  }

  function spawnSym() {
    var W  = field.offsetWidth  || window.innerWidth;
    var H  = field.offsetHeight || window.innerHeight;
    var p  = randSafe(W, H, 40, 40);
    var op = (0.18 + Math.random() * 0.22).toFixed(2);
    var sz = Math.random() < 0.4 ? 22 : Math.random() < 0.55 ? 18 : 15;
    var el = document.createElement('span');
    el.style.cssText = 'position:absolute;color:rgba(255,214,0,0);font-weight:200;font-family:monospace;line-height:1;white-space:nowrap;transform:translate(-50%,-50%);transition:color 2s ease;font-size:' + sz + 'px;left:' + p.x + 'px;top:' + p.y + 'px;';
    el.textContent = SYMS[Math.floor(Math.random() * SYMS.length)];
    field.appendChild(el);
    setTimeout(function() {
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          el.style.color = 'rgba(255,214,0,' + op + ')';
        });
      });
      setTimeout(function() {
        el.style.color = 'rgba(255,214,0,0)';
        setTimeout(function() {
          el.remove();
          setTimeout(spawnSym, 300 + Math.random() * 500);
        }, 2600);
      }, 5000 + Math.random() * 5000);
    }, 100 + Math.random() * 600);
  }

  function spawnCross() {
    var W  = field.offsetWidth  || window.innerWidth;
    var H  = field.offsetHeight || window.innerHeight;
    var ix, iy, t = 0;
    do {
      ix = 80  + Math.random() * (W - 160);
      iy = 50  + Math.random() * (H - 100);
      t++;
    } while (!isSafe(ix, iy, W, H) && t < 80);
    var op    = (0.14 + Math.random() * 0.18).toFixed(2);
    var hLen  = (0.22 + Math.random() * 0.30) * W;
    var hFrac = Math.random() < 0.5 ? 0.12 + Math.random() * 0.22 : 0.66 + Math.random() * 0.20;
    var elH   = document.createElement('div');
    elH.style.cssText = 'position:absolute;height:0;border-top:0.7px solid rgba(255,214,0,0);transition:border-color 2.4s ease;left:' + Math.max(5, ix - hLen * hFrac) + 'px;top:' + iy + 'px;width:' + hLen + 'px;';
    field.appendChild(elH);
    var vLen  = (0.18 + Math.random() * 0.28) * H;
    var vFrac = Math.random() < 0.5 ? 0.10 + Math.random() * 0.20 : 0.68 + Math.random() * 0.20;
    var elV   = document.createElement('div');
    elV.style.cssText = 'position:absolute;width:0;border-left:0.7px solid rgba(255,214,0,0);transition:border-color 2.4s ease;left:' + ix + 'px;top:' + Math.max(5, iy - vLen * vFrac) + 'px;height:' + vLen + 'px;';
    field.appendChild(elV);
    setTimeout(function() {
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          elH.style.borderColor = 'rgba(255,214,0,' + op + ')';
          elV.style.borderColor = 'rgba(255,214,0,' + op + ')';
        });
      });
      setTimeout(function() {
        elH.style.borderColor = 'rgba(255,214,0,0)';
        elV.style.borderColor = 'rgba(255,214,0,0)';
        setTimeout(function() {
          elH.remove();
          elV.remove();
          setTimeout(spawnCross, 300 + Math.random() * 500);
        }, 2600);
      }, 5000 + Math.random() * 5000);
    }, 100 + Math.random() * 600);
  }

  setTimeout(function() {
    for (var i = 0; i < 10; i++) setTimeout(spawnSym,  i * 200);
    for (var j = 0; j < 4;  j++) setTimeout(spawnCross, j * 380 + 400);
  }, 400);
})();


/* ------------------------------------------------------------
   Secao 08 — carrossel
   ------------------------------------------------------------ */

var _carousel = { current: 0, total: 4 };

function carouselMove(dir) {
  _carousel.current = (_carousel.current + dir + _carousel.total) % _carousel.total;
  _carouselUpdate();
}

function carouselGo(idx) {
  _carousel.current = idx;
  _carouselUpdate();
}

function _carouselUpdate() {
  var track = document.getElementById('carousel-track');
  if (track) track.style.transform = 'translateX(-' + (_carousel.current * 100) + '%)';
  document.querySelectorAll('.carousel-dot').forEach(function(d, i) {
    d.classList.toggle('on', i === _carousel.current);
  });
}


/* ------------------------------------------------------------
   Secao 08 — assinaturas de e-mail (copia HTML puro)
   ------------------------------------------------------------ */

/** Assinatura padrao (fundo branco, logo preto) */
function copyEmail() {
  var html = [
    '<table cellpadding="0" cellspacing="0" border="0" style="font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">',
    '<tr>',
    '<td style="padding-right:16px;vertical-align:middle;">',
    '<svg width="32" height="38" viewBox="225 225 126 126" xmlns="http://www.w3.org/2000/svg">',
    '<polygon fill="#000000" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/>',
    '<polygon fill="#000000" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/>',
    '<polygon fill="#000000" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/>',
    '</svg>',
    '</td>',
    '<td style="border-left:1px solid #E0E0E0;padding-left:16px;vertical-align:middle;">',
    '<div style="font-size:14px;font-weight:600;color:#111111;letter-spacing:0.02em;margin-bottom:2px;">Caio Fazolin</div>',
    '<div style="font-size:11px;color:#666666;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:6px;">Diretor Criativo · ADA</div>',
    '<div style="font-size:11px;color:#999999;letter-spacing:0.02em;margin-bottom:2px;">contato@ada.art.br</div>',
    '<div style="font-size:11px;color:#999999;letter-spacing:0.02em;margin-bottom:8px;">+55 11 98434-0084</div>',
    '<div style="font-size:10px;color:#BBBBBB;letter-spacing:0.08em;text-transform:uppercase;border-top:1px solid #EEEEEE;padding-top:6px;">ada.art.br · São Paulo · Brasil</div>',
    '</td>',
    '</tr>',
    '</table>'
  ].join('\n');

  navigator.clipboard.writeText(html).then(function() {
    var btn = document.getElementById('email-copy-btn');
    if (!btn) return;
    btn.textContent = 'Copiado';
    btn.classList.add('done');
    setTimeout(function() {
      btn.textContent = 'Copiar HTML da assinatura';
      btn.classList.remove('done');
    }, 2500);
  });
}

/** Assinatura escura (fundo preto, amarelo ADA) */
function copyEmailCor() {
  var html = '<table cellpadding="0" cellspacing="0" border="0" style="background:#000;padding:16px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;"><tr><td style="padding-right:14px;vertical-align:middle;"><svg width=\'32\' height=\'38\' viewBox=\'225 225 126 126\' xmlns=\'http://www.w3.org/2000/svg\'><polygon fill=\'#FFD600\' points=\'268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297\'/><polygon fill=\'#FFD600\' points=\'238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324\'/><polygon fill=\'#FFD600\' points=\'321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324\'/></svg></td><td style="border-left:1px solid rgba(255,214,0,.2);padding-left:14px;vertical-align:middle;"><div style="font-size:14px;font-weight:600;color:#FFD600;margin-bottom:2px;">Caio Fazolin</div><div style="font-size:11px;color:rgba(255,214,0,.55);text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px;">Diretor Criativo · ADA</div><div style="font-size:11px;color:rgba(255,255,255,.4);margin-bottom:2px;">contato@ada.art.br</div><div style="font-size:11px;color:rgba(255,255,255,.4);margin-bottom:8px;">+55 11 98434-0084</div><div style="font-size:10px;color:rgba(255,255,255,.2);text-transform:uppercase;letter-spacing:0.08em;border-top:1px solid rgba(255,214,0,.1);padding-top:6px;">ada.art.br · São Paulo · Brasil</div></td></tr></table>';
  navigator.clipboard.writeText(html).then(function() {
    var btn = event && event.target;
    if (!btn) return;
    btn.textContent = 'Copiado';
    btn.classList.add('done');
    setTimeout(function() { btn.textContent = 'Copiar HTML (com cor)'; btn.classList.remove('done'); }, 2500);
  });
}

/** Assinatura meia-noite (gradiente azul, blade) */
function copyEmailImagem() {
  var html = '<table cellpadding="0" cellspacing="0" border="0" style="font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;"><tr><td><div style="width:280px;height:70px;background:linear-gradient(135deg,#0A0F1E,#1E2D4A);padding:0 16px;display:flex;align-items:center;gap:10px;"><svg width=\'28\' height=\'34\' viewBox=\'225 225 126 126\' xmlns=\'http://www.w3.org/2000/svg\'><polygon fill=\'#4A7FD4\' points=\'268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297\'/><polygon fill=\'#4A7FD4\' points=\'238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324\'/><polygon fill=\'#4A7FD4\' points=\'321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324\'/></svg><div><div style="font-size:11px;font-weight:600;color:#4A7FD4;letter-spacing:0.08em;text-transform:uppercase;">CAIO FAZOLIN</div><div style="font-size:9px;color:rgba(74,127,212,.6);letter-spacing:0.06em;text-transform:uppercase;">Diretor Criativo · ADA · ada.art.br</div></div></div></td></tr></table>';
  navigator.clipboard.writeText(html).then(function() {
    var btn = event && event.target;
    if (!btn) return;
    btn.textContent = 'Copiado';
    btn.classList.add('done');
    setTimeout(function() { btn.textContent = 'Copiar HTML (com imagem)'; btn.classList.remove('done'); }, 2500);
  });
}

/** Alterna versao de assinatura de e-mail */
function showEmail(v, btn) {
  ['padrao', 'cor', 'imagem'].forEach(function(name) {
    var el = document.getElementById('email-v-' + name);
    if (el) el.style.display = (name === v) ? '' : 'none';
  });
  document.querySelectorAll('.email-tab').forEach(function(b) {
    b.classList.remove('on');
  });
  if (btn) btn.classList.add('on');
}


/* ------------------------------------------------------------
   Download de mockup como PNG (html2canvas)
   ------------------------------------------------------------ */

/**
 * Captura um elemento DOM como PNG e dispara download.
 * @param {string} elId     - ID do elemento a capturar
 * @param {string} filename - Nome do arquivo (sem extensao)
 * @param {number} w        - Largura alvo em pixels (define a escala de renderizacao)
 */
/* updateSigs — atualiza todas as assinaturas com os dados do formulário */
function updateSigs() {
  var name  = (document.getElementById('f-name')  || {value:''}).value;
  var role  = (document.getElementById('f-role')  || {value:''}).value;
  var email = (document.getElementById('f-email') || {value:''}).value;
  var phone = (document.getElementById('f-phone') || {value:''}).value;
  document.querySelectorAll('.s-name').forEach(function(el)  { el.textContent = name; });
  document.querySelectorAll('.s-role').forEach(function(el)  { el.textContent = role; });
  document.querySelectorAll('.s-email').forEach(function(el) { el.textContent = email; });
  document.querySelectorAll('.s-phone').forEach(function(el) { el.textContent = phone; });
  ['padrao','invertido','midnight','mono'].forEach(function(slug) {
    var tbl = document.querySelector('#sig-' + slug + ' table');
    var hid = document.getElementById('sig-' + slug + '-html');
    if (!tbl || !hid) return;
    hid.innerHTML = tbl.outerHTML
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  });
}

/* openSigHTML — abre assinatura em nova aba com SVG→PNG para Gmail */
function openSigHTML(hiddenId) {
  var el = document.getElementById(hiddenId);
  if (!el) return;
  var raw = el.innerHTML
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&middot;/g, '\u00b7').replace(/&atilde;/g, '\u00e3');
  var tmp = document.createElement('div');
  tmp.innerHTML = raw;
  var svgs = Array.from(tmp.querySelectorAll('svg'));
  var pending = svgs.length;
  function open() {
    var doc = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:40px;font-family:sans-serif;}</style></head><body>' + tmp.innerHTML + '</body></html>';
    window.open(URL.createObjectURL(new Blob([doc], {type:'text/html'})), '_blank');
  }
  if (!pending) { open(); return; }
  svgs.forEach(function(svg) {
    var w = parseInt(svg.getAttribute('width') || '32');
    var h = parseInt(svg.getAttribute('height') || w);
    var svgData = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg));
    var img = new Image();
    img.onload = function() {
      var c = document.createElement('canvas');
      c.width = w * 2; c.height = h * 2;
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      var p = document.createElement('img');
      p.src = c.toDataURL('image/png');
      p.width = w; p.height = h;
      svg.parentNode.replaceChild(p, svg);
      if (!--pending) open();
    };
    img.onerror = function() { if (!--pending) open(); };
    img.src = svgData;
  });
}

/* expandMock — amplia mockup HTML em overlay fullscreen */
function expandMock(el) {
  var ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.93);display:flex;align-items:center;justify-content:center;padding:32px;cursor:zoom-out;';
  var inner = document.createElement('div');
  inner.style.position = 'relative';
  var clone = el.cloneNode(true);
  clone.querySelectorAll('.expand-btn').forEach(function(b){b.remove();});
  var rect = el.getBoundingClientRect();
  var scale = Math.min(window.innerHeight * 0.88 / rect.height, window.innerWidth * 0.9 / rect.width);
  clone.style.transform = 'scale(' + scale + ')';
  clone.style.transformOrigin = 'top left';
  clone.style.width = rect.width + 'px';
  clone.style.height = rect.height + 'px';
  clone.style.cursor = 'default';
  inner.style.width  = (rect.width  * scale) + 'px';
  inner.style.height = (rect.height * scale) + 'px';
  inner.appendChild(clone);
  ov.appendChild(inner);
  ov.onclick = function(){ ov.remove(); };
  document.body.appendChild(ov);
}

function dlMock(elId, filename, w) {
  var el = document.getElementById(elId);
  if (!el || typeof html2canvas === 'undefined') {
    alert('Aguarde o carregamento completo da pagina.');
    return;
  }
  var btn = event && event.target;
  if (btn) { btn.textContent = 'Gerando...'; btn.disabled = true; }

  html2canvas(el, {
    scale: Math.max(w / el.offsetWidth, 2),
    useCORS: true,
    backgroundColor: null,
    logging: false
  }).then(function(canvas) {
    var link = document.createElement('a');
    link.download = filename + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    if (btn) { btn.textContent = '\u2193 Baixar PNG'; btn.disabled = false; }
  }).catch(function() {
    if (btn) { btn.textContent = '\u2193 Baixar PNG'; btn.disabled = false; }
    alert('Erro ao gerar imagem. Tente novamente.');
  });
}


/* ------------------------------------------------------------
   Moodboard interativo (secao 05)
   ------------------------------------------------------------ */

// Detectar se estamos em pages/ ou na raiz — usado por MB_POOL e pelo scroll infinito
var _inPages   = window.location.pathname.indexOf('/pages/') >= 0;
var _assetBase = _inPages ? '../' : '';

var MB_POOL = [
  'ADA_urbano_feixe_01.jpg',       'ADA_urbano_feixe_02.jpg',
  'ADA_urbano_feixe_03.jpg',       'ADA_urbano_feixe_04.jpg',
  'ADA_urbano_mapping_01.jpg',     'ADA_urbano_mapping_02.jpg',
  'ADA_urbano_mapping_03.jpg',     'ADA_urbano_mapping_04.jpg',
  'ADA_urbano_mapping_05.jpg',     'ADA_urbano_mapping_06.jpg',
  'ADA_urbano_mapping_07.jpg',     'ADA_urbano_mapping_08.jpg',
  'ADA_natural_rio_01.jpg',        'ADA_natural_rio_02.jpg',
  'ADA_natural_rio_03.jpg',        'ADA_natural_rio_04.jpg',
  'ADA_natural_floresta_01.jpg',   'ADA_natural_floresta_02.jpg',
  'ADA_natural_floresta_03.jpg',   'ADA_natural_floresta_04.jpg',
  'ADA_tecnico_concreto_01.jpg',   'ADA_tecnico_concreto_02.jpg',
  'ADA_tecnico_concreto_03.jpg',   'ADA_tecnico_concreto_04.jpg',
  'ADA_tecnico_pcb_01.jpg',        'ADA_tecnico_pcb_02.jpg',
  'ADA_tecnico_pcb_03.jpg',        'ADA_tecnico_pcb_04.jpg',
  'ADA_performance_01.jpg',        'ADA_performance_02.jpg',
  'ADA_performance_03.jpg',        'ADA_performance_04.jpg',
  'ADA_abstrato_linhas_01.jpg',    'ADA_abstrato_linhas_02.jpg',
  'ADA_abstrato_linhas_03.jpg',    'ADA_abstrato_linhas_04.jpg',
  'ADA_abstrato_particulas_01.jpg','ADA_abstrato_particulas_02.jpg',
  'ADA_abstrato_particulas_03.jpg','ADA_abstrato_particulas_04.jpg',
  'ADA_abstrato_triangulo_01.jpg', 'ADA_abstrato_triangulo_02.jpg',
  'ADA_abstrato_triangulo_03.jpg', 'ADA_abstrato_triangulo_04.jpg',
].map(function(f) { return _assetBase + 'assets/' + f; });

function _mbShuffle(arr) {
  var a = arr.slice(), i = a.length, j, t;
  while (i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}

/** Embaralha as imagens do moodboard aleatoriamente. */
function mbRegen() {
  var grid = document.getElementById('moodboard-grid');
  if (!grid) return;
  var imgs = grid.querySelectorAll('img');
  var pool = _mbShuffle(MB_POOL);
  imgs.forEach(function(img, idx) { img.src = pool[idx % pool.length]; });
}

/** Baixa o moodboard atual como PNG de alta resolucao. */
function mbDownload() {
  var grid = document.getElementById('moodboard-grid');
  if (!grid || typeof html2canvas === 'undefined') {
    alert('html2canvas nao disponivel');
    return;
  }
  var btn = document.getElementById('mb-dl');
  if (btn) btn.textContent = '\u2193 Gerando...';
  html2canvas(grid, { scale: 4, useCORS: true, allowTaint: true, backgroundColor: '#111' })
    .then(function(canvas) {
      var link = document.createElement('a');
      link.download = 'ADA_moodboard.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      if (btn) btn.textContent = '\u2193 Baixar';
    })
    .catch(function() {
      if (btn) btn.textContent = '\u2193 Baixar';
      alert('Erro ao gerar imagem. Verifique CORS das imagens.');
    });
}


/* ------------------------------------------------------------
   Infinite scroll bidirecional
   - Scroll para baixo: carrega proxima secao antes do rodape
   - Scroll para cima:  carrega secao anterior acima do topo,
     compensando o deslocamento de scroll para o usuario nao saltar
   - URL e nav atualizam via IntersectionObserver (scroll spy)
   ------------------------------------------------------------ */

(function() {

  // Prefixos dependem de onde o script esta sendo executado:
  //   pages/XX.html  -> secoes: 'XX.html'  | capa: '../index.html' | js: '../js/'
  //   index.html     -> secoes: 'pages/XX.html' | capa: 'index.html' | js: 'js/'
  var _pb = _inPages ? '' : 'pages/';      // prefixo para paginas de secao (nav/replaceState)
  var _rb = _inPages ? '../' : '';         // prefixo para raiz (index.html, js/, css/)

  // URL absoluta da raiz do site — capturada antes de qualquer history.replaceState.
  // fetch() resolve caminhos relativos contra window.location, que muda com replaceState.
  // Usar URLs absolutas garante que os fetches funcionam independente da URL atual.
  var _siteRoot = (function() {
    var a = document.createElement('a');
    a.href = _inPages ? '../' : './';
    return a.href; // ex: 'http://127.0.0.1:5500/'
  })();

  // Atualiza hrefs do nav para URLs absolutas — imune a history.replaceState
  function _syncNavCtx() {
    document.querySelectorAll('.nav-drop-item').forEach(function(a) {
      var target = a.getAttribute('data-target');
      for (var i = 0; i < PAGES.length; i++) {
        if (PAGES[i].num === target) {
          a.setAttribute('href', PAGES[i].fetchHref);
          break;
        }
      }
    });
  }

  var PAGES = [
    { num: 'cover', href: _rb + 'index.html',         fetchHref: _siteRoot + 'index.html',              title: 'Capa'          },
    { num: '01',    href: _pb + '01-logo.html',        fetchHref: _siteRoot + 'pages/01-logo.html',      title: '01 Logo'       },
    { num: '02',    href: _pb + '02-tipografia.html',  fetchHref: _siteRoot + 'pages/02-tipografia.html',title: '02 Tipografia' },
    { num: '03',    href: _pb + '03-paleta.html',      fetchHref: _siteRoot + 'pages/03-paleta.html',    title: '03 Paleta'     },
    { num: '04',    href: _pb + '04-grid.html',        fetchHref: _siteRoot + 'pages/04-grid.html',      title: '04 Grid'       },
    { num: '05',    href: _pb + '05-voz.html',          fetchHref: _siteRoot + 'pages/05-voz.html',       title: '05 Voz'        },
    { num: '06',    href: _pb + '06-imagetica.html',   fetchHref: _siteRoot + 'pages/06-imagetica.html', title: '06 Imagetica'  },
    { num: '07',    href: _pb + '07-impressos.html',   fetchHref: _siteRoot + 'pages/07-impressos.html', title: '07 Impressos'  },
    { num: '08',    href: _pb + '08-motion.html',      fetchHref: _siteRoot + 'pages/08-motion.html',    title: '08 Motion'     },
    { num: '09',    href: _pb + '09-redes.html',       fetchHref: _siteRoot + 'pages/09-redes.html',     title: '09 Redes'      },
    { num: '10',    href: _pb + '10-merch.html',       fetchHref: _siteRoot + 'pages/10-merch.html',     title: '10 Merch'      },
  ];

  // Determinar pagina atual pelo nome do arquivo na URL (sem caminho)
  var filename = (window.location.pathname.split('/').pop()) || 'index.html';
  var currentIdx = 0;
  for (var pi = 0; pi < PAGES.length; pi++) {
    if (PAGES[pi].href.split('/').pop() === filename) { currentIdx = pi; break; }
  }

  var nextIdx    = currentIdx + 1;   // proxima secao a carregar (baixo)
  var prevIdx    = currentIdx - 1;   // secao anterior a carregar (cima)
  var loadingDown = false;
  var loadingUp   = false;

  var footer = document.getElementById('page-footer');
  if (!footer) return;

  // ── Sentinel inferior — antes do rodape, dispara fetch para baixo ──
  var sentBottom = document.createElement('div');
  sentBottom.style.height = '1px';
  footer.parentNode.insertBefore(sentBottom, footer);

  // ── Sentinel superior — antes da primeira section, dispara fetch para cima ──
  var firstSection = document.querySelector('section[data-sec]');
  var sentTop = document.createElement('div');
  sentTop.style.height = '1px';
  if (firstSection) {
    firstSection.parentNode.insertBefore(sentTop, firstSection);
  }

  // ── Scroll spy — atualiza URL e nav conforme a secao mais visivel ──
  var spyObs = new IntersectionObserver(function(entries) {
    var best = null;
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) {
        best = e;
      }
    }
    if (!best) return;

    var sec = best.target.getAttribute('data-sec');
    var page = null;
    for (var j = 0; j < PAGES.length; j++) {
      if (PAGES[j].num === sec) { page = PAGES[j]; break; }
    }
    if (!page) return;

    // Sincronizar nav para URLs absolutas (imune a replaceState acumulado)
    _syncNavCtx();

    if (window.location.href !== page.fetchHref) {
      history.replaceState(null, '', page.fetchHref);
    }
    document.querySelectorAll('.nav-drop-item').forEach(function(a) {
      a.classList.toggle('active', a.getAttribute('data-target') === sec);
    });
    var navCurrent = document.getElementById('nav-current');
    if (navCurrent) navCurrent.textContent = page.title;

  }, { threshold: 0.15 });

  if (firstSection) spyObs.observe(firstSection);

  // ── Helper: injetar section e ativar funcionalidades dependentes ──
  function activateSection(section, page) {
    spyObs.observe(section);
    if (section.querySelector('.tagline-cycle')) startTagCycle(3);
    if (page.num === '06') {
      if (!document.getElementById('pattern-canvas')) {
        var canvas = document.createElement('canvas');
        canvas.id = 'pattern-canvas';
        canvas.style.display = 'none';
        document.body.appendChild(canvas);
      }
      if (!document.querySelector('script[src$="js/patterns.js"]')) {
        var s = document.createElement('script');
        s.src = _rb + 'js/patterns.js';
        document.body.appendChild(s);
      } else if (typeof _runPatterns === 'function') {
        setTimeout(_runPatterns, 100);
      }
    }
    if (page.num === '10') {
      if (!document.getElementById('render-canvas')) {
        var canvas = document.createElement('canvas');
        canvas.id = 'render-canvas';
        canvas.style.display = 'none';
        footer.parentNode.insertBefore(canvas, footer);
      }
      if (!document.querySelector('script[src$="js/merch.js"]')) {
        var s = document.createElement('script');
        s.src = _rb + 'js/merch.js';
        document.body.appendChild(s);
      }
    }
  }

  // ── Fetch e injecao de secao ──────────────────────────────────
  function fetchSection(href, callback) {
    fetch(href)
      .then(function(r) { return r.text(); })
      .then(function(html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var section = doc.querySelector('section[data-sec]');
        callback(section);
      })
      .catch(function() { callback(null); });
  }

  // ── Carregar proxima secao (scroll para baixo) ────────────────
  function loadDown() {
    if (loadingDown || nextIdx >= PAGES.length) return;
    loadingDown = true;
    var page = PAGES[nextIdx];

    fetchSection(page.fetchHref, function(section) {
      if (!section) { loadingDown = false; return; }
      footer.parentNode.insertBefore(section, sentBottom);
      activateSection(section, page);
      nextIdx++;
      loadingDown = false;
    });
  }

  // ── Carregar secao anterior (scroll para cima) ─────────────────
  // Ao inserir conteudo acima do scroll atual, o browser desloca a
  // pagina. Compensamos ajustando window.scrollY pelo tamanho inserido.
  function loadUp() {
    if (loadingUp || prevIdx < 0) return;
    loadingUp = true;
    var page = PAGES[prevIdx];

    fetchSection(page.fetchHref, function(section) {
      if (!section) { loadingUp = false; return; }

      // Quando a capa (index.html) e injetada em pages/, seus links internos
      // apontam para 'pages/XX.html' — corrigir para 'XX.html' (mesmo diretorio)
      if (_inPages && page.num === 'cover') {
        section.innerHTML = section.innerHTML.replace(/href="pages\//g, 'href="');
      }

      // Capturar posicao atual antes da insercao
      var heightBefore = document.body.scrollHeight;
      var scrollBefore = window.scrollY;

      // Inserir a nova secao antes do sentinel de topo
      sentTop.parentNode.insertBefore(section, sentTop);

      // Mover o sentinel de topo para ficar antes da secao recem inserida
      section.parentNode.insertBefore(sentTop, section);

      // Compensar deslocamento: manter o usuario na mesma posicao visual.
      // IMPORTANTE: behavior:'instant' ignora o scroll-behavior:smooth do CSS —
      // a compensacao de posicao deve ser atomica, nao animada.
      var added = document.body.scrollHeight - heightBefore;
      window.scrollTo({ top: scrollBefore + added, behavior: 'instant' });

      activateSection(section, page);
      prevIdx--;
      loadingUp = false;
    });
  }

  // ── Observers ────────────────────────────────────────────────
  var obsDown = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) { loadDown(); break; }
    }
  }, { rootMargin: '800px' });
  obsDown.observe(sentBottom);

  // Fallback: IntersectionObserver nao re-dispara se sentBottom nao sair do rootMargin.
  // O scroll listener garante que loadDown continua sendo chamado ao rolar.
  window.addEventListener('scroll', function() {
    if (!loadingDown && nextIdx < PAGES.length) {
      var rect = sentBottom.getBoundingClientRect();
      if (rect.top < window.innerHeight + 800) loadDown();
    }
  }, { passive: true });

  var obsUp = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) { loadUp(); break; }
    }
  }, { rootMargin: '400px' });

  // Só começa a observar sentTop quando o usuário scrollar PARA CIMA.
  // Isso evita o disparo espúrio: ao scrollar pra baixo numa página recém-carregada,
  // sentTop fica dentro dos 400px de rootMargin e o observer dispararia imediatamente,
  // injetando a seção anterior e causando um salto visual indesejado.
  if (prevIdx >= 0) {
    var _prevScrollY = window.scrollY;
    function _maybeStartObsUp() {
      var y = window.scrollY;
      if (y < _prevScrollY) {
        // Usuário scrollou para cima — agora é seguro registrar o observer
        window.removeEventListener('scroll', _maybeStartObsUp);
        obsUp.observe(sentTop);
      }
      _prevScrollY = y;
    }
    window.addEventListener('scroll', _maybeStartObsUp, { passive: true });
  }

})();
