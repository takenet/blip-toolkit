import { BlipSelect } from '../src/components/blipSelect'
const amazingSelect = document.getElementById('select')
const selectInstance = new BlipSelect({
  onSelectOption: ($event) => console.log($event),
})
const select = selectInstance.render({
  options: [
    {
      label: 'Option 1',
      value: 'opt1',
    },
    {
      label: 'Option 12',
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
  ],
})

amazingSelect.appendChild(select)
selectInstance.setValue({ value: 'opt3' })

window.setValue = function (val) {
  selectInstance.setValue({
    label: val,
  })
}
