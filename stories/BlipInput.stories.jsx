// eslint-disable-next-line no-unused-vars
import React from 'react'
import { storiesOf } from '@storybook/react'
import toReact from 'nanocomponent-adapters/react'
import { BlipInput as NanoComponent } from '../src/components/blipInput'
import '../src/scss/main.scss'

// eslint-disable-next-line no-unused-vars
const BlipInput = toReact(NanoComponent, React)

storiesOf('Input', module)
  .add('text', () => (
    // Default type
    <BlipInput label="My Text input" />
  ))
  .add('password', () => (
    <BlipInput label="My Password Input" type="password" />
  ))
  .add('email', () => (
    <BlipInput label="My email input" type="email" />
  ))
  .add('url', () => (
    <BlipInput label="My URL input" type="url" />
  ))
  .add('regex', () => (
    <BlipInput
      label="My Regex input"
      type="regex"
      regex="[a-zA-Z]{3}"
    />
  ))
  .add('custom validation function', () => (
    <BlipInput
      label="My input"
      type="function"
      customValidationFunction={value => value.length >= 10}
    />
  ))
  .add('placeholder', () => (
    <BlipInput
      label="Password"
      type="password"
      placeholder="Insert your password"
    />
  ))
  .add('required', () => (
    <BlipInput
      label="Password"
      type="password"
      placeholder="Insert your password"
      required
    />
  ))
  .add('min and max length', () => (
    <BlipInput
      label="Username"
      minLength="3"
      maxLength="20"
    />
  ))
  .add('id', () => (
    <BlipInput label="Username" id="username" />
  ))
  .add('show password strength', () => (
    <BlipInput
      label="Password"
      type="password"
      placeholder="Insert your password"
      showPasswordStrength={false} />
  ))
  .add('change required message', () => (
    <BlipInput
      label="Password"
      type="password"
      placeholder="Insert your password"
      requiredErrorMsg="Please, insert your password!"
      required
   />
  ))
  .add('max length error message', () => (
    <BlipInput
      label="Letter"
      maxLength="1"
      maxLengthErrorMsg="Just write a letter!"
   />
  ))
  .add('min length error message', () => (
    <BlipInput
      label="Letters"
      minLength="2"
      minLengthErrorMsg="Write at least two letters!"
   />
  ))
  .add('email type error message', () => (
    <BlipInput
      label="Email"
      type="email"
      emailTypeErrorMsg="Invalid email..."
   />
  ))
  .add('URL type error message', () => (
    <BlipInput
      label="URL"
      type="url"
      emailTypeErrorMsg="Invalid URL..."
   />
  ))
  .add('Regex type error message', () => (
    <BlipInput
      label="My Regex input"
      type="regex"
      regex="[a-zA-Z]{3}"
      regexTypeErrorMsg="Enter three letters!"
   />
  ))
  .add('change the error message when custom validation pass function', () => (
    <BlipInput
      label="Name"
      type="function"
      customValidationFunction={value => value.length >= 10}
      functionTypeErrorMsg="Inserted a name that is greater than or equal to ten characters"
    />
  ))
  .add('pass a value', () => (
    <BlipInput
      label="Name"
      value="Johnatan"
    />
  ))
  .add('custom error message', () => (
    <BlipInput
      label="Name"
      customError="Custom error message"
    />
  ))
  .add('focused', () => (
    <BlipInput
      label="Name"
      focused
    />
  ))
  .add('pristine', () => (
    <BlipInput
      label="Name"
      pristine
    />
  ))
  .add('valid', () => (
    <BlipInput
      label="Name"
      valid={false}
    />
  ))
  .add('on input focus', () => (
    <BlipInput
      label="Name"
      onInputFocus={() => console.log('focused')}
    />
  ))
  .add('on input blur', () => (
    <BlipInput
      label="Name"
      onInputFocus={() => console.log('not focused')}
    />
  ))
  .add('on input change', () => (
    <BlipInput
      label="Name"
      onInputChange={value => console.log(`input changed to: ${value}`)}
    />
  ))
  .add('on input error', () => (
    <BlipInput
      label="Name"
      minLength="2"
      onInputError={error => console.error(`input error: ${error}`)}
    />
  ))
