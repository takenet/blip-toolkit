import { BlipTag } from '../src/components/blipTag'

const tag = new BlipTag({
  toggleCollapse: true,
  canRemoveTag: true,
  onRemove: () => console.log('tagRemoved'),
  canChangeBackground: true,
  onSelectColor: ({ $event: { color, tag } }) => console.log(color, tag),
})

const myTag = tag.render({
  label: 'My tag',
  background: 'black',
})

document.getElementById('my-tag').appendChild(myTag)
