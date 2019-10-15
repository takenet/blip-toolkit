import { Component } from '@component'
import html from 'nanohtml'
import { BlipToast } from '../blipToast'

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

  info(msg, duration = 5000, title = '') {
    this.toast(title, msg, duration, 'info')
  }

  success(msg, duration = 5000, title = '') {
    this.toast(title, msg, duration, 'success')
  }

  warning(msg, duration = 5000, title = '') {
    this.toast(title, msg, duration, 'warning')
  }

  danger(msg, duration = 5000, title = '') {
    this.toast(title, msg, duration, 'danger')
  }

  refresh(msg, duration = 5000, title = '') {
    this.toast(title, msg, duration, 'refresh')
  }

  toast(title, msg, duration, type) {
    const toast = BlipToast({ title, msg, type })
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
