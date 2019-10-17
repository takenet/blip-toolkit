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

  info({ msg, title, buttonText, callback, duration }) {
    this.toast({ title, msg, buttonText, callback, duration, type: 'info' })
  }

  success({ msg, title, buttonText, callback, duration }) {
    this.toast({ title, msg, buttonText, callback, duration, type: 'success' })
  }

  warning({ msg, title, buttonText, callback, duration }) {
    this.toast({ title, msg, buttonText, callback, duration, type: 'warning' })
  }

  danger({ msg, title, buttonText, callback, duration }) {
    this.toast({ title, msg, buttonText, callback, duration, type: 'danger' })
  }

  refresh({ msg, title, buttonText, callback, duration }) {
    this.toast({ title, msg, buttonText, callback, duration, type: 'refresh' })
  }

  toast({ title, msg, buttonText, callback, duration, type }) {
    const toast = BlipToast({ title, msg, buttonText, callback, type })
    this.options.element.appendChild(toast)

    toast.querySelector('.dismiss').addEventListener('click', () => {
      if (callback) {
        callback()
      }
      this.element.removeChild(toast)
    })

    setTimeout(
      () => toast.classList.add('bp-toast__show'),
      20,
    )

    if (duration === undefined) {
      duration = 5000
    }
    if (duration !== 0) {
      setTimeout(
        () => this.element.removeChild(toast),
        duration
      )
    }
  }
}
