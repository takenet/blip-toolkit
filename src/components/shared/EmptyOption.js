import html from 'nanohtml'

export const renderEmptyOption = text =>
  html`<li class="blip-select__option blip-select__empty-option">${text}</li>`
