import { strToEl, guid } from '@lib/utils'
import { EventEmitter } from '@lib/eventEmitter'

const ANIMATION_TIMEOUT = 300

const bpInputWrapperClass = 'bp-input-wrapper'
const blipSelectClass = 'blip-select'
const bpInputWrapperLabelClass = 'bp-label'
const blipSelectInputClass = 'blip-select__input'
const blipSelectOptionsClass = 'blip-select__options'
const blipSelectOptionOpenTopClass = 'blip-select__options--open-top'
const blipSelectOptionClass = 'blip-select__option'
const blipSelectOptionSeletedClass = 'blip-select__option--selected'
const bpInputWithBulletClass = 'bp-input--with-bullet'
const bpCrooftopClass = 'bp-c-rooftop'
const bpCcloudClass = 'bp-c-cloud'
const bpCblipLightClass = 'bp-c-blip-light'
const bpInputWrapperFocusClass = 'bp-input-wrapper--focus'
const bpInputWrapperDisabledClass = 'bp-input-wrapper--disabled'

export class BlipSelect {
  /**
   * Component state
   */
  $state = {
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
    onFocus: () => {}, // Focus callback
    onBlur: () => {}, // Blur callback
    onInputChange: ({ $event }) => {}, // { value: inputValue, event: DOMEvent }
    onSelectOption: ({ $event }) => {}, // { value: optionValue, label: optionLabel }
    customSearch: undefined, // Function that should return a list of { value, label } pair
  }

  constructor(element, options) {
    this.wrapper = ''
    this.elementLabel = ''
    this.selectOptions = []
    this.searchResults = []
    this.selectOptionsContainer = ''
    this.selectOptionsContainerOpenPosition = ''
    this.selectLabel = ''
    this._handleSelectFocus = ''
    this._handleSelectBlur = ''
    this._handleOptionClick = ''
    this.parentNode = ''

    this.configOptions = {
      ...this.$state,
      ...options,
    }

    this.el = element
    this._setup()
    this._setupEventHandlers()
  }

  /**
   * Is select open
   */
  get isSelectOpen() {
    return this.$state.isSelectOpen
  }

  set isSelectOpen(value) {
    this.$state.isSelectOpen = value
  }

  /**
   * No results found
   */
  get noResultsFound() {
    return this.$state.noResultsFound
  }

  set noResultsFound(value) {
    this.$state.noResultsFound = value

    switch (value) {
      case true:
        this.selectOptionsContainer.innerHTML = `<li style="cursor: default" class="${blipSelectOptionClass}">${this.configOptions.noResultsText}</li>`
        break
    }
  }

  /**
   * Is disabled
   */
  get isDisabled() {
    return this.$state.disabled
  }

  set isDisabled(value) {
    this.$state.disabled = value
    this.input.disabled = value

    switch (value) {
      case true:
        this.wrapper.classList.add(bpInputWrapperDisabledClass)
        break
      case false:
        this.wrapper.classList.remove(bpInputWrapperDisabledClass)
        break
    }
  }

  /**
   * Setup custom select
   */
  _setup() {
    if ((this.el instanceof Element) === false) {
      throw new Error('Invalid dom element')
    }

    const elementOptions = this.el.querySelectorAll('option')
    if (elementOptions.length === 0) {
      throw new Error('Element has no options')
    }

    // Setup element structure
    this.parentNode = this.el.parentNode
    this.customSelectId = `${blipSelectOptionsClass}-${guid()}`

    // Component mode
    switch (this.configOptions.mode) {
      case 'select':
        this.wrapper = strToEl(`
          <div tabindex="0" class="${bpInputWrapperClass} ${blipSelectClass} ${bpInputWithBulletClass}">
            <label class="${bpInputWrapperLabelClass} ${bpCrooftopClass}">${this.configOptions.label}</label>
            <input placeholder="${this.configOptions.placeholder}" class="${blipSelectInputClass} ${bpCcloudClass}" data-target="${this.customSelectId}" readonly>
            <ul class="${blipSelectOptionsClass}" id="${this.customSelectId}"></ul>
          </div>
        `)
        break
      case 'autocomplete':
        this.wrapper = strToEl(`
          <div tabindex="0" class="${bpInputWrapperClass} ${blipSelectClass}">
            <label class="${bpInputWrapperLabelClass} ${bpCrooftopClass}">${this.configOptions.label}</label>
            <input placeholder="${this.configOptions.placeholder}" class="${blipSelectInputClass} ${bpCcloudClass}" data-target="${this.customSelectId}">
            <ul class="${blipSelectOptionsClass}" id="${this.customSelectId}"></ul>
          </div>
        `)
        break
      default:
        throw new Error('Unrecognized component mode')
    }

    this.parentNode.insertBefore(this.wrapper, this.el)

    this.selectOptionsContainer = this.wrapper.querySelector(`#${this.customSelectId}`)
    this.selectLabel = this.wrapper.querySelector('label')

    // Setup element options
    Array.prototype.forEach.call(elementOptions, element => {
      this.selectOptions = this.selectOptions.concat({
        value: element.value,
        label: element.label,
        element,
      })
    })

    // Add options to container
    this._arrayToDomOptions(this.selectOptions)

    // Setup element trigger
    this.input = this.wrapper.querySelector(`input[data-target="${this.customSelectId}"]`)

    // Remove default select display
    this.el.style.display = 'none'

    // Set disabled property
    this.isDisabled = this.el.disabled
  }

  /**
   * Bind array to dom "li" items into selectOptionsContainer
   * @param {Array} options - Options array
   */
  _arrayToDomOptions(options = [{ value: '', label: '' }]) {
    // Reset HTML content
    this.selectOptionsContainer.innerHTML = ''

    // Add options to container
    options.forEach(({ value, label }) => {
      this.selectOptionsContainer.appendChild(
        strToEl(`
          <li tabindex="0" class="${blipSelectOptionClass}" data-value="${value}">${label}</li>
        `)
      )
    })

    this._setupOptionsEventHandlers()
  }

  /**
   * Add event listeners to container options
   */
  _setupOptionsEventHandlers() {
    // Set handler for each menu option
    Array.prototype.forEach.call(
      this.selectOptionsContainer.querySelectorAll('li'),
      o => o.addEventListener('click', this._onOptionClick.bind(this)))
  }

  /**
   * Setup select event handlers
   */
  _setupEventHandlers() {
    // Assign binded methods to class properties help remove this event handlers in the future
    this._handleSelectFocus = this._onSelectFocus.bind(this)
    this._handleSelectBlur = this._onSelectBlur.bind(this)
    this._handleCenterOption = this._centerSelectedOption.bind(this)
    this._handleInputChange = this._onInputChange.bind(this)

    this.input.addEventListener('focus', this._handleSelectFocus)
    this.input.addEventListener('blur', this._handleSelectBlur)

    switch (this.configOptions.mode) {
      case 'autocomplete':
        this.input.addEventListener('keyup', this._handleInputChange)
        break
    }

    this.selectOptionsContainer.addEventListener('transitionend', this._handleCenterOption)
  }

  /**
   * On input change event
   */
  _onInputChange(event) {
    if (typeof this.configOptions.onInputChange !== 'function') {
      throw new Error('Callback "onInputChange" is not a function')
    }

    const inputValue = this.input.value
    const searchResults = this.configOptions.customSearch
      ? this.configOptions.customSearch.call(this, EventEmitter({
        query: inputValue,
        items: this.selectOptions,
      }))
      : this.selectOptions.filter(
        ({ value, label }) => label.toLowerCase().includes(inputValue.toLowerCase())
      )

    this.configOptions.onInputChange(EventEmitter({ value: inputValue, event }))

    if (searchResults.length > 0) {
      this.noResultsFound = false
      this._arrayToDomOptions(searchResults)
    } else {
      this.noResultsFound = true
    }
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

    this.configOptions.onSelectOption.call(this, EventEmitter({ value, label }))
  }

  /**
   * Clear input value
   */
  clearInput() {
    this._setInputValue({ value: '', label: '' })
  }

  /**
   * Programatically sets value to input
   * @param {Object} param0 - Value/label pair
   */
  setValue({ value, label } = { value: '', label: '' }) {
    if (value) {
      const match = this.selectOptions.find(o => o.value === value)

      if (match) {
        match.element.classList.add(blipSelectOptionSeletedClass)

        this._setInputValue({
          value: match.value,
          label: match.label,
        })
      } else {
        this._setInputValue({ value })
      }
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

    const match = this.selectOptions.find(o => o.label === this.input.value)
    if (match) {
      return {
        value: match.value,
        label: match.label,
      }
    } else {
      return {
        value: this.input.value,
        label: this.input.value,
      }
    }
  }

  /**
   * On select option item
   * @param {DOMEvent} event
   */
  _onOptionClick(event) {
    if (this.isSelectOpen) {
      this._setInputValue(this.selectOptions.find(o => o.value === event.target.getAttribute('data-value')))
      this._resetSelectedOptions()
      event.target.classList.add(blipSelectOptionSeletedClass)

      this._closeSelect()
    }
  }

  /**
   * Remove all selected class from options
   */
  _resetSelectedOptions() {
    Array.prototype.forEach.call(
      this.selectOptionsContainer.querySelectorAll('li'),
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
    if (this.isDisabled) {
      return
    }

    if (typeof this.configOptions.beforeOpenSelect !== 'function') {
      throw Error('Callback "beforeOpenSelect" is not a function')
    }

    if (typeof this.configOptions.afterOpenSelect !== 'function') {
      throw Error('Callback "afterOpenSelect" is not a function')
    }

    if (typeof this.configOptions.onFocus !== 'function') {
      throw Error('Callback "onFocus" is not a function')
    }

    this.configOptions.onFocus()

    // Callback invoked before select open
    this.configOptions.beforeOpenSelect()
    this._openSelect()

    // Callback invoked after select open
    this.configOptions.afterOpenSelect()
  }

  /**
   * On select blur
   */
  _onSelectBlur(e) {
    // Prevents close container before user can select any option
    if (e.relatedTarget && e.relatedTarget.classList.contains(blipSelectOptionClass)) {
      return
    }

    if (typeof this.configOptions.onBlur !== 'function') {
      throw Error('Callback "onBlur" is not a function')
    }

    this.configOptions.onBlur()

    setTimeout(() => { // Needed for get option value on "li" click
      this._closeSelect()
    }, ANIMATION_TIMEOUT - 200)
  }

  /**
   * Open select setting up styles
   */
  _openSelect() {
    this.selectOptionsContainer.style.display = 'block'
    setTimeout(() => { // Needed for animation
      const containerOptionsHeight = this.selectOptionsContainer.offsetHeight
      const containerOptionsTopSpace = this.wrapper.getBoundingClientRect().top
      const bottomSpace = window.innerHeight - containerOptionsTopSpace
      if (
        (bottomSpace < containerOptionsHeight && containerOptionsTopSpace > containerOptionsHeight) &&
        (containerOptionsTopSpace > bottomSpace)
      ) {
        this.selectOptionsContainer.classList.add(blipSelectOptionOpenTopClass)
        this.selectOptionsContainerOpenPosition = 'top'
      } else {
        this.selectOptionsContainerOpenPosition = 'bottom'
      }

      this.selectOptionsContainer.style.transform = 'scale(1)'
      this.selectOptionsContainer.style.opacity = 1
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
    const selectedOption = this.selectOptionsContainer.querySelector(`li.${blipSelectOptionSeletedClass}`)

    if (this.selectOptionsContainer.scrollHeight > this.selectOptionsContainer.clientHeight && ev.propertyName === 'transform') {
      if (!selectedOption) {
        return
      }

      let scrollOffset =
            selectedOption.getBoundingClientRect().top -
            this.selectOptionsContainer.getBoundingClientRect().top // scroll to selected option
      scrollOffset -= this.selectOptionsContainer.clientHeight / 2 // center in dropdown

      this.selectOptionsContainer.scrollTop = scrollOffset
    }
  }

  /**
   * Close select setting up styles
   */
  _closeSelect() {
    if (typeof this.configOptions.beforeCloseSelect !== 'function') {
      throw Error('Callback "beforeCloseSelect" is not a function')
    }

    if (typeof this.configOptions.afterCloseSelect !== 'function') {
      throw Error('Callback "afterCloseSelect" is not a function')
    }

    // Callback invoked before select open
    this.configOptions.beforeCloseSelect()
    this.selectOptionsContainer.style.transform = 'scale(0)'
    this.selectOptionsContainer.style.opacity = 0

    setTimeout(() => { // Needed for animation
      this.selectOptionsContainer.style.display = 'none'
      this.selectOptionsContainer.classList.remove(blipSelectOptionOpenTopClass)
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
    this.wrapper.parentNode.removeChild(this.wrapper)
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
    this.el.style.display = 'inline-block'
  }
}
