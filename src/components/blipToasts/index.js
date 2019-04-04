import { Component } from '@component'
import html from 'nanohtml'
import { BlipToast } from '../BlipToast'

export class BlipToasts extends Component {
  constructor(options) {
    super()
    this.options = { ...options }
  }
  createElement(props) {
    this.props = {
      ...this.props,
      ...props,
    }
    this.options.element = html`
    <div class="bp-toasts">
    </div>
  `
    return this.options.element
  }

  info(msg, duration = 5000) {
    this.toast(msg, duration, 'info')
  }

  success(msg, duration = 5000) {
    this.toast(msg, duration, 'success')
  }

  warning(msg, duration = 5000) {
    this.toast(msg, duration, 'warning')
  }

  danger(msg, duration = 5000) {
    this.toast(msg, duration, 'danger')
  }

  refresh(msg, duration = 5000) {
    this.toast(msg, duration, 'refresh')
  }

  toast(msg, duration, type) {
    const toast = BlipToast({ msg, type })
    this.options.element.append(toast)
    toast.querySelector('.dismiss').addEventListener('click', () => this.element.removeChild(toast))
    setTimeout(
      () => toast.classList.add('bp-toast__show'),
      20,
    )
    if (duration !== 0) {
      setTimeout(
        () => this.element.removeChild(toast),
        duration
      )
    }
  }
}
