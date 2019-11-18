import { BlipInput } from '../src/components/blipInput'

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
