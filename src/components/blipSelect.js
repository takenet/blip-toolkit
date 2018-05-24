import { strToEl, guid } from '../lib/utils'

const bpInputWrapperClass = 'bp-input-wrapper'
const blipSelectClass = 'blip-select'
const bpInputWrapperLabelClass = 'bp-label'
const blipSelectTriggerClass = 'blip-select__trigger'
const blipSelectOptionsClass = 'blip-select__options'
const blipSelectOptionClass = 'blip-select__option'

export class BlipSelect {
  constructor(element, options) {
    this.wrapper = ''
    this.elementLabel = ''
    this.selectOptions = []
    this.selectOptionsContainer = ''

    this.configOptions = {
      label: '',
      beforeOpenSelect: () => {},
      afterOpenSelect: () => {},
      beforeCloseSelect: () => {},
      afterCloseSelect: () => {},
      ...options,
    }
    this.el = element
    this._setup()
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
        <input class="${blipSelectTriggerClass}" data-target="${this.customSelectId}" readonly>
        <ul class="${blipSelectOptionsClass}" id="${this.customSelectId}"></ul>
      </div>
    `)

    parentNode.insertBefore(this.wrapper, this.el)

    const elementOptions = this.el.querySelectorAll('option')
    this.selectOptionsContainer = this.wrapper.querySelector(`#${this.customSelectId}`)

    // Setup element options
    elementOptions.forEach(({ value, label }) => {
      this.selectOptions = this.selectOptions.concat({ value, label })
    })

    // Add options to container
    this.selectOptions.forEach(({ label }) => {
      this.selectOptionsContainer.appendChild(strToEl(`<li class="${blipSelectOptionClass}">${label}</li>`))
    })

    // Setup element trigger
    this.selectTrigger = this.wrapper.querySelector(`input[data-target="${this.customSelectId}"]`)
    this.selectTrigger.addEventListener('focus', this._onSelectFocus.bind(this))
    this.selectTrigger.addEventListener('blur', this._onSelectBlur.bind(this))

    // Remove default select display
    this.el.style.display = 'none'
  }

  _onSelectFocus() {
    // Callback invoked before select open
    this.configOptions.beforeOpenSelect()

    this._openSelect()

    // Callback invoked after select open
    this.configOptions.afterOpenSelect()
  }

  _onSelectBlur() {
    // Callback invoked before select open
    this.configOptions.beforeCloseSelect()

    this._closeSelect()

    // Callback invoked after select open
    this.configOptions.afterCloseSelect()
  }

  /**
   * Open select setting up styles
   */
  _openSelect() {
    this.selectOptionsContainer.style.display = 'block'

    setTimeout(() => { // Needed for animation
      this.selectOptionsContainer.style.transform = 'scale(1)'
      this.selectOptionsContainer.style.opacity = 1
    })

    this.selectTrigger.parentNode.classList.add('bp-input-wrapper--focus')
  }

  /**
   * Close select setting up styles
   */
  _closeSelect() {
    this.selectOptionsContainer.style.transform = 'scale(0)'
    this.selectOptionsContainer.style.opacity = 0

    setTimeout(() => { // Needed for animation
      this.selectOptionsContainer.style.display = 'none'
    }, 300)

    this.selectTrigger.parentNode.classList.remove('bp-input-wrapper--focus')
  }
}
