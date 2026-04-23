// Primitivas — escala de referência, não usar diretamente em CSS de UI
export const primitive = {
  yellow: {
    300: '#FFE84D', // fundo inversão
    400: '#FFD600', // primário
    600: '#E6C000', // hover / border
  },
  black: {
    0:   '#000000',
    100: '#111111', // page-bg padrão
    200: '#1A1A1A', // sec-bg
    300: '#222222', // card-bg
    400: '#333333',
  },
  blue: {
    500: '#1400FF', // accent-cold canônico
  },
  white: '#FFFFFF',
  gray: {
    50:  '#F2F2F2',
    100: '#E6E6E6',
    400: '#888888',
    600: '#444444',
    700: '#333333',
  },
} as const

// Tokens semânticos por modo — fonte da verdade para CSS custom properties
export type Mode = 'padrao' | 'inversao' | 'mono'

export const semantic: Record<Mode, Record<string, string>> = {
  padrao: {
    '--page-bg':    primitive.black[100],
    '--sec-bg':     primitive.black[200],
    '--card-bg':    primitive.black[300],
    '--accent':     primitive.yellow[400],
    '--accent-cold': primitive.blue[500],
    '--on-surface': primitive.yellow[400],
    '--ink':        '#FFFFFF',
    '--ink-mid':    'rgba(255,255,255,.55)',
    '--ink-faint':  'rgba(255,255,255,.35)',
    '--border':     'rgba(255,214,0,.12)',
    '--border-dim': 'rgba(255,255,255,.08)',
    '--color-focus':    primitive.blue[500],
    '--color-hover':    'rgba(255,214,0,.15)',
    '--color-disabled': 'rgba(255,255,255,.20)',
  },
  inversao: {
    '--page-bg':    primitive.yellow[300],
    '--sec-bg':     'rgba(255,255,255,.22)',
    '--card-bg':    'rgba(255,255,255,.35)',
    '--accent':     primitive.black[0],
    '--accent-cold': primitive.blue[500],
    '--on-surface': primitive.black[0],
    '--ink':        primitive.black[0],
    '--ink-mid':    'rgba(0,0,0,.55)',
    '--ink-faint':  'rgba(0,0,0,.35)',
    '--border':     'rgba(0,0,0,.12)',
    '--border-dim': 'rgba(0,0,0,.08)',
    '--color-focus':    primitive.blue[500],
    '--color-hover':    'rgba(0,0,0,.08)',
    '--color-disabled': 'rgba(0,0,0,.20)',
  },
  mono: {
    '--page-bg':    primitive.white,
    '--sec-bg':     primitive.gray[50],
    '--card-bg':    primitive.gray[100],
    '--accent':     primitive.black[0],
    '--accent-cold': primitive.black[0],
    '--on-surface': primitive.black[0],
    '--ink':        primitive.black[0],
    '--ink-mid':    'rgba(0,0,0,.55)',
    '--ink-faint':  'rgba(0,0,0,.35)',
    '--border':     'rgba(0,0,0,.12)',
    '--border-dim': 'rgba(0,0,0,.08)',
    '--color-focus':    primitive.black[0],
    '--color-hover':    'rgba(0,0,0,.06)',
    '--color-disabled': 'rgba(0,0,0,.20)',
  },
}

// Modos fixos para demos imunes ao modo global
export const fixed = {
  padrao:   { bg: primitive.black[0],    fg: primitive.yellow[400] },
  inversao: { bg: primitive.yellow[400], fg: primitive.black[0] },
  mono:     { bg: primitive.white,       fg: primitive.black[0] },
} as const
