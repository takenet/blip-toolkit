import { Component } from '@component'
import html from 'nanohtml'

const blipInputFocusClass = 'bp-input-wrapper--focus'
const blipInputValidClass = 'bp-input-wrapper--valid'
const blipInputInvalidClass = 'bp-input-wrapper--invalid'
const blipInputDisabledClass = 'bp-input-wrapper--disabled'

const bpCrooftopClass = 'bp-c-rooftop'
const bpCblipDarkClass = 'bp-c-blip-dark'
const bpCTrueClass = 'bp-c-true'
const bpCWarningClass = 'bp-c-warning'

export class BlipInput extends Component {
  /**
   * Component state
   */
  $defaults = {
    id: '',
    name: '',
    type: 'text',
    focused: false,
    pristine: true,
    placeholder: '',
    required: false,
    minLength: 0,
    maxLength: 0,
    requiredErrorMsg: 'This is a required field',
    maxLengthErrorMsg: 'The value is too long',
    minLengthErrorMsg: 'The value is too short',
    emailTypeErrorMsg: 'This is not a valid email',
    urlTypeErrorMsg: 'This is not a valid website',
    inputFocus: () => { },
    inputBlur: () => { },
    inputChanged: (value) => { },
    inputError: (value) => { },
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

  get error() {
    return this.props.error
  }

  get valid() {
    return this.props.valid
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
          <div class="bp-input-wrapper mb2 relative ${this.props.disabled ? blipInputDisabledClass : ''}  ${this.props.focused ? blipInputFocusClass : ''} ${!this.props.pristine && (this.props.valid ? blipInputValidClass : blipInputInvalidClass)}">
              <label class="bp-label tl ${labelClass}">
                ${this.props.label} ${this.configOptions.required ? ' *' : ''}
              </label>
              ${this.configOptions.type === 'password' && !this.props.disabled ? html`<div class="password-strength-wrapper">
              <span class="column str-lvl lvl-one ${this.props.valid ? this.props.passwordStrength : ''}"></span>
              <span class="column str-lvl lvl-two ${this.props.valid ? this.props.passwordStrength : ''}"></span>
              <span class="column str-lvl lvl-three ${this.props.valid ? this.props.passwordStrength : ''}"></span>
            </div>` : ''}
              
              <div class="w-100 relative flex flex-row justify-between">
                  <input 
                    id="${this.configOptions.id}"
                    name="${this.configOptions.name}"
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
          ${this.props.error && !this.props.pristine ? html`<div class="error bp-fs-7 mb2 ${bpCWarningClass}">${this.props.error}</div>` : ''}
        </div>
    `
  }

  _onInputFocus = () => {
    this.props.focused = true
    this.configOptions.inputFocus()
    this.render(this.props)
  }

  _onInputBlur = () => {
    this.props.focused = false
    this.configOptions.inputBlur()
    this.render(this.props)
  }

  _onInputKeyUp = (event) => {
    this.props.value = event.target.value
    this.props.pristine = false
    this.props.valid = this._inputValidate(this.props.value)
    if (!this.props.valid) {
      this.configOptions.inputError(this.error)
    }
    if (this.configOptions.type === 'password') {
      this._checkPasswordStrength()
    }
    this.configOptions.inputChanged(this.props.value)
    this.render(this.props)
  }

  _onInputChange = (event) => {
    this.props.value = event.target.value
    this.props.pristine = false
    this.props.valid = this._inputValidate(this.props.value)
    if (!this.props.valid) {
      this.configOptions.inputError(this.error)
    }
    if (this.configOptions.type === 'password') {
      this._checkPasswordStrength()
    }
    this.configOptions.inputChanged(this.props.value)
    this.render(this.props)
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
    if (this.configOptions.type === 'email') {
      let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (value && !emailRegex.test(value)) {
        this.props.error = this.configOptions.emailTypeErrorMsg
        return false
      }
    }
    if (this.configOptions.type === 'url') {
      let urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i

      if (value && !urlRegex.test(value)) {
        this.props.error = this.configOptions.urlTypeErrorMsg
        return false
      }
    }
    if (value && maxLength !== 0 && value.length > maxLength) {
      this.props.error = maxLengthErrorMsg
      return false
    }
    if (value && minLength !== 0 && value.length < minLength) {
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
    this._removeElements()
  }
}
