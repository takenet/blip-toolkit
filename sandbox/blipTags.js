import { BlipTags } from '../src/components/blipTags'

const tagList = document.getElementById('tag-list')
const tags = new BlipTags({
  onTagAdded: ({ $event }) => console.log('tagAdded', $event),
  onTagRemoved: ({ $event }) => console.log('tagRemoved', $event),
  promptTextCreator: 'Criar tag',
  mode: 'full',
  canRemoveTags: true,
})

tagList.appendChild(tags.render({
  tags: [{ label: 'fdsafdfdsafdsfdsfdsafdsaf4t5fsdasaa', background: 'red' }, { label: 'afdsafdsfdsafdasfadsfdsa' }, { label: 'dffdsfdsafdsaasf4c' }, { label: 'a' }, { label: 'b' }],
  options: [{ label: 'a', background: 'red' }, { label: 'b' }, { label: 'c' }, { label: 'd', background: 'black' }],
}))
