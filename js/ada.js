/* ── ADA Manual de Marca — ada.js ── */

function setMode(mode) {
  document.body.className = mode === 'padrao' ? '' : 'mode-' + mode;
  document.querySelectorAll('.mode-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
}

/* ── Div 05 — tagline cycling ── */
(function() {
  var TAGS = [
    'Antes da IA.',
    'Antes do prompt.',
    'Antes do imersivo.',
    'Antes do mapping.',
    'Antes do algoritmo.',
    'Antes da experiência.',
    'Antes do futuro.'
  ];
  var idx = 0;

  function cycle() {
    var els = document.querySelectorAll('.d05-tag-live');
    if (!els.length) return;
    els.forEach(function(el) { el.classList.add('fading'); });
    setTimeout(function() {
      idx = (idx + 1) % TAGS.length;
      els.forEach(function(el) {
        el.textContent = TAGS[idx];
        el.classList.remove('fading');
      });
    }, 350);
  }

  setInterval(cycle, 2800);
})();
