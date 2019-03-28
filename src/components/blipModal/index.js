import { ModalContainer } from './ModalContainer'

export const MODAL_DEFAULTS = {
  onOpen: () => {},
  onClose: () => {},
  onOk: () => {},
  onCancel: () => {},
  closeOnOverlayClick: true,
  closeOnOk: true,
  closeOnCancel: true,
  okButton: { text: 'Ok', classes: '' },
  cancelButton: { text: 'Cancel', classes: '' },
}

export class BlipModal {
  $defaults = {
    ...MODAL_DEFAULTS,
    target: '',
  }

  constructor(options) {
    this.configOptions = {
      ...this.$defaults,
      ...options,
    }

    this.init()
  }

  /**
   * Initialize modal with configurations
   */
  init() {
    this.trigger = document.getElementById(this.configOptions.target)
    this.trigger.addEventListener('click', (event) => this.open(event))
    this.modalContent = document.querySelector(`[ref="${this.configOptions.target}"]`)

    this.modalContainerInstance = new ModalContainer({
      onCancel: this._onModalCancel,
      onOk: this._onModalOk,
    })
  }

  /**
   * Handle modal cancel click
   */
  _onModalCancel = () => {
    if (this.configOptions.closeOnCancel) {
      this.close()
    }

    this.configOptions.onCancel({ modal: this })
  }

  /**
   * Handle modal ok click
   */
  _onModalOk = () => {
    if (this.configOptions.closeOnOk) {
      this.close()
    }

    this.configOptions.onOk({ modal: this })
  }

  /**
   * Opens modal and add ModalContainer component to page
   */
  open() {
    this.renderedModal = this.modalContainerInstance.render({
      template: this.modalContent.innerHTML,
      okButton: this.configOptions.okButton,
      cancelButton: this.configOptions.cancelButton,
    })

    document.body.appendChild(this.renderedModal)
    this.configOptions.onOpen()
  }

  /**
   * Close modal and remove ModalContainer component from page
   */
  close() {
    document.body.removeChild(this.renderedModal)
    this.configOptions.onClose()
  }
}
