# BLiP Tag

Component is a pure JavaScript plugin that returns a tag element.

## Usage

```html
<div id="my-tag-list"></div>

<script type="text/javascript">
import { BlipTag } from 'blip-toolkit'

const tag = new BlipTag({
  label: 'My tag',
  onRemove: ({$event: { tag }}) => console.log('removed', tag),
  onSelectColor: ({$event: { color, tag }}) => console.log(color, tag),
})

// Append tag element to your list
document.getElementById('my-tag-list').appendChild(tag.element)
</script>
```

## Options

`BLiP Tag` is flexible, so you can pass some options and callbacks

---

#### `label` - string (required)

Tag label

#### `background` - string (optional)

Tag background (hexadecimal)

#### `color` - string (optional)

Tag text color (hexadecimal)

#### `id` - string (optional)

Tag custom id

#### `classes` - string (optional)

Tag classes

#### `canChangeBackground` - boolean

Select a set of colors to change tag background

#### `canRemoveTag` - boolean

Option to remove (or not) tag elemen from DOM

#### `mode` - string

Can be `full` or `compact`

## Callbacks

### `onRemove` - function

Callback executed after remove tag from DOM.
`params`: `{ $event: { tag: { element, id, label } } }`

### `onSelectColor` - function

Callback executed after select color.
`params`: `{ $event: { color } }`

## Methods

### `hideColorOptions`

Hide color options container
