import re

with open('build/_source.html', 'r', encoding='utf-8') as f:
    content = f.read()

# ── 1. Remover plat-num de todos os platform-hdr ──────────────────────────────
content = re.sub(r'\s*<div class="plat-num">[^<]*</div>\n', '\n', content)

# ── 2. Melhorar bio do Instagram ──────────────────────────────────────────────
OLD_BIO = '''Plataforma criativa. Imersivo · mapping · motion · AV.
Tecnologia como linguagem. Brasil como ponto de vista.
Desde 2015. ada.art.br'''
NEW_BIO = '''Imersivo · mapping · motion · IA.
Criamos as ferramentas que usamos.
Tecnologia como linguagem. Brasil como ponto de vista.
ada.art.br'''
content = content.replace(OLD_BIO, NEW_BIO)

# ── 3. Atualizar char-count da bio ──────────────────────────────────────────
content = content.replace(
    'Perfil · 150 chars máx. <span class="char-count">130 caracteres</span>',
    'Perfil · 150 chars máx. <span class="char-count">116 caracteres</span>'
)

# ── 4. Melhorar tom de voz do Instagram (feed + reels) ────────────────────────
OLD_TOM = '''      <div class="tom-label">Tom de Voz</div>
      <div class="rule-item"><span class="bullet ok">→</span><span>Legenda curta: nome do projeto · cliente · cidade. Sem adjetivos.</span></div>
      <div class="rule-item"><span class="bullet ok">→</span><span>Stories: processo, bastidores, taglines em ciclo.</span></div>
      <div class="rule-item"><span class="bullet ok">→</span><span>Posts de texto: extratos do manifesto, nunca frase motivacional genérica.</span></div>
      <div class="rule-item"><span class="bullet no">×</span><span>Sem hashtags em fotos de projeto. Sem emojis decorativos.</span></div>'''
NEW_TOM = '''      <div class="tom-label">Tom de Voz</div>
      <div class="rule-item"><span class="bullet ok">→</span><span>Feed: legenda curta — nome do projeto · cliente · cidade. Sem adjetivos.</span></div>
      <div class="rule-item"><span class="bullet ok">→</span><span>Reels: edição seca, sem transição genérica. Trilha instrumental ou ambiência do projeto.</span></div>
      <div class="rule-item"><span class="bullet ok">→</span><span>Stories: processo, bastidores, taglines em ciclo.</span></div>
      <div class="rule-item"><span class="bullet ok">→</span><span>Posts de texto: extratos do manifesto. Nunca frase motivacional genérica.</span></div>
      <div class="rule-item"><span class="bullet no">×</span><span>Sem hashtags em fotos de projeto. Sem emojis decorativos.</span></div>'''
content = content.replace(OLD_TOM, NEW_TOM)

# ── 5. Deletar bloco do carrossel ──────────────────────────────────────────────
content = re.sub(
    r'\n  <!-- CARROSSEL -->.*?</div>\n  </div>\n\n</div>',
    '\n\n</div>',
    content,
    flags=re.DOTALL,
    count=1
)

# ── 6. Melhorar descrição do canal YouTube (adicionar IA/ferramentas) ─────────
OLD_YT = '''ADA — Ateliê Digital Analógico.

Plataforma criativa especializada em experiências imersivas, projection mapping, motion design e instalações interativas.

Tecnologia como linguagem. Brasil como ponto de vista.

Aqui você encontra processos, bastidores e registros dos projetos da ADA — de festivais a exposições institucionais, de são paulo ao mundo.

ada.art.br · contato@ada.art.br'''
NEW_YT = '''ADA — Ateliê Digital Analógico.

Plataforma criativa especializada em experiências imersivas, projection mapping, motion design e instalações interativas com IA.

Tecnologia como linguagem. Brasil como ponto de vista.

Aqui você encontra processos, ferramentas que criamos e registros dos projetos da ADA — de festivais a exposições institucionais, de São Paulo ao mundo.

ada.art.br · contato@ada.art.br'''
content = content.replace(OLD_YT, NEW_YT)

# ── 7. Corrigir email nas 4 assinaturas (Caio) ───────────────────────────────
# Apenas nas assinaturas, não em outros lugares
# Substituição nas tabelas HTML de assinatura (renderizadas)
content = re.sub(
    r'(<div[^>]*>contato@ada\.art\.br</div>(?:\s*<div[^>]*>\+55 11 98434-0084</div>))',
    lambda m: m.group(0).replace('contato@ada.art.br', 'caio@ada.art.br'),
    content
)
# Nas versões HTML ocultas (escaped)
content = content.replace(
    'contato@ada.art.br&lt;/div&gt;&lt;div style="font-size:11px;color:rgba(255,255,255,0.4);"&gt;+55',
    'caio@ada.art.br&lt;/div&gt;&lt;div style="font-size:11px;color:rgba(255,255,255,0.4);"&gt;+55'
)
content = content.replace(
    'contato@ada.art.br&lt;/div&gt;&lt;div style="font-size:11px;color:#999999;"&gt;+55',
    'caio@ada.art.br&lt;/div&gt;&lt;div style="font-size:11px;color:#999999;"&gt;+55'
)
content = content.replace(
    'contato@ada.art.br&lt;/div&gt;&lt;div style="font-size:11px;color:rgba(0,0,0,0.45);"&gt;+55',
    'caio@ada.art.br&lt;/div&gt;&lt;div style="font-size:11px;color:rgba(0,0,0,0.45);"&gt;+55'
)
content = content.replace(
    'contato@ada.art.br&lt;/div&gt;&lt;div style="font-size:11px;color:rgba(74,127,212,',
    'caio@ada.art.br&lt;/div&gt;&lt;div style="font-size:11px;color:rgba(74,127,212,'
)

# ── 8. Corrigir wrappers de preview das assinaturas ──────────────────────────
# Padrão: remover fundo cinza, manter branco limpo
content = content.replace(
    'id="sig-padrao" style="background:#f5f5f5;padding:24px;display:inline-block;"',
    'id="sig-padrao" style="background:#fff;padding:0;display:inline-block;"'
)
# Amarelo: remover fundo cinza do wrapper (tabela já tem background e padding)
content = content.replace(
    'id="sig-amarelo" style="background:#111;padding:24px;display:inline-block;"',
    'id="sig-amarelo" style="background:#000;padding:0;display:inline-block;"'
)
# Meia-noite
content = content.replace(
    'id="sig-midnight" style="background:#111;padding:24px;display:inline-block;"',
    'id="sig-midnight" style="background:#0A0F1E;padding:0;display:inline-block;"'
)
# Invertido
content = content.replace(
    'id="sig-inv" style="background:#111;padding:24px;display:inline-block;"',
    'id="sig-inv" style="background:#FFD600;padding:0;display:inline-block;"'
)

# ── 9. Atualizar sec-desc das assinaturas (instrução Gmail) ──────────────────
OLD_DESC = '4 variantes correspondendo aos 4 modos de cor. Gmail-friendly: inline styles, sem CSS externo. Use <strong>↓ PNG</strong> para inserir como imagem no Gmail, ou <strong>⎘ HTML</strong> para colar em clientes que aceitam código.'
NEW_DESC = '4 variantes nos 4 modos de cor. Para usar no Gmail: clique <strong>⬡ Abrir</strong> → a assinatura abre no navegador → selecione tudo (Ctrl+A) e copie (Ctrl+C) → cole na configuração de assinatura do Gmail. Ou use <strong>↓ PNG</strong> para inserir como imagem.'
content = content.replace(OLD_DESC, NEW_DESC)

# ── 10. Adicionar botão "Abrir" a cada variante de assinatura ─────────────────
# Padrão
content = content.replace(
    '<button class="copy-btn" onclick="dlMock(\'sig-padrao\',\'ada-assinatura-padrao\',520)">&#8595; PNG</button>\n        <button class="copy-btn" onclick="cp(\'sig-padrao-html\',this)">&#8854; HTML</button>',
    '<button class="copy-btn" onclick="dlMock(\'sig-padrao\',\'ada-assinatura-padrao\',520)">&#8595; PNG</button>\n        <button class="copy-btn" onclick="openSigHTML(\'sig-padrao-html\')">&#8644; Abrir</button>\n        <button class="copy-btn" onclick="cp(\'sig-padrao-html\',this)">&#8854; HTML</button>'
)
# Amarelo
content = content.replace(
    '<button class="copy-btn" onclick="dlMock(\'sig-amarelo\',\'ada-assinatura-amarelo\',520)">&#8595; PNG</button>\n        <button class="copy-btn" onclick="cp(\'sig-amarelo-html\',this)">&#8854; HTML</button>',
    '<button class="copy-btn" onclick="dlMock(\'sig-amarelo\',\'ada-assinatura-amarelo\',520)">&#8595; PNG</button>\n        <button class="copy-btn" onclick="openSigHTML(\'sig-amarelo-html\')">&#8644; Abrir</button>\n        <button class="copy-btn" onclick="cp(\'sig-amarelo-html\',this)">&#8854; HTML</button>'
)
# Meia-noite
content = content.replace(
    '<button class="copy-btn" onclick="dlMock(\'sig-midnight\',\'ada-assinatura-meia-noite\',520)">&#8595; PNG</button>\n        <button class="copy-btn" onclick="cp(\'sig-midnight-html\',this)">&#8854; HTML</button>',
    '<button class="copy-btn" onclick="dlMock(\'sig-midnight\',\'ada-assinatura-meia-noite\',520)">&#8595; PNG</button>\n        <button class="copy-btn" onclick="openSigHTML(\'sig-midnight-html\')">&#8644; Abrir</button>\n        <button class="copy-btn" onclick="cp(\'sig-midnight-html\',this)">&#8854; HTML</button>'
)
# Invertido
content = content.replace(
    '<button class="copy-btn" onclick="dlMock(\'sig-inv\',\'ada-assinatura-invertido\',520)">&#8595; PNG</button>\n        <button class="copy-btn" onclick="cp(\'sig-inv-html\',this)">&#8854; HTML</button>',
    '<button class="copy-btn" onclick="dlMock(\'sig-inv\',\'ada-assinatura-invertido\',520)">&#8595; PNG</button>\n        <button class="copy-btn" onclick="openSigHTML(\'sig-inv-html\')">&#8644; Abrir</button>\n        <button class="copy-btn" onclick="cp(\'sig-inv-html\',this)">&#8854; HTML</button>'
)

with open('build/_source.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Concluido.')
