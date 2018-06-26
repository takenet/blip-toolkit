# BlipTags

BlipTags is a JavaScript plugin that concatenate multiple `BlipTag` instances.

## Usage

```html
<div id="tag-list"></div>

<script type="text/javascript">
import { BlipTags } from 'blip-toolkit'

const tags = new BlipTags(document.getElementById('tag-list'), {
  onTagAdded: ({ $event }) => console.log('tagAdded', $event),
  onTagRemoved: ({ $event }) => console.log('tagRemoved', $event),
  onSelectTagColor: ({ $event }) => => console.log('tagColorSelected', $event),
  addTagText: 'Add tag',
})
</script>
```

## Options

#### `addTagText` - string

Label text to add new tags

#### `tags` - array

You can pass a set of pre-defined tags to bind into component

```javascript
const tags = [
  { label: 'Label 1', color: 'blue' },
  { label: 'Label 2', color: 'white' },
]
const tags = new BlipTags(element, {
  tags
})
```

## Callbacks

#### `onTagAdded`

Callback invoked when new tag is added

```javascript
const tags = new BlipTags(element, {
  onTagAdded: ({ $event: { value, label } }) => console.log('tagAdded', value, label),
})
```

#### `onTagRemoved`

Callback invoked when tag is removed

```javascript
const tags = new BlipTags(element, {
  onTagRemoved: ({ $event: { element, id, label } }) => console.log('tagRemoved', element, id, label),
})
```

#### `onSelectTagColor`

Callback invoked when tag has backgorund color changes

```javascript
const tags = new BlipTags(element, {
  onSelectTagColor: ({ $event: { color, tag } }) => console.log('tagBackgroundChanged', color, tag),
})
```

## Methods

#### `addTag(label: string)`

Method to programatically add a tag

```javascript
const tags = new BlipTags(element)
tags.addTag('New tag')
```
