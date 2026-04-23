// Escala base
export const space = {
  px:  '1px',
  0:   '2px',
  1:   '4px',
  2:   '8px',
  3:   '16px',
  4:   '24px',
  5:   '32px',
  6:   '48px',
  7:   '64px',
  8:   '96px',
} as const

// Breakpoints
export const breakpoint = {
  sm:  '375px',
  md:  '768px',
  lg:  '1200px',
  xl:  '1440px',
  '2xl': '2560px',
} as const

// Largura máxima do conteúdo
export const contentWidth = 'min(1200px, 100vw - 48px)'
