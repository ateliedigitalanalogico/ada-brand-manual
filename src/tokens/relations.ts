// Tokens de relacionamento — como elementos se relacionam entre si.
// Mudar um token aqui propaga para todo lugar onde o relacionamento existe.
import { space } from './spacing'

export const logo = {
  sizeMin:   '32px',
  sizeSm:    '48px',
  sizeMd:    '64px',   // uso padrão no sistema
  sizeLg:    '128px',
  breathing: space[3], // área de respiro mínima ao redor do símbolo
  gapH:      space[3], // distância horizontal alfa → texto
  gapV:      space[2], // distância vertical alfa → texto (lockup vertical)
} as const

export const hairline = {
  height:     '1px',
  color:      'var(--border-dim)',
  gapBefore:  space[3], // espaço acima do hairline
  gapAfter:   space[3], // espaço abaixo do hairline
} as const

export const section = {
  gap:          space[6], // espaço entre seções
  padding:      space[4], // padding interno da sec-box
  headerGap:    space[4], // espaço entre header da seção e conteúdo
  sublabelGap:  space[3], // espaço entre sub-label e conteúdo
} as const

export const card = {
  padding:      space[4],
  gap:          space[3],
  borderRadius: '2px', // clínico — quase sem arredondamento
} as const

export const tag = {
  paddingH:     space[2],
  paddingV:     space[1],
  gap:          space[1],
  borderRadius: '1px',
} as const
