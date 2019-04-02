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
    const toast = BlipToast({ msg, type: 'info' })
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

  success(msg, duration = 5000) {
    const toast = BlipToast({ msg, type: 'success' })
    toast.querySelector('.dismiss').addEventListener('click', () => this.element.removeChild(toast))
    this.options.element.append(toast)
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

  warning(msg, duration = 5000) {
    const toast = BlipToast({ msg, type: 'warning' })
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

  danger(msg, duration = 5000) {
    const toast = BlipToast({ msg, type: 'danger' })
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

  refresh(msg, duration = 5000) {
    const toast = BlipToast({ msg, type: 'refresh' })
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
