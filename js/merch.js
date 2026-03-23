/* ADA - Merchandise Assets - Canvas Rendering
 * Funcoes globais para download de assets de merch
 * v1.0 */

var min = Math.min;
var _rc; // canvas de render - inicializado quando DOM pronto

/* kit01 — arquivos de arte para produção (300 DPI / fornecedor) */
var kit01_data = [
{name:'Frente · Símbolo A · Peito Esquerdo',bg:'transparent',pbg:'#111',w:4000,h:4000,s:4000,draw:function(ctx,S){
    // 4000×4000px transparente — ~34×34cm a 300 DPI — serigrafia/bordado peito esquerdo
    drawSym(ctx,S*.21,S*.21,S*.58,"#FFD600");
  },fname:'camiseta_frente_simbolo_peito_esquerdo_4k'},
{name:'Costas · Logo + URL · Centralizado',bg:'transparent',pbg:'#111',w:4000,h:3040,s:4000,draw:function(ctx,S){
    // 4000×3040px transparente — ~34×26cm a 300 DPI — serigrafia/digital costas
    var sym=S*.42,x=S/2-sym/2,y=S*.1;
    drawSym(ctx,x,y,sym,"#FFD600");
    var ly=y+sym+S*.06;
    ctx.strokeStyle="rgba(255,214,0,.4)"; ctx.lineWidth=Math.round(S*.002);
    ctx.beginPath(); ctx.moveTo(S/2-sym/2,ly); ctx.lineTo(S/2+sym/2,ly); ctx.stroke();
    ctx.font="300 "+Math.round(S*.042)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(255,214,0,.55)"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("ada.art.br",S/2,ly+S*.1);
  },fname:'camiseta_costas_logo_url_4k'}];

/* kit02 — arquivos de arte para produção (300 DPI / fornecedor) */
var kit02_data = [
{name:'Frente · Símbolo A',bg:'transparent',pbg:'#000',w:4000,h:4000,s:4000,draw:function(ctx,S){
    drawSym(ctx,S*.21,S*.21,S*.58,"#FFD600");
  },fname:'bone_frente_simbolo_4k'}];

/* kit03 — adesivo horizontal 3200×1000: símbolo + hairline + tagline + cantos */
var kit03_data = [
{name:'Adesivo · Antes do Algoritmo',bg:'#FFD600',pbg:'#FFD600',w:3200,h:1000,s:1000,draw:function(ctx,S){
    // S=1000 (=h). W total = S*3.2 — usar S como referência para preservar escala no preview
    var H=S, W=S*3.2;
    // Símbolo A à esquerda
    var sym=H*.64, sy=(H-sym)/2;
    drawSym(ctx, H*.1, sy, sym, "#000000");
    // Hairline vertical
    ctx.strokeStyle="rgba(0,0,0,.22)"; ctx.lineWidth=Math.round(H*.0025);
    ctx.beginPath(); ctx.moveTo(H*.84, H*.1); ctx.lineTo(H*.84, H*.9); ctx.stroke();
    // Tagline
    ctx.font="300 "+Math.round(H*.175)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(0,0,0,.78)"; ctx.textAlign="left"; ctx.textBaseline="middle";
    ctx.fillText("ANTES DO ALGORITMO.", H*.94, H/2);
  },fname:'adesivo_antes_algoritmo_4k'}];

/* kit03_original */
var kit03_original_data = [{name:'A1 · Símbolo Amarelo',bg:'transparent',pbg:'#000',w:1000,h:1000,s:min(1000,1000),draw:function(ctx,S){drawSym(ctx,S*.21,S*.21,S*.58,"#FFD600");},fname:'a1_símbolo_amarelo'},
{name:'A2 · Símbolo Branco',bg:'transparent',pbg:'#333',w:1000,h:1000,s:min(1000,1000),draw:function(ctx,S){drawSym(ctx,S*.21,S*.21,S*.58,"#FFFFFF");},fname:'a2_símbolo_branco'},
{name:'A3 · "ANTES." Amarelo',bg:'transparent',pbg:'#000',w:2000,h:600,s:min(2000,600),draw:function(ctx,S){
    var W=ctx.canvas.width;
    ctx.font="300 "+Math.round(S*.3)+"px DM Mono,monospace";
    ctx.fillStyle="#FFD600"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("ANTES.",W/2,ctx.canvas.height/2);
  },fname:'a3_antes_amarelo'},
{name:'A3 · "ANTES." Branco',bg:'transparent',pbg:'#333',w:2000,h:600,s:min(2000,600),draw:function(ctx,S){
    var W=ctx.canvas.width;
    ctx.font="300 "+Math.round(S*.3)+"px DM Mono,monospace";
    ctx.fillStyle="#FFFFFF"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("ANTES.",W/2,ctx.canvas.height/2);
  },fname:'a3_antes_branco'},
{name:'A4 · Lock-up Amarelo',bg:'transparent',pbg:'#000',w:1800,h:600,s:min(1800,600),draw:function(ctx,S){
    var W=ctx.canvas.width,H=ctx.canvas.height;
    var sym=S*.52; drawSym(ctx,S*.04,H/2-sym/2,sym,"#FFD600");
    ctx.strokeStyle="rgba(255,214,0,.4)"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(S*.74,H*.15); ctx.lineTo(S*.74,H*.85); ctx.stroke();
    ctx.font="300 "+Math.round(S*.1)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(255,214,0,.7)"; ctx.textAlign="left"; ctx.textBaseline="middle";
    ctx.fillText("ANTES DO HYPE.",S*.84,H*.38);
    ctx.font="300 "+Math.round(S*.065)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(255,214,0,.4)";
    ctx.fillText("ada.art.br",S*.84,H*.65);
  },fname:'a4_lock-up_amarelo'},
{name:'A5 · "ADA · SP · 2015"',bg:'transparent',pbg:'#000',w:3000,h:300,s:min(3000,300),draw:function(ctx,S){
    var W=ctx.canvas.width,H=ctx.canvas.height;
    ctx.font="300 "+Math.round(H*.3)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(255,214,0,.65)"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("ADA · SÃO PAULO · 2015",W/2,H/2);
  },fname:'a5_ada_sp_2015'},
{name:'Lock-up · Preto',bg:'transparent',pbg:'#F2F2F2',w:1000,h:1000,s:min(1000,1000),draw:function(ctx,S){
    var sz=S*.38,x=S/2-sz/2,y=S/2-sz/2-S*.06;
    drawSym(ctx,x,y,sz,"#000000");
    var ly=y+sz+S*.04;
    ctx.strokeStyle="rgba(0,0,0,.3)"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(S/2-sz/2,ly); ctx.lineTo(S/2+sz/2,ly); ctx.stroke();
    ctx.font="300 "+Math.round(S*.028)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(0,0,0,.55)"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("ANTES DO HYPE.",S/2,ly+S*.065);
  },fname:'lock-up_preto'}];

/* kit04 — caneca: silk faixa inferior, símbolo + hairline + ada.art.br, fundo transparente */
var kit04_data = [
{name:'Caneca · Silk Inferior · Amarelo',bg:'transparent',pbg:'#111',w:2000,h:1000,s:1000,draw:function(ctx,S){
    var H=S, W=S*2;
    var sym=H*.64, sy=(H-sym)/2;
    drawSym(ctx, H*.1, sy, sym, "#FFD600");
    ctx.strokeStyle="rgba(255,214,0,.4)"; ctx.lineWidth=Math.round(H*.0025);
    ctx.beginPath(); ctx.moveTo(H*.84, H*.1); ctx.lineTo(H*.84, H*.9); ctx.stroke();
    ctx.font="300 "+Math.round(H*.175)+"px DM Mono,monospace";
    ctx.fillStyle="#FFD600"; ctx.textAlign="left"; ctx.textBaseline="middle";
    ctx.fillText("ada.art.br", H*.94, H/2);
  },fname:'caneca_silk_inferior_amarelo_4k'}];

/* kit05 */
var kit05_data = [{name:'Símbolo Grande · Amarelo',bg:'transparent',pbg:'#000',w:1000,h:1000,s:min(1000,1000),draw:function(ctx,S){drawSym(ctx,S*.1,S*.1,S*.8,"#FFD600");},fname:'símbolo_grande_amarelo'},
{name:'Símbolo Grande · Preto',bg:'transparent',pbg:'#E8DCC8',w:1000,h:1000,s:min(1000,1000),draw:function(ctx,S){drawSym(ctx,S*.1,S*.1,S*.8,"#000000");},fname:'símbolo_grande_preto'},
{name:'Símbolo Grande · Branco',bg:'transparent',pbg:'#FFD600',w:1000,h:1000,s:min(1000,1000),draw:function(ctx,S){drawSym(ctx,S*.1,S*.1,S*.8,"#000000");},fname:'símbolo_grande_branco'},
{name:'Alça · "ADA · ada.art.br"',bg:'#000000',pbg:'#000',w:1800,h:400,s:min(1800,400),draw:function(ctx,S){
    var W=ctx.canvas.width,H=ctx.canvas.height;
    ctx.font="300 "+Math.round(H*.2)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(255,214,0,.65)"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("ADA · ada.art.br",W/2,H/2);
  },fname:'alça_ada_adaartbr'}];

/* kit06 */
var kit06_data = [{name:'Badge Frente · Caio Fazolin',bg:'#080808',pbg:'#080808',w:850,h:540,s:min(850,540),draw:function(ctx,S){
    var W=ctx.canvas.width,H=ctx.canvas.height;
    ctx.fillStyle="rgba(255,214,0,0.08)"; ctx.fillRect(0,0,W,H*.22);
    var sym=H*.42; drawSym(ctx,H*.08,H*.29,sym,"#FFD600");
    ctx.strokeStyle="rgba(255,214,0,.2)"; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(H*.7,H*.2); ctx.lineTo(H*.7,H*.82); ctx.stroke();
    ctx.font="400 "+Math.round(H*.066)+"px DM Mono,monospace";
    ctx.fillStyle="#FFF"; ctx.textAlign="left"; ctx.textBaseline="middle";
    ctx.fillText("Caio Fazolin",H*.78,H*.42);
    ctx.font="300 "+Math.round(H*.045)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(255,214,0,.6)";
    ctx.fillText("Diretor Criativo",H*.78,H*.56);
    ctx.font="300 "+Math.round(H*.038)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(255,214,0,.4)";
    ctx.fillText("ADA",H*.78,H*.69);
    ctx.strokeStyle="rgba(255,214,0,.12)"; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(H*.08,H*.88); ctx.lineTo(W-H*.08,H*.88); ctx.stroke();
    ctx.font="300 "+Math.round(H*.034)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(255,255,255,.2)"; ctx.textAlign="center";
    ctx.fillText("ada.art.br",W/2,H*.94);
  },fname:'badge_frente_caio_fazolin'},
{name:'Badge Frente · Tatiane Gonz.',bg:'#080808',pbg:'#080808',w:850,h:540,s:min(850,540),draw:function(ctx,S){
    var W=ctx.canvas.width,H=ctx.canvas.height;
    ctx.fillStyle="rgba(255,214,0,0.08)"; ctx.fillRect(0,0,W,H*.22);
    var sym=H*.42; drawSym(ctx,H*.08,H*.29,sym,"#FFD600");
    ctx.strokeStyle="rgba(255,214,0,.2)"; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(H*.7,H*.2); ctx.lineTo(H*.7,H*.82); ctx.stroke();
    ctx.font="400 "+Math.round(H*.066)+"px DM Mono,monospace";
    ctx.fillStyle="#FFF"; ctx.textAlign="left"; ctx.textBaseline="middle";
    ctx.fillText("Tatiane Gonzalez",H*.78,H*.42);
    ctx.font="300 "+Math.round(H*.045)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(255,214,0,.6)";
    ctx.fillText("Diretora Criativa",H*.78,H*.56);
    ctx.font="300 "+Math.round(H*.038)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(255,214,0,.4)";
    ctx.fillText("ADA",H*.78,H*.69);
    ctx.strokeStyle="rgba(255,214,0,.12)"; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(H*.08,H*.88); ctx.lineTo(W-H*.08,H*.88); ctx.stroke();
    ctx.font="300 "+Math.round(H*.034)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(255,255,255,.2)"; ctx.textAlign="center";
    ctx.fillText("ada.art.br",W/2,H*.94);
  },fname:'badge_frente_tatiane_gonz'},
{name:'Badge Verso',bg:'#080808',pbg:'#080808',w:850,h:540,s:min(850,540),draw:function(ctx,S){
    var W=ctx.canvas.width,H=ctx.canvas.height,sym=H*.38;
    drawSym(ctx,W/2-sym/2+H*.05,H*.1,sym,"#FFD600");
    ctx.font="300 "+Math.round(H*.04)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(255,214,0,.5)"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("ADA · SÃO PAULO · 2015",W/2,H*.72);
    ctx.strokeStyle="rgba(255,214,0,.15)"; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(W*.2,H*.63); ctx.lineTo(W*.8,H*.63); ctx.stroke();
    ctx.font="300 "+Math.round(H*.034)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(255,255,255,.2)";
    ctx.fillText("ada.art.br",W/2,H*.84);
  },fname:'badge_verso'},
{name:'Símbolo · Solo',bg:'transparent',pbg:'#000',w:1000,h:1000,s:min(1000,1000),draw:function(ctx,S){drawSym(ctx,S*.21,S*.21,S*.58,"#FFD600");},fname:'símbolo_solo'}];

/* kit07 */
var kit07_data = [{name:'Símbolo · Bordado',bg:'transparent',pbg:'#000',w:1000,h:1000,s:min(1000,1000),draw:function(ctx,S){drawSym(ctx,S*.21,S*.21,S*.58,"#FFD600");},fname:'símbolo_bordado'},
{name:'Etiqueta · "ADA · São Paulo"',bg:'#000000',pbg:'#000',w:1200,h:400,s:min(1200,400),draw:function(ctx,S){
    var W=ctx.canvas.width,H=ctx.canvas.height,sym=H*.52;
    drawSym(ctx,H*.08,H*.24,sym,"#FFD600");
    ctx.font="300 "+Math.round(H*.18)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(255,214,0,.65)"; ctx.textAlign="left"; ctx.textBaseline="middle";
    ctx.fillText("ADA · São Paulo",H*.82,H*.5);
  },fname:'etiqueta_ada_são_paulo'},
{name:'Forro Amarelo · Amostra',bg:'#FFD600',pbg:'#FFD600',w:1000,h:1000,s:min(1000,1000),draw:function(ctx,S){
    drawSym(ctx,S*.21,S*.21,S*.58,"rgba(0,0,0,0.08)");
  },fname:'forro_amarelo_amostra'},
{name:'Lock-up · Para Forro',bg:'transparent',pbg:'#FFD600',w:1000,h:1000,s:min(1000,1000),draw:function(ctx,S){
    var sz=S*.38,x=S/2-sz/2,y=S/2-sz/2-S*.06;
    drawSym(ctx,x,y,sz,"#000000");
    var ly=y+sz+S*.04;
    ctx.strokeStyle="rgba(0,0,0,.3)"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(S/2-sz/2,ly); ctx.lineTo(S/2+sz/2,ly); ctx.stroke();
    ctx.font="300 "+Math.round(S*.028)+"px DM Mono,monospace";
    ctx.fillStyle="rgba(0,0,0,.55)"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("ANTES DO HYPE.",S/2,ly+S*.065);
  },fname:'lock-up_para_forro'}];

/* == SVG Context — mesma API do canvas, emite SVG == */

function makeSvgCtx(W,H){
  var els=[], path=[], stack=[];
  var st={fillStyle:'#000',strokeStyle:'#000',lineWidth:1,globalAlpha:1,
          font:'300 16px DM Mono,monospace',textAlign:'left',textBaseline:'alphabetic'};

  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

  function parseFont(f){
    var m=f.match(/(\d+)\s+([\d.]+)px\s+(.+)/);
    return m?{w:m[1],sz:parseFloat(m[2]),fam:m[3]}:{w:'300',sz:16,fam:'DM Mono,monospace'};
  }

  var ctx={
    canvas:{width:W,height:H},
    get fillStyle(){return st.fillStyle;},   set fillStyle(v){st.fillStyle=v;},
    get strokeStyle(){return st.strokeStyle;},set strokeStyle(v){st.strokeStyle=v;},
    get lineWidth(){return st.lineWidth;},    set lineWidth(v){st.lineWidth=v;},
    get globalAlpha(){return st.globalAlpha;},set globalAlpha(v){st.globalAlpha=v;},
    get font(){return st.font;},             set font(v){st.font=v;},
    get textAlign(){return st.textAlign;},   set textAlign(v){st.textAlign=v;},
    get textBaseline(){return st.textBaseline;},set textBaseline(v){st.textBaseline=v;},

    save:function(){stack.push(Object.assign({},st));},
    restore:function(){if(stack.length)st=stack.pop();},
    scale:function(){/* no-op — SVG é vetorial */},
    clearRect:function(){/* no-op */},

    fillRect:function(x,y,w,h){
      var a=st.globalAlpha!==1?' opacity="'+st.globalAlpha+'"':'';
      els.push('<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+esc(st.fillStyle)+'"'+a+'/>');
    },

    beginPath:function(){path=[];},
    moveTo:function(x,y){path.push('M'+x+','+y);},
    lineTo:function(x,y){path.push('L'+x+','+y);},
    closePath:function(){path.push('Z');},

    fill:function(){
      var a=st.globalAlpha!==1?' opacity="'+st.globalAlpha+'"':'';
      els.push('<path d="'+path.join(' ')+'" fill="'+esc(st.fillStyle)+'"'+a+'/>');
      path=[];
    },
    stroke:function(){
      var a=st.globalAlpha!==1?' opacity="'+st.globalAlpha+'"':'';
      els.push('<path d="'+path.join(' ')+'" fill="none" stroke="'+esc(st.strokeStyle)+'" stroke-width="'+st.lineWidth+'"'+a+'/>');
      path=[];
    },

    fillText:function(text,x,y){
      var f=parseFont(st.font);
      var anchor=st.textAlign==='center'?'middle':st.textAlign==='right'?'end':'start';
      var base=st.textBaseline==='middle'?'central':st.textBaseline==='top'?'hanging':'auto';
      var a=st.globalAlpha!==1?' opacity="'+st.globalAlpha+'"':'';
      els.push('<text x="'+x+'" y="'+y+'" font-family="\'DM Mono\',monospace" font-size="'+f.sz+'" font-weight="'+f.w+'" fill="'+esc(st.fillStyle)+'" text-anchor="'+anchor+'" dominant-baseline="'+base+'"'+a+'>'+esc(text)+'</text>');
    },

    toSVG:function(bg){
      var bgEl=(bg&&bg!=='transparent')?'<rect width="'+W+'" height="'+H+'" fill="'+esc(bg)+'"/>\n':'';
      return '<?xml version="1.0" encoding="UTF-8"?>\n'
        +'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'">\n'
        +bgEl+els.join('\n')+'\n</svg>';
    }
  };
  return ctx;
}


/* == Funcoes de canvas e download == */

function drawSym(ctx,ox,oy,size,color){
  var polys=[
    [[268.01,297],[288,257.02],[307.99,297],[324,297],[288,225],[252,297]],
    [[238.5,324],[225,351],[241.01,351],[250.01,333],[254.51,324]],
    [[321.49,324],[325.99,333],[334.99,351],[351,351],[337.5,324]]
  ];
  ctx.fillStyle=color;
  polys.forEach(function(poly){
    ctx.beginPath();
    poly.forEach(function(p,i){
      var x=(p[0]-225)/126*size+ox, y=(p[1]-225)/126*size+oy;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    });
    ctx.closePath(); ctx.fill();
  });
}

function getCanvas(){
  // Busca o canvas sempre — garante que funciona mesmo se _rc nao foi inicializado via fonts.ready
  if(!_rc) _rc = document.getElementById('render-canvas');
  return _rc;
}

function renderAsset(asset){
  var c = getCanvas();
  if(!c){ console.error('ADA Merch: canvas #render-canvas nao encontrado'); return null; }
  c.width=asset.w; c.height=asset.h;
  var ctx=c.getContext('2d');
  ctx.clearRect(0,0,asset.w,asset.h);
  if(asset.bg && asset.bg!=='transparent'){ctx.fillStyle=asset.bg;ctx.fillRect(0,0,asset.w,asset.h);}
  asset.draw(ctx,asset.s);
  return c.toDataURL('image/png');
}

function renderPreview(asset,sz){
  var c = getCanvas();
  if(!c) return null;
  sz=sz||160;
  var scale=sz/Math.max(asset.w,asset.h);
  var pw=Math.round(asset.w*scale), ph=Math.round(asset.h*scale);
  c.width=pw; c.height=ph;
  var ctx=c.getContext('2d');
  ctx.clearRect(0,0,pw,ph);
  if(asset.bg && asset.bg!=='transparent'){ctx.fillStyle=asset.bg;ctx.fillRect(0,0,pw,ph);}
  ctx.save(); ctx.scale(scale,scale);
  asset.draw(ctx,asset.s);
  ctx.restore();
  return c.toDataURL('image/png');
}

function dlAsset(num,name,asset,btn){
  var dataUrl=renderAsset(asset);
  if(!dataUrl){ console.error('ADA Merch: falha ao renderizar "'+asset.name+'"'); return; }

  // Converter data URL para Blob — mais compativel com Firefox/Safari
  var parts=dataUrl.split(',');
  var mime=parts[0].match(/:(.*?);/)[1];
  var bstr=atob(parts[1]);
  var n=bstr.length;
  var u8arr=new Uint8Array(n);
  while(n--){u8arr[n]=bstr.charCodeAt(n);}
  var blob=new Blob([u8arr],{type:mime});
  var blobUrl=URL.createObjectURL(blob);

  var fname='ada_'+num+'_'+name.toLowerCase().replace(/[^a-z0-9]/g,'_')+'_'+asset.fname+'.png';
  var a=document.createElement('a');
  a.href=blobUrl;
  a.download=fname;
  a.style.display='none';
  document.body.appendChild(a); // obrigatorio para Firefox/Safari
  a.click();
  setTimeout(function(){document.body.removeChild(a);URL.revokeObjectURL(blobUrl);},300);

  if(btn){
    btn.textContent='Baixado';
    btn.classList.add('done');
    setTimeout(function(){btn.textContent='↓ PNG';btn.classList.remove('done');},2000);
  }
}

function dlAssetSVG(num,name,asset,btn){
  var svgCtx=makeSvgCtx(asset.w,asset.h);
  asset.draw(svgCtx,asset.s);
  var svgStr=svgCtx.toSVG(asset.bg);
  var blob=new Blob([svgStr],{type:'image/svg+xml'});
  var blobUrl=URL.createObjectURL(blob);
  var fname='ada_'+num+'_'+name.toLowerCase().replace(/[^a-z0-9]/g,'_')+'_'+asset.fname+'.svg';
  var a=document.createElement('a');
  a.href=blobUrl; a.download=fname; a.style.display='none';
  document.body.appendChild(a); a.click();
  setTimeout(function(){document.body.removeChild(a);URL.revokeObjectURL(blobUrl);},300);
  if(btn){
    btn.textContent='Baixado';
    btn.classList.add('done');
    setTimeout(function(){btn.textContent='↓ SVG';btn.classList.remove('done');},2000);
  }
}

function downloadAll(num,name,assets){
  // Intervalo maior (600ms) para nao ser bloqueado como popup
  assets.forEach(function(a,i){
    setTimeout(function(){dlAsset(num,name,a,null);},i*600);
  });
}

function buildAssets(num,name,assets,gridId){
  var grid=document.getElementById(gridId);
  if(!grid)return;
  assets.forEach(function(asset){
    var prev=renderPreview(asset,160);
    var card=document.createElement('div');
    card.className='asset-card';
    card.innerHTML='<div class="asset-thumb" style="background:'+asset.pbg+';">'
      +'<img src="'+prev+'" />'
      +'<div class="asset-overlay"><span class="asset-overlay-text">↓ PNG</span></div>'
      +'</div>'
      +'<div class="asset-info">'
      +'<span class="asset-name">'+asset.name+'</span>'
      +'<span class="asset-spec">'+asset.w+'×'+asset.h+'</span>'
      +'<div style="display:flex;gap:3px;margin-top:4px;">'
      +'<button class="asset-dl-btn" style="flex:1;">↓ PNG</button>'
      +'<button class="asset-dl-btn asset-svg-btn" style="flex:1;">↓ SVG</button>'
      +'</div>'
      +'</div>';
    card.querySelector('.asset-thumb').addEventListener('click',function(){
      dlAsset(num,name,asset,card.querySelector('.asset-dl-btn'));
    });
    card.querySelector('.asset-dl-btn').addEventListener('click',function(){
      dlAsset(num,name,asset,this);
    });
    card.querySelector('.asset-svg-btn').addEventListener('click',function(){
      dlAssetSVG(num,name,asset,this);
    });
    grid.appendChild(card);
  });
}

/* == Lightbox de fotos de merch == */

function merchLightbox(el) {
  var src = el.querySelector('img').src;
  var lb = document.getElementById('merch-lb');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'merch-lb';
    lb.innerHTML = '<img>';
    lb.addEventListener('click', function() { lb.classList.remove('open'); });
    document.body.appendChild(lb);
  }
  lb.querySelector('img').src = src;
  lb.classList.add('open');
}

/* == Inicializacao == */

// _rc inicializado imediatamente quando DOM esta pronto
// (independente de fontes — garante que downloadAll funciona ao clicar em qualquer momento)
document.addEventListener('DOMContentLoaded', function() {
  _rc = document.getElementById('render-canvas');
  if(!_rc) console.warn('ADA Merch: canvas #render-canvas nao encontrado no DOM');
});

// buildAssets aguarda fontes (necessario para renderizar textos com DM Mono)
document.fonts.ready.then(function() {
  if(!_rc) _rc = document.getElementById('render-canvas');
  if(!_rc){ console.error('ADA Merch: abortando — canvas nao encontrado'); return; }

  console.log('ADA Merch: fontes prontas, construindo grids...');
  buildAssets('01','Camiseta',kit01_data,'kit01_grid');
  buildAssets('02','Boné',kit02_data,'kit02_grid');
  buildAssets('03','Adesivos',kit03_data,'kit03_grid');
  buildAssets('04','Caneca',kit04_data,'kit04_grid');
  buildAssets('05','Tote Bag',kit05_data,'kit05_grid');
  buildAssets('06','Crachá Badge',kit06_data,'kit06_grid');
  buildAssets('07','Necessaire',kit07_data,'kit07_grid');
  console.log('ADA Merch: grids prontos.');
});
