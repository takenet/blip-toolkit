import { BlipToasts } from '../src/components/blipToasts'

const toasts = new BlipToasts()
const toastsElement = toasts.render()
document.getElementById('toasts').appendChild(toastsElement)

toasts.success({
  msg: 'Never f*ing give up. Menos desculpas e mais action. O inconformismo é o combustível da alta performance.',
  title: 'Uhul conseguimos!',
  duration: 4000,
})

const showAlert = () => {
  alert('LOLOLOLOL')
}
toasts.warning({
  msg: 'Never f*ing give up. Menos desculpas e mais action. O inconformismo é o combustível da alta performance.',
  // title: 'Atendimento foi transferido',
  duration: 3000,
  buttonText: 'Alert!',
  callback: showAlert,
})

toasts.info({
  msg: 'Never f*ing give up. Menos desculpas e mais action. O inconformismo é o combustível da alta performance.',
  title: 'Você possui atualizações!',
  duration: 3000,
})

toasts.danger({
  msg: 'Never f*ing give up. Menos desculpas e mais action. O inconformismo é o combustível da alta performance.',
  // title: 'Ops... algo deu errado!',
  duration: 3000,
})

const callback = () => {
  location.reload()
}
setTimeout(() => {
  toasts.refresh({
    msg: 'Never f*ing give up. Menos desculpas e mais action. O inconformismo é o combustível da alta performance.',
    title: 'Teste de refresh',
    buttonText: 'Atualizar',
    callback: callback,
    duration: 3000,
  })
}, 2000)
