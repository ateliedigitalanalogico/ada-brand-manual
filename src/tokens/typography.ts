export const family = {
  mono:  '"DM Mono", monospace',
  sans:  '"Syne", sans-serif',
  serif: '"Cormorant Garamond", serif',
} as const

// Escala de tamanho
export const size = {
  micro: '9px',
  xs:    '10px',
  sm:    '12px',
  base:  '14px',
  md:    '16px',
  lg:    '18px',
  xl:    '22px',
  '2xl': '28px',
  '3xl': '36px',
  '4xl': '48px',
  '5xl': '64px',
  num:   '120px',
} as const

// Line-height
export const leading = {
  none:   '1.0',
  tight:  '1.2',
  snug:   '1.4',
  body:   '1.65',
} as const

// Letter-spacing
export const tracking = {
  tight:   '-.02em',
  normal:  '0',
  wide:    '.08em',
  wider:   '.14em',
  widest:  '.20em',
  ultra:   '.28em',
} as const

// Pesos por família
export const weight = {
  mono: { light: 300, regular: 400, medium: 500 },
  sans: { regular: 400, semibold: 600 },
  serif: { light: 300, regular: 400 },
} as const

// Hierarquia canônica (7 níveis)
export const hierarchy = {
  h1:      { family: 'mono',  size: '2xl', weight: 400, tracking: 'normal', leading: 'none' },
  h2:      { family: 'mono',  size: '2xl', weight: 300, tracking: 'tight',  leading: 'tight' },
  h3:      { family: 'sans',  size: 'md',  weight: 600, tracking: 'widest', leading: 'none' },
  body:    { family: 'sans',  size: 'base', weight: 400, tracking: 'normal', leading: 'body' },
  quote:   { family: 'serif', size: 'xl',  weight: 300, tracking: 'wide',   leading: 'snug' },
  caption: { family: 'mono',  size: 'xs',  weight: 400, tracking: 'widest', leading: 'none' },
  tag:     { family: 'mono',  size: 'micro', weight: 400, tracking: 'ultra', leading: 'none' },
} as const
