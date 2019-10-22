# Blip Textarea

Blip Textarea is a JavaScript plugin that allows you to show a custom modal. We are using [nanocomponent](https://github.com/choojs/nanocomponent) to get a decent and clean lifecycle to our components.

## Usage

```javascript
import { BlipTextarea } from 'blip-toolkit'

const textarea = new BlipTextarea({
  onFinish: value => console.log(value)
})

const textareaElement = textarea.render({
  label: 'Conteúdo',
  placeholder: 'Insira aqui o conteúdo',
  editMode: false,
})

document.body.appendChild(textareaElement)
```

## Options

| Property      | Type       | Default     | Description                                 |
| ------------- | ---------- | ----------- | ------------------------------------------- |
| `label`       | `string`   | `undefined` | Label of textarea                           |
| `placeholder` | `string`   | `undefined` | Placeholder of textarea                     |
| `editMode`    | `boolean`  | `undefined` | Set if component is in edit mode            |
| `onFinish`    | `function` | `undefined` | Callback for get value after exit edit mode |
