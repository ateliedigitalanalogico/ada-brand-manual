# Design System — ADA

## Tokens CSS

```css
/* Padrão (default) */
--page-bg:#111111; --accent:#FFD600; --on-surface:#FFD600;
--ink:#FFFFFF; --ink-mid:rgba(255,255,255,.55); --ink-faint:rgba(255,255,255,.35);
--sec-bg:#1A1A1A; --card-bg:#222222; --border:rgba(255,214,0,.12);

/* Inversão */
--page-bg:#FFD600; --accent:#000000; --on-surface:#000000;
--ink:#000000; --ink-mid:rgba(0,0,0,.55); --ink-faint:rgba(0,0,0,.35);
--sec-bg:rgba(255,255,255,.22); --card-bg:rgba(255,255,255,.35);

/* Mono */
--page-bg:#FFFFFF; --accent:#000000; --on-surface:#000000;
--ink:#000000; --ink-mid:rgba(0,0,0,.55); --ink-faint:rgba(0,0,0,.35);
--sec-bg:#F2F2F2; --card-bg:#E6E6E6;
```

**Hierarquia obrigatória:** `body→--page-bg` / `.sec-box→--sec-bg` / containers aninhados→`--card-bg`. Nunca hex direto.

## Tipografia — 7 níveis

| Nível | Família | Tamanho | Cor |
|---|---|---|---|
| H1 | DM Mono 300 | 36–72px | `var(--ink)` |
| H2 | DM Mono 300 | 24–36px | `var(--accent)` |
| H3 | Syne 600 UC | 14–16px | `var(--ink)` |
| Body | Syne 400 | 14–16px | `var(--ink-mid)` |
| Quote | Cormorant 300i | 18–22px | `var(--accent)` |
| Caption | DM Mono 400 UC | 10–12px | `var(--ink-faint)` |
| Tag | DM Mono 400 UC | 10px | `var(--ink-mid)` + `var(--border)` |

Famílias: DM Mono 300/400 · Syne 400/600 · Cormorant Garamond italic 300 (uso restrito). Nunca Syne 800.

## SVG — Logo

### Variantes de marca

| Nome | Descrição | Quando usar |
|---|---|---|
| **Alpha** | Símbolo isolado, sem wordmark | Avatar, favicon, aplicações pequenas, contexts onde a marca já está estabelecida |
| **Wordmark** | Logotipo tipográfico "ADA" sem símbolo | Títulos, rodapés, contextos textuais |
| **Bloco** | Símbolo + wordmark juntos | Apresentação completa da marca |

```html
<!-- Alpha — símbolo isolado -->
<svg width="64" height="64" style="color:var(--accent)"><use href="#ada-sym"/></svg>

<!-- Wordmark -->
<svg height="32" style="color:var(--accent);width:auto"><use href="#ada-wm"/></svg>
```

Sempre via `<use>`, nunca `<img>`. Mínimo Alpha: 32px. Mínimo wordmark: 240px / 60mm.

## Componentes CSS

| Classe | Variantes | Uso |
|---|---|---|
| `.ada-btn` | `--primary` `--ghost` `--text` | Botões |
| `.ada-tag` | — | Labels |
| `.ada-field` + `__label` + `__input` | — | Formulários |
| `.ada-card` | — | Cards de projeto |
| `.ada-nav` | — | Navegação |

UI do manual usa `.ada-btn.ada-btn--ghost`.

## Estrutura Astro

```astro
<Section id="s0N">
  <SectionHeader num="0N" title="Título" tag="Categoria" />
  <Hairline />
  <!-- conteúdo -->
</Section>
```

Todo CSS em `src/styles/tokens.css`. CSS scoped instável no Windows/Vite.
