# Blip Select

Blip select is a JavaScript library for customize your select. You can use just as custom select or autocomplete behavior.

## Usage

```html
<select id="amazing-select">
  <option value="Option 1">Option 1</option>
  <option value="Option 2">Option 2</option>
  <option value="Option 3">Option 3</option>
</select>

<script type="text/javascript">
  import { BlipSelect } from 'blip-toolkit'
  const amazingSelect = document.getElementById('amazing-select')
  const blipSelect = new BlipSelect(amazingSelect)
</script>
```

Youn can also pass options to `BlipSelect` instance

```html
<select id="amazing-select">
  <option value="Option 1">Option 1</option>
  <option value="Option 2">Option 2</option>
  <option value="Option 3">Option 3</option>
</select>

<script type="text/javascript">
  import { BlipSelect } from 'blip-toolkit'
  const amazingSelect = document.getElementById('amazing-select')
  const blipSelect = new BlipSelect(amazingSelect, {
    label: 'Custom Select',
    onSelectOption: () => console.log('Option selected!')
  })
</script>
```

## Options

`BlipSelect` is flexible, so you can pass some options and callbacks to be executed during usage

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

#### `onInputChange` - function

Callback executed on every input change. Every `BlipSelect` event that receives any argument, has the follows structure:

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
