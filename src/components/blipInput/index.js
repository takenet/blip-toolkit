import { Component } from '@component'
import html from 'nanohtml'

const blipInputFocusClass = 'blip-input--focus'
const blipInputValidClass = 'blip-input--valid'
const blipInputInvalidClass = 'blip-input--invalid'
const blipInputDisabledClass = 'blip-input--disabled'

export class BlipInput extends Component {
  /**
   * Component state
   */
  $defaults = {
    id: '',
    name: '',
    value: '',
    type: 'text',
    focused: false,
    readOnly: false,
    pristine: true,
    placeholder: '',
    required: false,
    minLength: 0,
    maxLength: 0,
    showPasswordStrength: true,
    showInputError: true,
    autocomplete: 'on',
    requiredErrorMsg: 'This is a required field',
    maxLengthErrorMsg: 'The value is too long',
    minLengthErrorMsg: 'The value is too short',
    emailTypeErrorMsg: 'This is not a valid email',
    urlTypeErrorMsg: 'This is not a valid website',
    onInputFocus: () => { },
    onInputBlur: () => { },
    onInputChange: (value) => { },
    onInputError: (value) => { },
  }

  constructor(options) {
    super()

    this.configOptions = {
      ...this.$defaults,
      ...options,
    }

    // Component props
    this.props = {
      value: this.configOptions.value,
      customError: '',
      label: '',
      pristine: this.configOptions.pristine,
      readOnly: this.configOptions.readOnly,
      focused: this.configOptions.focused,
      valid: this._inputValidate(this.configOptions.value),
    }
  }

  get error() {
    return this.configOptions.error
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

    if (this.props.customError) {
      this.props.valid = false
      this.configOptions.error = this.props.customError
    }

    const hasInput = !this.props.pristine && this.props.value !== undefined && this.props.value !== ''

    const inputErrorElement = this.configOptions.showInputError
      ? html`<div class="bp-input-error">${this.configOptions.error && !this.props.pristine ? this.configOptions.error : ''}</div>`
      : ''

    return html`
      <div class="blip-input ${this.props.disabled ? blipInputDisabledClass : ''}  ${this.props.focused ? blipInputFocusClass : ''} ${hasInput && (this.props.valid ? blipInputValidClass : blipInputInvalidClass)}">
        <div class="bp-input-field">
          <label class="bp-label">
            ${this.props.label} ${this.configOptions.required ? ' *' : ''}
          </label>
          ${this.configOptions.type === 'password' && this.configOptions.showPasswordStrength && !this.props.disabled ? html`<div class="bp-input__password-strength">
              <span class="str-lvl lvl-one ${this.props.valid ? this.props.passwordStrength : ''}"></span>
              <span class="str-lvl lvl-two ${this.props.valid ? this.props.passwordStrength : ''}"></span>
              <span class="str-lvl lvl-three ${this.props.valid ? this.props.passwordStrength : ''}"></span>
            </div>` : ''}

          <div class="bp-input-box">
            <input
              class="bp-input"
              id="${this.configOptions.id}"
              name="${this.configOptions.name}"
              type=${this.configOptions.type === 'password' ? 'password' : 'text'}
              value="${this.props.value}"
              placeholder="${this.configOptions.placeholder}"
              onfocus="${this._onInputFocus}"
              onblur="${this._onInputBlur}"
              onchange="${this._onInputChange}"
              onkeyup="${this._onInputKeyUp}"
              ${this.configOptions.required ? 'required' : ''}
              ${this.props.disabled ? 'disabled' : ''}
              ${this.props.readOnly ? 'readonly' : ''}
            />
          </div>
        </div>
        ${inputErrorElement}
      </div>
    `
  }

  _onInputFocus = () => {
    this.props.focused = true
    this.configOptions.onInputFocus()
    this.render(this.props)
  }

  _onInputBlur = () => {
    this.props.focused = false
    this.configOptions.onInputBlur()
    this.render(this.props)
  }

  _onInputKeyUp = (event) => {
    this._handleInputChanges(event)
  }

  _onInputChange = (event) => {
    this._handleInputChanges(event)
  }

  _handleInputChanges = (event) => {
    this.props.value = event.target.value
    this.props.pristine = false
    this.props.valid = this._inputValidate(this.props.value)

    if (!this.props.valid) {
      this.configOptions.onInputError(this.error)
    }
    if (this.configOptions.type === 'password') {
      this._checkPasswordStrength()
    }

    this.render(this.props)
    this.configOptions.onInputChange(this.props.value)
  }

  _inputValidate = (value) => {
    const {
      required,
      maxLength,
      minLength,
      requiredErrorMsg,
      maxLengthErrorMsg,
      minLengthErrorMsg,
    } = this.configOptions

    if (value[0] === ' ') {
      value = value.trim()
      this.props.value = value
    }

    if (required && !value) {
      this.configOptions.error = requiredErrorMsg
      return false
    }
    if (this.configOptions.type === 'email') {
      const emailRegex = /^\w+([.+,-]\w+)*@\w+([.-]\w+)*\.\w{2,}$/
      if (value && !emailRegex.test(value)) {
        this.configOptions.error = this.configOptions.emailTypeErrorMsg
        return false
      }
    }
    if (this.configOptions.type === 'url') {
      const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

      if (value && !urlRegex.test(value)) {
        this.configOptions.error = this.configOptions.urlTypeErrorMsg
        return false
      }
    }
    if (value && maxLength !== 0 && value.length > maxLength) {
      this.configOptions.error = maxLengthErrorMsg
      return false
    }
    if (value && minLength !== 0 && value.length < minLength) {
      this.configOptions.error = minLengthErrorMsg
      return false
    }
    this.configOptions.error = ''
    return true
  }

  _checkPasswordStrength = () => {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*\\.\\-_])(?=.{8,})',
    )
    const mediumRegex = new RegExp(
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

    if (props.customError !== undefined) {
      this.props.valid = this._inputValidate(this.props.value)
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
