# ADA — Manual de Marca

Manual de identidade visual da **ADA — Ateliê Digital Analógico**, construído como documento web interativo.

**Site:** [ada.art.br](https://ada.art.br) · **Repo:** [ateliedigitalanalogico/ada-brand-manual](https://github.com/ateliedigitalanalogico/ada-brand-manual)

---

## Stack

[Astro v5](https://astro.build) · CSS puro (sem Tailwind) · TypeScript · Fontes locais woff2

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run preview  # preview do build
```

## Estrutura

```
ada-manual/
├── assets/
│   └── portfolio.json          # portfólio completo (autorais, comerciais, mídia)
├── public/
│   ├── assets/
│   │   ├── imagetica/          # 52 fotografias · 11 territórios
│   │   ├── logo/               # SVGs de download (bloco, símbolo, wordmark — variantes)
│   │   └── merch/              # fotos de merchandise
│   └── fonts/                  # woff2 locais (DM Mono, Syne, Cormorant Garamond)
└── src/
    ├── components/
    │   ├── Hairline.astro
    │   ├── ModeSwitcher.astro
    │   ├── Section.astro
    │   ├── SectionHeader.astro
    │   └── sections/
    │       ├── LogoSection.astro               # 01 — Logo e Wordmark
    │       ├── PaletteSection.astro            # 02 — Paleta de Cores
    │       ├── TypographySection.astro         # 03 — Tipografia
    │       ├── VozSection.astro                # 04 — Voz e Tom
    │       ├── ElementosSection.astro          # 05 — Elementos
    │       ├── MerchandiseSection.astro        # 06 — Merchandise
    │       ├── MateriaisDigitaisSection.astro  # 07 — Materiais Digitais
    │       ├── ComponentesSection.astro        # 08 — Componentes Web
    │       └── PromptSection.astro             # 09 — Prompt de Sistema (IA)
    ├── layouts/
    │   └── Base.astro      # layout raiz: fontes, SVG symbols inline, scripts globais
    ├── lib/
    │   └── mode.ts         # modo switcher (padrão / inversão / mono)
    ├── pages/
    │   └── index.astro     # página única — importa todas as seções
    └── styles/
        ├── reset.css
        └── tokens.css      # TODO o CSS: tokens, layout, componentes
```

## Sistema de Design

Todo o CSS vive em `src/styles/tokens.css` — CSS scoped do Astro é instável no Windows/Vite.

### Modos de cor

| Modo | Classe no `<body>` | Fundo | Acento |
|---|---|---|---|
| Padrão | *(sem classe)* | `#111111` | `#FFD600` |
| Inversão | `mode-inversao` | `#FFD600` | `#000000` |
| Mono | `mode-mono` | `#FFFFFF` | `#000000` |

### Componentes disponíveis

```html
<button class="ada-btn ada-btn--primary">Ação principal</button>
<button class="ada-btn ada-btn--ghost">Secundária</button>
<button class="ada-btn ada-btn--text">Terciária →</button>
<span class="ada-tag">Videomapping</span>
<div class="ada-field">…</div>
<div class="ada-card">…</div>
<nav class="ada-nav">…</nav>
```

### SVG — sempre via `<use>`

```html
<svg width="64" height="64" style="color:var(--accent)"><use href="#ada-sym"/></svg>
<svg height="32" style="color:var(--accent);width:auto"><use href="#ada-wm"/></svg>
```

Os `<symbol>` são definidos inline em `Base.astro`. A geometria dos polígonos é intocável.

## Assets para download

Em `public/assets/logo/` — 18 SVGs organizados por tipo e variante:

| Tipo | Variantes |
|---|---|
| `ada_bloco_v_*.svg` | padrao · inversao · mono · transp |
| `ada_bloco_h_*.svg` | padrao · inversao · mono · transp |
| `ada_sym_*.svg` | padrao · inversao · mono · transp |
| `ada_wm_*.svg` | padrao · inversao · mono · transp · amarelo · preto |

## Portfólio

`assets/portfolio.json` — dados estruturados (autorais, comerciais, mídia).
URL raw: `https://raw.githubusercontent.com/ateliedigitalanalogico/ada-brand-manual/main/assets/portfolio.json`

## Sobre a ADA

**ADA — Ateliê Digital Analógico** · Fundada em 2015 por Caio Fazolin e Tatiane Gonzalez · São Paulo, Brasil

Tecnologia como linguagem. Brasil como ponto de vista.

---

*Abril 2026*
