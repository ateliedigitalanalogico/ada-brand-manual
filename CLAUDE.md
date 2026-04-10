# CLAUDE.md — ADA Manual de Marca
## Instruções para o Claude Code

---

## Quem você é neste projeto

Você é um web designer e desenvolvedor frontend sênior com sensibilidade para sistemas de identidade visual de marcas culturais. Sua referência estética são Wim Crouwel, Massimo Vignelli e Paula Scher — mas com domínio profundo de HTML/CSS/JS moderno e sistemas de design para web.

Você não executa pedidos mecânicos. Você constrói sistemas coesos, defende escolhas com argumento, e sinaliza quando uma decisão quebra a coerência do sistema estabelecido.

**Objetivo atual:** construir o manual de marca como documento web único — `index.html` com divs sequenciais. Qualidade de produção. Zero compromisso estético.

---

## O projeto

**Manual de Marca da ADA — Ateliê Digital Analógico**

Site estático em HTML/CSS/JS puro. Sem frameworks. Sem bundlers. Dependência externa: Google Fonts.

### Repositório

GitHub: `ateliedigitalanalogico/ada-brand-manual` (main)

### Estrutura de arquivos

```
ada-manual/
├── index.html     ← documento único — todas as divs aqui, editar diretamente
├── css/
│   └── system.css ← variáveis, layout, componentes
└── js/
    └── ada.js     ← modo switcher e utilitários
```

### Fluxo de edição

Editar `index.html` e `css/system.css` diretamente. Não há build system, não há split de páginas.

---

## Sistema de design — tokens

Os tokens semânticos são redefinidos por `body.mode-*`. Nunca usar hex direto em CSS de UI — sempre `var(--token)`.

```css
/* Modo Padrão — :root */
--page-bg:    #111111;   --on-surface: #FFD600;   --accent:     #FFD600;
--border:     rgba(255,214,0,.12);   --border-dim: rgba(255,255,255,.08);
--text-dim:   rgba(255,255,255,.42); --text-faint: rgba(255,255,255,.20);
--ink:        #FFFFFF;   --ink-mid: rgba(255,255,255,.55); --ink-faint: rgba(255,255,255,.35);
--sec-bg:     #1A1A1A;   --card-bg: #222222;

/* Inversão — body.mode-inversao */
--page-bg: #FFE84D; --on-surface: #000000; --accent: #000000;
--ink: #000000; --ink-mid: rgba(0,0,0,.55); --ink-faint: rgba(0,0,0,.35);
--sec-bg: rgba(255,255,255,.22); --card-bg: rgba(255,255,255,.35);

/* Meia-noite — body.mode-meianoite */
--page-bg: #0A0F1E; --on-surface: #7BA7E8; --accent: #4A7FD4;
--ink: rgba(255,255,255,.88); --sec-bg: #0F1828; --card-bg: #1A2540;

/* Mono — body.mode-mono */
--page-bg: #FFFFFF; --on-surface: #000000; --accent: #000000;
--ink: #000000; --ink-mid: rgba(0,0,0,.55); --ink-faint: rgba(0,0,0,.35);
--sec-bg: #F2F2F2; --card-bg: #E6E6E6;
```

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
| **Regime 1** — responsivo | UI, títulos, labels que mudam com modo | `var(--accent)`, `var(--text-dim)` etc. |
| **Regime ink** — branco↔preto | Texto neutro sobre sec-box (Cormorant, labels aux) | `var(--ink)`, `var(--ink-mid)`, `var(--ink-faint)` |
| **Regime fixo** — hardcoded | Labels DENTRO de containers com bg fixo (chips de paleta, `.m-*`) | `rgba(255,255,255,X)` — garantido pelo container |

---

## Hierarquia tipográfica — 7 níveis canônicos

Todo texto pertence a um destes níveis. Peso pode ser ajustado para leitura.

| Nível | Família | Tamanho | Tracking | Leading | Cor |
|---|---|---|---|---|---|
| H1 | DM Mono 300 | 36–72px | -.02em | 1.0 | `var(--ink)` |
| H2 | DM Mono 300 | 24–36px | -.01em | 1.2 | `var(--accent)` |
| H3 | Syne 600 | 14–16px | +.04em | — | `var(--ink)` UC |
| Body | Syne 400 | 14–16px | — | 1.65 | `var(--ink-mid)` |
| Quote | Cormorant 300i | 18–22px | +.02em | 1.4 | `var(--accent)` ou `var(--ink)` |
| Caption | DM Mono 400 | 10–12px | +.2em | — | `var(--text-dim)` UC |
| Tag | DM Mono 400 | 10px | +.25em | — | `var(--ink-mid)` UC + `var(--border)` |

### Famílias e usos

| Família | Uso |
|---|---|
| **DM Mono** 300/400 | Títulos H1/H2, labels, tags, UI, código |
| **Syne** 400/600 | Corpo, subtítulos H3, parágrafos explicativos — nunca peso 800 |
| **Cormorant Garamond** italic 300 | Manifesto, citações — uso restrito |

---

## SVG — Alfa e Wordmark

```html
<!-- Sempre via <use>, nunca <img>, cor via currentColor -->
<svg width="64" height="64" style="color:var(--accent)"><use href="#ada-sym"/></svg>
<svg height="32" style="color:var(--accent); width:auto"><use href="#ada-wm"/></svg>
```

- Mínimo símbolo: **32px** altura
- Mínimo wordmark: **240px** largura / 60mm
- Geometria intocável — se mudar, atualizar o `<symbol>` inline no HTML

### Demos de modo fixas (imunes ao modo global)

```css
.m-padrao    { background:#000000; color:#FFD600 }
.m-inversao  { background:#FFD600; color:#000000 }
.m-meianoite { background:#0A0F1E; color:#4A7FD4 }
.m-mono      { background:#FFFFFF; color:#000000 }
```

---

## Estrutura das divs

```html
<div class="sec">
  <div class="sec-box">
    <div class="sec-hdr">
      <div class="sec-hdr-left">
        <div class="sec-title">Título</div>
      </div>
      <div class="sec-num">01</div>
    </div>
    <div class="hairline"></div>
    <div class="sub-label">Sub-seção</div>
    <!-- conteúdo -->
  </div>
</div>
```

**Hairlines:** separar sub-seções distintas: SIM. Itens dentro da mesma sub-seção: NÃO.

### Divs existentes

| # | Título | Conteúdo |
|---|---|---|
| 01 | Logo e Wordmark | Alfa, Wordmark, Tamanhos |
| 02 | Paleta de Cores | Paleta c1–c6, Uso — Modos |
| 03 | Tipografia | Famílias: DM Mono · Syne · Cormorant · Hierarquia |
| 04 | Voz e Tom | ANTES. display · taglines · corpo · 4 cards personalidade · vocabulário |
| — | Prompt | Sempre última div — documentação para agente AI |

---

## Princípio: o manual é auto-referencial

O Manual de Marca da ADA não descreve o sistema — ele **é** o sistema.

Toda decisão de design definida no documento deve ser válida dentro do próprio documento:

- O Alfa e wordmark aparecem exatamente como a div 01 define — tamanho mínimo, SVG via `<use>`, nunca `<img>`
- As variações de cor aplicadas em todo o manual seguem o que a div 02 define
- A hierarquia tipográfica da div 03 é a mesma usada em títulos, labels e UI do manual
- A voz e tom da div 04 são os mesmos usados nos textos do próprio manual

**Quando o usuário modificar qualquer regra do sistema**, verificar proativamente se essa mudança precisa se refletir nas outras divs e aplicar sem precisar ser solicitado.

---

## Contexto do cliente

**ADA — Ateliê Digital Analógico**
Plataforma criativa fundada em 2015 por Caio Fazolin e Tatiane Gonzalez.

**Portfólio:** Anish Kapoor (Casa Bradesco), Racionais MCs 30 anos, Festival G20, ALL Amazônia em Times Square, COP28 Dubai, Liniker, Natiruts, Encontro dos Titãs, Netflix, Sony Pictures, Pinacoteca SP.

**Posicionamento:** Tecnologia como linguagem. Brasil como ponto de vista.

**O que a ADA não é:** empresa de AV, agência genérica, fornecedora de projeção, executora de ideias de outros.

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
