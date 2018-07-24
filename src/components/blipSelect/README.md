# Blip Select

Blip select is a JavaScript plugin to customize your select. We are using [nanocomponent](https://github.com/choojs/nanocomponent) to get a decent and clean lifecycle to our components. You can use just as custom select or autocomplete behavior.

## [Example](https://codesandbox.io/s/146p3r1wx7)

## Usage

```javascript
import { BlipSelect } from 'blip-toolkit'
const blipSelect = new BlipSelect()
const selectElement = blipSelect.render({
  options: [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ]
})

document.body.appendChild(selectElement)
```

Youn can also pass options to `BlipSelect` instance

```javascript
import { BlipSelect } from 'blip-toolkit'
const blipSelect = new BlipSelect({
  label: 'Custom Select',
  onSelectOption: () => console.log('Option selected!')
})

document.body.appendChild(blipSelect.render({
  options: [{ label: 'Option 1', value: 'opt1' }],
}))
```

To update select options programatically, call `render()` method with new options.

```javascript
const newOptions = [{
  label: 'New option 1',
  value: 'newOpt1',
}]

blipSelect.render({
  options: newOptions,
})
```

## Instance options

`BlipSelect` is flexible, so you can pass some options and callbacks to be executed during usage. This component has **options** (callbacks and immutable properties, like 'label', 'mode' and etc) and **rendered properties**, as youy can see at [nanocomponent docs](https://github.com/choojs/nanocomponent).

---

#### `label` - string

Select label

---

#### `mode` - string (select | autocomplete)

`BlipSelect` has two different behaviors: *select* and *autocomplete*. *select* is default behavior. In *autocomplete* mode, you can search for options and select one of them.

---

#### `noResultsText` - string

You can customize message when no results found. Works only on *autocomplete* behavior.

---

#### `isDisabled` - boolean

You can set select as `disabled`

```js
instance.isDisabled = true
```

---

#### `canAddOption` - object

You can have a select that can add new options to options list, if the search results for user input is empty. This behavior require `autocomplete` mode.

```javascript
const selectInstance = new BlipSelect({
  mode: 'autocomplete',
  canAddOption: {
    text: 'Add new option',
  },
})

document.body.appendChild(
  selectInstance.render({
    options: [{ label: 'Option 1', value: 'opt1' }]
  })
)
```

---

#### `clearAfterAdd` - boolean

Clear input after add new option

---

## Rendered properties

#### `options` - array

Options list

---

#### `inputValue` - string

Input value to be initiated with select

---

## Methods

#### `setValue(object)` - function

Set value to select (also fires onSelectOption event). You need to pass a object, with value or label property

```js
instance.setValue({
  value: 'optionValue',
  label: 'My label',
})
```

#### `getValue` - function

Returns current instance value

```js
const { value, label } = instance.getValue()
```

#### `destroy` - function

Destroy element instance


#### `clearInput` - function

Clear input value

---

## Callbacks

#### `beforeOpenSelect` - function

Callback executed before select open

---

#### `afterOpenSelect` - function

Callback executed after select open

---

#### `beforeCloseSelect` - function

Callback executed before select close

---

#### `afterCloseSelect` - function

Callback executed after select close

---

#### `onFocus` - function

Callback executed when select is focused

---

#### `onBlur` - function

Callback executed when select is blured

#### `onInputChange` - function

**autocomplete mode only**. Callback executed on every input change. Every `BlipSelect` event that receives any argument, has the follows structure:

```js
{
  $event: {
    // event value
  }
}
```

So, in `onInputChange` callback, we have the follow value:
```js
{
  $event: {
    value: 'Input value',
    event: DOMEvent
  }
}
```

We encourage use this `$event` value with _ES6 destructing assignment_, as follow:

```js
new BlipSelect(element, {
  onInputChange: ({ $event : { value, event }}) => console.log(value, event)
})
```

We adopt this pattern to avoid make our events more clearly and predictable to user.

---

#### `onSelectOption` - function

Takes one `$event` argument, that have two properties: `value` and `label`

```js
new BlipSelect(element, {
  onSelectOption: ({ $event : { value, label }}) => console.log(value, label)
})
```

### `onAddNewOption` - function

**autocomplete and canAddOption properties required**. Takes one `$event` argument, that have three properties: `value`, `label` and `element`

```js
new BlipSelect(element, {
  mode: 'autocomplete',
  canAddOption: {
    text: 'Add option',
  },
  onAddNewOption: ({ $event : { value, label, element }}) => console.log(value, label, element)
})
```
---

#### `customSearch` - function

You can pass a custom search to instance

```js
// This search returns items that ends with query search
new BlipSelect(element, {
  mode: 'autocomplete',
  customSearch: ({ $event }) => {
    const { query, items } = $event
    return items.filter(i => i.endsWith(query))
  }
})
```
