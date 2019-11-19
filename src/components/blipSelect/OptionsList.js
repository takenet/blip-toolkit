import Component from 'nanocomponent'
import html from 'nanohtml'
import { SelectOption } from './SelectOption'
import { renderEmptyOption } from '../shared'

export class OptionsList extends Component {
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
      canAddOptions: false,
      OptionCreator: SelectOption,
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

    const { OptionCreator } = this.props

    const renderOption = (option) =>
      new OptionCreator({
        onOptionClick: this.options.onOptionClick,
        onTryAccessInput: this.options.onTryAccessInput,
        descriptionPosition: this.props.descriptionPosition,
      }).render(option)

    return html`
      <ul>
        ${this.props.options.length > 0 ? this.props.options.map(renderOption) : renderEmptyOption(this.options.noResultsText)}
      </ul>
    `
  }

  /**
   * Update element callback
   */
  update() {
    return true
  }
}
