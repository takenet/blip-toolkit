import { BlipSelect } from '../src/components/blipSelect'

const amazingSelect = document.getElementById('select')
const selectInstance = new BlipSelect({
  onSelectOption: ($event) => console.log($event),
  mode: 'autocomplete',
  descriptionPosition: 'bottom',
  canAddOptions: {
    text: 'Create a new',
    alwaysEnabled: true,
  },
  size: 'large',
  clearAfterAdd: false,
  noResultsText: 'Nothing here',
  noResultsFoundText: 'No results found',
  onAddOption: ({ $event: { value, label, element } }) => console.log(value, label, element),
  multiple: true,
})

const select = selectInstance.render({
  label: 'sdafas',
  options: [
    {
      label: 'Option 1',
      value: 'opt1',
    },
    {
      label: 'Option 2',
      value: 'opt2',
    },
    {
      label: 'Option 3',
      value: 'opt3',
    },
    {
      label: 'Option 4',
      value: 'opt4',
    },
    {
      label: 'Option 5',
      value: 'opt5',
    },
    {
      label: 'Option 6',
      value: 'opt6',
    },
    {
      label: 'Option 7',
      value: 'opt7',
    },
    {
      label: 'Option 8',
      value: 'opt8',
    },
    {
      label: 'Option 9',
      value: 'opt9',
    },
    {
      label: 'Option 10',
      value: 'opt10',
    },
    {
      label: 'Option 11',
      value: 'opt11',
    },
  ],
  selectedOptions: [
    {
      label: 'Option 2',
      value: 'opt2',
    },
    {
      label: 'Option 3',
      value: 'opt3',
    },
  ],
})

amazingSelect.appendChild(select)
// Uncomment if you want to test setValue
// selectInstance.setValue({ value: 'opt3' })

window.setValue = function (val) {
  selectInstance.setValue({
    label: val,
  })
}
