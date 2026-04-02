#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build/split_pages.py - ADA Manual de Marca
Divide _source.html em paginas independentes por secao.

Fluxo de edicao:
  1. Edite _source.html (arquivo mestre com todas as <section>)
  2. python build/split_pages.py  (ou cd build && python split_pages.py)
  3. Commite tudo

Saida:
  ../index.html           <- capa + indice (raiz do site)
  ../pages/01-logo.html   <- secoes 01-10
"""

import re, os, sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BUILD     = os.path.dirname(os.path.abspath(__file__))   # .../ada-manual/build/
ROOT      = os.path.dirname(BUILD)                        # .../ada-manual/
PAGES_DIR = os.path.join(ROOT, 'pages')

os.makedirs(PAGES_DIR, exist_ok=True)

def read(path):
    with open(path, encoding='utf-8') as f:
        return f.read()

def write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('  OK', os.path.relpath(path, ROOT))

# ---------------------------------------------------------------------------
# Mapa de secoes
# ---------------------------------------------------------------------------
SECTIONS = [
    # ── REGRAS ──────────────────────────────
    ('01', 'logo',       '01 Logo e Wordmark'),
    ('02', 'tipografia', '02 Tipografia'),
    ('03', 'paleta',     '03 Paleta de Cores'),
    ('04', 'grid',       '04 Grid e Espacamento'),
    ('05', 'voz',        '05 Voz e Tom'),
    ('06', 'imagetica',  '06 Linguagem Imagetica'),
    # ── USOS ────────────────────────────────
    ('07', 'impressos',  '07 Usos Impressos'),
    ('08', 'motion',     '08 Motion e Video'),
    ('09', 'redes',      '09 Redes Sociais'),
    ('10', 'merch',      '10 Merchandise'),
]

NAV_SHORT = {
    'cover': 'Capa',
    '01': '01 Logo',       '02': '02 Tipografia', '03': '03 Paleta',  '04': '04 Grid',
    '05': '05 Voz',        '06': '06 Imagetica',
    '07': '07 Impressos',  '08': '08 Motion',     '09': '09 Redes',   '10': '10 Merch',
}

# Grupos para distinção visual no nav e nos headers
NAV_GRUPOS = {
    '01':'regras','02':'regras','03':'regras','04':'regras','05':'regras','06':'regras',
    '07':'usos',  '08':'usos',  '09':'usos',  '10':'usos',
}

# ---------------------------------------------------------------------------
# Blocos HTML compartilhados
# context='root'  -> caminhos relativos a raiz  (css/, js/, assets/)
# context='pages' -> caminhos relativos a pages/ (../css/, ../js/, ../assets/)
# ---------------------------------------------------------------------------
def head_common(context='root'):
    base = '../' if context == 'pages' else ''
    return (
        '<meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        '<meta name="theme-color" content="#000000">\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500'
        '&family=Syne:wght@400;600;700;800&family=Cormorant+Garamond:ital,wght@1,300;1,400'
        '&display=swap" rel="stylesheet">\n'
        f'<link rel="stylesheet" href="{base}css/system.css">\n'
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" defer></script>'
    )

SVG_DEFS = '''\
<svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden;">
  <defs>
    <symbol id="ada-sym" viewBox="225 225 126 126">
      <polygon fill="currentColor" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/>
      <polygon fill="currentColor" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/>
      <polygon fill="currentColor" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/>
    </symbol>
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
<div id="page-footer" style="background:var(--void);padding:32px 40px;text-align:center;border-top:1px solid rgba(255,214,0,.06);">
  <div style="font-family:var(--mono);font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.12);">ADA - Manual de Marca - v1.0 - Marco 2026 - ada.art.br</div>
</div>'''

# ---------------------------------------------------------------------------
# Nav
# context='root'  -> secoes linkam para pages/XX.html, capa para index.html
# context='pages' -> secoes linkam para XX.html (mesmo dir), capa para ../index.html
# ---------------------------------------------------------------------------
def nav_html(active_num, context='root'):
    capa_href = '../index.html' if context == 'pages' else 'index.html'

    drop_items = ''
    # Capa
    cls = ' active' if active_num == 'cover' else ''
    drop_items += f'    <a href="{capa_href}" class="nav-drop-item{cls}" data-target="cover">Capa</a>\n'

    # Separador de grupo REGRAS
    drop_items += '    <div class="nav-group-label">Regras do Sistema</div>\n'
    for num, slug, _ in SECTIONS:
        if NAV_GRUPOS.get(num) != 'regras':
            continue
        href = f'{num}-{slug}.html' if context == 'pages' else f'pages/{num}-{slug}.html'
        cls = ' active' if num == active_num else ''
        drop_items += f'    <a href="{href}" class="nav-drop-item{cls}" data-target="{num}">{NAV_SHORT.get(num, num)}</a>\n'

    # Separador de grupo USOS
    drop_items += '    <div class="nav-group-label nav-group-usos">Aplica\u00e7\u00f5es</div>\n'
    for num, slug, _ in SECTIONS:
        if NAV_GRUPOS.get(num) != 'usos':
            continue
        href = f'{num}-{slug}.html' if context == 'pages' else f'pages/{num}-{slug}.html'
        cls = ' active' if num == active_num else ''
        drop_items += f'    <a href="{href}" class="nav-drop-item{cls}" data-target="{num}">{NAV_SHORT.get(num, num)}</a>\n'

    current_text = NAV_SHORT.get(active_num, active_num)
    return (
        '<nav class="manual-nav">\n'
        '  <div class="nav-inner">\n'
        '    <div class="nav-logo">\n'
        '      <svg width="14" style="color:#FFD600"><use href="#ada-sym"/></svg>\n'
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
# Ler e fragmentar _source.html
# ---------------------------------------------------------------------------
SOURCE_FILE = os.path.join(BUILD, '_source.html')
if not os.path.exists(SOURCE_FILE):
    print('ERRO: build/_source.html nao encontrado.')
    sys.exit(1)

src   = read(SOURCE_FILE)
lines = src.splitlines(keepends=True)
print(f'_source.html: {len(lines)} linhas')

if '<section data-sec=' not in src:
    print('ERRO: _source.html nao contem secoes.')
    sys.exit(1)

sec_open  = {}
sec_close = {}

for i, line in enumerate(lines):
    m = re.search(r'<section[^>]+data-sec="(\d{2})"', line)
    if m:
        sec_open[m.group(1)] = i

for num, open_line in sec_open.items():
    depth = 0
    for j in range(open_line, len(lines)):
        depth += lines[j].count('<section')
        depth -= lines[j].count('</section>')
        if depth <= 0:
            sec_close[num] = j
            break

print('Secoes mapeadas:', sorted(sec_open.keys()))

# Bloco capa + indice
cover_line     = next(i for i, l in enumerate(lines) if '<div id="cover"' in l)
first_sec_line = sec_open['01']
anchor_line    = first_sec_line
for k in range(first_sec_line - 1, max(0, first_sec_line - 5), -1):
    if '<span id="sec-' in lines[k] or '<!-- ' in lines[k]:
        anchor_line = k
        break
cover_block_raw = ''.join(lines[cover_line:anchor_line])

def update_links(html, context='root'):
    for num, slug, _ in SECTIONS:
        anchor = f'href="#sec-{num}"'
        target = f'href="{num}-{slug}.html"' if context == 'pages' else f'href="pages/{num}-{slug}.html"'
        html = html.replace(anchor, target)
    return html

def fix_asset_paths(html):
    """Prefixar caminhos de assets com ../ para paginas em pages/"""
    for attr in ('src', 'href'):
        html = html.replace(f'{attr}="assets/', f'{attr}="../assets/')
        html = html.replace(f"{attr}='assets/", f"{attr}='../assets/")
    return html

# ---------------------------------------------------------------------------
# Extrair corpo de cada secao
# ---------------------------------------------------------------------------
def get_section_body(num):
    start = sec_open[num]
    end   = sec_close[num]
    raw   = ''.join(lines[start:end+1])
    raw   = update_links(raw, 'pages')
    raw   = fix_asset_paths(raw)
    return raw

# ---------------------------------------------------------------------------
# Montar pagina de secao -> pages/XX-slug.html
# ---------------------------------------------------------------------------
def build_section_page(num, slug, title_full):
    body  = get_section_body(num)
    extra = ''
    if num == '06':
        extra = '<canvas id="pattern-canvas" style="display:none;"></canvas>\n<script src="../js/patterns.js"></script>\n'
    if num == '10':
        extra = '<canvas id="render-canvas" style="display:none;"></canvas>\n<script src="../js/merch.js"></script>\n'

    return (
        '<!DOCTYPE html>\n<html lang="pt">\n<head>\n'
        + head_common('pages') + '\n'
        + f'<title>ADA \u2014 {title_full.split(None, 1)[-1]} \u00b7 Manual de Marca</title>\n'
        + f'<meta name="description" content="ADA Manual de Marca \u2014 {title_full.split(None, 1)[-1]}">\n'
        + '</head>\n<body>\n'
        + SVG_DEFS + '\n'
        + nav_html(num, 'pages') + '\n\n'
        + body + '\n'
        + FOOTER_HTML + '\n\n'
        + extra
        + '<script src="../js/ada.js"></script>\n'
        '</body>\n</html>\n'
    )

# ---------------------------------------------------------------------------
# Montar index.html -> raiz
# ---------------------------------------------------------------------------
def build_index():
    cover = update_links(cover_block_raw, 'root')
    return (
        '<!DOCTYPE html>\n<html lang="pt">\n<head>\n'
        + head_common('root') + '\n'
        + '<title>ADA \u2014 Manual de Marca \u00b7 2026</title>\n'
        + '<meta name="description" content="Manual de Marca da ADA \u2014 Atelie Digital Analogico.">\n'
        + '<meta property="og:title" content="ADA \u2014 Manual de Marca">\n'
        + '<meta property="og:description" content="Tecnologia como linguagem. Brasil como ponto de vista.">\n'
        + '</head>\n<body>\n'
        + SVG_DEFS + '\n'
        + nav_html('cover', 'root') + '\n\n'
        + '<section data-sec="cover" class="cover-page">\n'
        + cover + '\n'
        + '</section>\n'
        + FOOTER_HTML + '\n\n'
        + '<script src="js/ada.js"></script>\n'
        '</body>\n</html>\n'
    )

# ---------------------------------------------------------------------------
# Gerar
# ---------------------------------------------------------------------------
print('\nGerando paginas...')
write(os.path.join(ROOT, 'index.html'), build_index())
for num, slug, title_full in SECTIONS:
    write(os.path.join(PAGES_DIR, f'{num}-{slug}.html'), build_section_page(num, slug, title_full))
print(f'\nConcluido. 11 arquivos gerados.')
