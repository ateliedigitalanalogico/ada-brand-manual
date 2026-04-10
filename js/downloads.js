/* ── ADA Manual — downloads.js ── */

function loadHtml2Canvas(cb) {
  if (typeof html2canvas !== 'undefined') { cb(); return; }
  var s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  s.onload = cb;
  s.onerror = function() { alert('Não foi possível carregar html2canvas. Verifique sua conexão.'); };
  document.head.appendChild(s);
}

function dlSvgPng(svgUrl, filename, w, h) {
  var img = new Image();
  img.onload = function() {
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    c.getContext('2d').drawImage(img, 0, 0, w, h);
    var a = document.createElement('a');
    a.download = filename;
    a.href = c.toDataURL('image/png');
    a.click();
  };
  fetch(svgUrl).then(function(r) { return r.text(); }).then(function(svg) {
    var blob = new Blob([svg], { type: 'image/svg+xml' });
    img.src = URL.createObjectURL(blob);
  });
}

function dlMock(elId, filename, w) {
  var el = document.getElementById(elId);
  if (!el) return;
  var btn = (typeof event !== 'undefined' && event && event.target) || null;
  if (btn) { var orig = btn.textContent; btn.textContent = 'Gerando…'; btn.disabled = true; }
  loadHtml2Canvas(function() {
    html2canvas(el, {
      scale: Math.max(w / el.offsetWidth, 2),
      useCORS: true,
      backgroundColor: null,
      logging: false
    }).then(function(canvas) {
      var a = document.createElement('a');
      a.download = filename + '.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
      if (btn) { btn.textContent = orig; btn.disabled = false; }
    }).catch(function() {
      if (btn) { btn.textContent = orig; btn.disabled = false; }
    });
  });
}

function dlIco(elId, filename) {
  var el = document.getElementById(elId);
  if (!el) return;
  loadHtml2Canvas(function() {
    html2canvas(el, { scale: 2, useCORS: true, backgroundColor: null, logging: false })
      .then(function(canvas) {
        var c32 = document.createElement('canvas');
        c32.width = 32; c32.height = 32;
        c32.getContext('2d').drawImage(canvas, 0, 0, 32, 32);
        c32.toBlob(function(blob) {
          var reader = new FileReader();
          reader.onload = function() {
            var png = new Uint8Array(reader.result);
            var buf = new ArrayBuffer(6 + 16 + png.length);
            var v = new DataView(buf);
            v.setUint16(0, 0, true); v.setUint16(2, 1, true); v.setUint16(4, 1, true);
            v.setUint8(6, 32); v.setUint8(7, 32); v.setUint8(8, 0); v.setUint8(9, 0);
            v.setUint16(10, 1, true); v.setUint16(12, 32, true);
            v.setUint32(14, png.length, true); v.setUint32(18, 22, true);
            new Uint8Array(buf).set(png, 22);
            var a = document.createElement('a');
            a.download = filename + '.ico';
            a.href = URL.createObjectURL(new Blob([buf], { type: 'image/x-icon' }));
            a.click();
          };
          reader.readAsArrayBuffer(blob);
        }, 'image/png');
      });
  });
}

function openImgLb(el) {
  var img = el.querySelector('img');
  var src = img.src;
  var fname = src.split('/').pop();
  var lb = document.getElementById('img-lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'img-lightbox';
    lb.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.96);z-index:9998;align-items:center;justify-content:center;flex-direction:column;gap:16px;';
    var lbImg = document.createElement('img');
    lbImg.id = 'img-lb-img';
    lbImg.style.cssText = 'max-width:92vw;max-height:85vh;object-fit:contain;display:block;cursor:zoom-out;';
    var lbDl = document.createElement('a');
    lbDl.id = 'img-lb-dl';
    lbDl.style.cssText = "font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,214,0,.6);text-decoration:none;border:1px solid rgba(255,214,0,.25);padding:8px 20px;transition:color .15s,border-color .15s;";
    lbDl.textContent = '\u2193 baixar';
    lbDl.addEventListener('mouseover', function() { this.style.color = '#FFD600'; this.style.borderColor = 'rgba(255,214,0,.7)'; });
    lbDl.addEventListener('mouseout', function() { this.style.color = 'rgba(255,214,0,.6)'; this.style.borderColor = 'rgba(255,214,0,.25)'; });
    lb.appendChild(lbImg);
    lb.appendChild(lbDl);
    lbImg.addEventListener('click', function() { lb.style.display = 'none'; });
    lb.addEventListener('click', function(e) { if (e.target === lb) lb.style.display = 'none'; });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') lb.style.display = 'none'; });
    document.body.appendChild(lb);
  }
  lb.querySelector('#img-lb-img').src = src;
  var dlEl = lb.querySelector('#img-lb-dl');
  dlEl.href = src;
  dlEl.download = fname;
  lb.style.display = 'flex';
}
