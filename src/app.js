import './scss/main.scss'
import { BlipSelect } from './components/blipSelect/blipSelect'

const instance = new BlipSelect(document.getElementById('my-select'), {
  label: 'Custom select',
  placeholder: 'My placeholder',
  onSelectOption: ({ $event: { value, label } }) => console.log(value, label),
})

const { value, label } = instance.getValue()
window.test = () => console.log(value, label) //eslint-disable-line
