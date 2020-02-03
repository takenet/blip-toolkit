import { guid } from '@lib/utils'
import html from 'nanohtml'
import raw from 'nanohtml/raw'
import { OptionItem } from '../shared'
import TrueIcon from '../../img/true.svg'

export class SelectOption extends OptionItem {
  constructor(options) {
    super(options)

    this.options = options

    this.props = {
      value: undefined,
      label: undefined,
      description: undefined,
      id: `blip-select__option-${guid()}`,
      disabled: false,
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
    const descriptionPosition = this.options.descriptionPosition || 'right'
    const descriptionPositionClass = `blip-select__option--description-${descriptionPosition}`
    const labelElement = html`<span class="blip-select__option__label">${this.props.label}</span>`
    const descriptionElement = this.props.description
      ? html`<span class="blip-select__option__description">${this.props.description}</span>`
      : ''
    const checkboxElement = html`
    <label class="bp-input--check--wrapper">
      <input class="bp-input blip-select__option__checkbox" type="checkbox" checked="${this.props.checked || 'false'}">
      <div class="bp-input--checkbox">${raw(TrueIcon)}</div>
    </label>`

    const itemContent = () => html`<div class="blip-select__option__content">${labelElement}${descriptionElement}</div>`

    const itemContentWithIcon = () => html`
      <div class="blip-select__option--with-icon">
        <div class="blip-select__option__icon">
          ${raw(this.props.icon)}
        </div>
        ${itemContent()}
      </div>
      `
    return html`
      <li tabindex="0"
        onclick="${this.onOptionClick.bind(this)}"
        onkeydown="${this.attachOptionKeyboardListeners.bind(this)}"
        class="blip-select__option ${descriptionPositionClass} ${this.props.disabled && 'blip-select__option--disabled'}"
        data-value="${this.props.value}"
        id="${fillOptionId(this.props.id)}"
        >${(this.options.checkable) ? checkboxElement : ''} 
        ${this.props.icon ? itemContentWithIcon() : itemContent()}</li>
    `
  }

  /**
   * Update element callback
   */
  update() {
    return true
  }
}
