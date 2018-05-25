import { strToEl, guid } from '../lib/utils'
import { EventEmitter } from '../lib/eventEmitter'

const ANIMATION_TIMEOUT = 300

const bpInputWrapperClass = 'bp-input-wrapper'
const blipSelectClass = 'blip-select'
const bpInputWrapperLabelClass = 'bp-label'
const blipSelectInputClass = 'blip-select__input'
const blipSelectOptionsClass = 'blip-select__options'
const blipSelectOptionOpenTopClass = 'blip-select__options--open-top'
const blipSelectOptionClass = 'blip-select__option'
const blipSelectOptionSeletedClass = 'blip-select__option--selected'

export class BlipSelect {
  constructor(element, options) {
    this.wrapper = ''
    this.elementLabel = ''
    this.selectOptions = []
    this.selectOptionsContainer = ''
    this.selectLabel = ''
    this._handleSelectFocus = ''
    this._handleSelectBlur = ''
    this._handleOptionClick = ''
    this.state = {
      isSelectOpen: false,
    }

    this.configOptions = {
      label: '',
      beforeOpenSelect: () => {},
      afterOpenSelect: () => {},
      beforeCloseSelect: () => {},
      afterCloseSelect: () => {},
      onSelectOption: ($event) => {}, // { value: optionValue, label: optionLabel }
      ...options,
    }
    this.el = element
    this._setup()
    this._setupEventHandlers()
  }

  get isSelectOpen() {
    return this.state.isSelectOpen
  }

  set isSelectOpen(value) {
    this.state.isSelectOpen = value
  }

  /**
   * Setup custom select
   */
  _setup() {
    // Setup element structure
    const parentNode = this.el.parentNode
    this.customSelectId = `${blipSelectOptionsClass}-${guid()}`
    this.wrapper = strToEl(`
      <div class="${bpInputWrapperClass} ${blipSelectClass}">
        <label class="${bpInputWrapperLabelClass}">${this.configOptions.label}</label>
        <input class="${blipSelectInputClass} bp-c-cloud" data-target="${this.customSelectId}" readonly>
        <ul class="${blipSelectOptionsClass}" id="${this.customSelectId}"></ul>
      </div>
    `)

    parentNode.insertBefore(this.wrapper, this.el)

    const elementOptions = this.el.querySelectorAll('option')
    this.selectOptionsContainer = this.wrapper.querySelector(`#${this.customSelectId}`)

    this.selectLabel = this.wrapper.querySelector('label')

    // Setup element options
    elementOptions.forEach(({ value, label }) => {
      this.selectOptions = this.selectOptions.concat({ value, label })
    })

    // Add options to container
    this.selectOptions.forEach(({ value, label }) => {
      this.selectOptionsContainer.appendChild(
        strToEl(`
          <li class="${blipSelectOptionClass}" data-value="${value}">${label}</li>
        `)
      )
    })

    // Setup element trigger
    this.input = this.wrapper.querySelector(`input[data-target="${this.customSelectId}"]`)

    // Remove default select display
    this.el.style.display = 'none'
  }

  /**
   * Setup select event handlers
   */
  _setupEventHandlers() {
    // Assign binded methods to class properties help remove this event handlers in the future
    this._handleSelectFocus = this._onSelectFocus.bind(this)
    this._handleSelectBlur = this._onSelectBlur.bind(this)
    this._handleCenterOption = this._centerSelectedOption.bind(this)

    this.input.addEventListener('focus', this._handleSelectFocus)
    this.input.addEventListener('blur', this._handleSelectBlur)

    // Set handler for each menu option
    this.selectOptionsContainer
      .querySelectorAll('li')
      .forEach(o => o.addEventListener('click', (ev) => this._onOptionClick(ev)))

    this.selectOptionsContainer.addEventListener('transitionend', this._handleCenterOption)
  }

  /**
   * Set value to input
   * @param {Object} param0 - value/label pair
   */
  _setInputValue({ value, label }) {
    this.input.value = label
    this.configOptions.onSelectOption(EventEmitter({ value, label }))
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
    }
  }

  /**
   * Remove all selected class from options
   */
  _resetSelectedOptions() {
    this.selectOptionsContainer
      .querySelectorAll('li')
      .forEach(o =>
        o.classList.contains(blipSelectOptionSeletedClass)
          ? o.classList.remove(blipSelectOptionSeletedClass)
          : ''
      )
  }

  /**
   * On select click
   */
  _onSelectFocus() {
    // Callback invoked before select open
    this.configOptions.beforeOpenSelect()

    this._openSelect()

    // Callback invoked after select open
    this.configOptions.afterOpenSelect()
  }

  /**
   * On select blur
   */
  _onSelectBlur() {
    // Callback invoked before select open
    this.configOptions.beforeCloseSelect()

    setTimeout(() => { // Needed for get option value on "li" click
      this._closeSelect()
    }, ANIMATION_TIMEOUT - 200)

    // Callback invoked after select open
    this.configOptions.afterCloseSelect()
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

      // Open select where have more space (bottom or top)
      if (
        (bottomSpace < containerOptionsHeight && containerOptionsTopSpace > containerOptionsHeight) ||
        (containerOptionsTopSpace > bottomSpace)
      ) {
        this.selectOptionsContainer.classList.add(blipSelectOptionOpenTopClass)
      }

      this.selectOptionsContainer.style.transform = 'scale(1)'
      this.selectOptionsContainer.style.opacity = 1
    })

    this.input.parentNode.classList.add('bp-input-wrapper--focus')
    this.selectLabel.classList.add('bp-c-blip-light')
    this.isSelectOpen = true
  }

  /**
   * If has a selected option, center scroll to element
   */
  _centerSelectedOption(ev) {
    const selectedOption = this.selectOptionsContainer.querySelector(`li.${blipSelectOptionSeletedClass}`)

    // console.log(this.selectOptionsContainer.offsetTop + this.selectOptionsContainer.offsetHeight)
    // console.log(window.innerHeight, this.selectOptionsContainer.getBoundingClientRect().top, this.selectOptionsContainer.offsetHeight)

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
    this.selectOptionsContainer.style.transform = 'scale(0)'
    this.selectOptionsContainer.style.opacity = 0

    setTimeout(() => { // Needed for animation
      this.selectOptionsContainer.style.display = 'none'
      this.selectOptionsContainer.classList.remove(blipSelectOptionOpenTopClass)
    }, ANIMATION_TIMEOUT) // Milliseconds should be greater than value setted on transition css property

    this.input.parentNode.classList.remove('bp-input-wrapper--focus')
    this.selectLabel.classList.remove('bp-c-blip-light')
    this.isSelectOpen = false
  }
}
