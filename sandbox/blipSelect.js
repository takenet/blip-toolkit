import { BlipSelect } from '../src/components/blipSelect'
const amazingSelect = document.getElementById('select')
const selectInstance = new BlipSelect({
  onSelectOption: ($event) => console.log($event),
  placeholderIcon: '<img src="https://png.pngtree.com/svg/20170418/work_155602.png" />',
  descriptionPosition: 'bottom',
  canAddOptions: {
    text: 'Criar organização',
    alwaysEnabled: true,
  },
  clearAfterAdd: false,
  onAddOption: ({ $event: { value, label, element } }) => console.log(value, label, element),
})
const select = selectInstance.render({
  options: [
    {
      label: 'Option 1',
      description: 'My description here',
      icon: '<img src="https://png.pngtree.com/svg/20170418/work_155602.png" />',
      value: 'opt1',
    },
    {
      label: 'Option 12',
      description: 'My description here',
      icon: '<img src="https://png.pngtree.com/svg/20170418/work_155602.png" />',
      value: 'opt2',
    },
    {
      label: 'Option 3',
      description: 'My description here',
      icon: '<img src="https://png.pngtree.com/svg/20170418/work_155602.png" />',
      value: 'opt3',
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
  ],
})

amazingSelect.appendChild(select)
selectInstance.setValue({ value: 'opt3' })

window.setValue = function (val) {
  selectInstance.setValue({
    label: val,
  })
}
