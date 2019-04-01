import html from 'nanohtml'

const infoClass = 'bp-toast--info'
const successClass = 'bp-toast--success'
const warningClass = 'bp-toast--warning'
const dangerClass = 'bp-toast--danger'

export const BlipToast = (props = {}) => {
  let typeClass
  switch (props.type) {
    case 'info':
      typeClass = infoClass
      break
    case 'success':
      typeClass = successClass
      break
    case 'warning':
      typeClass = warningClass
      break
    case 'danger':
      typeClass = dangerClass
      break
  }
  return html`
    <div class="bp-toast ${typeClass}">
        <img src="" width="25" height="25" />
        <p>${props.msg}</p>
        <button class="dismiss bp-btn bp-btn--c-white bp-btn--text-only">x</button>
    </div>
    `
}
