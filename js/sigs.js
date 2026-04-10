/* ── ADA Manual — sigs.js ── */

var SIG_CFG = {
  padrao:    { bg: '#000000', alfa: '#FFD600', border: 'rgba(255,214,0,0.2)',    name: '#FFD600',  role: 'rgba(255,214,0,0.55)',   contact: 'rgba(255,255,255,0.4)',  foot: 'rgba(255,255,255,0.2)',  footBorder: 'rgba(255,214,0,0.1)' },
  invertido: { bg: '#FFD600', alfa: '#000000', border: 'rgba(0,0,0,0.15)',       name: '#000000',  role: 'rgba(0,0,0,0.6)',        contact: 'rgba(0,0,0,0.45)',       foot: 'rgba(0,0,0,0.3)',        footBorder: 'rgba(0,0,0,0.1)' },
  midnight:  { bg: '#0A0F1E', alfa: '#4A7FD4', border: 'rgba(74,127,212,0.25)', name: '#4A7FD4',  role: 'rgba(74,127,212,0.7)',   contact: 'rgba(255,255,255,0.35)', foot: 'rgba(74,127,212,0.35)',  footBorder: 'rgba(74,127,212,0.15)' },
  mono:      { bg: '#FFFFFF', alfa: '#000000', border: 'rgba(0,0,0,0.12)',       name: '#111111',  role: 'rgba(0,0,0,0.55)',       contact: 'rgba(0,0,0,0.4)',        foot: 'rgba(0,0,0,0.25)',       footBorder: 'rgba(0,0,0,0.1)' }
};

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function makeSig(cfg, n, r, e, p) {
  var pts = [
    '268.01 297 288 257.02 307.99 297 324 297 288 225 252 297',
    '238.5 324 225 351 241.01 351 250.01 333 254.51 324',
    '321.49 324 325.99 333 334.99 351 351 351 337.5 324'
  ];
  var polys = pts.map(function(d) {
    return '<polygon fill="' + cfg.alfa + '" points="' + d + '"/>';
  }).join('');
  var alfa = '<svg width="32" height="32" viewBox="225 225 126 126" xmlns="http://www.w3.org/2000/svg">' + polys + '</svg>';

  var td2 = [
    '<div style="font-family:\'Syne\',sans-serif;font-size:14px;font-weight:600;color:' + cfg.name + ';letter-spacing:0.02em;margin-bottom:3px;">' + escHtml(n) + '</div>',
    '<div style="font-size:10px;color:' + cfg.role + ';letter-spacing:0.08em;text-transform:uppercase;margin-bottom:7px;">' + escHtml(r) + '</div>',
    '<div style="font-size:11px;color:' + cfg.contact + ';margin-bottom:2px;">' + escHtml(e) + '</div>',
    '<div style="font-size:11px;color:' + cfg.contact + ';margin-bottom:8px;">' + escHtml(p) + '</div>',
    '<div style="font-size:10px;color:' + cfg.foot + ';letter-spacing:0.06em;text-transform:uppercase;border-top:1px solid ' + cfg.footBorder + ';padding-top:6px;">ada.art.br \u00b7 S\u00e3o Paulo \u00b7 Brasil</div>'
  ].join('');

  return '<table cellpadding="0" cellspacing="0" border="0" style="font-family:\'DM Mono\',monospace;background:' + cfg.bg + ';padding:20px;">'
    + '<tr>'
    + '<td style="padding-right:16px;vertical-align:middle;">' + alfa + '</td>'
    + '<td style="border-left:1px solid ' + cfg.border + ';padding-left:16px;vertical-align:middle;">' + td2 + '</td>'
    + '</tr>'
    + '</table>';
}

function updateSigs() {
  var n = (document.getElementById('f-name')  || { value: '' }).value;
  var r = (document.getElementById('f-role')  || { value: '' }).value;
  var e = (document.getElementById('f-email') || { value: '' }).value;
  var p = (document.getElementById('f-phone') || { value: '' }).value;
  ['padrao', 'invertido', 'midnight', 'mono'].forEach(function(slug) {
    var el = document.getElementById('sig-' + slug);
    if (el) el.innerHTML = makeSig(SIG_CFG[slug], n, r, e, p);
  });
}

function openSigHTML(sigId) {
  var sigEl = document.getElementById(sigId);
  if (!sigEl) return;
  var tbl = sigEl.querySelector('table');
  if (!tbl) return;
  var tmp = document.createElement('div');
  tmp.innerHTML = tbl.outerHTML;
  var svgs = Array.from(tmp.querySelectorAll('svg'));
  var pending = svgs.length;
  function open() {
    var doc = '<!DOCTYPE html><html><head><meta charset="utf-8">'
      + '<link rel="preconnect" href="https://fonts.googleapis.com">'
      + '<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Syne:wght@400;600" rel="stylesheet">'
      + '<style>body{margin:40px;background:#888;}</style></head><body>'
      + tmp.innerHTML
      + '</body></html>';
    window.open(URL.createObjectURL(new Blob([doc], { type: 'text/html' })), '_blank');
  }
  if (!pending) { open(); return; }
  svgs.forEach(function(svg) {
    var w = parseInt(svg.getAttribute('width') || '32');
    var h = parseInt(svg.getAttribute('height') || w);
    var data = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg));
    var img = new Image();
    img.onload = function() {
      var c = document.createElement('canvas');
      c.width = w * 2; c.height = h * 2;
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      var pi = document.createElement('img');
      pi.src = c.toDataURL('image/png'); pi.width = w; pi.height = h;
      svg.parentNode.replaceChild(pi, svg);
      if (!--pending) open();
    };
    img.onerror = function() { if (!--pending) open(); };
    img.src = data;
  });
}

function fallbackCopy(text, cb) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { if (document.execCommand('copy')) cb(); } catch (ex) {}
  document.body.removeChild(ta);
}

function cpSig(sigId, btn) {
  var sigEl = document.getElementById(sigId);
  if (!sigEl) return;
  var tbl = sigEl.querySelector('table');
  if (!tbl) return;
  var content = tbl.outerHTML;
  var orig = btn.textContent;
  function onOk() {
    btn.textContent = '\u2713 Copiado';
    btn.classList.add('done');
    setTimeout(function() { btn.textContent = orig; btn.classList.remove('done'); }, 2000);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(content).then(onOk).catch(function() { fallbackCopy(content, onOk); });
  } else {
    fallbackCopy(content, onOk);
  }
}

/* inicializar — script carregado no fim do body, DOM já pronta */
updateSigs();
