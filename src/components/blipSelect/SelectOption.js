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
      id: undefined,
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

    return html`
      <li tabindex="0"
        onclick="${this.onOptionClick.bind(this)}"
        onkeydown="${this.attachOptionKeyboardListeners.bind(this)}"
        class="blip-select__option"
        id="${fillOptionId(this.props.id)}"
        >${this.props.label}</li>
    `
  }

  /**
   * Update element callback
   */
  update() {
    return true
  }
}
