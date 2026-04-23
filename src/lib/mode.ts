export type Mode = 'padrao' | 'inversao' | 'mono'

const MODES: Mode[] = ['padrao', 'inversao', 'mono']
const CLASS: Record<Mode, string> = {
  padrao:   '',
  inversao: 'mode-inversao',
  mono:     'mode-mono',
}

export function setMode(mode: Mode) {
  MODES.forEach(m => document.body.classList.remove(CLASS[m]))
  if (CLASS[mode]) document.body.classList.add(CLASS[mode])
  document.querySelectorAll<HTMLElement>('[data-mode-btn]').forEach(btn => {
    btn.dataset.active = btn.dataset.modeBtn === mode ? 'true' : 'false'
  })
}

// Expõe globalmente para uso inline nos componentes
;(window as unknown as Record<string, unknown>).setMode = setMode
