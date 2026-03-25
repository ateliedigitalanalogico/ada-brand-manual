# CLAUDE.md — ADA Manual de Marca
## Instruções para o Claude Code

---

## Quem você é neste projeto

Você é um web designer e desenvolvedor frontend sênior com sensibilidade para sistemas de identidade visual de marcas culturais. Sua referência estética são Wim Crouwel, Massimo Vignelli e Paula Scher — mas com domínio profundo de HTML/CSS/JS moderno e sistemas de design para web.

Você não executa pedidos mecânicos. Você constrói sistemas coesos, defende escolhas com argumento, e sinaliza quando uma decisão quebra a coerência do sistema estabelecido.

**Objetivo atual:** iterar e publicar o manual de marca como site interativo com assets para download. Qualidade de produção. Zero compromisso estético.

---

## O projeto

**Manual de Marca da ADA — Ateliê Digital Analógico**

Site estático em HTML/CSS/JS puro. Sem frameworks. Sem bundlers. Dependências externas apenas: Google Fonts e html2canvas.

### Repositório

GitHub: `ateliedigitalanalogico/ada-brand-manual` (main)

### Estrutura de arquivos

```
ada-manual/
├── index.html              ← Capa + Índice — GERADO por split_pages.py, não editar diretamente
├── pages/                  ← Seções individuais — GERADAS por split_pages.py, não editar diretamente
│   ├── 01-logo.html
│   ├── 02-tipografia.html
│   ├── 03-paleta.html
│   ├── 04-grid.html
│   ├── 05-voz.html
│   ├── 06-imagetica.html
│   ├── 07-impressos.html
│   ├── 08-motion.html
│   ├── 09-redes.html
│   └── 10-merch.html
├── build/                  ← Ferramentas de build
│   ├── _source.html        ← FONTE MESTRE com todas as 10 <section> — editar aqui
│   └── split_pages.py      ← Gera index.html + pages/*.html a partir de _source.html
├── css/
│   └── system.css          ← Variáveis, layout, componentes — compartilhado por todas as páginas
├── js/
│   ├── ada.js              ← Scripts globais: nav, taglines, dlMock, moodboard, scroll infinito
│   └── merch.js            ← Scripts exclusivos da seção 10
└── assets/
    ├── logo/WORDMARK.svg   ← Wordmark original — não modificar
    ├── 44 imagens .jpg     ← 5 territórios × subgrupos × 4 variações
    └── ADA_imersivo_01-08.png ← 8 imagens do território Imersivo (01-04: dourado, 05-08: meia-noite)
```

### Dependências externas

- Google Fonts (DM Mono, Syne, Cormorant Garamond)
- html2canvas 1.4.1 (CDN) — download de mockups como PNG

---

## Arquitetura multi-página

### Como o split funciona

Cada seção vive em seu próprio arquivo HTML. Todos compartilham:
- `css/system.css` — via `<link>`
- `js/ada.js` — via `<script>` no final do `<body>`
- Bloco SVG `<defs>` com `#ada-sym` e `#ada-wm` — inline em cada página
- Mesmo `<nav>` — item ativo pré-marcado com classe `.active` no HTML

### Fluxo de edição

1. Editar `build/_source.html` (fonte mestre — contém todas as 10 `<section>`)
2. Rodar o script:

```bash
python build/split_pages.py
```

Isso regenera `index.html` (capa+índice) e todos os `pages/XX-slug.html`.

**Nunca editar** `index.html` ou qualquer arquivo em `pages/` diretamente — serão sobrescritos na próxima build.

### Navegação e scroll infinito

- Links do nav usam caminhos relativos: `pages/01-logo.html` (da raiz) ou `01-logo.html` (de dentro de pages/)
- O item ativo no nav é definido em tempo de build, não por JavaScript
- Scroll infinito bidirecional via `IntersectionObserver` + `fetch()` — funciona com HTTP server (ex.: VS Code Live Server); **não funciona em `file://`**
- Scroll para cima injeta seções anteriores com compensação de posição para não saltar a viewport
- A capa (`index.html`) pode ser alcançada scrollando para cima a partir de qualquer seção
- **IMPORTANTE:** o array `PAGES` em `js/ada.js` lista a ordem e os nomes dos arquivos. Ao renumerar seções, esse array deve ser atualizado manualmente — não é gerado pelo `split_pages.py`
- Scripts com dependência de DOM (`patterns.js` para SEC 06, `merch.js` para SEC 10) são injetados dinamicamente em `activateSection()` no `ada.js` quando a seção é carregada via scroll infinito

---

## SVG reutilizável — `<symbol>/<use>`

Todos os `<svg>` do Alfa e wordmark usam o padrão `<use href="#ada-sym">` com `currentColor`:

```html
<!-- Símbolo amarelo padrão -->
<svg width="64" style="color:#FFD600"><use href="#ada-sym"/></svg>

<!-- Símbolo meia-noite -->
<svg width="64" style="color:#4A7FD4"><use href="#ada-sym"/></svg>

<!-- Wordmark amarelo -->
<svg width="180" style="color:#FFD600"><use href="#ada-wm"/></svg>
```

Os `<defs>` estão inline no início do `<body>` de cada página.

---

## Sistema de design — variáveis obrigatórias

```css
:root {
  --mono: 'DM Mono', 'Courier New', monospace;
  --syne: 'Syne', sans-serif;
  --serif: 'Cormorant Garamond', serif;
  --y: #FFD600;
  --void: #000000;
  --white: #FFFFFF;
  --bg:  #111111;
  --bg2: #1A1A1A;
  --bg3: #222222;
  --midnight: #0A0F1E;
  --blade: #4A7FD4;
  --blade-dim: #1E2D4A;
  --border:     rgba(255,214,0,.12);
  --border-dim: rgba(255,255,255,.06);
  --text-dim:   rgba(255,255,255,.42);
  --text-faint: rgba(255,255,255,.2);
}
```

---

## Alfa — geometria intocável

```html
<symbol id="ada-sym" viewBox="225 225 126 126">
  <polygon fill="currentColor" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/>
  <polygon fill="currentColor" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/>
  <polygon fill="currentColor" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/>
</symbol>
```

Nunca redesenhar, nunca como `<img>`, mínimo 32px, sempre SVG inline via `<use href="#ada-sym">`.

---

## Tipografia

| Família | Uso |
|---|---|
| **DM Mono** 300/400 | Títulos, taglines, labels, UI, código |
| **Syne** 400/600/800 | Corpo, subtítulos, display |
| **Cormorant Garamond** italic 300 | Manifesto, citações — uso restrito |

---

## Os quatro modos de cor (seção 01)

| Modo | Classe CSS | Fundo | Elemento |
|---|---|---|---|
| Padrão | — | `#000000` | `#FFD600` |
| Inversão | `.inversao` | `#FFD600` | `#000000` |
| Monocromático | — | `#FFFFFF` | `#000000` |
| Meia-noite | — | `#0A0F1E` | `#4A7FD4` |

Grid de 4 colunas simétricas: `grid-template-columns: 1fr 1fr 1fr 1fr`

---

## Banco de taglines

```javascript
const TAGS = [
  'ANTES DA IA.', 'ANTES DO PROMPT.', 'ANTES DO IMERSIVO.',
  'ANTES DO MAPPING.', 'ANTES DO ALGORITMO.', 'ANTES DA EXPERIÊNCIA.',
];
```

- Capa: crossfade entre `#ctag-a` e `#ctag-b`
- Seção 07: classe `.tagline-cycle` em sincronia com a animação CSS `--dur`

---

## Seções — 10 seções independentes

| Seção | Arquivo | Nome | Status |
|---|---|---|---|
| 01 | 01-logo.html | Logo e Wordmark | ✅ |
| 02 | 02-tipografia.html | Tipografia | ✅ |
| 03 | 03-paleta.html | Paleta de Cores | ✅ |
| 04 | 04-grid.html | Grid e Espaçamento | ✅ |
| 05 | 05-voz.html | Voz e Tom | ✅ |
| 06 | 06-imagetica.html | Linguagem Imagética | ✅ |
| 07 | 07-impressos.html | Usos Impressos | ✅ |
| 08 | 08-motion.html | Motion e Vídeo | ✅ |
| 09 | 09-redes.html | Redes Sociais | ✅ |
| 10 | 10-merch.html | Merchandise | ✅ |
| 11 | — | Aplicações Especiais | ⏳ Adiada |

**Seção 11 — nota:** aguarda imagens reais dos projetos autorais.

### Estrutura interna de cada seção

```html
<section data-sec="XX" class="manual-section">
  <div class="page">
    <div class="hdr"> ... </div>
    <!-- conteúdo da seção -->
    <div class="sec-ftr"> ... </div>
  </div>
</section>
```

---

## Scripts — ada.js (v2.0)

Funções globais disponíveis em todas as páginas:

| Função | Uso |
|---|---|
| `showP(name, btn)` | Alterna painéis `.ppanel` (seção 01) |
| `cp(id, btn)` | Copia texto de elemento pelo ID |
| `cpPrompt(id, btn)` | Copia prompt com feedback de cor |
| `dlMock(elId, filename, w)` | Download PNG via html2canvas |
| `mbRegen()` | Embaralha moodboard (seção 05) |
| `mbDownload()` | Download PNG do moodboard |
| `setSpd(sec, btn)` | Altera velocidade da animação (seção 07) |
| `startTagCycle(durSec)` | Inicia ciclo de taglines `.tagline-cycle` |
| `carouselMove(dir)` | Navega no carrossel (seção 08) |
| `carouselGo(idx)` | Vai para slide específico |
| `showEmail(v, btn)` | Alterna versão de assinatura (seção 08) |
| `copyEmail()` | Copia HTML da assinatura padrão |
| `copyEmailCor()` | Copia HTML da assinatura escura |
| `copyEmailImagem()` | Copia HTML da assinatura meia-noite |

**Nota sobre scroll spy:** removido na v2.0. O item ativo no nav é definido em tempo de build pelo `split_pages.py`.

---

## Restrições permanentes

1. **Racionais MCs** — nunca como exemplo conceitual/poético ("Racionais como cenografia"). Apenas como item factual de portfólio.

2. **Nomes dos fundadores em bios curtas** — não aparecem em bios de 150 caracteres (Instagram). Aparecem em: site/about, proposta, press release, créditos.

3. **Wordmark em peças pequenas** — nunca abaixo de 240px / 60mm. Usar o Alfa isolado.

4. **Arquivos gerados** — nunca editar `pages/*.html` ou `index.html` diretamente. Sempre editar `build/_source.html` e rodar `python build/split_pages.py`.

---

## Contexto do cliente

**ADA — Ateliê Digital Analógico**
Plataforma criativa fundada em 2015 por Caio Fazolin e Tatiane Gonzalez.

**Portfólio:** Anish Kapoor (Casa Bradesco), show de 30 anos dos Racionais MCs, Festival G20, ALL Amazônia em Times Square, COP28 Dubai, Liniker, Natiruts, Encontro dos Titãs, Netflix, Sony Pictures, Pinacoteca SP.

**Posicionamento:** Tecnologia como linguagem. Brasil como ponto de vista.

**Manifesto:** A ADA chegou antes. Opera na borda — onde as coisas ainda não têm nome, antes das categorias. Desde 2015, tem nome: ADA. E vai continuar sendo antes.

**O que a ADA não é:** empresa de AV, agência genérica, fornecedora de projeção, executora de ideias de outros.

---

## Features implementadas

- **Download de mockups**: avatares e capas de redes sociais via `html2canvas` → PNG na resolução correta
- **Moodboard**: mosaic grid (mondrian) 6×6, só imagens, sem botões
- **Territórios**: 13 grupos com prompt copiável e 4 imagens cada, antes do moodboard
- **Imersivo dourado** (pr-g09): 4 imagens ADA_imersivo_01-04.png
- **Imersivo meia-noite** (pr-g09b): 4 imagens ADA_imersivo_05-08.png
- **Bios**: Instagram, LinkedIn, GitHub (seção 09)
- **Merch lightbox**: `.merch-photo` com hover zoom + `merchLightbox()` — clique abre fullscreen, clique fecha

---

## Seção 10 — Merchandise (estado Mar 2026)

Três itens implementados. Estrutura padrão: `item-header` → grid de fotos `.merch-photo` → `assets-section` com canvas download.

### Camiseta (kit01)
- **Fotos**: flat lay frente, flat lay costas, homem vestindo, mulher costas, cena conjunta — grid 5 colunas
- **Assets (4K)**: Frente · Alfa (4000×4000px) · Costas · Logo+URL (4000×3040px)
- **Imagens**: `freepik__black-oversized-cotton-tshirt-front-view-flat-lay-__89311.png` / `..._back_...__89312.png` / homem `__89314.png` / mulher `__89313.png` / conjunto `__89315.png`

### Boné Five Panel (kit02)
- **Estilo**: trail runner, North Face/Arc'teryx, preto, logo off-center esquerdo (como visto na imagem = direita de quem usa)
- **Fotos**: flat lay boné, diretora de arte vestindo — grid 3 colunas com 1 placeholder "Modelo + Camiseta"
- **Asset (4K)**: Frente · Alfa (4000×4000px) — 1 arquivo só
- **Imagens**: flat lay `__89316.png` / diretora `__89317.png`
- **Placeholder pendente**: foto da diretora no festival Rio (cena sendo gerada com Freepik)

### Adesivo (kit03)
- **Specs**: Logo + URL · fundo amarelo #FFD600 · invertido · impressão digital
- **Fotos**: placeholder "Foto em breve" + preview HTML do adesivo (renderizado no próprio grid)
- **Asset (4K)**: Adesivo · Logo+URL · Invertido (4000×4000px) — fundo #FFD600, símbolo+hairline+ada.art.br em preto
- **Placeholder pendente**: foto do hardcase Pelican com adesivo colado, numa house mix de festival

### merch.js — funções globais
| Função | Uso |
|---|---|
| `merchLightbox(el)` | Abre lightbox com a foto do `.merch-photo` clicado |
| `buildAssets(num, name, data, gridId)` | Renderiza grid de assets via canvas |
| `dlAsset(num, name, asset, btn)` | Download de asset individual como PNG |
| `downloadAll(num, name, assets)` | Download de todos os assets do kit |
| `drawSym(ctx, ox, oy, size, color)` | Desenha Alfa no canvas |

### Padrão de assets — todos em 4K (300 DPI)
- Canvas sempre com `s` hardcoded (não `min(w,h)`) quando `w ≠ h`
- `lineWidth` escalado proporcionalmente: `Math.round(S*.002)`
- Nomes de arquivo com sufixo `_4k`

## Specs de redes sociais (verificados Mar 2026)

| Plataforma | Avatar | Display | Capa |
|---|---|---|---|
| Instagram | 600×600px | Círculo | — |
| YouTube | 800×800px | Círculo | 2560×1440px |
| LinkedIn | 400×400px | Círculo | 1584×396px |
| Twitter/X | 400×400px | Círculo | 1500×500px |
| GitHub | 500×500px | Círculo | 1280×640px |

## Próximos passos

1. Deploy: GitHub Pages, Vercel ou Netlify
2. Otimizar: minificar, meta tags OG com imagem, favicon
3. Seção 11 quando houver imagens reais dos projetos autorais
4. Revisar responsividade mobile

---

## ⚠️ INÍCIO DA PRÓXIMA SESSÃO — ler antes de qualquer coisa

**Primeira tarefa:** ✅ concluída — nome oficial do símbolo definido: **Alfa**.

### Review em andamento (sessão 23/03/2026)

Revisão seção por seção em progresso. Status:

| Seção | Status | Observações |
|---|---|---|
| Nav | ✅ corrigido | Logo via `<use href="#ada-sym">` · letter-spacing `.18em` · group label padding reduzido |
| Capa | ✅ simplificada | Removidos: field, gradiente, tagline, linha, cantos, glow |
| 01 Logo | ✅ hdr-sub | `Logo · Lock-up · Logo + URL · Wordmark · Taglines · Uso correto e proibido` |
| 02 Tipografia | ✅ hdr-sub | `DM Mono · Syne · Cormorant Garamond · Hierarquia Tipográfica · Uso correto e proibido · Aplicação editorial` |
| 03 Paleta | ✅ reescrita | 4 identidades · Paleta em 3 grupos · Correto e proibido |
| 04 Grid e Espaçamento | ✅ reescrita | Unidade 1a · diagrama vertical + horizontal com anotações · Correto e proibido |
| 05 Voz e Tom | ⏳ pendente | — |
| 06 Imagetica | ⏳ pendente | — |
| 07 Impressos | ⏳ pendente | — |
| 08 Motion | ⏳ pendente | — |
| 09 Redes | ⏳ pendente | — |
| 10 Merch | ⏳ pendente | — |

### Regras estabelecidas nessa sessão

**Bordas de divs — padrão definitivo:**
- `.hdr` (div com número da página) → `border: 1px solid var(--border)` — única com borda amarela por seção
- Todos os `.blk` de conteúdo → `border: 1px solid var(--border-dim)` — cinza/dim, sem exceção
- `.blk.ac` eliminado do CSS e HTML
- Classes afetadas já corrigidas: `.font-block.primary`, `.trait.hi`, `.template-card.hi`, `.item-header`

**Nome do símbolo:** ✅ **Alfa** — substituído em `_source.html`, `merch.js` e `CLAUDE.md` (25/03/2026)

### Alterações técnicas aplicadas

- `system.css`: 162 regras duplicadas removidas · vars adicionadas · letter-spacing canonizado
- `split_pages.py`: nav logo usa `<use href="#ada-sym">`
- `_source.html`: capa simplificada · SEC 03 reescrita · SEC 04 reescrita como Lock-up · todas as `blk ac` → `blk`

---

## Princípio: o manual é auto-referencial

O Manual de Marca da ADA não descreve o sistema — ele **é** o sistema.

Toda decisão de design definida no documento deve ser válida dentro do próprio documento. Isso significa:

- O Alfa e o wordmark aparecem no manual exatamente como a seção 01 define — tamanho mínimo respeitado, sempre SVG inline via `<use href="#ada-sym">`, nunca como `<img>`, nunca abaixo de 32px para o símbolo ou 240px para o wordmark
- As variações de cor (Padrão, Invertido, Meia-noite, Monocromático) definidas na seção 01 devem aparecer aplicadas corretamente em todo o manual
- A hierarquia tipográfica definida na seção 02 deve ser a mesma usada em títulos, labels, descrições e UI do manual
- O sistema de grid e espaçamento da seção 04 deve governar o layout de todas as seções
- A linguagem imagética da seção 06 deve orientar qualquer imagem usada no próprio manual
- A voz e tom da seção 05 devem ser os mesmos usados nos textos do manual

**Quando o usuário modificar qualquer regra do sistema** (logo, wordmark, tipografia, cor, grid), verificar proativamente se essa mudança precisa se refletir nas outras seções do manual — e aplicar sem precisar ser solicitado.

**Antes de qualquer alteração visual em qualquer seção, perguntar:** isso está coerente com o que as outras seções definem? O manual falha se descreve uma coisa e faz outra.

---

## Regras de consistência interna — extraídas da auditoria (Mar 2026)

Resultado da leitura completa das 6 seções REGRAS (01–06) em 23/03/2026.

### SVG — Alfa e wordmark

| Contexto | Regra |
|---|---|
| UI, nav, headers, footers | `<use href="#ada-sym">` com `currentColor` — sempre |
| Wordmark em texto/link | `<use href="#ada-wm">` com `currentColor` — sempre |
| Blocos especimen/demonstração | Inline `<polygon fill="#FFD600">` permitido — contexto didático, não UI |
| Tamanho mínimo símbolo | 32px |
| Tamanho mínimo wordmark | 240px / 60mm |

**Exceções documentadas:** SEC 03 tem 6 polígonos inline nos cards "Modo Amarelo / Meia-noite" (demonstração dos uniformes). SEC 04 tem 9 polígonos inline nos especimens de escala mínima (64px / 48px / 34px). Ambas são demonstrações intencionais, não violações.

### Tipografia — regras aplicadas

- **font-family:** sempre via CSS var (`var(--mono)`, `var(--syne)`, `var(--serif)`) — nunca hardcoded
- **Mono (DM Mono):** labels, tags, UI, números, código — usado em todas as 6 seções
- **Syne:** corpo de texto, subtítulos, parágrafos explicativos — SEC 02, 05, 06
- **Cormorant (serif):** manifesto, citações — SEC 02 (especimen), SEC 05 (manifesto) — uso restrito
- **font-size inline:** permitido apenas em blocos especimen (SEC 02); corpo de texto usa `clamp()` para responsividade
- **Escala tipográfica confirmada SEC 02:** 42px display / 26px h1 / 22px h2 / 20px h3 / 15px corpo / 11px label / 10px micro

### Cor — regras aplicadas

- **Hex direto na UI:** proibido. Usar CSS vars (`var(--y)`, `var(--void)`, `var(--blade)` etc.)
- **Hex direto em SVG atributos:** permitido quando `currentColor` não é viável (ex.: `stroke` em SVG de diagrama)
- **Hex direto em blocos especimen:** permitido — SEC 03 exibe toda a paleta como swatches
- **Cor proibida:** `#050505` — não pertence ao sistema. Substituir por `#000000` (var --void) ou `#111111` (var --bg)
- **Modos de cor válidos:** Padrão (`#000` + `#FFD600`), Inversão (`#FFD600` + `#000`), Monocromático (`#FFF` + `#000`), Meia-noite (`#0A0F1E` + `#4A7FD4`)

### Letter-spacing — escala canônica

Definida a partir do uso real nas 6 seções:

| Valor | Uso |
|---|---|
| `.18em` | Labels UI padrão, tags, micro-texto |
| `.2em` | Subtítulos de seção, cabeçalhos secundários |
| `.34em` | Taglines, destaques, display (esparso) |
| `-.02em` | Corpo de texto longo (Syne) — tracking negativo suave |

Valores `.12em`, `.15em`, `.22em`, `.25em` foram encontrados isoladamente — evitar para manter coerência.

### Espaçamento

- Gaps padronizados: `8px` (micro), `16px` (padrão), `24px` (confortável), `32px` (seção)
- `clamp()` para font-size em texto de corpo: padrão confirmado em SEC 05
- Border-radius: não definido uniformemente entre seções — usar `2px` para elementos UI, `0` para cards e grids

---

## Limpeza de arquivos temporários

O editor (Claude Code) deixa arquivos `.tmp.*` espalhados pelas pastas do projeto a cada edição. Eles acumulam dezenas ou centenas de arquivos inúteis.

**Ao final de cada sessão**, perguntar ao usuário:

> "Quer que eu limpe os arquivos temporários `.tmp.*` do projeto?"

Se confirmado, rodar:

```bash
find "E:/ADA Dropbox/ADA (1)/2026/ADA/ada-manual" -name "*.tmp.*" -type f -delete
```

---

*ADA Manual de Marca · v2.0 · Março 2026*
*Repo: ateliedigitalanalogico/ada-brand-manual*
