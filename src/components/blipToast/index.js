import html from 'nanohtml'
import raw from 'nanohtml/raw'
import CloseIcon from '../../img/close.svg'
import DangerIcon from '../../img/close-circle.svg'
import InfoIcon from '../../img/checkball-outline.svg'
import LikeIcon from '../../img/like-outline.svg'
import RefreshIcon from '../../img/refresh.svg'
import WarningIcon from '../../img/attention-outline.svg'
import RedoIcon from '../../img/redo.svg'
import UndoIcon from '../../img/undo.svg'

const infoClass = 'bp-toast--info'
const successClass = 'bp-toast--success'
const warningClass = 'bp-toast--warning'
const dangerClass = 'bp-toast--danger'
const refreshClass = 'bp-toast--refresh'
const undoClass = 'bp-toast--undo'
const redoClass = 'bp-toast--redo'
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
      icon = WarningIcon
      break
    case 'danger':
      typeClass = dangerClass
      icon = DangerIcon
      break
    case 'refresh':
      typeClass = refreshClass
      icon = RefreshIcon
      break
    case 'undo':
      typeClass = undoClass
      icon = UndoIcon
      break
    case 'redo':
      typeClass = redoClass
      icon = RedoIcon
      break
  }

  const button = props.buttonText ? props.buttonText : raw(CloseIcon)
  const addTextButtonClass = () => props.buttonText ? textButtonClass : ''

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
  }

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
