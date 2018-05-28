import './scss/main.scss'
import { BlipSelect } from './components/blipSelect/blipSelect'

new BlipSelect(document.getElementById('my-select'), {
  label: 'Custom select',
  mode: 'autocomplete',
  onInputChange: ({ $event: { value, event } }) => console.log(value, event),
})
