import { strToEl, guid } from '@lib/utils'
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
    this.input.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 13: // enter
          if (this._canAddOption()) {
            this.addNewOption(this._currentOptionState())
          }
          break
      }
    })
  }

  /**
   * Add option button template
   */
  _renderOptionButton(option) {
    return strToEl(`
      <div tabindex="0" class="${blipSelectOptionClass} ${blipSelectAddOptionClass}">
        <small>${this.configOptions.canAddOption.text}</small>
        <div class="${bpNewOptionTextClass}">${option}</div>
      </div>
      `)
  }

  /**
   * Add new option to list
   */
  addNewOption(option = {}, shouldDispatch = true) {
    if (typeof this.configAddOptions.onAddNewOption !== 'function') {
      throw Error('Callback "onAddNewOption" is not a function')
    }

    const newOption = {
      ...this._currentOptionState(),
      ...option,
      id: `${blipSelectOptionClass}-${guid()}`,
    }

    if (newOption.label.trim() === '') {
      return
    }

    this.selectOptions = this.selectOptions.concat(newOption)
    this.clearInput()
    this._arrayToDomOptions(this.selectOptions)

    if (shouldDispatch) {
      this.configAddOptions.onAddNewOption.call(this, EventEmitter({ ...newOption, context: this }))
    }
    this._closeSelect()
  }

  /**
   * Set value to input
   * @param {Object} object - value/label pair
   */
  _setInputValue({ value, label }) {
    this.input.value = label || value
    if (typeof this.configOptions.onSelectOption !== 'function') {
      throw new Error('Callback "onSelectOption" is not a function')
    }
    if (this.configAddOptions.canAddOption) {
      this._removeAddOptionNode()
    }

    if (value || label) {
      this.configOptions.onSelectOption.call(this, EventEmitter({ value, label }))
    }
  }

  /**
   * Search for value in options list
   * @param {String} value - search value
   */
  _removeAddOptionNode() {
    const addOption = this.selectOptionsContainer.querySelector('.blip-select__add-option')
    if (addOption) {
      this.selectOptionsContainer.removeChild(addOption)
    }
    this._arrayToDomOptions(this.selectOptions)
  }

  /**
   * Search for value in options list
   * @param {String} value - search value
   */
  _valueMatchesAnyOption(value) {
    return this.selectOptions.filter(o => o.label === value).length > 0
  }

  /**
   * Check if current state allows to add new option
   */
  _canAddOption() {
    return this.configAddOptions.canAddOption &&
      this.input &&
      this.input.value &&
      this.input.value.trim() !== '' &&
      !this._valueMatchesAnyOption(this.input.value)
  }

  /**
   * Get current option state
   */
  _currentOptionState() {
    if (this.configAddOptions.newOption) {
      return this.configAddOptions.newOption.call(this, EventEmitter({ context: this }))
    }

    const label = this.input.value
    const element = strToEl(`<li tabindex="0" class="${blipSelectOptionClass}" data-label="${label}" data-value="${label}">${label}</li>`)

    return {
      value: label,
      label,
      element,
    }
  }

  /**
   * Add new listener to input
   */
  _onAddInputChange(event) {
    if (this.input.value !== '' && !this.isSelectOpen && event.detail.shouldOpenSelect === undefined) {
      this._openSelect()
    }

    if (this.input.value === '') {
      this._closeSelect()
    }

    if (this._canAddOption()) {
      const newOptionButton = this._renderOptionButton(this.input.value)
      this.selectOptionsContainer.appendChild(newOptionButton)

      const newOption = this._currentOptionState()

      newOptionButton.addEventListener('click', this.addNewOption.bind(this, newOption))
      newOptionButton.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
          case 13: // enter
            this.addNewOption(newOption)
            break
          case 38: // arrow up
            if (newOptionButton.previousSibling) {
              newOptionButton.previousSibling.focus()
            }
            break
        }
      })
    }
  }
}
