import { guid } from '@lib/utils'
import { OptionsList } from './OptionsList'
import { EventEmitter } from '@lib/eventEmitter'

import Nanocomponent from 'nanocomponent'
import html from 'nanohtml'
import { CreatebleOptionsList } from './CreatableOptionsList'
import { OptionItem } from './OptionItem'

const ANIMATION_TIMEOUT = 300

const blipSelectOptionsClass = 'blip-select__options'
const blipSelectOptionOpenTopClass = 'blip-select__options--open-top'
export const blipSelectOptionClass = 'blip-select__option'
const blipSelectOptionSeletedClass = 'blip-select__option--selected'
const bpInputWithBulletClass = 'bp-input--with-bullet'
const bpCrooftopClass = 'bp-c-rooftop'
const bpCblipLightClass = 'bp-c-blip-light'
const bpInputWrapperFocusClass = 'bp-input-wrapper--focus'
const bpInputWrapperDisabledClass = 'bp-input-wrapper--disabled'

export class BlipSelectBase extends Nanocomponent {
  /**
   * Component state
   */
  $defaults = {
    isSelectOpen: false,
    noResultsFound: false,
    disabled: false,
    label: '',
    placeholder: '',
    mode: 'select',
    noResultsText: 'No results found',
    beforeOpenSelect: () => {},
    afterOpenSelect: () => {},
    beforeCloseSelect: () => {},
    afterCloseSelect: () => {},
    onInputChange: ({ $event }) => {}, // { value: inputValue, event: DOMEvent }
    onSelectOption: ({ $event }) => {}, // { value: optionValue, label: optionLabel }
    onFocus: () => {},
    onBlur: () => {},
    onAddOption: () => {},
    customSearch: undefined, // Function that should return a list of { value, label } pair
    canAddOption: false,
  }

  constructor(options) {
    super()

    this.configOptions = {
      ...this.$defaults,
      ...options,
    }

    this.customSelectId = `${blipSelectOptionsClass}-${guid()}`
    this._handleSelectFocus = this._onSelectFocus.bind(this)
    this._handleSelectBlur = this._onSelectBlur.bind(this)
    this._handleCenterOption = this._centerSelectedOption.bind(this)
    this._handleInputChange = this._onInputChange.bind(this)
    this._handleInputKeydown = this._attachInputKeyboardListener.bind(this)

    // Nested components
    this.optionsList = this._chooseOptionListInstance()

    // Component props
    this.props = {
      placeholder: '',
      inputValue: '',
      options: [],
    }
  }

  /**
   * Select input
   */
  get input() {
    return this.element.querySelector('input')
  }

  /**
   * Select label
   */
  get selectLabel() {
    return this.element.querySelector('label')
  }

  /**
   * Is select open
   */
  get isSelectOpen() {
    return this.$defaults.isSelectOpen
  }

  set isSelectOpen(value) {
    this.$defaults.isSelectOpen = value
  }

  /**
   * Is disabled
   */
  get isDisabled() {
    return this.configOptions.disabled
  }

  set isDisabled(value) {
    this.configOptions.disabled = value
    this.input.disabled = value

    switch (value) {
      case true:
        this.element.classList.add(bpInputWrapperDisabledClass)
        break
      case false:
        this.element.classList.remove(bpInputWrapperDisabledClass)
        break
    }
  }

  /**
   * Setup custom select view
   */
  createElement(props) {
    this.props = {
      ...this.props,
      ...props,
    }

    const isReadOnly = () => this.configOptions.mode === 'select'
    const hasBulletClass = () => this.configOptions.mode === 'select' ? bpInputWithBulletClass : ''

    return html`
      <div class="bp-input-wrapper blip-select ${hasBulletClass()}">
        <label class="bp-label bp-c-rooftop">${this.props.label}</label>
        <input placeholder="${this.props.placeholder}"
          class="blip-select__input bp-c-cloud"
          value="${this.props.inputValue}"
          onfocus="${this._handleSelectFocus}"
          onblur="${this._handleSelectBlur}"
          onkeydown="${this._handleInputKeydown}"
          onkeyup="${this._handleInputChange}"
          data-target="${this.customSelectId}"
          readonly="${isReadOnly()}">
        <div class="blip-select__options" id="${this.customSelectId}">
          ${this.optionsList.render(this._optionsListConfig())}
        </div>
      </div>
    `
  }

  /**
   * Component update
   */
  update(props) {
    if (props.options) {
      this.optionsList.render({
        ...props,
      })

      return false
    }

    return true
  }

  /**
   * Returns a object based on config options
   */
  _optionsListConfig() {
    return this.configOptions.canAddOption
      ? {
        options: this.props.options,
        canAddOption: this.configOptions.canAddOption,
        newOption: this.props.newOption,
        OptionCreator: OptionItem,
      }
      : {
        options: this.props.options,
        OptionCreator: OptionItem,
      }
  }

  /**
   * Return instance based on config options
   */
  _chooseOptionListInstance() {
    return this.configOptions.canAddOption
      ? this._createCreatableOptionListInstance()
      : this._createOptionsListInstance()
  }

  /**
   * Creates a CreatableOptionList instance with bindings
   */
  _createCreatableOptionListInstance() {
    return new CreatebleOptionsList({
      onOptionClick: this._onOptionClick.bind(this),
      onTryAccessInput: () => this.input.focus(),
      onAddOption: (emitter) => {
        const { $event: { newOption } } = emitter
        this.clearInput()
        this.input.focus()

        const newOptions = this.props.options.concat(newOption)
        this.props.options = newOptions

        this.render({
          options: newOptions,
        })

        this.configOptions.onAddOption.call(this, emitter)
      },
      addOptionText: this.configOptions.canAddOption.text,
    })
  }

  /**
   * Creates a OptionList instance with bindings
   */
  _createOptionsListInstance() {
    return new OptionsList({
      onOptionClick: this._onOptionClick.bind(this),
      onTryAccessInput: () => this.input.focus(),
      noResultsFound: this.configOptions.noResultsFound,
    })
  }

  /**
   * Attach keyboard listeners when input is focused
   */
  _attachInputKeyboardListener(event) {
    switch (event.keyCode) {
      case 40: // arrow down
        const currentElement = document.activeElement

        if (currentElement === event.target) {
          const firstElement = this.optionsList.element.firstElementChild
          if (firstElement) {
            firstElement.focus()
          }
        }
        break
      case 13: // enter
        if (this.configOptions.canAddOption) {
          this.optionsList.addOption(this.input.value)
        }
        break
    }
  }

  /**
   * Get search results
   */
  _getSearchResults(query) {
    return this.configOptions.customSearch
      ? this.configOptions.customSearch.call(this, EventEmitter({
        query,
        items: this.props.options,
      }))
      : this.props.options.filter(
        ({ value, label }) => label.toLowerCase().includes(query.toLowerCase())
      )
  }

  /**
   * On input change event
   */
  _onInputChange(event) {
    if (typeof this.configOptions.onInputChange !== 'function') {
      throw new Error('Callback "onInputChange" is not a function')
    }
    const inputValue = this.input.value
    const searchResults = this._getSearchResults(inputValue)

    this.configOptions.onInputChange(EventEmitter({ value: inputValue, event }))

    this.noResultsFound = searchResults.length < 0
    this.render({
      options: searchResults,
      newOption: inputValue,
    })
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

    if (value || label) {
      this.configOptions.onSelectOption.call(this, EventEmitter({ value, label }))
    }
  }

  /**
   * Clear input value
   */
  clearInput() {
    this._setInputValue({ value: '', label: '' })

    const event = new CustomEvent('keyup', { detail: { shouldOpenSelect: false } })
    this.input.dispatchEvent(event)
  }

  /**
   * Programatically sets value to input
   * @param {Object} param0 - Value/label pair
   */
  setValue({ value, label } = { value: '', label: '' }) {
    if (value) {
      const match = this.props.options.find(o => o.value === value)

      if (match) {
        match.element.classList.add(blipSelectOptionSeletedClass)

        this._setInputValue({
          value: match.value,
          label: match.label,
        })
      } else {
        this._setInputValue({ value, label })
      }

      const event = new CustomEvent('keyup', { detail: { shouldOpenSelect: false } })
      this.input.dispatchEvent(event)
    }
  }

  /**
   * Returns current input value
   */
  getValue() {
    if (!this.input.value) {
      return {
        value: undefined,
        label: undefined,
      }
    }

    const match = this.props.options.find(o => o.label === this.input.value)
    if (match) {
      return {
        value: match.value,
        label: match.label,
      }
    }

    return {
      value: this.input.value,
      label: this.input.value,
    }
  }

  /**
   * On select option item
   * @param {DOMEvent} event
   */
  _onOptionClick({ $event }) {
    const { event } = $event

    if (this.isSelectOpen) {
      const target = event.currentTarget
      const selectedOption = {
        label: target.getAttribute('data-label'),
        value: target.getAttribute('data-value'),
      }
      this._setInputValue(selectedOption)
      this._resetSelectedOptions()
      event.target.classList.add(blipSelectOptionSeletedClass)

      this._closeSelect()
    }

    event.stopPropagation()
  }

  /**
   * Remove all selected class from options
   */
  _resetSelectedOptions() {
    const elementOptions = [...this.element.querySelector(`#${this.customSelectId}`).querySelectorAll('li')]
    elementOptions.forEach(
      o =>
        o.classList.contains(blipSelectOptionSeletedClass)
          ? o.classList.remove(blipSelectOptionSeletedClass)
          : ''
    )
  }

  /**
   * On select click
   */
  _onSelectFocus() {
    if (this.isDisabled || (this.input.value === '' && this.configOptions.canAddOption && this.props.options.length === 0)) {
      return
    }

    if (typeof this.configOptions.beforeOpenSelect !== 'function') {
      throw Error('Callback "beforeOpenSelect" is not a function')
    }

    if (typeof this.configOptions.afterOpenSelect !== 'function') {
      throw Error('Callback "afterOpenSelect" is not a function')
    }

    // Callback invoked before select open
    this.configOptions.beforeOpenSelect()

    this.configOptions.onFocus()

    this._openSelect()

    // Callback invoked after select open
    this.configOptions.afterOpenSelect()
  }

  /**
   * Function to verify if blur event element is part of component
   */
  _isPartOfComponent(event) {
    if (event.relatedTarget) {
      const classList = event.relatedTarget.classList

      if (
        classList.contains(blipSelectOptionClass) ||
        classList.contains('blip-select')
      ) {
        return true
      }
    }

    return false
  }

  /**
   * On select blur
   */
  _onSelectBlur(e) {
    // Prevents close container before user can select any option
    if (this._isPartOfComponent(e)) {
      return
    }
    this.configOptions.onBlur(e)

    setTimeout(() => { // Needed for get option value on "li" click
      this._closeSelect()
    }, ANIMATION_TIMEOUT - 200)
  }

  /**
   * Open select setting up styles
   */
  _openSelect() {
    const selectOptionsContainer = this.element.querySelector(`.blip-select__options`)
    selectOptionsContainer.style.display = 'block'

    setTimeout(() => { // Needed for animation
      selectOptionsContainer.style.transform = 'scale(1)'
      selectOptionsContainer.style.opacity = 1
    })

    this.input.parentNode.classList.add(bpInputWrapperFocusClass)
    this.selectLabel.classList.remove(bpCrooftopClass)
    this.selectLabel.classList.add(bpCblipLightClass)
    this.isSelectOpen = true
  }

  /**
   * If has a selected option, center scroll to element
   */
  _centerSelectedOption(ev) {
    const selectedOption = this.optionsList.element.querySelector(`li.${blipSelectOptionSeletedClass}`)

    if (this.optionsList.element.scrollHeight > this.optionsList.element.clientHeight && ev.propertyName === 'transform') {
      if (!selectedOption) {
        return
      }

      let scrollOffset =
            selectedOption.getBoundingClientRect().top -
            this.optionsList.element.getBoundingClientRect().top // scroll to selected option
      scrollOffset -= this.optionsList.element.clientHeight / 2 // center in dropdown

      this.optionsList.element.scrollTop = scrollOffset
    }
  }

  /**
   * Close select setting up styles
   */
  _closeSelect() {
    const selectOptionsContainer = this.element.querySelector(`.blip-select__options`)

    if (typeof this.configOptions.beforeCloseSelect !== 'function') {
      throw Error('Callback "beforeCloseSelect" is not a function')
    }

    if (typeof this.configOptions.afterCloseSelect !== 'function') {
      throw Error('Callback "afterCloseSelect" is not a function')
    }

    // Callback invoked before select open
    this.configOptions.beforeCloseSelect()

    selectOptionsContainer.style.transform = 'scale(0)'
    selectOptionsContainer.style.opacity = 0

    setTimeout(() => { // Needed for animation
      selectOptionsContainer.style.display = 'none'
      selectOptionsContainer.classList.remove(blipSelectOptionOpenTopClass)
    }, ANIMATION_TIMEOUT) // Milliseconds should be greater than value setted on transition css property

    this.input.parentNode.classList.remove(bpInputWrapperFocusClass)
    this.selectLabel.classList.remove(bpCblipLightClass)
    this.selectLabel.classList.add(bpCrooftopClass)
    this.isSelectOpen = false

    // Callback invoked after select open
    this.configOptions.afterCloseSelect()
  }

  /**
   * Remove elements from DOM
   */
  _removeElements() {
    this.element.parentNode.removeChild(this.element)
  }

  /**
   * Remove element listeners
   */
  _removeEventHandlers() {
    this.input.removeEventListener('focus', this._handleSelectFocus)
    this.input.removeEventListener('blur', this._handleSelectBlur)
    this.input.removeEventListener('keyup', this._handleInputChange)
  }

  /**
   * Destroy BlipSelect instance and remove dom elements
   */
  destroy() {
    this._removeEventHandlers()
    this._removeElements()
  }
}
