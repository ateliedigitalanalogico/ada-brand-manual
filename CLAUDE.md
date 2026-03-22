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

Site estático em HTML/CSS/JS puro. Sem frameworks. Sem bundlers. Dependências externas apenas: Google Fonts.

### Repositório

GitHub: `ateliedigitalanalogico/ada-brand-manual` (master)

### Estrutura de pastas

```
ada-manual/
├── index.html                   ← site completo (~3900 linhas)
├── css/
│   └── system.css               ← variáveis, layout, componentes
├── js/
│   ├── ada.js                   ← menu dropdown, scroll spy, download mocks, taglines
│   └── merch.js                 ← scripts da seção 10 (merchandise)
└── assets/
    ├── logo/WORDMARK.svg        ← wordmark original — não modificar
    └── 44 imagens .jpg          ← 5 territórios × subgrupos × 4 variações
```

### Dependências externas

- Google Fonts (DM Mono, Syne, Cormorant Garamond)
- html2canvas 1.4.1 (CDN) — para download de mockups como PNG

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

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="225 225 126 126">
  <polygon fill="#FFD600" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/>
  <polygon fill="#FFD600" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/>
  <polygon fill="#FFD600" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/>
</svg>
```

Nunca redesenhar, nunca como `<img>`, mínimo 32px, sempre SVG inline.

---

## Tipografia

| Família | Uso |
|---|---|
| **DM Mono** 300/400 | Títulos, taglines, labels, UI, código |
| **Syne** 400/600/800 | Corpo, subtítulos, display |
| **Cormorant Garamond** italic 300 | Manifesto, citações — uso restrito |

---

## Os dois modos de cor

| Modo | Fundo | Símbolo |
|---|---|---|
| Amarelo (padrão) | `#000000` | `#FFD600` |
| Meia-noite | `#0A0F1E` | `#4A7FD4` |

Nunca coexistem na mesma peça.

---

## Banco de taglines

```javascript
const TAGLINES = [
  'Antes da IA.', 'Antes do prompt.', 'Antes do imersivo.',
  'Antes do mapping.', 'Antes do hype.', 'Antes do algoritmo.',
  'Antes da experiência.', 'Antes do futuro.',
];
```

Generativas — trocam em ciclo. Sincronizadas entre todas as instâncias.

---

## Seções — 10 seções independentes

Cada seção é um `<section data-sec="XX">` com hdr → content → ftr.

| Seção | Nome | Status |
|---|---|---|
| 01 | Logo e Wordmark | ✅ |
| 02 | Tipografia | ✅ |
| 03 | Paleta de Cores | ✅ |
| 04 | Grid e Espaçamento | ✅ |
| 05 | Linguagem Imagética | ✅ |
| 06 | Usos Impressos | ✅ |
| 07 | Motion e Vídeo | ✅ |
| 08 | Redes Sociais | ✅ |
| 09 | Voz e Tom | ✅ |
| 10 | Merchandise | ✅ |
| 11 | Aplicações Especiais | ⏳ Adiada |

**Seção 11 — nota:** aguarda imagens reais dos projetos autorais.

---

## Restrições permanentes

1. **Racionais MCs** — nunca como exemplo conceitual/poético ("Racionais como cenografia"). Apenas como item factual de portfólio.

2. **Nomes dos fundadores em bios curtas** — não aparecem em bios de 150 caracteres (Instagram). Aparecem em: site/about, proposta, press release, créditos.

3. **Wordmark em peças pequenas** — nunca abaixo de 240px / 60mm. Usar o símbolo A isolado.

---

## Contexto do cliente

**ADA — Ateliê Digital Analógico**
Plataforma criativa fundada em 2015 por Caio Fazolin e Tatiane Gonzalez.

**Portfólio:** Anish Kapoor (Casa Bradesco), show de 30 anos dos Racionais MCs, Festival G20, ALL Amazônia em Times Square, COP28 Dubai, Liniker, Natiruts, Encontro dos Titãs, Netflix, Sony Pictures, Pinacoteca SP.

**Posicionamento:** Tecnologia como linguagem. Brasil como ponto de vista.

**Manifesto:** A ADA esteve aqui antes. Opera na borda — na fronteira entre o que existe e o que ainda não tem nome.

**O que a ADA não é:** empresa de AV, agência genérica, fornecedora de projeção, executora de ideias de outros.

---

## Navegação

- Menu dropdown sticky com scroll spy (atualiza nome da seção atual)
- 10 itens individuais no dropdown (01–10)
- JS em `ada.js`: toggle dropdown, scroll spy com `data-sec`, taglines animadas

## Features implementadas

- **Download de mockups**: avatares e capas de redes sociais via `html2canvas` → PNG na resolução correta
- **Moodboard**: mosaic grid (mondrian) 6×6, só imagens, sem botões
- **Territórios**: grid 3×2 com placeholder "Em breve" no 6º slot
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
2. Otimizar: minificar, meta tags, favicon, OG image
3. Seção 11 quando houver imagens reais dos projetos autorais
4. Revisar responsividade mobile

---

*ADA Manual de Marca · v1.0 · Março 2026*
*Repo: ateliedigitalanalogico/ada-brand-manual*
