# Blip Input

Blip input is a JavaScript plugin to customize your input. We are using [nanocomponent](https://github.com/choojs/nanocomponent) to get a decent and clean lifecycle to our components. It can be used for text, password, email and url input with validations.

## Usage

```javascript
import { BlipInput } from 'blip-toolkit'
const blipInput = new BlipInput()
const blipInputComponent = blipInput.render()
document.body.appendChild(blipInputComponent)
```

Youn can also pass options to `BlipInput` instance or props to is component

```javascript
import { BlipInput } from 'blip-toolkit'
const blipInput = new BlipInput({ placeholder: 'Type some text', id: 'input-text' })
const blipInputComponent = blipInput.render({ label: 'Text' })
document.body.appendChild(blipInputComponent)
```

To update select options programatically, call `render()` method with new options.

```javascript
blipInput.render({
  customError: 'This is a custom error',
})
```

## Instance options

`BlipInput` is flexible, so you can pass some options and callbacks to be executed during usage. This component has **options** and **rendered properties**, as youy can see at [nanocomponent docs](https://github.com/choojs/nanocomponent).

---

#### `id` - string

Input id

---

#### `name` - string

Input name

---

#### `type` - string

Input type [text(default), password, email, url]

---

#### `placeholder` - string

Input placeholder

---

#### `required` - boolean

If the input is required or not

---

#### `minLength` - string

Input minLength

---

#### `maxLength` - string

Input maxlength

---

#### `id` - string

Input id

---

#### `showPasswordStrength` - boolean [only for password input]

If it should show or not the password strength chart (default: true)

---

#### `requiredErrorMsg` - string

Message error for required empty input (default: 'This is a required field')

---

#### `maxLengthErrorMsg` - string

Message error for input with more than max length characters (default: 'The value is too long')

---

#### `minLengthErrorMsg` - string

Message error for input with less than min length characters (default: 'The value is too short')

---

#### `emailTypeErrorMsg` - string

Message error for email input with invalid value (default: 'This is not a valid email')

---

#### `urlTypeErrorMsg` - string

Message error for url input with invalid value (default: 'This is not a valid website')

---


## Rendered properties

#### `value` - string

Input value

---

#### `customError` - string

Input custom error. If it is set with a value, the input is considered invalid and shows the custom error message

---

#### `label` - string

Input label

---

#### `focused` - boolean

If the input is focused

---

#### `valid` - boolean

If the input is valid. It is read only

---

## Callbacks

#### `onInputFocus` - function

Callback executed on input focus

---

#### `onInputBlur` - function

Callback executed on input blur

---

#### `onInputChange` - function

Callback executed when iput is changed. It carries the input value as payload

---

#### `onInputError` - function

Callback executed when input trows an error. It carries the error value as payload

---

