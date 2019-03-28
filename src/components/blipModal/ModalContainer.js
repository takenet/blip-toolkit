import { Component } from '@component'
import { MODAL_DEFAULTS } from '.'
import html from 'nanohtml'
import raw from 'nanohtml/raw'

export class ModalContainer extends Component {
  $defaults = {
    ...MODAL_DEFAULTS,
  }

  constructor(options) {
    super()

    this.configOptions = {
      ...this.$defaults,
      ...options,
    }

    this.props = {
      template: '',
      confirmButton: { text: 'Confirm', classes: '' },
      cancelButton: { text: 'Cancel', classes: '' },
    }
  }

  /**
   * Handle clicks on overlay
   */
  _handleOnOverlayClick = () => {
    if (this.configOptions.closeOnOverlayClick) {
      this._handleOnCancel()
    }
  }

  /**
   * Handle cancel button clicks
   */
  _handleOnCancel = () => {
    this.configOptions.onCancel()
  }

  /**
   * Handle confirm button clicks
   */
  _handleOnConfirm = () => {
    this.configOptions.onConfirm()
  }

  createElement(props) {
    this.props = {
      ...this.props,
      ...props,
    }

    const renderTemplate = () => html`${raw(this.props.template)}`

    return html`
      <div class="bp-modal">
        <div class="bp-modal__overlay" onclick="${this._handleOnOverlayClick}"></div>
        <div class="bp-modal__container">
          <div class="bp-modal__container__body">
            ${renderTemplate()}
          </div>
          <div class="bp-modal__container__footer">
            <button class="bp-modal__cancel-button bp-btn bp-btn--city bp-btn--text-only ${this.props.cancelButton.classes}"
              onclick="${this._handleOnCancel}">
              ${this.props.cancelButton.text}
            </button>
            <button class="bp-modal__ok-button bp-btn bp-btn--blip-dark ${this.props.confirmButton.classes}"
              onclick="${this._handleOnConfirm}">
              ${this.props.confirmButton.text}
            </button>
          </div>
        </div>
      </div>
    `
  }
}
