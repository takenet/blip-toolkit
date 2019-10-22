import { EventEmitter } from '@lib/eventEmitter'
import Component from 'nanocomponent'

/**
 * This class abstracts any option item of option list.
 * This pattern allows to create custom option item class, with its props and view
 */
export class OptionItem extends Component {
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
  }

  /**
   * Attach keyboard listeners when some option is focused
   */
  attachOptionKeyboardListeners(event) {
    const element = event.target

    switch (event.keyCode) {
      case 13: // enter
        this.onOptionClick(event)
        break
      case 40: // arrow down
        if (element.nextSibling) {
          event.preventDefault()
          event.stopPropagation()
          element.nextSibling.focus()
        }
        break
      case 38: // arrow up
        event.preventDefault()
        event.stopPropagation()

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
  onOptionClick(event) {
    if (this.options.onOptionClick) {
      this.options.onOptionClick.call(this, EventEmitter({ event, optionProps: this.props }))
    } else {
      throw new Error('onOptionClick callback should be implemented')
    }
  }
}
