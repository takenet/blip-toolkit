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
})

const select = selectInstance.render({
  label: 'sdafas',
  options: [
    {
      label: 'Option 1',
      description: 'My description here',
      icon: '<img src="https://png.pngtree.com/svg/20170418/work_155602.png" />',
      value: 'opt1',
    },
    {
      label: 'Option 2',
      description: 'My description here',
      icon: '<img src="https://png.pngtree.com/svg/20170418/work_155602.png" />',
      value: 'opt2',
      disabled: 'true',
    },
    {
      label: 'Option 3',
      description: 'My description here',
      icon: '<img src="https://cdn4.iconfinder.com/data/icons/finance-196/100/Big_Business-512.png" />',
      value: 'opt3',
      disabled: 'true',
    },
    {
      label: 'Option 4',
      description: 'My description here',
      icon: '<img src="https://png.pngtree.com/svg/20170418/work_155602.png" />',
      value: 'opt4',
    },
    {
      label: 'Option 5',
      description: 'My description here',
      icon: '<img src="https://png.pngtree.com/svg/20170418/work_155602.png" />',
      value: 'opt5',
    },
    {
      label: 'Option 6',
      description: 'My description here',
      icon: '<img src="https://png.pngtree.com/svg/20170418/work_155602.png" />',
      value: 'opt6',
    },
    {
      label: 'Option 7',
      description: 'My description here',
      icon: '<img src="https://png.pngtree.com/svg/20170418/work_155602.png" />',
      value: 'opt7',
    },
    {
      label: 'Option 8',
      description: 'My description here',
      icon: '<img src="https://png.pngtree.com/svg/20170418/work_155602.png" />',
      value: 'opt8',
    },
    {
      label: 'Option 9',
      description: 'My description here',
      icon: '<img src="https://png.pngtree.com/svg/20170418/work_155602.png" />',
      value: 'opt9',
    },
    {
      label: 'Option 10',
      description: 'My description here',
      icon: '<img src="https://png.pngtree.com/svg/20170418/work_155602.png" />',
      value: 'opt10',
    },
    {
      label: 'Option 11',
      description: 'My description here',
      icon: '<img src="https://png.pngtree.com/svg/20170418/work_155602.png" />',
      value: 'opt11',
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
