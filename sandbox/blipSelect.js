import { BlipSelect } from '../src/components/blipSelect'
const amazingSelect = document.getElementById('select')
const selectInstance = new BlipSelect({
  onSelectOption: ($event) => console.log($event),
  placeholderIcon: '<img src="https://s3-eu-central-1.amazonaws.com/centaur-wp/designweek/prod/content/uploads/2019/06/27172619/3_adidas_originals.jpg" />',
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
    },
    {
      label: 'Option 3',
      description: 'My description here',
      icon: '<img src="https://miro.medium.com/max/1161/1*cJUVJJSWPj9WFIJlvf7dKg.jpeg" />',
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
// selectInstance.setValue({ value: 'opt3' })

window.setValue = function (val) {
  selectInstance.setValue({
    label: val,
  })
}
