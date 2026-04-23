export const duration = {
  instant: '80ms',
  fast:    '160ms',
  base:    '280ms',
  slow:    '500ms',
  crawl:   '800ms',
} as const

export const easing = {
  ui:     'cubic-bezier(.2,0,.2,1)',
  reveal: 'cubic-bezier(.0,0,.2,1)',
  exit:   'cubic-bezier(.2,0,1,1)',
} as const

// Transição padrão para mudança de modo
export const modeTransition = `color ${duration.base} ${easing.ui}, background-color ${duration.base} ${easing.ui}, border-color ${duration.base} ${easing.ui}, opacity ${duration.base} ${easing.ui}`
