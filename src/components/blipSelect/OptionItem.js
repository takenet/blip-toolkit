import { guid } from '@lib/utils'
import { EventEmitter } from '@lib/eventEmitter'
import Nanocomponent from 'nanocomponent'
import html from 'nanohtml'

export class OptionItem extends Nanocomponent {
  $defaults = {
    onOptionClick: undefined,
    onTryAccessInput: undefined,
  }

  constructor(options) {
    super()

    this.options = {
      ...this.$defaults,
      ...options,
    }

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
        onclick="${this._onOptionClick.bind(this)}"
        onkeydown="${this._attachOptionKeyboardListeners.bind(this)}"
        class="blip-select__option"
        id="${fillOptionId(this.props.id)}"
        data-label="${this.props.label}"
        data-value="${this.props.value}">${this.props.label}</li>
    `
  }

  /**
   * Update element callback
   */
  update() {
    return true
  }

  /**
   * Attach keyboard listeners when some option is focused
   */
  _attachOptionKeyboardListeners(event) {
    const element = event.target

    switch (event.keyCode) {
      case 13: // enter
        this._onOptionClick(event)
        break
      case 40: // arrow down
        if (element.nextSibling) {
          element.nextSibling.focus()
        }
        break
      case 38: // arrow up
        if (element.previousElementSibling) {
          element.previousElementSibling.focus()
        } else if (this.options.onTryAccessInput) {
          this.options.onTryAccessInput()
        }
        break
    }
  }

  /**
   * Handle option click
   * @param {ClickEvent} event - Dom event click
   */
  _onOptionClick(event) {
    if (this.options.onOptionClick) {
      this.options.onOptionClick.call(this, EventEmitter({ event }))
    } else {
      throw new Error('onOptionClick callback should be implemented')
    }
  }
}
