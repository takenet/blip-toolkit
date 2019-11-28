import Component from 'nanocomponent'
import html from 'nanohtml'
import { EventEmitter } from '@lib/eventEmitter'
import { renderEmptyOption } from '../shared'

export class CreatebleOptionsList extends Component {
  $defaults = {
    noResultsText: '',
    noResultsFoundText: '',
    appendText: true,
  }

  constructor(options) {
    super()

    this.options = {
      ...this.$defaults,
      ...options,
    }

    this.props = {
      options: [],
      newOption: '',
      addOptionText: '',
      alwaysEnabled: false,
      appendText: true,
      blockNewEntries: false,
      OptionCreator: undefined,
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

    const chooseEmptyOptionsMessage = () => {
      if (this.props.options.length === 0 && (this.props.newOption === '' || this.props.newOption === undefined)) {
        return this.options.noResultsText
      } else if (this.props.options.length === 0 && this.newOption !== '') {
        return this.options.noResultsFoundText
      }

      return ''
    }

    const renderOption = optionProps => {
      const { OptionCreator } = this.props

      return new OptionCreator({
        onOptionClick: this.options.onOptionClick,
        onTryAccessInput: this.options.onTryAccessInput,
        descriptionPosition: this.props.descriptionPosition,
      }).render(optionProps)
    }

    return html`
      <div>
        <ul>
          ${this.props.options.map(renderOption)}
          ${this.shouldRenderEmptyOption() ? renderEmptyOption(chooseEmptyOptionsMessage()) : ''}
        </ul>
        ${this._renderAddOption(this.props.newOption)}
      </div>
    `
  }

  /**
   * Update element callback
   */
  update() {
    this.props.newOption = ''
    return true
  }

  /**
   * Check if current state allows to add new option
   */
  _canAddOption(newOption) {
    return (
      this.options.alwaysEnabled ||
      (newOption &&
        newOption.trim() !== '' &&
        !this.props.blockNewEntries &&
        !this.props.options.some(o => o.label === newOption))
    )
  }

  /**
   * Check if component should render empty option
   */
  shouldRenderEmptyOption() {
    return this.props.options.length === 0
  }

  /**
   * Render add new option
   */
  _renderAddOption(newOption) {
    const addOptionHtml = this.options.addOptionText ? html`
      <span class="blip-prompt-add-option">
        ${this.options.addOptionText}
      </span>` : ''

    return this._canAddOption(newOption)
      ? html`
          <div tabindex="0"
            onkeydown="${this._handleNewOptionKeydown.bind(this)}"
            onclick="${this.addOption.bind(this, newOption)}"
            class="blip-select__option blip-select__add-option">
            ${addOptionHtml}
            <div class="blip-new-option-text">${this.options.appendText ? `: ${newOption}` : ''}</div>
          </div>
        `
      : ''
  }

  /**
   * Handle keydown events on 'new option' element
   * @param {DOMEvent} event
   */
  _handleNewOptionKeydown(event) {
    const element = event.target

    switch (event.keyCode) {
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
   * Dispatch add new option event
   * @param {String} newOption - New option label
   */
  addOption(newOption) {
    const { OptionCreator } = this.props
    const newOptionProps = {
      ...new OptionCreator().props,
      label: newOption,
    }

    if (this.options.onAddOption) {
      this.options.onAddOption.call(this, EventEmitter({ newOption: newOptionProps }))
    }
  }
}
