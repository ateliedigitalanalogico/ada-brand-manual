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
│   ├── 05-imagetica.html
│   ├── 06-impressos.html
│   ├── 07-motion.html
│   ├── 08-redes.html
│   ├── 09-voz.html
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

---

## SVG reutilizável — `<symbol>/<use>`

Todos os `<svg>` do símbolo A e wordmark usam o padrão `<use href="#ada-sym">` com `currentColor`:

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

## Símbolo A — geometria intocável

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
  'ANTES DO MAPPING.', 'ANTES DO HYPE.', 'ANTES DO ALGORITMO.',
  'ANTES DA EXPERIÊNCIA.', 'ANTES DO FUTURO.',
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
| 05 | 05-imagetica.html | Linguagem Imagética | ✅ |
| 06 | 06-impressos.html | Usos Impressos | ✅ |
| 07 | 07-motion.html | Motion e Vídeo | ✅ |
| 08 | 08-redes.html | Redes Sociais | ✅ |
| 09 | 09-voz.html | Voz e Tom | ✅ |
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

3. **Wordmark em peças pequenas** — nunca abaixo de 240px / 60mm. Usar o símbolo A isolado.

4. **Arquivos gerados** — nunca editar `pages/*.html` ou `index.html` diretamente. Sempre editar `build/_source.html` e rodar `python build/split_pages.py`.

---

## Contexto do cliente

**ADA — Ateliê Digital Analógico**
Plataforma criativa fundada em 2015 por Caio Fazolin e Tatiane Gonzalez.

**Portfólio:** Anish Kapoor (Casa Bradesco), show de 30 anos dos Racionais MCs, Festival G20, ALL Amazônia em Times Square, COP28 Dubai, Liniker, Natiruts, Encontro dos Titãs, Netflix, Sony Pictures, Pinacoteca SP.

**Posicionamento:** Tecnologia como linguagem. Brasil como ponto de vista.

**Manifesto:** A ADA esteve aqui antes. Opera na borda — na fronteira entre o que existe e o que ainda não tem nome.

**O que a ADA não é:** empresa de AV, agência genérica, fornecedora de projeção, executora de ideias de outros.

---

## Features implementadas

- **Download de mockups**: avatares e capas de redes sociais via `html2canvas` → PNG na resolução correta
- **Moodboard**: mosaic grid (mondrian) 6×6, só imagens, sem botões
- **Territórios**: 13 grupos com prompt copiável e 4 imagens cada, antes do moodboard
- **Imersivo dourado** (pr-g09): 4 imagens ADA_imersivo_01-04.png
- **Imersivo meia-noite** (pr-g09b): 4 imagens ADA_imersivo_05-08.png
- **Bios**: Instagram, LinkedIn, GitHub (seção 09)

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

*ADA Manual de Marca · v2.0 · Março 2026*
*Repo: ateliedigitalanalogico/ada-brand-manual*
