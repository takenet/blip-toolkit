import html from 'nanohtml'
import raw from 'nanohtml/raw'
import SuccessIcon from '../../img/done.svg'
import InfoIcon from '../../img/info.svg'
import WarnigIcon from '../../img/warning.svg'
import RefreshIcon from '../../img/refresh.svg'

const infoClass = 'bp-toast--info'
const successClass = 'bp-toast--success'
const warningClass = 'bp-toast--warning'
const dangerClass = 'bp-toast--danger'
const refreshClass = 'bp-toast--refresh'

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
      icon = SuccessIcon
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
  return html`
    <div class="bp-toast ${typeClass}">
        ${raw(icon)}
        <p>${props.msg}</p>
        <button class="dismiss bp-btn bp-btn--c-white bp-btn--text-only">x</button>
    </div>
    `
}
