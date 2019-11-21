import { BlipDaterangepicker } from '../src/components/blipDaterangepicker'

const daterangepicker = new BlipDaterangepicker({
  hasTime: true,
  onSelection: ($period) => {
    console.log('selected period', $period)
  },
})

const daterangepickerParent = document.getElementById('daterangepicker')
daterangepickerParent.appendChild(daterangepicker.render())
