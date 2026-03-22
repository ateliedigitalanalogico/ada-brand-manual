#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
split_pages.py - ADA Manual de Marca
Divide index.html em paginas independentes por secao.
Saida: index.html (capa+indice), 01-logo.html ... 10-merch.html
"""

import re, os, sys

# Forcar UTF-8 no stdout (Windows)
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE = os.path.dirname(os.path.abspath(__file__))

def read(path):
    with open(path, encoding='utf-8') as f:
        return f.read()

def write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('  OK', os.path.basename(path))

# ---------------------------------------------------------------------------
# Mapa de secoes
# ---------------------------------------------------------------------------
SECTIONS = [
    ('01', 'logo',       '01 Logo e Wordmark'),
    ('02', 'tipografia', '02 Tipografia'),
    ('03', 'paleta',     '03 Paleta de Cores'),
    ('04', 'grid',       '04 Grid e Espacamento'),
    ('05', 'imagetica',  '05 Linguagem Imagetica'),
    ('06', 'impressos',  '06 Usos Impressos'),
    ('07', 'motion',     '07 Motion e Video'),
    ('08', 'redes',      '08 Redes Sociais'),
    ('09', 'voz',        '09 Voz e Tom'),
    ('10', 'merch',      '10 Merchandise'),
]

SLUG  = {num: slug  for num, slug, _     in SECTIONS}
TITLE = {num: title for num, slug, title in SECTIONS}

NAV_SHORT = {
    'cover': 'Capa',
    '01': '01 Logo', '02': '02 Tipografia', '03': '03 Paleta', '04': '04 Grid',
    '05': '05 Imagetica', '06': '06 Impressos', '07': '07 Motion',
    '08': '08 Redes',     '09': '09 Voz',       '10': '10 Merch',
}

# ---------------------------------------------------------------------------
# Blocos HTML reutilizaveis
# ---------------------------------------------------------------------------
HEAD_COMMON = '''\
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#000000">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&family=Cormorant+Garamond:ital,wght@1,300;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/system.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" defer></script>'''

SVG_DEFS = '''\
<svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden;">
  <defs>
    <!-- ADA Symbol A - use with style="color:XXX" on the <svg> wrapper -->
    <symbol id="ada-sym" viewBox="225 225 126 126">
      <polygon fill="currentColor" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/>
      <polygon fill="currentColor" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/>
      <polygon fill="currentColor" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/>
    </symbol>
    <!-- ADA Wordmark - A.D.A - use with style="color:XXX" on the <svg> wrapper -->
    <symbol id="ada-wm" viewBox="225 225 414 126">
      <polygon fill="currentColor" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/>
      <polygon fill="currentColor" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/>
      <polygon fill="currentColor" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/>
      <path fill="currentColor" d="M387,297v-54h45c24.81,0,45,20.19,45,45,0,3.08-.31,6.09-.91,9h18.26c.42-2.94.65-5.94.65-9,0-34.79-28.21-63-63-63h-63v72h18Z"/>
      <path fill="currentColor" d="M458.97,324c-7.52,5.65-16.86,9-26.97,9h-45v-9h-18v27h63c21.4,0,40.3-10.68,51.69-27h-24.72Z"/>
      <polygon fill="currentColor" points="609.49 324 613.99 333 622.99 351 639 351 625.5 324 609.49 324"/>
      <polygon fill="currentColor" points="556.01 297 576 257.02 595.99 297 612 297 576 225 540 297 556.01 297"/>
      <polygon fill="currentColor" points="526.5 324 513 351 529.01 351 538.01 333 542.51 324 526.5 324"/>
    </symbol>
  </defs>
</svg>'''

FOOTER_HTML = '''\
<div style="background:#0A0A0A;padding:32px 40px;text-align:center;border-top:1px solid rgba(255,214,0,.06);">
  <div style="font-family:var(--mono);font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.12);">ADA · Manual de Marca · v1.0 · Marco 2026 · ada.art.br</div>
</div>'''

# ---------------------------------------------------------------------------
# Gerar bloco <nav>
# ---------------------------------------------------------------------------
def nav_html(active_num):
    items = [('cover', 'index.html', 'Capa')]
    for num, slug, title in SECTIONS:
        items.append((num, f'{num}-{slug}.html', title))

    drop_items = ''
    for target, href, label in items:
        cls = ' active' if target == active_num else ''
        drop_items += f'    <a href="{href}" class="nav-drop-item{cls}" data-target="{target}">{label}</a>\n'

    current_text = NAV_SHORT.get(active_num, active_num)

    return (
        '<nav class="manual-nav">\n'
        '  <div class="nav-inner">\n'
        '    <div class="nav-logo">\n'
        '      <svg width="18" viewBox="225 225 126 126" xmlns="http://www.w3.org/2000/svg">\n'
        '        <polygon fill="#FFD600" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/>\n'
        '        <polygon fill="#FFD600" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/>\n'
        '        <polygon fill="#FFD600" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/>\n'
        '      </svg>\n'
        '      <span>Manual de Marca</span>\n'
        '    </div>\n'
        f'    <div class="nav-current" id="nav-current">{current_text}</div>\n'
        '    <button class="nav-toggle" id="nav-toggle" aria-label="Menu de secoes">\n'
        '      <span class="nav-toggle-bar"></span>\n'
        '      <span class="nav-toggle-bar"></span>\n'
        '    </button>\n'
        '  </div>\n'
        '  <div class="nav-dropdown" id="nav-dropdown">\n'
        + drop_items +
        '  </div>\n'
        '</nav>'
    )

# ---------------------------------------------------------------------------
# Extrair secoes do index.html
# ---------------------------------------------------------------------------
src = read(os.path.join(BASE, 'index.html'))
lines = src.splitlines(keepends=True)
print(f'index.html: {len(lines)} linhas')

# Localizar <section data-sec="XX"> e </section>
sec_open  = {}  # num -> linha 0-based
sec_close = {}  # num -> linha 0-based (a linha com </section>)

for i, line in enumerate(lines):
    m = re.search(r'<section[^>]+data-sec="(\d{2})"', line)
    if m:
        sec_open[m.group(1)] = i

# Para cada secao, encontrar o </section> correspondente
for num, open_line in sec_open.items():
    depth = 0
    for j in range(open_line, len(lines)):
        depth += lines[j].count('<section')
        depth -= lines[j].count('</section>')
        if depth <= 0:
            sec_close[num] = j
            break

print('Secoes mapeadas:', sorted(sec_open.keys()))

# Encontrar inicio do cover e do indice
cover_line = next(i for i, l in enumerate(lines) if '<div id="cover"' in l)

# Inicio do bloco de secoes (linha do span anchor da secao 01, ou fallback)
# Queremos tudo do cover ate antes da secao 01
first_sec_open = sec_open['01']
# O span anchor vem antes da <section> - vamos pegar 2 linhas antes
anchor_line = first_sec_open
for k in range(first_sec_open - 1, max(0, first_sec_open - 5), -1):
    if '<span id="sec-' in lines[k] or '<!-- ' in lines[k]:
        anchor_line = k
        break

cover_block_raw = ''.join(lines[cover_line:anchor_line])

# Atualizar links #sec-XX -> XX-slug.html no cover block
def update_links(html):
    for num, slug, _ in SECTIONS:
        html = html.replace(f'href="#sec-{num}"', f'href="{num}-{slug}.html"')
    return html

cover_block = update_links(cover_block_raw)

# ---------------------------------------------------------------------------
# Extrair corpo de cada secao (apenas <section>...</section>)
# ---------------------------------------------------------------------------
def get_section_body(num):
    start = sec_open[num]
    end   = sec_close[num]
    raw = ''.join(lines[start:end+1])
    return update_links(raw)

# ---------------------------------------------------------------------------
# Montar pagina de secao
# ---------------------------------------------------------------------------
def build_section_page(num, slug, title_full):
    body = get_section_body(num)

    extra = ''
    if num == '10':
        extra = '<canvas id="render-canvas" style="display:none;"></canvas>\n<script src="js/merch.js"></script>\n'

    return (
        '<!DOCTYPE html>\n'
        '<html lang="pt">\n'
        '<head>\n'
        + HEAD_COMMON + '\n'
        + f'<title>ADA \u2014 {title_full} \u00b7 Manual de Marca</title>\n'
        + f'<meta name="description" content="ADA Manual de Marca \u2014 {title_full}">\n'
        + f'<meta property="og:title" content="ADA \u2014 {title_full}">\n'
        + '<meta property="og:description" content="Tecnologia como linguagem. Brasil como ponto de vista.">\n'
        + '</head>\n'
        '<body>\n'
        + SVG_DEFS + '\n'
        + nav_html(num) + '\n\n'
        + body + '\n'
        + FOOTER_HTML + '\n\n'
        + extra
        + '<script src="js/ada.js"></script>\n'
        '</body>\n'
        '</html>\n'
    )

# ---------------------------------------------------------------------------
# Montar novo index.html (capa + indice)
# ---------------------------------------------------------------------------
def build_index():
    return (
        '<!DOCTYPE html>\n'
        '<html lang="pt">\n'
        '<head>\n'
        + HEAD_COMMON + '\n'
        + '<title>ADA \u2014 Manual de Marca \u00b7 2026</title>\n'
        + '<meta name="description" content="Manual de Marca da ADA \u2014 Atelie Digital Analogico. Tecnologia como linguagem. Brasil como ponto de vista.">\n'
        + '<meta property="og:title" content="ADA \u2014 Manual de Marca">\n'
        + '<meta property="og:description" content="Tecnologia como linguagem. Brasil como ponto de vista.">\n'
        + '</head>\n'
        '<body>\n'
        + SVG_DEFS + '\n'
        + nav_html('cover') + '\n\n'
        + cover_block + '\n'
        + FOOTER_HTML + '\n\n'
        + '<script src="js/ada.js"></script>\n'
        '</body>\n'
        '</html>\n'
    )

# ---------------------------------------------------------------------------
# Gerar arquivos
# ---------------------------------------------------------------------------
print('\nGerando paginas...')

write(os.path.join(BASE, 'index.html'), build_index())

for num, slug, title_full in SECTIONS:
    filename = f'{num}-{slug}.html'
    write(os.path.join(BASE, filename), build_section_page(num, slug, title_full))

print('\nConcluido. 11 arquivos gerados.')
