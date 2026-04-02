import sys

content = open('build/_source.html', encoding='utf-8').read()

t_start = content.find('<!-- ══ 02 PAPEL TIMBRADO ══ -->')
sec08_start = content.find('<!-- ══════ SEÇÃO 08 ══════ -->')

btn_dark  = 'position:absolute;top:8px;right:8px;z-index:10;background:rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.55);font-family:var(--mono);font-size:9px;letter-spacing:.1em;padding:5px 9px;cursor:pointer;line-height:1;'
btn_light = 'position:absolute;top:8px;right:8px;z-index:10;background:rgba(255,255,255,.7);border:1px solid rgba(0,0,0,.15);color:rgba(0,0,0,.4);font-family:var(--mono);font-size:9px;letter-spacing:.1em;padding:5px 9px;cursor:pointer;line-height:1;'

new_blocks = f'''<!-- ══ 02 PAPEL TIMBRADO ══ -->
<div class="blk">
  <div class="blk-inner">
    <span class="sec-label">Papel Timbrado A4</span>
    <div class="sec-desc">Versão escura para contextos institucionais e culturais. Versão clara para contratos e documentos formais.</div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;padding:0 40px 24px;">

    <!-- Escuro vertical -->
    <div>
      <div style="aspect-ratio:210/297;position:relative;overflow:hidden;background:#0D0D0D;border:1px solid rgba(255,214,0,.1);display:flex;flex-direction:column;">
        <button class="expand-btn" onclick="expandMock(this.parentElement)" style="{btn_dark}">&#x2197;</button>
        <div style="padding:6% 8% 4%;display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid rgba(255,214,0,.08);">
          <svg width="24" xmlns="http://www.w3.org/2000/svg" viewBox="225 225 126 126"><polygon fill="#FFD600" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/><polygon fill="#FFD600" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/><polygon fill="#FFD600" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/></svg>
          <div style="font-family:var(--mono);font-size:clamp(4px,.85vw,6px);letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.18);text-align:right;line-height:1.7;">ada.art.br<br>contato@ada.art.br</div>
        </div>
        <div style="flex:1;padding:5% 8%;display:flex;flex-direction:column;gap:3%;">
          <div><div class="tl-xs" style="background:rgba(255,214,0,.4);"></div><div class="tl-gap"></div><div class="tl-l"></div><div class="tl-m"></div><div class="tl-l"></div><div class="tl-s"></div></div>
          <div class="tl-gap"></div>
          <div><div class="tl-l"></div><div class="tl-l"></div><div class="tl-m"></div><div class="tl-l"></div><div class="tl-s"></div></div>
          <div class="tl-gap"></div>
          <div><div class="tl-m"></div><div class="tl-l"></div></div>
        </div>
        <div style="padding:3% 8%;border-top:1px solid rgba(255,214,0,.06);display:flex;justify-content:space-between;">
          <div style="font-family:var(--mono);font-size:clamp(3px,.75vw,5px);letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.18);line-height:1.7;">ADA · São Paulo<br>+55 11 98434-0084</div>
          <div style="font-family:var(--mono);font-size:clamp(3px,.75vw,5px);letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.18);text-align:right;">2015</div>
        </div>
      </div>
      <div class="piece-label">Escuro · Vertical</div>
    </div>

    <!-- Claro vertical -->
    <div>
      <div style="aspect-ratio:210/297;position:relative;overflow:hidden;background:#F2F2F2;border:1px solid rgba(0,0,0,.08);display:flex;flex-direction:column;">
        <button class="expand-btn" onclick="expandMock(this.parentElement)" style="{btn_light}">&#x2197;</button>
        <div style="padding:6% 8% 4%;display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid rgba(0,0,0,.07);">
          <svg width="24" xmlns="http://www.w3.org/2000/svg" viewBox="225 225 126 126"><polygon fill="#000" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/><polygon fill="#000" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/><polygon fill="#000" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/></svg>
          <div style="font-family:var(--mono);font-size:clamp(4px,.85vw,6px);letter-spacing:.12em;text-transform:uppercase;color:rgba(0,0,0,.3);text-align:right;line-height:1.7;">ada.art.br<br>contato@ada.art.br</div>
        </div>
        <div style="flex:1;padding:5% 8%;display:flex;flex-direction:column;gap:3%;">
          <div><div class="tl-ly"></div><div class="tl-gap"></div><div class="tl-ld"></div><div class="tl-lm"></div><div class="tl-ld"></div><div class="tl-ls"></div></div>
          <div class="tl-gap"></div>
          <div><div class="tl-ld"></div><div class="tl-ld"></div><div class="tl-lm"></div><div class="tl-ld"></div><div class="tl-ls"></div></div>
          <div class="tl-gap"></div>
          <div><div class="tl-lm"></div><div class="tl-ld"></div></div>
        </div>
        <div style="padding:3% 8%;border-top:1px solid rgba(0,0,0,.06);display:flex;justify-content:space-between;">
          <div style="font-family:var(--mono);font-size:clamp(3px,.75vw,5px);letter-spacing:.12em;text-transform:uppercase;color:rgba(0,0,0,.3);line-height:1.7;">ADA · São Paulo<br>+55 11 98434-0084</div>
          <div style="font-family:var(--mono);font-size:clamp(3px,.75vw,5px);letter-spacing:.12em;text-transform:uppercase;color:rgba(0,0,0,.3);text-align:right;">2015</div>
        </div>
      </div>
      <div class="piece-label">Claro · Vertical</div>
    </div>

    <!-- Escuro horizontal -->
    <div>
      <div style="aspect-ratio:297/210;position:relative;overflow:hidden;background:#0D0D0D;border:1px solid rgba(255,214,0,.1);display:flex;flex-direction:column;">
        <button class="expand-btn" onclick="expandMock(this.parentElement)" style="{btn_dark}">&#x2197;</button>
        <div style="padding:5% 7% 3%;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,214,0,.08);">
          <svg width="18" xmlns="http://www.w3.org/2000/svg" viewBox="225 225 126 126"><polygon fill="#FFD600" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/><polygon fill="#FFD600" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/><polygon fill="#FFD600" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/></svg>
          <div style="font-family:var(--mono);font-size:clamp(3px,.75vw,5px);letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.18);">ada.art.br · contato@ada.art.br</div>
        </div>
        <div style="flex:1;padding:4% 7%;display:grid;grid-template-columns:1fr 1fr;gap:5%;">
          <div><div class="tl-xs" style="background:rgba(255,214,0,.4);"></div><div class="tl-gap"></div><div class="tl-l"></div><div class="tl-m"></div><div class="tl-l"></div></div>
          <div><div class="tl-l"></div><div class="tl-m"></div><div class="tl-l"></div><div class="tl-s"></div></div>
        </div>
        <div style="padding:2.5% 7%;border-top:1px solid rgba(255,214,0,.06);display:flex;justify-content:space-between;">
          <div style="font-family:var(--mono);font-size:clamp(3px,.65vw,5px);letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.18);">ADA · São Paulo · 2015</div>
          <div style="font-family:var(--mono);font-size:clamp(3px,.65vw,5px);letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.18);">+55 11 98434-0084</div>
        </div>
      </div>
      <div class="piece-label">Escuro · Horizontal</div>
    </div>

    <!-- Claro horizontal -->
    <div>
      <div style="aspect-ratio:297/210;position:relative;overflow:hidden;background:#F2F2F2;border:1px solid rgba(0,0,0,.08);display:flex;flex-direction:column;">
        <button class="expand-btn" onclick="expandMock(this.parentElement)" style="{btn_light}">&#x2197;</button>
        <div style="padding:5% 7% 3%;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.07);">
          <svg width="18" xmlns="http://www.w3.org/2000/svg" viewBox="225 225 126 126"><polygon fill="#000" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/><polygon fill="#000" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/><polygon fill="#000" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/></svg>
          <div style="font-family:var(--mono);font-size:clamp(3px,.75vw,5px);letter-spacing:.12em;text-transform:uppercase;color:rgba(0,0,0,.3);">ada.art.br · contato@ada.art.br</div>
        </div>
        <div style="flex:1;padding:4% 7%;display:grid;grid-template-columns:1fr 1fr;gap:5%;">
          <div><div class="tl-ly"></div><div class="tl-gap"></div><div class="tl-ld"></div><div class="tl-lm"></div><div class="tl-ld"></div></div>
          <div><div class="tl-ld"></div><div class="tl-lm"></div><div class="tl-ld"></div><div class="tl-ls"></div></div>
        </div>
        <div style="padding:2.5% 7%;border-top:1px solid rgba(0,0,0,.05);display:flex;justify-content:space-between;">
          <div style="font-family:var(--mono);font-size:clamp(3px,.65vw,5px);letter-spacing:.1em;text-transform:uppercase;color:rgba(0,0,0,.3);">ADA · São Paulo · 2015</div>
          <div style="font-family:var(--mono);font-size:clamp(3px,.65vw,5px);letter-spacing:.1em;text-transform:uppercase;color:rgba(0,0,0,.3);">+55 11 98434-0084</div>
        </div>
      </div>
      <div class="piece-label">Claro · Horizontal</div>
    </div>

  </div>
</div>

<!-- ══ 03 PROPOSTA ══ -->
<div class="blk">
  <div class="blk-inner">
    <span class="sec-label">Proposta Comercial</span>
    <div class="sec-desc">Capa em fundo preto com lock-up e imagem. Páginas internas em G-95 com acento amarelo nos títulos de seção.</div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;padding:0 40px 24px;">

    <!-- Capa vertical -->
    <div>
      <div style="aspect-ratio:210/297;position:relative;overflow:hidden;background:#000;border:1px solid rgba(255,214,0,.12);display:flex;flex-direction:column;">
        <button class="expand-btn" onclick="expandMock(this.parentElement)" style="{btn_dark}">&#x2197;</button>
        <div style="height:50%;position:relative;border-bottom:1px solid rgba(255,214,0,.08);">
          <img src="assets/ADA_performance_04.jpg" style="width:100%;height:100%;object-fit:cover;display:block;position:absolute;inset:0;" loading="lazy">
          <svg style="position:absolute;top:6%;left:6%;z-index:2;" width="16%" xmlns="http://www.w3.org/2000/svg" viewBox="225 225 126 126"><polygon fill="#FFD600" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/><polygon fill="#FFD600" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/><polygon fill="#FFD600" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/></svg>
        </div>
        <div style="flex:1;padding:6% 8%;display:flex;flex-direction:column;justify-content:flex-end;gap:4%;">
          <div style="font-family:var(--mono);font-size:clamp(4px,.9vw,7px);letter-spacing:.25em;text-transform:uppercase;color:rgba(255,214,0,.35);">Proposta Criativa</div>
          <div style="font-family:var(--mono);font-size:clamp(7px,2vw,14px);font-weight:300;color:#fff;letter-spacing:-.01em;line-height:1.2;">Nome do<br>Projeto</div>
          <div style="width:24px;height:1px;background:rgba(255,214,0,.3);"></div>
          <div style="font-family:var(--syne);font-size:clamp(4px,.85vw,6px);color:rgba(255,255,255,.3);">Cliente · Ano</div>
        </div>
        <div style="padding:3% 8%;border-top:1px solid rgba(255,214,0,.08);display:flex;justify-content:space-between;">
          <div style="font-family:var(--mono);font-size:clamp(3px,.65vw,5px);letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.2);">ADA · ada.art.br</div>
          <div style="font-family:var(--mono);font-size:clamp(3px,.65vw,5px);letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.2);">Confidencial</div>
        </div>
        <div style="position:absolute;inset:0;z-index:3;pointer-events:none;">
          <div class="pc tl" style="border-color:rgba(255,214,0,.2);"></div><div class="pc tr" style="border-color:rgba(255,214,0,.2);"></div>
          <div class="pc bl" style="border-color:rgba(255,214,0,.2);"></div><div class="pc br" style="border-color:rgba(255,214,0,.2);"></div>
        </div>
      </div>
      <div class="piece-label">Capa · Vertical</div>
    </div>

    <!-- Interna vertical -->
    <div>
      <div style="aspect-ratio:210/297;position:relative;overflow:hidden;background:#F2F2F2;border:1px solid rgba(0,0,0,.08);display:flex;flex-direction:column;">
        <button class="expand-btn" onclick="expandMock(this.parentElement)" style="{btn_light}">&#x2197;</button>
        <div style="padding:5% 8% 3%;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.07);">
          <svg width="16" xmlns="http://www.w3.org/2000/svg" viewBox="225 225 126 126"><polygon fill="#000" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/><polygon fill="#000" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/><polygon fill="#000" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/></svg>
          <div style="font-family:var(--mono);font-size:clamp(3px,.7vw,5px);letter-spacing:.1em;text-transform:uppercase;color:rgba(0,0,0,.28);">Nome do Projeto · ADA</div>
        </div>
        <div style="flex:1;padding:5% 8%;display:flex;flex-direction:column;gap:5%;">
          <div><div style="font-family:var(--mono);font-size:clamp(4px,.85vw,6px);letter-spacing:.18em;text-transform:uppercase;color:rgba(0,0,0,.4);margin-bottom:4%;">Conceito</div><div class="tl-ly"></div><div class="tl-ld"></div><div class="tl-lm"></div><div class="tl-ld"></div></div>
          <div><div style="font-family:var(--mono);font-size:clamp(4px,.85vw,6px);letter-spacing:.18em;text-transform:uppercase;color:rgba(0,0,0,.4);margin-bottom:4%;">Escopo</div><div class="tl-ly"></div><div class="tl-ld"></div><div class="tl-ld"></div><div class="tl-lm"></div></div>
          <div><div style="font-family:var(--mono);font-size:clamp(4px,.85vw,6px);letter-spacing:.18em;text-transform:uppercase;color:rgba(0,0,0,.4);margin-bottom:4%;">Investimento</div><div class="tl-ly"></div><div class="tl-lm"></div></div>
        </div>
        <div style="padding:2.5% 8%;border-top:1px solid rgba(0,0,0,.06);display:flex;justify-content:space-between;">
          <div style="font-family:var(--mono);font-size:clamp(3px,.65vw,5px);letter-spacing:.1em;text-transform:uppercase;color:rgba(0,0,0,.28);">Confidencial · ADA</div>
          <div style="font-family:var(--mono);font-size:clamp(3px,.65vw,5px);letter-spacing:.1em;text-transform:uppercase;color:rgba(0,0,0,.28);">02</div>
        </div>
      </div>
      <div class="piece-label">Interna · Vertical</div>
    </div>

    <!-- Capa horizontal -->
    <div>
      <div style="aspect-ratio:297/210;position:relative;overflow:hidden;background:#000;border:1px solid rgba(255,214,0,.12);display:grid;grid-template-columns:1fr 1fr;">
        <button class="expand-btn" onclick="expandMock(this.parentElement)" style="{btn_dark}">&#x2197;</button>
        <div style="position:relative;border-right:1px solid rgba(255,214,0,.08);">
          <img src="assets/ADA_abstrato_particulas_02.jpg" style="width:100%;height:100%;object-fit:cover;display:block;position:absolute;inset:0;" loading="lazy">
          <svg style="position:absolute;top:8%;left:8%;z-index:2;" width="20%" xmlns="http://www.w3.org/2000/svg" viewBox="225 225 126 126"><polygon fill="#FFD600" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/><polygon fill="#FFD600" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/><polygon fill="#FFD600" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/></svg>
        </div>
        <div style="display:flex;flex-direction:column;justify-content:flex-end;padding:8%;">
          <div style="font-family:var(--mono);font-size:clamp(4px,.85vw,7px);letter-spacing:.25em;text-transform:uppercase;color:rgba(255,214,0,.35);margin-bottom:6%;">Proposta Criativa</div>
          <div style="font-family:var(--mono);font-size:clamp(8px,2vw,18px);font-weight:300;color:#fff;line-height:1.2;margin-bottom:5%;">Nome do<br>Projeto</div>
          <div style="width:20px;height:1px;background:rgba(255,214,0,.3);margin-bottom:5%;"></div>
          <div style="font-family:var(--syne);font-size:clamp(4px,.8vw,6px);color:rgba(255,255,255,.3);margin-bottom:auto;">Cliente · Ano</div>
          <div style="display:flex;justify-content:space-between;margin-top:auto;padding-top:5%;border-top:1px solid rgba(255,214,0,.08);">
            <div style="font-family:var(--mono);font-size:clamp(3px,.6vw,5px);letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.2);">ADA · ada.art.br</div>
            <div style="font-family:var(--mono);font-size:clamp(3px,.6vw,5px);letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.2);">Conf.</div>
          </div>
        </div>
        <div style="position:absolute;inset:0;z-index:3;pointer-events:none;">
          <div class="pc tl" style="border-color:rgba(255,214,0,.2);"></div><div class="pc tr" style="border-color:rgba(255,214,0,.2);"></div>
          <div class="pc bl" style="border-color:rgba(255,214,0,.2);"></div><div class="pc br" style="border-color:rgba(255,214,0,.2);"></div>
        </div>
      </div>
      <div class="piece-label">Capa · Horizontal</div>
    </div>

    <!-- Interna horizontal -->
    <div>
      <div style="aspect-ratio:297/210;position:relative;overflow:hidden;background:#F2F2F2;border:1px solid rgba(0,0,0,.08);display:flex;flex-direction:column;">
        <button class="expand-btn" onclick="expandMock(this.parentElement)" style="{btn_light}">&#x2197;</button>
        <div style="padding:4% 7% 3%;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,.07);">
          <svg width="14" xmlns="http://www.w3.org/2000/svg" viewBox="225 225 126 126"><polygon fill="#000" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/><polygon fill="#000" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/><polygon fill="#000" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/></svg>
          <div style="font-family:var(--mono);font-size:clamp(3px,.7vw,5px);letter-spacing:.1em;text-transform:uppercase;color:rgba(0,0,0,.28);">Nome do Projeto · ADA</div>
        </div>
        <div style="flex:1;padding:4% 7%;display:grid;grid-template-columns:1fr 1fr;gap:6%;">
          <div>
            <div style="font-family:var(--mono);font-size:clamp(4px,.85vw,6px);letter-spacing:.18em;text-transform:uppercase;color:rgba(0,0,0,.4);margin-bottom:6%;">Conceito</div>
            <div class="tl-ly"></div><div class="tl-ld"></div><div class="tl-lm"></div><div class="tl-ld"></div>
          </div>
          <div>
            <div style="font-family:var(--mono);font-size:clamp(4px,.85vw,6px);letter-spacing:.18em;text-transform:uppercase;color:rgba(0,0,0,.4);margin-bottom:6%;">Escopo</div>
            <div class="tl-ly"></div><div class="tl-ld"></div><div class="tl-ld"></div><div class="tl-lm"></div>
          </div>
        </div>
        <div style="padding:2.5% 7%;border-top:1px solid rgba(0,0,0,.06);display:flex;justify-content:space-between;">
          <div style="font-family:var(--mono);font-size:clamp(3px,.65vw,5px);letter-spacing:.1em;text-transform:uppercase;color:rgba(0,0,0,.28);">Confidencial · ADA</div>
          <div style="font-family:var(--mono);font-size:clamp(3px,.65vw,5px);letter-spacing:.1em;text-transform:uppercase;color:rgba(0,0,0,.28);">02</div>
        </div>
      </div>
      <div class="piece-label">Interna · Horizontal</div>
    </div>

  </div>
</div>

'''

content = content[:t_start] + new_blocks + content[sec08_start:]
open('build/_source.html', 'w', encoding='utf-8').write(content)
print('done, new len:', len(content))
