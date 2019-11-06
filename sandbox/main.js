import '../src/scss/main.scss'
import { BlipSelect } from '../src/components/blipSelect'
import { BlipTag } from '../src/components/blipTag'
import { BlipTags } from '../src/components/blipTags'
import { BlipInput } from '../src/components/blipInput'
import { BlipLoading } from '../src/components/blipLoading'
import { BlipTabs } from '../src/components/blipTabs'
// import { BlipModal } from '../src/components/blipModal'
import { BlipToasts } from '../src/components/blipToasts'
import { BlipCarousel } from '../src/components/blipCarousel'
import { BlipDatepicker } from '../src/components/blipDatepicker'

const amazingSelect = document.getElementById('select')
const selectInstance = new BlipSelect({
  onSelectOption: ($event) => console.log($event),
})
const select = selectInstance.render({
  options: [
    {
      label: 'Option 1',
      value: 'opt1',
    },
    {
      label: 'Option 12',
      value: 'opt2',
    },
    {
      label: 'Option 3',
      value: 'opt3',
    },
    {
      label: 'Option 4',
      value: 'opt4',
    },
    {
      label: 'Option 5',
      value: 'opt5',
    },
  ],
})

amazingSelect.appendChild(select)
selectInstance.setValue({ value: 'opt3' })
const tagList = document.getElementById('tag-list')
const tags = new BlipTags({
  onTagAdded: ({ $event }) => console.log('tagAdded', $event),
  onTagRemoved: ({ $event }) => console.log('tagRemoved', $event),
  promptTextCreator: 'Criar tag',
  mode: 'full',
  canRemoveTags: true,
})

tagList.appendChild(tags.render({
  tags: [{ label: 'fdsafdfdsafdsfdsfdsafdsaf4t5fsdasaa', background: 'red' }, { label: 'afdsafdsfdsafdasfadsfdsa' }, { label: 'dffdsfdsafdsaasf4c' }, { label: 'a' }, { label: 'b' }],
  options: [{ label: 'a', background: 'red' }, { label: 'b' }, { label: 'c' }, { label: 'd', background: 'black' }],
}))

const tag = new BlipTag({
  toggleCollapse: true,
  canRemoveTag: true,
  onRemove: () => console.log('tagRemoved'),
  canChangeBackground: true,
  onSelectColor: ({ $event: { color, tag } }) => console.log(color, tag),
})

const myTag = tag.render({
  label: 'My tag',
  background: 'black',
})

document.getElementById('my-tag').appendChild(myTag)
window.setValue = function (val) {
  selectInstance.setValue({
    label: val,
  })
}

const EmailInput = new BlipInput({
  id: 'Email',
  name: 'Email',
  type: 'text',
  maxLength: 100,
  required: true,
  requiredErrorMsg: '@Localizer[ViewsForgotPasswordResourceKeys.EmailInvalidError]',
  maxLengthErrorMsg: '@Localizer[ViewsForgotPasswordResourceKeys.EmailInvalidError]',
  emailTypeErrorMsg: '@Localizer[ViewsForgotPasswordResourceKeys.EmailInvalidError]',
  autocomplete: 'off',
})
const EmailInputComponent = EmailInput.render({ label: '@Localizer[ViewsForgotPasswordResourceKeys.EmailLabel]' })
document.getElementById('input').appendChild(EmailInputComponent)

const blipInput2 = new BlipInput({ type: 'password', placeholder: 'Digite sua senha' })
const blipInputComponent2 = blipInput2.render({ label: 'site' })
document.getElementById('input').appendChild(blipInputComponent2)

const MaxMinInput = new BlipInput({
  id: 'Email',
  name: 'Email',
  type: 'text',
  maxLength: 100,
  minLength: 6,
  required: true,
  requiredErrorMsg: 'Campo obrigatório',
  maxLengthErrorMsg: 'Maximo de caracteres',
  minLengthErrorMsg: 'Mínimo de caracteres',
  autocomplete: 'off',
})
const MaxMinInputComponent = MaxMinInput.render({ label: 'MaxMinInput' })
document.getElementById('input').appendChild(MaxMinInputComponent)

const blipLoadingComponent = BlipLoading()
document.getElementById('loading').appendChild(blipLoadingComponent)

new BlipTabs('tabs')

/* new BlipModal({
  target: 'my-modal',
}) */

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
  duration: 0,
  buttonText: 'Alert!',
  callback: showAlert,
})

toasts.info({
  msg: 'Never f*ing give up. Menos desculpas e mais action. O inconformismo é o combustível da alta performance.',
  title: 'Você possui atualizações!',
  duration: 0,
})

toasts.danger({
  msg: 'Never f*ing give up. Menos desculpas e mais action. O inconformismo é o combustível da alta performance.',
  // title: 'Ops... algo deu errado!',
  duration: 0,
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
    duration: 0,
  })
}, 2000)

// const carouselItems = document.querySelectorAll('.bp-carousel-item')
const carousel = new BlipCarousel('carousel', 300)
carousel.render()

const picker = new BlipDatepicker(new Date(), {hasTime: true})
const pickerParent = document.getElementById('datepicker')

pickerParent.appendChild(picker.render())
