import { guid } from '@lib/utils'
import html from 'nanohtml'
import { OptionItem } from '../shared'

export class SelectOption extends OptionItem {
  constructor(options) {
    super(options)

    this.options = options

    this.props = {
      value: undefined,
      label: undefined,
      description: undefined,
      id: `blip-select__option-${guid()}`,
    }
  }

  /**
   * Render element view
   */
  createElement(props) {
    this.props = {
      ...this.props,
      ...props,
    }

    const fillOptionId = id => id || `blip-select__option-${guid()}`
    const labelElement = html`<span class="blip-select__option__label">${this.props.label}</span>`
    const descriptionElement = this.props.description ? html`<span class="blip-select__option__description">${this.props.description}</span>` : ''

    return html`
      <li tabindex="0"
        onclick="${this.onOptionClick.bind(this)}"
        onkeydown="${this.attachOptionKeyboardListeners.bind(this)}"
        class="blip-select__option"
        data-value="${this.props.value}"
        id="${fillOptionId(this.props.id)}"
        >${labelElement}${descriptionElement}</li>
    `
  }

  /**
   * Update element callback
   */
  update() {
    return true
  }
}
