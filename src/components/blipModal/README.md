# Blip Modal

Blip Modal is a JavaScript plugin that allows you to show a custom modal. We are using [nanocomponent](https://github.com/choojs/nanocomponent) to get a decent and clean lifecycle to our components.

## Usage

```javascript
import { BlipModal } from 'blip-toolkit'

new BlipModal({
  target: 'my-modal',
})
```

```html

<button id="my-modal">Open modal</button>

<!-- ".bp-modal-template" class is needed to hide modal until trigger button is fired -->
<div class="bp-modal-template" ref="my-modal">
  <h1>Hello, I'm a modal!</h1>
</div>
```

## Options

| Property | Type | Default | Description |
| -------- | ---- | -------- | ----------- |
| `target` | `string` | `undefined` | Target ID to trigger modal |
| `onOpen` | `function` | `() => {}` | Callback called when modal is opened
| `onConfirm` | `function` | `() => {}` | Callback called when user clicks confirmation button
| `onCancel` | `function` | `() => {}` | Callback called when user clicks on cancel button
| `closeOnOverlayClick` | `boolean` | `true` | Close modal on clicks outside them
| `closeOnConfirm` | `boolean` | `true` | Close modal on user clicks on confirm
| `closeOnCancel` | `boolean` | `true` | Close modal on user clicks on cancel
| `confirmButton` | `object` | `{ text: 'Confirm', classes: '' }` | Define text and classes for confirm button
| `confirmCancel` | `object` | `{ text: 'Cancel', classes: '' }` | Define text and classes for cancel button

## Methods

#### `open` - function

Open modal programatically

#### `close` - function

Close modal programatically
