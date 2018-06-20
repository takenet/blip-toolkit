# BLiP Tag

Component is a pure JavaScript plugin that returns a tag element.

## Usage

```html
<div id="my-tag-list"></div>

<script type="text/javascript">
import { BlipTag } from '../src/components/blipTag'

const tag = new BlipTag({
  label: 'My tag',
  onRemove: ({$event: { tag }}) => console.log('removed', tag),
  onSelectColor: ({$event: { color }}) => console.log(color),
})

// Append tag element to your list
document.getElementById('my-tag-list').appendChild(tag.element)
</script>
```

## Options

`BLiP Tag` is flexible, so you can pass some options and callbacks

---

#### `label` - string

Tag label

## Callbacks

### `onRemove` - function

Callback executed after remove tag from DOM.
`params`: `{ $event: { tag: { element, id, label } } }`

### `onSelectColor` - function

Callback executed after select color.
`params`: `{ $event: { color } }`
