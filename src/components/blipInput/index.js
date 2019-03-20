/* import { guid } from '@lib/utils'
import { EventEmitter } from '@lib/eventEmitter' */

import { Component } from '@component'
import html from 'nanohtml'

const blipInputFocusClass = 'bp-input-wrapper--focus'
const blipInputValidClass = 'bp-input-wrapper--valid'
const blipInputInvalidClass = 'bp-input-wrapper--invalid'
const blipInputDisabledClass = 'bp-input-wrapper--disabled'

const bpCrooftopClass = 'bp-c-rooftop'
// const bpCblipLightClass = 'bp-c-blip-light'
const bpCblipDarkClass = 'bp-c-blip-dark'
const bpCTrueClass = 'bp-c-true'
const bpCWarningClass = 'bp-c-warning'

export class BlipInput extends Component {
  /**
   * Component state
   */
  $defaults = {
    type: 'text',
    focused: false,
    pristine: true,
    placeholder: '',
    required: false,
    minLength: 0,
    maxLength: 0,
    requiredErrorMsg: 'Este campo é obrigatório',
    maxLengthErrorMsg: 'O valor é muito longo',
    minLengthErrorMsg: 'O valor é muito curto',
  }

  constructor(options) {
    super()

    this.configOptions = {
      ...this.$defaults,
      ...options,
    }

    // Component props
    this.props = {
      value: '',
      error: '',
      label: '',
      pristine: this.configOptions.pristine,
      focused: this.configOptions.focused,
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

    this.props.valid = this._inputValidate(this.props.value)

    let labelClass = this._getLabelClass()

    return html`
        <div>
          <div class="bp-input-wrapper relative ${this.props.disabled ? blipInputDisabledClass : ''}  ${this.props.focused ? blipInputFocusClass : ''} ${!this.props.pristine && (this.props.valid ? blipInputValidClass : blipInputInvalidClass)}">
              <label class="bp-label tl ${labelClass}">
                ${this.props.label}
              </label>
              ${this.configOptions.type === 'password' && !this.props.disabled ? html`<div class="password-strength-wrapper">
              <span class="column str-lvl lvl-one ${this.props.valid ? this.props.passwordStrength : ''}"></span>
              <span class="column str-lvl lvl-two ${this.props.valid ? this.props.passwordStrength : ''}"></span>
              <span class="column str-lvl lvl-three ${this.props.valid ? this.props.passwordStrength : ''}"></span>
            </div>` : ''}

              <div class="w-100 relative flex flex-row justify-between">
                  <input
                    class="w-100 bp-input bp-c-city"
                    type="${this.configOptions.type}"
                    value="${this.props.value}"
                    placeholder="${this.configOptions.placeholder}"
                    onfocus="${this._onInputFocus}"
                    onblur="${this._onInputBlur}"
                    onchange="${this._onInputChange}"
                    onkeyup="${this._onInputKeyUp}"
                    ${this.configOptions.required ? 'required' : ''}
                    ${this.props.disabled ? 'disabled' : ''}
                  />
              </div>
          </div>
          ${this.props.error && !this.props.pristine ? html`<div class="error bp-fs-7 mt5 ${bpCWarningClass}">${this.props.error}</div>` : ''}
        </div>
    `
  }

  _onInputFocus = () => {
    this.props.focused = true
    this.render(this.props)
  }

  _onInputBlur = () => {
    this.props.focused = false
    this.render(this.props)
  }

  _onInputKeyUp = (event) => {
    this.props.value = event.target.value
    this.props.pristine = false
    this.props.valid = this._inputValidate(this.props.value)
    if (this.configOptions.type === 'password') {
      this._checkPasswordStrength()
    }
    this.render(this.props)
  }

  _onInputChange = (event) => {
    this.props.value = event.target.value
  }

  _inputValidate = (value) => {
    let {
      required,
      maxLength,
      minLength,
      requiredErrorMsg,
      maxLengthErrorMsg,
      minLengthErrorMsg,
    } = this.configOptions
    if (required && !value) {
      this.props.error = requiredErrorMsg
      return false
    }
    if (maxLength !== 0 && value.length > maxLength) {
      this.props.error = maxLengthErrorMsg
      return false
    }
    if (minLength !== 0 && value.length < minLength) {
      this.props.error = minLengthErrorMsg
      return false
    }
    this.props.error = ''
    return true
  }

  _getLabelClass = () => {
    let labelClass
    if (this.props.focused) {
      if (this.props.pristine) {
        labelClass = bpCblipDarkClass
      } else {
        if (this.props.valid) {
          labelClass = bpCTrueClass
        } else {
          labelClass = bpCWarningClass
        }
      }
    } else {
      labelClass = bpCrooftopClass
    }
    return labelClass
  }

  _checkPasswordStrength = () => {
    let strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*\\.\\-_])(?=.{8,})',
    )
    let mediumRegex = new RegExp(
      '^((?=.*[a-z])|(?=.*[A-Z]))(?=.*[0-9])(?=.{6,})',
    )

    if (strongRegex.test(this.props.value)) {
      this.props.passwordStrength = 'strong'
    } else if (mediumRegex.test(this.props.value)) {
      this.props.passwordStrength = 'medium'
    } else {
      this.props.passwordStrength = 'weak'
    }
  }

  get error() {
    return this.props.error
  }

  get valid() {
    return this.props.valid
  }

  /**
   * Component update
   */
  update(props) {
    if (props.disabled !== undefined) {
      this.isDisabled = props.disabled
      return false
    }

    if (props.invalid !== undefined) {
      this.isInvalid = props.invalid
      return false
    }

    return true
  }

  /**
   * Called after component update
   */
  afterupdate() {
    if (this.configOptions.disabled !== undefined) {
      this.isDisabled = this.configOptions.disabled
    }

    if (this.configOptions.invalid !== undefined) {
      this.isInvalid = this.configOptions.invalid
    }
  }

  /**
   * Remove elements from DOM
   */
  _removeElements() {
    this.element.parentNode.removeChild(this.element)
  }

  destroy() {
    // this._removeEventHandlers()
    this._removeElements()
  }
}
