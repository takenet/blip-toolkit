import { strToEl } from '@lib/utils'
import { BlipSelectBase } from './blipSelectBase'
import { EventEmitter } from '@lib/eventEmitter'

const blipSelectAddOptionClass = 'blip-select__add-option'
const blipSelectOptionClass = 'blip-select__option'
const bpNewOptionTextClass = 'blip-new-option-text'

export class BlipSelectAdd extends BlipSelectBase {
  $state = {
    onAddNewOption: ({ $event }) => {}, // { value: optionValue, label: optionLabel, element: HTMLElement }
    canAddOption: false,
  }

  constructor(element, options) {
    super(element, options)

    this.configAddOptions = {
      ...this.$state,
      ...options,
      ...this.configOptions,
    }

    this._setupAdd()
  }

  /**
   * Setup component
   */
  _setupAdd() {
    this._handleAddInputChange = this._onAddInputChange.bind(this)
    this.input.addEventListener('keyup', this._handleAddInputChange)
  }

  /**
   * Add option button template
   */
  _renderOptionButton(option) {
    return strToEl(`
      <div class="${blipSelectOptionClass} ${blipSelectAddOptionClass}">
        <small>${this.configOptions.canAddOption.text}</small>
        <div class="${bpNewOptionTextClass}">${option}</div>
      </div>
      `)
  }

  /**
   * Add new option to list
   */
  addNewOption({ label, value, element }) {
    if (typeof this.configAddOptions.onAddNewOption !== 'function') {
      throw Error('Callback "onAddNewOption" is not a function')
    }

    const option = {
      label,
      value,
      element,
    }

    this.selectOptions = this.selectOptions.concat(option)
    this.clearInput()
    this._arrayToDomOptions(this.selectOptions)

    this.configAddOptions.onAddNewOption.call(this, EventEmitter(option))
    this._closeSelect()
  }

  /**
   * Search for value in options list
   * @param {String} value - search value
   */
  _valueMatchesAnyOption(value) {
    return this.selectOptions.filter(o => o.label === value).length > 0
  }

  /**
   * Add new listener to input
   */
  _onAddInputChange() {
    if (this.input.value !== '' && !this.isSelectOpen) {
      this._openSelect()
    }

    if (this.input.value === '') {
      this._closeSelect()
    }

    if (
      this.configAddOptions.canAddOption &&
      this.input &&
      this.input.value &&
      !this._valueMatchesAnyOption(this.input.value)
    ) {
      const newOptionButton = this._renderOptionButton(this.input.value)
      const value = newOptionButton.querySelector(`.${bpNewOptionTextClass}`).innerHTML
      const element = strToEl(`<li tabindex="0" class="${blipSelectOptionClass}" data-value="${value}">${value}</li>`)
      this.selectOptionsContainer.appendChild(newOptionButton)

      const newOption = {
        label: value,
        value,
        element,
      }

      newOptionButton.addEventListener('click', this.addNewOption.bind(this, newOption))
    }
  }
}
