/* ADA — Artes do Sistema · js/patterns.js */

var _pc = null;
function _getPCanvas(){ if(!_pc) _pc=document.getElementById('pattern-canvas'); return _pc; }

/* ── Seed offset global — permite Regen por card ── */
var _SEED_OFFSET = 0;

/* ── Polígonos ── */
var _POLYS = [
  [[268.01,297],[288,257.02],[307.99,297],[324,297],[288,225],[252,297]],
  [[238.5,324],[225,351],[241.01,351],[250.01,333],[254.51,324]],
  [[321.49,324],[325.99,333],[334.99,351],[351,351],[337.5,324]]
];

function symAt(ctx,cx,cy,size,color,angle){
  var cos=Math.cos(angle||0),sin=Math.sin(angle||0);
  ctx.fillStyle=color;
  _POLYS.forEach(function(poly){
    ctx.beginPath();
    poly.forEach(function(pt,i){
      var nx=(pt[0]-225)/126-.5, ny=(pt[1]-225)/126-.5;
      var rx=nx*cos-ny*sin, ry=nx*sin+ny*cos;
      i===0?ctx.moveTo(cx+rx*size,cy+ry*size):ctx.lineTo(cx+rx*size,cy+ry*size);
    });
    ctx.closePath(); ctx.fill();
  });
}

function symStroke(ctx,cx,cy,size,color,angle,lw){
  var cos=Math.cos(angle||0),sin=Math.sin(angle||0);
  ctx.strokeStyle=color; ctx.lineWidth=lw||1;
  _POLYS.forEach(function(poly){
    ctx.beginPath();
    poly.forEach(function(pt,i){
      var nx=(pt[0]-225)/126-.5, ny=(pt[1]-225)/126-.5;
      var rx=nx*cos-ny*sin, ry=nx*sin+ny*cos;
      i===0?ctx.moveTo(cx+rx*size,cy+ry*size):ctx.lineTo(cx+rx*size,cy+ry*size);
    });
    ctx.closePath(); ctx.stroke();
  });
}

/* Pseudo-random com seed offset */
function pr(s){ var x=Math.sin((s+_SEED_OFFSET)*9301+49297)*233280; return x-Math.floor(x); }

function addGrain(ctx,S,col,opa,density){
  var n=Math.floor(S*S*(density||0.012));
  for(var i=0;i<n;i++){
    ctx.globalAlpha=pr(i+7171)*opa;
    ctx.fillStyle=col;
    ctx.fillRect(Math.floor(pr(i)*S),Math.floor(pr(i+333)*S),1,1);
  }
  ctx.globalAlpha=1;
}

function symDyn(ctx,cx,cy,size,p,seed,angle){
  ctx.globalAlpha=.1+pr(seed)*0.88;
  var rot=(angle||0)+pr(seed+7)*0.28-.14;
  var col=pr(seed+60)>.62?p.primary:pr(seed+60)>.32?p.secondary:p.dim;
  if(pr(seed+50)>.42){
    symAt(ctx,cx,cy,size,col,rot);
  } else {
    symStroke(ctx,cx,cy,size,col,rot,Math.max(0.8,size*(.009+pr(seed+80)*.007)));
  }
}

/* ── Paletas ── */
var ART_PALETTES = [
  { label:'Padrão',        bg:'#111111', grad1:'#1E1E1A', grad2:'#080808',
    primary:'#FFD600', secondary:'rgba(255,214,0,0.42)', dim:'rgba(255,214,0,0.15)',
    faint:'rgba(255,214,0,0.05)', accent:'rgba(255,255,255,0.7)', grain:'#ffffff' },
  { label:'Meia-noite',    bg:'#0A0F1E', grad1:'#12213A', grad2:'#05080F',
    primary:'#4A7FD4', secondary:'rgba(74,127,212,0.42)', dim:'rgba(74,127,212,0.15)',
    faint:'rgba(74,127,212,0.06)', accent:'rgba(180,210,255,0.55)', grain:'#8ab0ff' },
  { label:'Invertido',     bg:'#FFD600', grad1:'#FFE033', grad2:'#D4AA00',
    primary:'#111111', secondary:'rgba(17,17,17,0.45)', dim:'rgba(17,17,17,0.18)',
    faint:'rgba(17,17,17,0.06)', accent:'rgba(40,40,40,0.8)', grain:'#000000' },
  { label:'Monocromático', bg:'#F4F4F0', grad1:'#FFFFFF', grad2:'#D8D8D4',
    primary:'#0A0A0A', secondary:'rgba(10,10,10,0.38)', dim:'rgba(10,10,10,0.13)',
    faint:'rgba(10,10,10,0.04)', accent:'rgba(30,30,30,0.72)', grain:'#000000' }
];

/* ── Composições — 4K ── */
var pattern_data = [

/* 1 — Radiância — sem grain, degradê radial, centro limpo */
{name:'Radiância', w:4000,h:4000,s:4000,
draw:function(ctx,S,p){
  var cx=S/2,cy=S/2;
  if(ctx.createRadialGradient){
    var grd=ctx.createRadialGradient(cx,cy,0,cx,cy,S*.76);
    grd.addColorStop(0,p.grad1); grd.addColorStop(1,p.grad2);
    ctx.fillStyle=grd; ctx.globalAlpha=1; ctx.fillRect(0,0,S,S);
  }
  /* anel externo: 20 */
  for(var i=0;i<20;i++){
    var a=i/20*Math.PI*2+pr(i+1)*0.18;
    var r=S*(.3+pr(i+2)*.13);
    var sz=S*(.038+pr(i+3)*.11);
    symDyn(ctx,cx+Math.cos(a)*r,cy+Math.sin(a)*r,sz,p,i*7+1,a+Math.PI/2);
  }
  /* anel médio: 12 */
  for(var i=0;i<12;i++){
    var a=i/12*Math.PI*2+.55+pr(i+10)*.2;
    var r=S*(.18+pr(i+11)*.07);
    var sz=S*(.055+pr(i+12)*.13);
    symDyn(ctx,cx+Math.cos(a)*r,cy+Math.sin(a)*r,sz,p,i*7+50,a+Math.PI/2);
  }
  /* anel interno: 7 micro */
  for(var i=0;i<7;i++){
    var a=i/7*Math.PI*2+pr(i+20)*0.4;
    var r=S*(.08+pr(i+21)*.06);
    var sz=S*(.018+pr(i+22)*.048);
    symDyn(ctx,cx+Math.cos(a)*r,cy+Math.sin(a)*r,sz,p,i*7+100,a);
  }
  /* centro: limpo — apenas outline fantasma muito tênue */
  ctx.globalAlpha=.08;
  symStroke(ctx,cx,cy,S*.18,p.primary,0,Math.round(S*.001));
  ctx.globalAlpha=1;
},fname:'ada_radiancia'},

/* 2 — Espiral — menos ruído, degradê escuro no centro */
{name:'Espiral', w:4000,h:4000,s:4000,
draw:function(ctx,S,p){
  var cx=S/2,cy=S/2,n=44;
  /* degradê: mais escuro no centro */
  if(ctx.createRadialGradient){
    var grd=ctx.createRadialGradient(cx,cy,0,cx,cy,S*.52);
    grd.addColorStop(0,p.grad2); /* escuro no centro */
    grd.addColorStop(1,p.grad1); /* mais claro nas bordas */
    ctx.fillStyle=grd; ctx.globalAlpha=1; ctx.fillRect(0,0,S,S);
  }
  for(var i=0;i<n;i++){
    var t=i/n;
    var angle=t*Math.PI*5.8+pr(i+1)*0.12; /* jitter reduzido: espiral mais limpa */
    var r=S*.025+t*S*.46+pr(i+2)*S*.01;  /* jitter de raio mínimo */
    var sz=S*(.016+t*.22+pr(i+3)*.12);
    sz=Math.max(sz,S*.013);
    ctx.globalAlpha=Math.min(.1+t*.72+pr(i+4)*.2,1);
    var col=pr(i+5)>.58?p.primary:pr(i+6)>.38?p.secondary:p.accent;
    var rot=angle+Math.PI*.5+pr(i+7)*Math.PI*.4-.2;
    if(pr(i+8)>.38){
      symAt(ctx,cx+Math.cos(angle)*r,cy+Math.sin(angle)*r,sz,col,rot);
    } else {
      symStroke(ctx,cx+Math.cos(angle)*r,cy+Math.sin(angle)*r,sz,col,rot,
        Math.max(0.8,sz*(.007+pr(i+9)*.005)));
    }
  }
  ctx.globalAlpha=1;
  /* grain mínimo */
  addGrain(ctx,S,p.grain,.18,.004);
},fname:'ada_espiral'},

/* 3 — Campo de Força — grade 11×11, outline fino */
{name:'Campo de Força', w:4000,h:4000,s:4000,
draw:function(ctx,S,p){
  var cx=S/2,cy=S/2,cols=11,rows=11;
  for(var r=0;r<rows;r++) for(var c=0;c<cols;c++){
    var seed=r*cols+c;
    var bx=(c+pr(seed+1)*.2-.1)/(cols-1)*S;
    var by=(r+pr(seed+2)*.2-.1)/(rows-1)*S;
    var dx=bx-cx,dy=by-cy,dist=Math.sqrt(dx*dx+dy*dy);
    var angle=Math.atan2(dy,dx);
    var pull=S*.08*(1-dist/(S*.65));
    var nx=bx+Math.cos(angle+Math.PI/2)*pull+(pr(seed+3)-.5)*S*.02;
    var ny=by+Math.sin(angle+Math.PI/2)*pull+(pr(seed+4)-.5)*S*.02;
    var sz=S*(.034+(.5-dist/S)*.1);
    sz=sz*(0.5+pr(seed+5)*1.0); sz=Math.max(sz,S*.016);
    var a=.1+(.55-dist/S)*1.1+pr(seed+6)*.28;
    if(a<.06)a=.06; if(a>1)a=1;
    ctx.globalAlpha=a;
    var rot=angle+Math.PI*.5+pr(seed+7)*0.5-.25;
    var col=pr(seed+8)>.6?p.primary:pr(seed+9)>.38?p.secondary:p.dim;
    if(pr(seed+10)>.42){
      symAt(ctx,nx,ny,sz,col,rot);
    } else {
      symStroke(ctx,nx,ny,sz,col,rot,Math.max(0.8,sz*(.008+pr(seed+11)*.006)));
    }
  }
  ctx.globalAlpha=1;
  addGrain(ctx,S,p.grain,.3,.01);
},fname:'ada_campo_de_forca'},

/* 4 — Pulso — As ±90°, só 25% das barras, menores */
{name:'Pulso', w:4000,h:4000,s:4000,
draw:function(ctx,S,p){
  var cy=S/2;
  var gy=S*.04;
  while(gy<S*.96){
    var step=S*(.014+pr(gy+1)*.016);
    ctx.globalAlpha=.03+pr(gy+2)*.04;
    ctx.strokeStyle=p.dim; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(S,gy); ctx.stroke();
    gy+=step;
  }
  ctx.globalAlpha=.08; ctx.strokeStyle=p.secondary; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(S*.03,cy); ctx.lineTo(S*.97,cy); ctx.stroke();

  var nEv=88;
  for(var e=0;e<nEv;e++){
    var seed=e*13;
    var ex=S*.03+pr(seed+1)*S*.94;
    var inCluster=pr(seed+2)>.55;
    var nBars=inCluster?Math.floor(2+pr(seed+3)*5):1;
    var clusterBase=pr(seed+4);

    for(var b=0;b<nBars;b++){
      var bs=seed*10+b+100;
      var bx=ex+(b-nBars/2)*S*(.004+pr(bs+1)*.018);
      var bw=pr(bs+2)>.78?S*(.005+pr(bs+3)*.011):S*(.0007+pr(bs+4)*.003);
      bw=Math.max(bw,1);
      var hFactor=pr(bs+5)>.72?.85+pr(bs+6)*.15:pr(bs+5)>.35?.2+pr(bs+6)*.45:.05+pr(bs+6)*.18;
      var bh=S*(.018+clusterBase*.42*hFactor+pr(bs+7)*.07);
      var dv=pr(bs+8); var dir=dv>.72?0:dv>.38?1:-1;
      ctx.globalAlpha=.12+pr(bs+9)*.76;
      var col=pr(bs+10)>.65?p.secondary:p.primary;
      var isFill=pr(bs+11)>.45;
      var tipY;
      if(dir===0){
        tipY=cy-bh/2;
        if(isFill){ ctx.fillStyle=col; ctx.fillRect(bx-bw/2,cy-bh/2,bw,bh); }
        else { ctx.strokeStyle=col; ctx.lineWidth=bw; ctx.beginPath(); ctx.moveTo(bx,cy-bh/2); ctx.lineTo(bx,cy+bh/2); ctx.stroke(); }
      } else if(dir===1){
        tipY=cy-bh;
        if(isFill){ ctx.fillStyle=col; ctx.fillRect(bx-bw/2,cy-bh,bw,bh); }
        else { ctx.strokeStyle=col; ctx.lineWidth=bw; ctx.beginPath(); ctx.moveTo(bx,cy); ctx.lineTo(bx,cy-bh); ctx.stroke(); }
      } else {
        tipY=cy+bh;
        if(isFill){ ctx.fillStyle=col; ctx.fillRect(bx-bw/2,cy,bw,bh); }
        else { ctx.strokeStyle=col; ctx.lineWidth=bw; ctx.beginPath(); ctx.moveTo(bx,cy); ctx.lineTo(bx,cy+bh); ctx.stroke(); }
      }

      /* A índice: só 25% das barras, ±90°, base alinhada à ponta da barra */
      if(pr(bs+12)>.75){
        var symSz=S*(.008+pr(bs+13)*.012+hFactor*.016);
        var symAngle=pr(bs+17)>.5?Math.PI/2:-Math.PI/2;
        /* base do A flush com a ponta — A toca a barra sem gap */
        var symCY=dir===(-1)?tipY+symSz*.5:tipY-symSz*.5;
        ctx.globalAlpha=.1+pr(bs+14)*.48;
        if(pr(bs+16)>.5){
          symAt(ctx,bx,symCY,symSz,col,symAngle);
        } else {
          symStroke(ctx,bx,symCY,symSz,col,symAngle,Math.max(0.8,symSz*.009));
        }
      }
    }
  }
  ctx.globalAlpha=1;
  addGrain(ctx,S,p.grain,.2,.012);
},fname:'ada_pulso'},

/* 5 — Constelação */
{name:'Constelação', w:4000,h:4000,s:4000,
draw:function(ctx,S,p){
  for(var bg=0;bg<5;bg++){
    var seed=bg+8000;
    var bsz=S*(.18+pr(seed+1)*.38);
    ctx.globalAlpha=.03+pr(seed+2)*.04;
    if(pr(seed+3)>.5) symAt(ctx,S/2+(pr(seed+4)-.5)*S*.4,S/2+(pr(seed+5)-.5)*S*.4,bsz,p.primary,pr(seed+6)*Math.PI);
    else symStroke(ctx,S/2+(pr(seed+4)-.5)*S*.4,S/2+(pr(seed+5)-.5)*S*.4,bsz,p.dim,pr(seed+6)*Math.PI,Math.max(0.8,bsz*.009));
  }
  var CONSTS=[
    [[0,.3],[.4,0],[.85,.18],[1.1,.82],[.55,1.0]],
    [[0,0],[.5,.38],[1,0],[1.5,.38],[2,0]],
    [[0,.55],[.3,0],[.72,.12],[1.1,0],[1.38,.55],[1,.95],[.38,.82]],
    [[0,1],[.42,.28],[.82,0],[1.18,.52],[.82,1.22]],
    [[.5,0],[0,.62],[.3,1.2],[.82,1.0],[1.22,.62],[.82,.18]],
    [[0,0],[.6,.4],[1.2,0],[.6,1.0]],
  ];
  for(var ci=0;ci<6;ci++){
    var cseed=ci*200+10000;
    var shape=CONSTS[ci%CONSTS.length];
    var scale=S*(.09+pr(cseed+1)*.15);
    var ox=S*(.08+pr(cseed+2)*.84);
    var oy=S*(.08+pr(cseed+3)*.84);
    var cAlpha=.22+pr(cseed+4)*.35;
    var cCol=pr(cseed+5)>.55?p.primary:p.secondary;
    var symSz=scale*(.08+pr(cseed+6)*.06);
    for(var si=0;si<shape.length-1;si++){
      var p0s=shape[si],p1s=shape[si+1];
      ctx.globalAlpha=cAlpha*.55;
      ctx.strokeStyle=cCol; ctx.lineWidth=Math.max(0.8,S*.0005);
      ctx.beginPath();
      ctx.moveTo(ox+p0s[0]*scale,oy+p0s[1]*scale);
      ctx.lineTo(ox+p1s[0]*scale,oy+p1s[1]*scale);
      ctx.stroke();
    }
    for(var si=0;si<shape.length;si++){
      var pt=shape[si];
      var nseed=cseed+si*7;
      ctx.globalAlpha=cAlpha*(pr(nseed+1)>.3?.85:.45);
      var nsz=symSz*(0.7+pr(nseed+2)*.6);
      if(pr(nseed+3)>.45){
        symAt(ctx,ox+pt[0]*scale,oy+pt[1]*scale,nsz,cCol,pr(nseed+4)*0.2-.1);
      } else {
        symStroke(ctx,ox+pt[0]*scale,oy+pt[1]*scale,nsz,cCol,pr(nseed+4)*0.2-.1,Math.max(0.8,nsz*.009));
      }
    }
  }
  var n=240, pts=[];
  for(var i=0;i<n;i++){
    var seed=i*7;
    var pull=pr(seed+3)>.45?1:.55;
    var px=S/2+(pr(seed+1)-.5)*S*pull;
    var py=S/2+(pr(seed+2)-.5)*S*pull;
    var pv=pr(seed+4);
    var sz=pv>.9?S*.008+pr(seed+5)*S*.014:pv>.65?S*.002+pr(seed+5)*S*.006:S*.0008+pr(seed+5)*S*.0022;
    var a=.12+pr(seed+6)*.72;
    var col=pr(seed+7)>.55?p.primary:pr(seed+7)>.25?p.secondary:p.accent;
    pts.push({x:px,y:py,sz:sz,a:a,col:col});
    ctx.globalAlpha=a; ctx.fillStyle=col;
    if(pr(seed+8)>.55){ ctx.beginPath(); ctx.arc(px,py,Math.max(.5,sz/2),0,Math.PI*2); ctx.fill(); }
    else { ctx.fillRect(px-sz/2,py-sz/2,sz,sz); }
  }
  var thresh=S*.09;
  for(var i=0;i<n;i++) for(var j=i+1;j<n;j++){
    var dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
    var d=Math.sqrt(dx*dx+dy*dy);
    if(d<thresh){
      var t=1-d/thresh;
      ctx.globalAlpha=t*t*.18*(pts[i].a+pts[j].a)*.5;
      ctx.strokeStyle=p.secondary; ctx.lineWidth=Math.max(0.5,S*.0003);
      ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke();
    }
  }
  ctx.globalAlpha=1;
  addGrain(ctx,S,p.grain,.22,.008);
},fname:'ada_constelacao'},

/* 6 — Nuvem */
{name:'Nuvem', w:4000,h:4000,s:4000,
draw:function(ctx,S,p){
  for(var bg=0;bg<6;bg++){
    var seed=bg+9000;
    ctx.globalAlpha=.03+pr(seed+1)*.04;
    var bsz=S*(.28+pr(seed+2)*.42);
    var bx=S/2+(pr(seed+3)-.5)*S*.32, by=S/2+(pr(seed+4)-.5)*S*.32;
    var bagl=pr(seed+5)*0.15-.075;
    if(pr(seed+6)>.5) symAt(ctx,bx,by,bsz,p.primary,bagl);
    else symStroke(ctx,bx,by,bsz,p.dim,bagl,Math.max(0.8,bsz*.008));
  }
  var n=2200;
  for(var i=0;i<n;i++){
    var pi=Math.floor(pr(i)*3),poly=_POLYS[pi];
    var ei=Math.floor(pr(i+100)*poly.length);
    var p0=poly[ei],p1=poly[(ei+1)%poly.length],t=pr(i+200);
    var nx=(p0[0]+t*(p1[0]-p0[0])-225)/126-.5;
    var ny=(p0[1]+t*(p1[1]-p0[1])-225)/126-.5;
    var sc=S*(pr(i+300)*.1+.003);
    var x=S/2+nx*S*.74+(pr(i+400)*2-1)*sc;
    var y=S/2+ny*S*.74+(pr(i+500)*2-1)*sc;
    var pv=pr(i+601);
    var psz=pv>.94?S*(.01+pr(i+602)*.022):pv>.78?S*(.003+pr(i+602)*.008):pv>.55?S*(.001+pr(i+602)*.003):S*.0004+pr(i+602)*S*.001;
    ctx.globalAlpha=pr(i+700)*.65+.08;
    ctx.fillStyle=pr(i+800)>.48?p.primary:pr(i+800)>.22?p.secondary:p.accent;
    if(pr(i+900)>.7&&psz>S*.003){ ctx.beginPath(); ctx.arc(x+psz/2,y+psz/2,psz/2,0,Math.PI*2); ctx.fill(); }
    else { ctx.fillRect(x,y,psz,psz); }
  }
  ctx.globalAlpha=1;
  addGrain(ctx,S,p.grain,.2,.009);
},fname:'ada_nuvem'},

/* 7 — Interferência — tamanhos mais variados */
{name:'Interferência', w:4000,h:4000,s:4000,
draw:function(ctx,S,p){
  var layers=[
    {ang:0,     sp:S*.118, sz:S*.055, alpha:.36, mode:'fill'},
    {ang:.148,  sp:S*.082, sz:S*.038, alpha:.28, mode:'stroke'},
    {ang:.308,  sp:S*.055, sz:S*.025, alpha:.22, mode:'fill'},
    {ang:.534,  sp:S*.1,   sz:S*.048, alpha:.26, mode:'stroke'},
    {ang:.848,  sp:S*.145, sz:S*.07,  alpha:.18, mode:'fill'},
  ];
  layers.forEach(function(l,li){
    var cos=Math.cos(l.ang),sin=Math.sin(l.ang);
    var count=Math.ceil(S*1.6/l.sp)+3;
    for(var r=-count/2|0;r<=count/2;r++) for(var c=-count/2|0;c<=count/2;c++){
      var seed=(li+1)*17777+(r+100)*257+(c+100);
      if(pr(seed)>.8) continue;
      var bx=S/2+c*l.sp*cos-r*l.sp*sin;
      var by=S/2+c*l.sp*sin+r*l.sp*cos;
      if(bx<-l.sz*2||bx>S+l.sz*2||by<-l.sz*2||by>S+l.sz*2) continue;
      var jx=(pr(seed+1)-.5)*l.sp*.25;
      var jy=(pr(seed+2)-.5)*l.sp*.25;
      /* tamanho dramático: micro, normal, grande */
      var sv=pr(seed+12);
      var sz=sv>.92?l.sz*(1.7+pr(seed+13)*.4):sv>.08?l.sz*(0.4+pr(seed+3)*1.2):l.sz*(0.12+pr(seed+13)*.15);
      var a=l.alpha*(0.35+pr(seed+4)*1.0);
      a=Math.min(a,0.92);
      ctx.globalAlpha=a;
      var col=pr(seed+5)>.58?p.primary:pr(seed+5)>.28?p.secondary:p.dim;
      var rot=l.ang+pr(seed+6)*0.5-.25;
      if(l.mode==='fill'){
        symAt(ctx,bx+jx,by+jy,sz,col,rot);
      } else {
        symStroke(ctx,bx+jx,by+jy,sz,col,rot,Math.max(0.8,sz*(.008+pr(seed+7)*.006)));
      }
    }
  });
  ctx.globalAlpha=1;
  addGrain(ctx,S,p.grain,.32,.013);
},fname:'ada_interferencia'},

/* 8 — Silêncio — glitch: linhas saindo dos strokes */
{name:'Silêncio', w:4000,h:4000,s:4000,
draw:function(ctx,S,p){
  var cy=S/2;
  /* linhas horizontais de fundo */
  var y=S*.06, lineIdx=0;
  while(y<S*.94){
    var step=S*(.018+pr(lineIdx+1)*.022);
    var x0=S*(.05+pr(lineIdx+2)*.08);
    var x1=S*(.87+pr(lineIdx+3)*.1);
    ctx.globalAlpha=.04+pr(lineIdx+4)*.24;
    ctx.strokeStyle=p.dim; ctx.lineWidth=pr(lineIdx+5)>.88?2:1;
    ctx.beginPath(); ctx.moveTo(x0,y); ctx.lineTo(x1,y); ctx.stroke();
    y+=step; lineIdx++;
  }
  /* símbolo fantasma largo */
  ctx.globalAlpha=.05;
  symStroke(ctx,S/2,cy,S*.88,p.dim,0,Math.round(S*.0007));
  /* outline principal */
  ctx.globalAlpha=.88;
  symStroke(ctx,S/2,cy,S*.54,p.primary,0,Math.round(S*.0022));
  /* outline secundário deslocado */
  ctx.globalAlpha=.14;
  symStroke(ctx,S/2+S*.012,cy+S*.008,S*.42,p.secondary,0,Math.round(S*.0012));
  /* terceiro menor */
  ctx.globalAlpha=.06;
  symStroke(ctx,S/2-S*.006,cy-S*.004,S*.32,p.primary,0,Math.round(S*.0008));

  /* ── glitch: linhas horizontais que emanam dos strokes do símbolo ── */
  /* alturas características do símbolo A em torno de S*.54 */
  var symH=S*.54;
  var glitchYs=[
    cy-symH*.48,           /* topo */
    cy-symH*.2,            /* meio-alto */
    cy+symH*.08,           /* base do triângulo principal */
    cy+symH*.32,           /* nível dos pés */
    cy+symH*.46,           /* base total */
  ];
  glitchYs.forEach(function(gy,gi){
    var nLines=2+Math.floor(pr(gi*17+1+8800)*3);
    for(var li=0;li<nLines;li++){
      var seed=gi*100+li+7000;
      var drift=(pr(seed+1)-.5)*S*.018;
      /* linha base que atravessa o símbolo */
      var lx0=S*.5-symH*.5-pr(seed+2)*S*.1;
      var lx1=S*.5+symH*.5+pr(seed+3)*S*.1;
      ctx.globalAlpha=.1+pr(seed+4)*.22;
      ctx.strokeStyle=pr(seed+5)>.55?p.primary:p.secondary;
      ctx.lineWidth=pr(seed+6)>.9?2.5:pr(seed+6)>.7?1.5:1;
      ctx.beginPath(); ctx.moveTo(lx0,gy+drift); ctx.lineTo(lx1,gy+drift); ctx.stroke();
      /* segmento glitch deslocado — como corte digital */
      if(pr(seed+7)>.38){
        var gx0=S*.5+pr(seed+8)*symH*.6-(pr(seed+9)>.5?symH*.3:0);
        var gx1=gx0+pr(seed+10)*S*.18+S*.04;
        var gshift=(pr(seed+11)-.5)*S*.012;
        ctx.globalAlpha=.18+pr(seed+12)*.32;
        ctx.lineWidth=pr(seed+13)>.8?3:1;
        ctx.beginPath(); ctx.moveTo(gx0,gy+drift+gshift); ctx.lineTo(gx1,gy+drift+gshift); ctx.stroke();
      }
      /* micro-segmento extra muito fino */
      if(pr(seed+14)>.6){
        var mx0=S*.5+(pr(seed+15)-.5)*symH;
        ctx.globalAlpha=.08+pr(seed+16)*.18;
        ctx.lineWidth=1;
        ctx.beginPath(); ctx.moveTo(mx0,gy+drift+(pr(seed+17)-.5)*S*.006); ctx.lineTo(mx0+pr(seed+18)*S*.08+S*.02,gy+drift+(pr(seed+17)-.5)*S*.006); ctx.stroke();
      }
    }
  });
  /* micro-pontos */
  for(var i=0;i<42;i++){
    var seed=i+4000;
    ctx.globalAlpha=.04+pr(seed+1)*.14; ctx.fillStyle=p.primary;
    var px=pr(seed+2)*S*.86+S*.07, py=pr(seed+3)*S*.86+S*.07;
    ctx.fillRect(px,py,pr(seed+4)*S*.006+S*.001,pr(seed+4)*S*.006+S*.001);
  }
  ctx.globalAlpha=1;
  addGrain(ctx,S,p.grain,.16,.006);
},fname:'ada_silencio'}

];

/* ── SVG context ── */
function makeSvgCtxPat(W,H){
  var els=[],path=[],stk=[];
  var st={fillStyle:'#000',strokeStyle:'#000',lineWidth:1,globalAlpha:1};
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  var ctx={
    canvas:{width:W,height:H},
    get fillStyle(){return st.fillStyle;},   set fillStyle(v){st.fillStyle=v;},
    get strokeStyle(){return st.strokeStyle;},set strokeStyle(v){st.strokeStyle=v;},
    get lineWidth(){return st.lineWidth;},    set lineWidth(v){st.lineWidth=v;},
    get globalAlpha(){return st.globalAlpha;},set globalAlpha(v){st.globalAlpha=v;},
    save:function(){stk.push(Object.assign({},st));},
    restore:function(){if(stk.length)st=stk.pop();},
    scale:function(){},clearRect:function(){},
    arc:function(x,y,r){path.push('M'+(x+r).toFixed(1)+','+y.toFixed(1)+' A'+r.toFixed(1)+','+r.toFixed(1)+' 0 1,0 '+(x-r).toFixed(1)+','+y.toFixed(1)+' A'+r.toFixed(1)+','+r.toFixed(1)+' 0 1,0 '+(x+r).toFixed(1)+','+y.toFixed(1));},
    fillRect:function(x,y,w,h){var a=st.globalAlpha!==1?' opacity="'+st.globalAlpha.toFixed(3)+'"':'';els.push('<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+Math.max(w,.1).toFixed(1)+'" height="'+Math.max(h,.1).toFixed(1)+'" fill="'+esc(st.fillStyle)+'"'+a+'/>');},
    beginPath:function(){path=[];},
    moveTo:function(x,y){path.push('M'+x.toFixed(1)+','+y.toFixed(1));},
    lineTo:function(x,y){path.push('L'+x.toFixed(1)+','+y.toFixed(1));},
    closePath:function(){path.push('Z');},
    fill:function(){var a=st.globalAlpha!==1?' opacity="'+st.globalAlpha.toFixed(3)+'"':'';els.push('<path d="'+path.join(' ')+'" fill="'+esc(st.fillStyle)+'"'+a+'/>');path=[];},
    stroke:function(){var a=st.globalAlpha!==1?' opacity="'+st.globalAlpha.toFixed(3)+'"':'';els.push('<path d="'+path.join(' ')+'" fill="none" stroke="'+esc(st.strokeStyle)+'" stroke-width="'+st.lineWidth.toFixed(1)+'"'+a+'/>');path=[];},
    createRadialGradient:null,
    toSVG:function(bg){
      var bgEl=(bg&&bg!=='transparent')?'<rect width="'+W+'" height="'+H+'" fill="'+esc(bg)+'"/>\n':'';
      return '<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'">\n'+bgEl+els.join('\n')+'\n</svg>';
    }
  };
  return ctx;
}

/* ── Lightbox ── */
function _initArtLightbox(){
  if(document.getElementById('art-lightbox')) return;
  var lb=document.createElement('div');
  lb.id='art-lightbox';
  lb.style.cssText='display:none;position:fixed;inset:0;background:rgba(0,0,0,.96);z-index:9999;cursor:zoom-out;align-items:center;justify-content:center;flex-direction:column;gap:14px;';
  lb.innerHTML='<img id="art-lb-img" style="max-width:90vw;max-height:85vh;object-fit:contain;display:block;">'
    +'<div id="art-lb-name" style="font-family:\'DM Mono\',monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,214,0,.4);"></div>';
  lb.addEventListener('click',function(){lb.style.display='none';});
  document.body.appendChild(lb);
}

function openArtLightbox(asset,palette){
  var c=_getPCanvas(); if(!c) return;
  var lbSz=1200, scale=lbSz/asset.s;
  c.width=Math.round(asset.w*scale); c.height=Math.round(asset.h*scale);
  var ctx=c.getContext('2d');
  ctx.clearRect(0,0,c.width,c.height);
  ctx.fillStyle=palette.bg; ctx.fillRect(0,0,c.width,c.height);
  if(ctx.createRadialGradient&&(asset.fname==='ada_radiancia'||asset.fname==='ada_espiral')){
    var gcx=c.width/2,gcy=c.height/2,gr=c.width*(asset.fname==='ada_radiancia'?.76:.52);
    var grd=ctx.createRadialGradient(gcx,gcy,0,gcx,gcy,gr);
    if(asset.fname==='ada_radiancia'){grd.addColorStop(0,palette.grad1);grd.addColorStop(1,palette.grad2);}
    else{grd.addColorStop(0,palette.grad2);grd.addColorStop(1,palette.grad1);}
    ctx.fillStyle=grd; ctx.fillRect(0,0,c.width,c.height);
  }
  ctx.save(); ctx.scale(scale,scale);
  asset.draw(ctx,asset.s,palette);
  ctx.restore();
  var img=document.getElementById('art-lb-img');
  var lbname=document.getElementById('art-lb-name');
  var lb=document.getElementById('art-lightbox');
  if(!img||!lb) return;
  img.src=c.toDataURL('image/png');
  if(lbname) lbname.textContent=asset.name+' · '+palette.label;
  lb.style.display='flex';
}

/* ── Render preview ── */
function renderPatPrev(asset,sz,palette){
  var c=_getPCanvas(); if(!c) return null;
  palette=palette||ART_PALETTES[0];
  sz=sz||160;
  var scale=sz/Math.max(asset.w,asset.h);
  var pw=Math.round(asset.w*scale),ph=Math.round(asset.h*scale);
  c.width=pw; c.height=ph;
  var ctx=c.getContext('2d');
  ctx.clearRect(0,0,pw,ph);
  ctx.fillStyle=palette.bg; ctx.fillRect(0,0,pw,ph);
  if(ctx.createRadialGradient&&(asset.fname==='ada_radiancia'||asset.fname==='ada_espiral')){
    var gcx=pw/2,gcy=ph/2,gr=pw*(asset.fname==='ada_radiancia'?.76:.52);
    var grd=ctx.createRadialGradient(gcx,gcy,0,gcx,gcy,gr);
    if(asset.fname==='ada_radiancia'){grd.addColorStop(0,palette.grad1);grd.addColorStop(1,palette.grad2);}
    else{grd.addColorStop(0,palette.grad2);grd.addColorStop(1,palette.grad1);}
    ctx.fillStyle=grd; ctx.fillRect(0,0,pw,ph);
  }
  ctx.save(); ctx.scale(scale,scale);
  asset.draw(ctx,asset.s,palette);
  ctx.restore();
  return c.toDataURL('image/png');
}

/* ── Downloads 4K ── */
function dlPattern(asset,palette,btn,seedOff){
  var soff=seedOff||0;
  if(btn){btn.textContent='…';btn.disabled=true;}
  setTimeout(function(){
    _SEED_OFFSET=soff;
    var c=_getPCanvas(); if(!c){_SEED_OFFSET=0;return;}
    c.width=asset.w; c.height=asset.h;
    var ctx=c.getContext('2d');
    ctx.clearRect(0,0,asset.w,asset.h);
    ctx.fillStyle=palette.bg; ctx.fillRect(0,0,asset.w,asset.h);
    if(ctx.createRadialGradient&&(asset.fname==='ada_radiancia'||asset.fname==='ada_espiral')){
      var gcx=asset.w/2,gcy=asset.h/2,gr=asset.w*(asset.fname==='ada_radiancia'?.76:.52);
      var grd=ctx.createRadialGradient(gcx,gcy,0,gcx,gcy,gr);
      if(asset.fname==='ada_radiancia'){grd.addColorStop(0,palette.grad1);grd.addColorStop(1,palette.grad2);}
      else{grd.addColorStop(0,palette.grad2);grd.addColorStop(1,palette.grad1);}
      ctx.fillStyle=grd; ctx.fillRect(0,0,asset.w,asset.h);
    }
    asset.draw(ctx,asset.s,palette);
    _SEED_OFFSET=0;
    var a=document.createElement('a');
    a.download=asset.fname+'_'+palette.label.toLowerCase().replace(/\s/g,'_')+'_4k.png';
    a.href=c.toDataURL('image/png'); a.click();
    if(btn){btn.textContent='↓ PNG';btn.disabled=false;btn.classList.add('done');setTimeout(function(){btn.classList.remove('done');},2000);}
  },30);
}

function dlPatternSVG(asset,palette,btn,seedOff){
  var soff=seedOff||0;
  if(btn){btn.textContent='…';btn.disabled=true;}
  setTimeout(function(){
    _SEED_OFFSET=soff;
    var ctx=makeSvgCtxPat(asset.w,asset.h);
    asset.draw(ctx,asset.s,palette);
    _SEED_OFFSET=0;
    var blob=new Blob([ctx.toSVG(palette.bg)],{type:'image/svg+xml'});
    var a=document.createElement('a');
    a.download=asset.fname+'_'+palette.label.toLowerCase().replace(/\s/g,'_')+'_4k.svg';
    a.href=URL.createObjectURL(blob); a.click();
    setTimeout(function(){URL.revokeObjectURL(a.href);},3000);
    if(btn){btn.textContent='↓ SVG';btn.disabled=false;btn.classList.add('done');setTimeout(function(){btn.classList.remove('done');},2000);}
  },30);
}

/* ── Build grid ── */
function buildPatternGrid(assets,gridId){
  var grid=document.getElementById(gridId); if(!grid) return;
  assets.forEach(function(asset){
    var pidx=0;
    var seedOff=0;

    var pal=ART_PALETTES[pidx];
    _SEED_OFFSET=seedOff;
    var prev=renderPatPrev(asset,160,pal);
    _SEED_OFFSET=0;

    var card=document.createElement('div');
    card.className='asset-card';

    var thumbDiv=document.createElement('div');
    thumbDiv.className='asset-thumb';
    thumbDiv.style.background=pal.bg;
    thumbDiv.innerHTML='<img src="'+(prev||'')+'" style="width:100%;height:100%;object-fit:contain;">'
      +'<div class="asset-overlay"><span class="asset-overlay-text">⤢ ampliar</span></div>';
    thumbDiv.addEventListener('click',function(){
      _SEED_OFFSET=seedOff;
      openArtLightbox(asset,ART_PALETTES[pidx]);
      _SEED_OFFSET=0;
    });

    /* linha controles: paleta + regen */
    var ctrlRow=document.createElement('div');
    ctrlRow.style.cssText='display:flex;gap:3px;margin-top:6px;';

    var _btnStyle='font-family:var(--mono);font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,214,0,.45);background:transparent;border:1px solid rgba(255,214,0,.22);padding:5px 10px;cursor:pointer;transition:all .2s;';

    var palBtn=document.createElement('button');
    palBtn.style.cssText=_btnStyle+'flex:1;text-align:left;';
    palBtn.textContent='● '+pal.label;
    palBtn.addEventListener('click',function(e){
      e.stopPropagation();
      pidx=(pidx+1)%ART_PALETTES.length;
      var p=ART_PALETTES[pidx];
      palBtn.textContent='● '+p.label;
      thumbDiv.style.background=p.bg;
      var img=thumbDiv.querySelector('img');
      _SEED_OFFSET=seedOff;
      if(img) img.src=renderPatPrev(asset,160,p)||'';
      _SEED_OFFSET=0;
    });

    var regenBtn=document.createElement('button');
    regenBtn.title='Gerar variação';
    regenBtn.textContent='↺ Regen';
    regenBtn.style.cssText=_btnStyle+'flex-shrink:0;';
    regenBtn.addEventListener('click',function(e){
      e.stopPropagation();
      seedOff=Math.floor(Math.random()*99991)*13+1;
      var p=ART_PALETTES[pidx];
      thumbDiv.style.background=p.bg;
      var img=thumbDiv.querySelector('img');
      _SEED_OFFSET=seedOff;
      if(img) img.src=renderPatPrev(asset,160,p)||'';
      _SEED_OFFSET=0;
    });

    ctrlRow.appendChild(palBtn);
    ctrlRow.appendChild(regenBtn);

    var infoDiv=document.createElement('div');
    infoDiv.className='asset-info';
    infoDiv.innerHTML='<span class="asset-name">'+asset.name+'</span>'
      +'<span class="asset-spec">4000×4000 · 4K</span>';
    infoDiv.appendChild(ctrlRow);

    var dlDiv=document.createElement('div');
    dlDiv.style.cssText='display:flex;gap:3px;margin-top:4px;';
    var dlPng=document.createElement('button');
    dlPng.style.cssText=_btnStyle+'flex:1;'; dlPng.textContent='↓ PNG';
    var dlSvg=document.createElement('button');
    dlSvg.style.cssText=_btnStyle+'flex:1;'; dlSvg.textContent='↓ SVG';
    dlDiv.appendChild(dlPng); dlDiv.appendChild(dlSvg);
    infoDiv.appendChild(dlDiv);

    dlPng.addEventListener('click',function(e){e.stopPropagation();dlPattern(asset,ART_PALETTES[pidx],dlPng,seedOff);});
    dlSvg.addEventListener('click',function(e){e.stopPropagation();dlPatternSVG(asset,ART_PALETTES[pidx],dlSvg,seedOff);});

    card.appendChild(thumbDiv);
    card.appendChild(infoDiv);
    grid.appendChild(card);
  });
}

/* ── Init ── */
function _runPatterns(){
  if(!_pc) _pc=document.getElementById('pattern-canvas');
  if(!_pc){console.error('ADA Patterns: #pattern-canvas nao encontrado');return;}
  var grid=document.getElementById('patterns_grid');
  if(grid && grid.children.length>0) return; /* ja inicializado */
  _initArtLightbox();
  buildPatternGrid(pattern_data,'patterns_grid');
}

/* dispara em fonts.ready E em window.load como fallback */
if(document.fonts && document.fonts.ready){
  document.fonts.ready.then(_runPatterns);
} else {
  window.addEventListener('load',_runPatterns);
}
window.addEventListener('load',function(){
  setTimeout(_runPatterns,200); /* fallback garantido */
});
