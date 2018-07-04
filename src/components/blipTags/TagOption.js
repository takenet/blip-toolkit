import { guid } from '@lib/utils'
import html from 'nanohtml'
import { OptionItem } from '../shared'
import { defaultTagBackground } from '../blipTag'

export class TagOption extends OptionItem {
  constructor(options) {
    super(options)

    this.options = options

    this.props = {
      background: defaultTagBackground,
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
        id="${fillOptionId(this.props.id)}">
        <span class="blip-tag__label-option" style="background: ${this.props.background}">${this.props.label}</span>
      </li>
    `
  }

  /**
   * Update element callback
   */
  update() {
    return true
  }
}
