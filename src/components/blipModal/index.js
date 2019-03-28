import { ModalContainer } from './ModalContainer'

export const MODAL_DEFAULTS = {
  onOpen: () => {},
  onClose: () => {},
  onConfirm: () => {},
  onCancel: () => {},
  closeOnOverlayClick: true,
  closeOnConfirm: true,
  closeOnCancel: true,
  confirmButton: { text: 'Confirm', classes: '' },
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
      onConfirm: this._onModalConfirm,
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
   * Handle modal confirm click
   */
  _onModalConfirm = () => {
    if (this.configOptions.closeOnConfirm) {
      this.close()
    }

    this.configOptions.onConfirm({ modal: this })
  }

  /**
   * Opens modal and add ModalContainer component to page
   */
  open() {
    this.renderedModal = this.modalContainerInstance.render({
      template: this.modalContent.innerHTML,
      confirmButton: this.configOptions.confirmButton,
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
