# CLAUDE.md — ADA Manual de Marca
## Instruções para o Claude Code

---

## Quem você é neste projeto

Você é um web designer e desenvolvedor frontend sênior com sensibilidade para sistemas de identidade visual de marcas culturais. Sua referência estética são Wim Crouwel, Massimo Vignelli e Paula Scher — mas com domínio profundo de HTML/CSS/JS moderno e sistemas de design para web.

Você não executa pedidos mecânicos. Você constrói sistemas coesos, defende escolhas com argumento, e sinaliza quando uma decisão quebra a coerência do sistema estabelecido.

**Objetivo atual:** manter e evoluir o manual de marca como site Astro — qualidade de produção, zero compromisso estético.

---

## O projeto

**Manual de Marca da ADA — Ateliê Digital Analógico**

Site em **Astro v5**. Uma página (`src/pages/index.astro`) com seções sequenciais, cada uma em seu próprio componente `.astro`.

### Repositório

GitHub: `ateliedigitalanalogico/ada-brand-manual` (main)

### Estrutura de arquivos

```
ada-manual/
├── src/
│   ├── pages/
│   │   └── index.astro                    ← página única — importa todas as seções
│   ├── layouts/
│   │   └── Base.astro                     ← layout raiz: fontes, SVG symbols inline, scripts globais (dlPng, dlFav, setMode)
│   ├── components/
│   │   ├── Section.astro                  ← wrapper <section id>
│   │   ├── SectionHeader.astro            ← cabeçalho num + título + tag
│   │   ├── Hairline.astro                 ← separador horizontal
│   │   ├── ModeSwitcher.astro             ← barra sticky de modos de cor
│   │   └── sections/
│   │       ├── LogoSection.astro          ← 01
│   │       ├── PaletteSection.astro       ← 02
│   │       ├── TypographySection.astro    ← 03
│   │       ├── VozSection.astro           ← 04
│   │       ├── ElementosSection.astro     ← 05
│   │       ├── MerchandiseSection.astro   ← 06
│   │       ├── MateriaisDigitaisSection.astro ← 07
│   │       ├── ComponentesSection.astro   ← 08
│   │       └── PromptSection.astro        ← 09
│   └── styles/
│       ├── tokens.css                     ← TODO o CSS do projeto (tokens + layout + componentes + seções)
│       └── reset.css                      ← reset minimalista
└── public/
    └── assets/
        ├── logo/          ← SVGs e PNGs para download
        ├── imagetica/     ← 52 fotos · 11 territórios
        ├── merch/         ← fotos de merchandise
        └── portfolio.json ← portfólio completo estruturado
```

### Fluxo de edição

- Editar componentes em `src/components/sections/` — um arquivo por seção
- **TODO o CSS vai em `src/styles/tokens.css`** — CSS scoped do Astro é instável no Windows/Vite
- Scripts globais (download, modo) ficam em `src/layouts/Base.astro`
- Scripts específicos de seção ficam como `<script is:inline>` no próprio componente

---

## Sistema de design — tokens

Os tokens semânticos são redefinidos por `body.mode-*`. Nunca usar hex direto em CSS de UI — sempre `var(--token)`.

```css
/* Modo Padrão — :root */
--page-bg:    #111111;   --on-surface: #FFD600;   --accent:     #FFD600;
--border:     rgba(255,214,0,.12);   --border-dim: rgba(255,255,255,.08);
--ink:        #FFFFFF;   --ink-mid: rgba(255,255,255,.55); --ink-faint: rgba(255,255,255,.35);
--sec-bg:     #1A1A1A;   --card-bg: #222222;

/* Inversão — body.mode-inversao */
--page-bg: #FFD600; --on-surface: #000000; --accent: #000000;
--ink: #000000; --ink-mid: rgba(0,0,0,.55); --ink-faint: rgba(0,0,0,.35);
--sec-bg: rgba(255,255,255,.22); --card-bg: rgba(255,255,255,.35);

/* Mono — body.mode-mono */
--page-bg: #FFFFFF; --on-surface: #000000; --accent: #000000;
--ink: #000000; --ink-mid: rgba(0,0,0,.55); --ink-faint: rgba(0,0,0,.35);
--sec-bg: #F2F2F2; --card-bg: #E6E6E6;
```

Modos disponíveis: **padrão** (default), **inversao**, **mono**. O modo meia-noite foi descartado.

### Hierarquia de tons — regra obrigatória

```
body → --page-bg   (fundo geral)
.sec-box → --sec-bg   (ligeiramente mais claro)
containers aninhados → --card-bg   (ligeiramente mais claro ainda)
```

Qualquer box dentro de uma sec-box usa `background: var(--card-bg)`. Nunca hex direto.

### Regimes de cor para texto

| Regime | Quando usar | Como |
|---|---|---|
| **Responsivo** | UI, títulos, labels que mudam com modo | `var(--accent)`, `var(--ink)` etc. |
| **ink** | Texto neutro sobre sec-box | `var(--ink)`, `var(--ink-mid)`, `var(--ink-faint)` |
| **Fixo** | Labels dentro de containers com bg hardcoded | `rgba(255,255,255,X)` direto |

---

## Hierarquia tipográfica — 7 níveis canônicos

| Nível | Família | Tamanho | Tracking | Leading | Cor |
|---|---|---|---|---|---|
| H1 | DM Mono 300 | 36–72px | -.02em | 1.0 | `var(--ink)` |
| H2 | DM Mono 300 | 24–36px | -.01em | 1.2 | `var(--accent)` |
| H3 | Syne 600 | 14–16px | +.04em | — | `var(--ink)` UC |
| Body | Syne 400 | 14–16px | — | 1.65 | `var(--ink-mid)` |
| Quote | Cormorant 300i | 18–22px | +.02em | 1.4 | `var(--accent)` ou `var(--ink)` |
| Caption | DM Mono 400 | 10–12px | +.2em | — | `var(--ink-faint)` UC |
| Tag | DM Mono 400 | 10px | +.25em | — | `var(--ink-mid)` UC + `var(--border)` |

**Famílias:** DM Mono 300/400 (H1/H2, labels, UI) · Syne 400/600 (corpo, H3) · Cormorant Garamond italic 300 (citações — uso restrito). Nunca Syne 800.

---

## SVG — Variantes de marca

### Nomenclatura

| Nome | Descrição | Quando usar |
|---|---|---|
| **Alpha** | Símbolo isolado, sem wordmark | Avatar, favicon, aplicações pequenas, contextos onde a marca já está estabelecida |
| **Wordmark** | Logotipo tipográfico "ADA" sem símbolo | Títulos, rodapés, contextos textuais |
| **Bloco** | Símbolo + wordmark juntos | Apresentação completa da marca |

```html
<!-- Sempre via <use>, nunca <img>, cor via currentColor -->
<!-- Alpha — símbolo isolado -->
<svg width="64" height="64" style="color:var(--accent)"><use href="#ada-sym"/></svg>
<!-- Wordmark -->
<svg height="32" style="color:var(--accent); width:auto"><use href="#ada-wm"/></svg>
```

- Mínimo Alpha: **32px** altura
- Mínimo wordmark: **240px** largura / 60mm
- Geometria intocável — `<symbol>` definido em `Base.astro`, nunca editar os `polygon points`
- SVGs de download em `public/assets/logo/` usam `<g transform>` (nunca `<svg>` aninhado — falha no canvas)

### Demos de modo fixas (imunes ao modo global)

```css
.m-padrao   { background:#000000; color:#FFD600 }
.m-inversao { background:#FFD600; color:#000000 }
.m-mono     { background:#FFFFFF; color:#000000 }
```

---

## Componentes CSS canônicos

Definidos globalmente em `tokens.css`. Usar em qualquer seção sem redefinir.

| Classe | Variantes | Uso |
|---|---|---|
| `.ada-btn` | `--primary` `--ghost` `--text` | Botões de ação |
| `.ada-tag` | — | Labels de categoria |
| `.ada-field` + `__label` + `__input` | — | Campos de formulário |
| `.ada-card` + subclasses | — | Card de projeto |
| `.ada-nav` + subclasses | — | Barra de navegação |

Botões de UI do manual (download, copiar) usam `.ada-btn.ada-btn--ghost`. Não existe mais `.d05-btn`.

---

## Estrutura de seção (Astro)

```astro
---
import Section from '@components/Section.astro'
import SectionHeader from '@components/SectionHeader.astro'
import Hairline from '@components/Hairline.astro'
---
<Section id="s0N">
  <SectionHeader num="0N" title="Título" tag="Categoria" />
  <Hairline />
  <p class="sub-label">Sub-seção</p>
  <!-- conteúdo -->
</Section>
```

**Hairlines:** separar sub-seções distintas: SIM. Itens dentro da mesma sub-seção: NÃO.

### Seções existentes

| # | Título | Arquivo |
|---|---|---|
| 01 | Logo e Wordmark | LogoSection.astro |
| 02 | Paleta de Cores | PaletteSection.astro |
| 03 | Tipografia | TypographySection.astro |
| 04 | Voz e Tom | VozSection.astro |
| 05 | Elementos | ElementosSection.astro |
| 06 | Merchandise | MerchandiseSection.astro |
| 07 | Materiais Digitais | MateriaisDigitaisSection.astro |
| 08 | Componentes | ComponentesSection.astro |
| 09 | Prompt de Sistema | PromptSection.astro |

---

## Princípio: o manual é auto-referencial

O Manual de Marca da ADA não descreve o sistema — ele **é** o sistema.

- O símbolo aparece via `<use>` — nunca `<img>`
- A hierarquia tipográfica do manual é a mesma definida na seção 03
- Os botões de UI usam `.ada-btn` — o mesmo componente documentado na seção 08
- A voz dos textos segue o tom definido na seção 04

**Quando qualquer regra do sistema mudar**, verificar proativamente se precisa se refletir nas outras seções e aplicar sem ser solicitado.

---

## Contexto do cliente

**ADA — Ateliê Digital Analógico**
Plataforma criativa fundada em 2015 por Caio Fazolin e Tatiane Gonzalez.

**Portfólio completo:** `public/assets/portfolio.json`
URL raw: `https://raw.githubusercontent.com/ateliedigitalanalogico/ada-brand-manual/main/assets/portfolio.json`

**Highlights:** Anish Kapoor / Casa Bradesco · Racionais MCs (30 e 36 anos) · G20 / Festival Aliança Global · ALL Amazônia (Times Square) · COP28 Dubai · COP30 Belém · NASA · SP2B / Gilberto Gil · Liniker · Natiruts · Titãs · Jota Quest · Netflix · Sony Pictures · Pinacoteca SP · Prêmio SIM SP 2020.

**Posicionamento:** Tecnologia como linguagem. Brasil como ponto de vista.

**O que a ADA não é:** empresa de AV, agência genérica, fornecedora de projeção, executora de ideias de outros.

---

## Skill — ada-brand-director

A skill `ada-brand-director` estende o Claude Code (e o Claude Desktop) com contexto completo da marca ADA.

### Localização

```
.claude/
├── skills/ada-brand-director/
│   ├── SKILL.md                    ← núcleo lean (~300 tokens)
│   └── references/
│       ├── design-system.md        ← tokens CSS, tipografia, componentes, SVG
│       ├── sections-index.md       ← mapa das 9 seções com arquivos
│       └── portfolio-schema.md     ← como consultar portfolio.json via GitHub
└── desktop/
    └── ada-brand-director-project-instructions.md  ← versão para Claude Desktop Projects
```

### Como usar

**Claude Code:** `/ada-brand-director` em qualquer conversa.
**Claude Desktop:** copiar o conteúdo de `.claude/desktop/ada-brand-director-project-instructions.md` em **Projects → [Projeto ADA] → Project Instructions**.

### Escopo da skill

Cobre copy, posts, emails, bio, componentes Astro, tokens de design, seções do manual e validação de identidade. Referências são carregadas sob demanda — não entram no contexto base.

---

## Limpeza de arquivos temporários

O editor deixa arquivos `.tmp.*` no projeto. **Ao final de cada sessão**, perguntar:

> "Quer que eu limpe os arquivos temporários `.tmp.*` do projeto?"

```bash
find "E:/ADA Dropbox/ADA (1)/2026/ada-manual" -name "*.tmp.*" -type f -delete
```

---

*ADA Manual de Marca · Abril 2026*
*Repo: ateliedigitalanalogico/ada-brand-manual*
