/* ADA - Manual de Marca - Scripts Globais - v1.0 */


/* == Funcoes compartilhadas == */

function showP(name, btn) {
  document.querySelectorAll('.ppanel').forEach(function(p) { p.classList.remove('on'); });
  document.querySelectorAll('.ptab').forEach(function(b) { b.classList.remove('on'); });
  var panel = document.getElementById('pp-'+name);
  if (panel) panel.classList.add('on');
  if (btn) btn.classList.add('on');
}

function cp(id, btn) {
  var el = document.getElementById(id);
  if (!el) return;
  var t = el.textContent.trim();
  navigator.clipboard.writeText(t).then(function() {
    var o = btn.textContent;
    btn.textContent = 'Copiado';
    btn.classList.add('done');
    setTimeout(function() { btn.textContent = o; btn.classList.remove('done'); }, 2000);
  });
}

/* == Scripts seção 01-04 == */

// Taglines animadas — capa e lock-up sincronizados
const tags = ["ANTES DA IA.","ANTES DO PROMPT.","ANTES DO IMERSIVO.","ANTES DO MAPPING.","ANTES DO HYPE.","ANTES DO ALGORITMO.","ANTES DA EXPERIÊNCIA.","ANTES DO FUTURO."];
let i = 0;
const els = [document.getElementById('cover-tag'), document.getElementById('lockup-tag')];
setInterval(() => {
  els.forEach(el => { if(el){ el.style.opacity='0'; } });
  setTimeout(() => {
    i = (i+1) % tags.length;
    els.forEach(el => { if(el){ el.textContent=tags[i]; el.style.opacity='1'; } });
  }, 600);
}, 3400);

// Nav active ao scroll
const sections = document.querySelectorAll('.section');
const links = document.querySelectorAll('.nav-link');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      links.forEach(l=>l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if(a) a.classList.add('active');
    }
  });
}, { threshold:0.25 });
sections.forEach(s=>obs.observe(s));


/* == Scripts secao 05/09 removidos - ver secao 07 para showP/cp == */

/* == Scripts seção 07 == */

// ── Banco de taglines ──────────────────────────────────────
const TAGS = [
  'ANTES DA IA.',
  'ANTES DO PROMPT.',
  'ANTES DO IMERSIVO.',
  'ANTES DO MAPPING.',
  'ANTES DO HYPE.',
  'ANTES DO ALGORITMO.',
  'ANTES DA EXPERIÊNCIA.',
  'ANTES DO FUTURO.',
];
let tagIdx = 0;

function nextTag() {
  tagIdx = (tagIdx + 1) % TAGS.length;
  // Atualiza todos os elementos com classe .tagline-cycle
  document.querySelectorAll('.tagline-cycle').forEach(el => {
    el.textContent = TAGS[tagIdx];
  });
}

// Troca durante a pausa (92–100% do ciclo = últimos 8%)
// Para --dur de 6s: pausa começa em 5.52s
function startTagCycle(durSec) {
  clearInterval(window._tagTimer);
  const pauseStart = durSec * 0.92 * 1000;
  // Troca a tagline no início de cada ciclo, durante a pausa vazia
  window._tagTimer = setInterval(nextTag, durSec * 1000);
  // Offset inicial para alinhar com a pausa
  setTimeout(() => {
    clearInterval(window._tagTimer);
    nextTag();
    window._tagTimer = setInterval(nextTag, durSec * 1000);
  }, pauseStart);
}

// ── Controle de velocidade ──────────────────────────────────
function setSpd(sec, btn) {
  document.querySelectorAll('.spd-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.documentElement.style.setProperty('--dur', sec+'s');
  document.getElementById('spd-val').textContent = sec+'s';
  startTagCycle(sec);
}

// Inicia com --dur padrão de 6s
startTagCycle(6);


/* == Scripts seção 08 == */

// Carrossel
let currentSlide = 0;
const totalSlides = 4;

function carouselMove(dir) {
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  updateCarousel();
}

function carouselGo(idx) {
  currentSlide = idx;
  updateCarousel();
}

function updateCarousel() {
  document.getElementById('carousel-track').style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.carousel-dot').forEach((d, i) => {
    d.classList.toggle('on', i === currentSlide);
  });
}

// Assinatura de e-mail — copia o HTML real, não o escapado
function copyEmail() {
  const html = `<table cellpadding="0" cellspacing="0" border="0" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <tr>
    <td style="padding-right:16px;vertical-align:middle;">
      <svg width="32" height="38" viewBox="225 225 126 126" xmlns="http://www.w3.org/2000/svg">
        <polygon fill="#000000" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/>
        <polygon fill="#000000" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/>
        <polygon fill="#000000" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/>
      </svg>
    </td>
    <td style="border-left:1px solid #E0E0E0;padding-left:16px;vertical-align:middle;">
      <div style="font-size:14px;font-weight:600;color:#111111;letter-spacing:0.02em;margin-bottom:2px;">Caio Fazolin</div>
      <div style="font-size:11px;color:#666666;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:6px;">Diretor Criativo · ADA</div>
      <div style="font-size:11px;color:#999999;letter-spacing:0.02em;margin-bottom:2px;">contato@ada.art.br</div>
      <div style="font-size:11px;color:#999999;letter-spacing:0.02em;margin-bottom:8px;">+55 11 98434-0084</div>
      <div style="font-size:10px;color:#BBBBBB;letter-spacing:0.08em;text-transform:uppercase;border-top:1px solid #EEEEEE;padding-top:6px;">ada.art.br · São Paulo · Brasil</div>
    </td>
  </tr>
</table>`;

  navigator.clipboard.writeText(html).then(() => {
    const btn = document.getElementById('email-copy-btn');
    btn.textContent = 'Copiado ✓';
    btn.classList.add('done');
    setTimeout(() => { btn.textContent = 'Copiar HTML da assinatura'; btn.classList.remove('done'); }, 2500);
  });
}

/* == Taglines da capa (crossfade) == */
(function() {

  /* ── Taglines da capa ── */
  var TAGS = [
    'ANTES DA IA.','ANTES DO PROMPT.','ANTES DO IMERSIVO.',
    'ANTES DO MAPPING.','ANTES DO HYPE.','ANTES DO ALGORITMO.',
    'ANTES DA EXPERIÊNCIA.','ANTES DO FUTURO.'
  ];
  var idx = 0, slot = 'a';
  var ta = document.getElementById('ctag-a');
  var tb = document.getElementById('ctag-b');

  function showTag(text, el) {
    el.textContent = text;
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ el.classList.add('on'); }); });
  }
  function nextTag() {
    var out = slot==='a'?ta:tb, inn = slot==='a'?tb:ta;
    idx = (idx+1) % TAGS.length;
    out.classList.remove('on');
    setTimeout(function(){ showTag(TAGS[idx], inn); slot = slot==='a'?'b':'a'; }, 900);
  }
  if (ta && tb) {
    showTag(TAGS[0], ta);
    setInterval(nextTag, 3800);
  }

  /* ── Campo visual da capa ── */
  var field = document.getElementById('cover-field');
  if (field) {
    var SYMS = ['+','−','·','×','○','—',';',':'];
    function isSafe(x,y,W,H){ var dx=x-W/2,dy=y-H/2; return Math.sqrt(dx*dx+dy*dy)>Math.min(W,H)*.22; }
    function randSafe(W,H,px,py){ var x,y,t=0; do{x=px+Math.random()*(W-px*2);y=py+Math.random()*(H-py*2);t++;}while(!isSafe(x,y,W,H)&&t<80); return {x:x,y:y}; }

    function spawnSym(){
      var W=field.offsetWidth||window.innerWidth, H=field.offsetHeight||window.innerHeight;
      var p=randSafe(W,H,40,40);
      var op=(0.18+Math.random()*.22).toFixed(2);
      var sz=Math.random()<.4?22:Math.random()<.55?18:15;
      var el=document.createElement('span');
      el.style.cssText='position:absolute;color:rgba(255,214,0,0);font-weight:200;font-family:monospace;line-height:1;white-space:nowrap;transform:translate(-50%,-50%);transition:color 2s ease;font-size:'+sz+'px;left:'+p.x+'px;top:'+p.y+'px;';
      el.setAttribute('data-op', op);
      el.textContent=SYMS[Math.floor(Math.random()*SYMS.length)];
      field.appendChild(el);
      setTimeout(function(){
        requestAnimationFrame(function(){ requestAnimationFrame(function(){ el.style.color='rgba(255,214,0,'+op+')'; }); });
        setTimeout(function(){
          el.style.color='rgba(255,214,0,0)';
          setTimeout(function(){ el.remove(); setTimeout(spawnSym, 300+Math.random()*500); }, 2600);
        }, 5000+Math.random()*5000);
      }, 100+Math.random()*600);
    }

    function spawnCross(){
      var W=field.offsetWidth||window.innerWidth, H=field.offsetHeight||window.innerHeight;
      var ix,iy,t=0;
      do{ix=80+Math.random()*(W-160);iy=50+Math.random()*(H-100);t++;}while(!isSafe(ix,iy,W,H)&&t<80);
      var op=(0.14+Math.random()*.18).toFixed(2);
      var hLen=(0.22+Math.random()*.30)*W;
      var hFrac=Math.random()<.5?0.12+Math.random()*.22:0.66+Math.random()*.20;
      var elH=document.createElement('div');
      elH.style.cssText='position:absolute;height:0;border-top:0.7px solid rgba(255,214,0,0);transition:border-color 2.4s ease;left:'+Math.max(5,ix-hLen*hFrac)+'px;top:'+iy+'px;width:'+hLen+'px;';
      field.appendChild(elH);
      var vLen=(0.18+Math.random()*.28)*H;
      var vFrac=Math.random()<.5?0.10+Math.random()*.20:0.68+Math.random()*.20;
      var elV=document.createElement('div');
      elV.style.cssText='position:absolute;width:0;border-left:0.7px solid rgba(255,214,0,0);transition:border-color 2.4s ease;left:'+ix+'px;top:'+Math.max(5,iy-vLen*vFrac)+'px;height:'+vLen+'px;';
      field.appendChild(elV);
      setTimeout(function(){
        requestAnimationFrame(function(){ requestAnimationFrame(function(){
          elH.style.borderColor='rgba(255,214,0,'+op+')';
          elV.style.borderColor='rgba(255,214,0,'+op+')';
        });});
        setTimeout(function(){
          elH.style.borderColor='rgba(255,214,0,0)';
          elV.style.borderColor='rgba(255,214,0,0)';
          setTimeout(function(){ elH.remove(); elV.remove(); setTimeout(spawnCross, 300+Math.random()*500); }, 2600);
        }, 5000+Math.random()*5000);
      }, 100+Math.random()*600);
    }

    setTimeout(function(){
      for(var i=0;i<10;i++) setTimeout(spawnSym, i*200);
      for(var j=0;j<4;j++) setTimeout(spawnCross, j*380+400);
    }, 400);
  }

  /* ── Scroll spy na navegação (dropdown) ── */
  var dropItems = document.querySelectorAll('.nav-drop-item[data-target]');
  var navCurrent = document.getElementById('nav-current');
  var secs = document.querySelectorAll('[data-sec]');
  var secNames = {
    'cover':'Capa',
    '01':'01 Logo','02':'02 Tipografia','03':'03 Paleta','04':'04 Grid',
    '05':'05 Imagética','06':'06 Impressos','07':'07 Motion',
    '08':'08 Redes','09':'09 Voz','10':'10 Merch'
  };
  function onScroll(){
    var scrollY = window.scrollY + 100;
    var current = 'cover';
    secs.forEach(function(s){
      if(s.offsetTop <= scrollY) current = s.getAttribute('data-sec');
    });
    dropItems.forEach(function(n){
      n.classList.toggle('active', n.getAttribute('data-target') === current);
    });
    if(navCurrent) navCurrent.textContent = secNames[current] || current;
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ── Menu dropdown toggle ── */
  var toggle = document.getElementById('nav-toggle');
  var dropdown = document.getElementById('nav-dropdown');
  if(toggle && dropdown){
    toggle.addEventListener('click', function(){
      toggle.classList.toggle('open');
      dropdown.classList.toggle('open');
    });
    dropdown.addEventListener('click', function(e){
      if(e.target.classList.contains('nav-drop-item')){
        toggle.classList.remove('open');
        dropdown.classList.remove('open');
      }
    });
  }

})();
/* == Download de mockup como PNG == */
function dlMock(elId, filename, w, h) {
  var el = document.getElementById(elId);
  if (!el || typeof html2canvas === 'undefined') {
    alert('Aguarde o carregamento completo da página.');
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

/* == Copiar prompt do moodboard == */
function cpPrompt(id, btn) {
  var el = document.getElementById(id);
  if (!el) return;
  navigator.clipboard.writeText(el.textContent.trim()).then(function() {
    var o = btn.textContent;
    btn.textContent = 'Copiado';
    btn.style.color = 'rgba(100,255,120,.6)';
    setTimeout(function() { btn.textContent = o; btn.style.color = ''; }, 2000);
  });
}
