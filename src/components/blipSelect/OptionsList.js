import Nanocomponent from 'nanocomponent'
import html from 'nanohtml'
import { OptionItem } from './OptionItem'

export class OptionsList extends Nanocomponent {
  $defaults = {
    onOptionClick: undefined,
    onTryAccessInput: undefined,
    noResultsText: 'No results found',
  }

  constructor(options) {
    super()
    this.options = {
      ...this.$defaults,
      ...options,
    }

    this.props = {
      options: [],
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

    const renderOption = (option) =>
      new OptionItem({
        onOptionClick: this.options.onOptionClick,
        onTryAccessInput: this.options.onTryAccessInput,
      }).render(option)

    const renderEmptyOption = () =>
      html`<li class="blip-select__option blip-select__empty-option">${this.options.noResultsText}</li>`

    return html`
      <ul>
        ${this.props.options.length > 0 ? this.props.options.map(renderOption) : renderEmptyOption()}
      </ul>
    `
  }

  /**
   * Update element callbacl
   */
  update() {
    return true
  }
}
