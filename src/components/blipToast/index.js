import html from 'nanohtml'
import raw from 'nanohtml/raw'
import CloseIcon from '../../img/close.svg'
import InfoIcon from '../../img/info.svg'
import WarnigIcon from '../../img/warning.svg'
import RefreshIcon from '../../img/refresh.svg'
import LikeIcon from '../../img/like-outline.svg'

const infoClass = 'bp-toast--info'
const successClass = 'bp-toast--success'
const warningClass = 'bp-toast--warning'
const dangerClass = 'bp-toast--danger'
const refreshClass = 'bp-toast--refresh'
const textButtonClass = 'toast-text-button'

export const BlipToast = (props = {}) => {
  let typeClass
  let icon
  switch (props.type) {
    case 'info':
      typeClass = infoClass
      icon = InfoIcon
      break
    case 'success':
      typeClass = successClass
      icon = LikeIcon
      break
    case 'warning':
      typeClass = warningClass
      icon = WarnigIcon
      break
    case 'danger':
      typeClass = dangerClass
      icon = WarnigIcon
      break
    case 'refresh':
      typeClass = refreshClass
      icon = RefreshIcon
      break
  }

  const button = props.button ? props.button : raw(CloseIcon)
  const addTextButtonClass = () =>
    props.button ? textButtonClass : ''

  if (props.title) {
    return html`
    <div class="bp-toast ${typeClass}">
        <div class="toast-svg">${raw(icon)}</div>
        <div class="toast-content">
          <p class="toast-title">${props.title}</p>
          <p class="toast-message">${props.msg}</p>
        </div>
        <div class="toast-divider">
          <button class="dismiss toast-dismiss ${addTextButtonClass()} bp-ff-nunito">${button}</button>
        </div>
    </div>
    `
  } else {
    return html`
    <div class="bp-toast ${typeClass}">
        <div class="toast-svg">${raw(icon)}</div>
        <div class="toast-content">
          <p class="toast-message">${props.msg}</p>
        </div>
        <div class="toast-divider">
          <button class="dismiss toast-dismiss ${addTextButtonClass()} bp-ff-nunito">${button}</button>
        </div>
    </div>
    `
  }
}
