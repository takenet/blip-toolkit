import Component from 'nanocomponent'
import html from 'nanohtml'
// import raw from 'nanohtml/raw'
import { BlipDatepicker } from '../blipDatepicker'
import { DateHelper } from './../shared'
import { eventPathFindElementByTag } from './../../lib/utils'

const datepickerContainerClass = 'bp-daterange-datepicker'

const inputContainerClass = 'bp-daterange-inputs'
const startDateInputClass = 'bp-daterange-start-date'
const endDateInputClass = 'bp-daterange-end-date'

const dropdownClass = 'bp-daterange-dropdown'
const cancelButtonClass = 'bp-daterange-cancel'
const applyButtonClass = 'bp-daterange-apply'

export class BlipDaterangepicker extends Component {
  constructor(options) {
    super()

    options = options || {}

    this.months = options.months
    this.weekdays = options.weekdays

    this.cancelText = options.cancelText || 'Cancel'
    this.applyText = options.applyText || 'Apply'

    this.startTimeText = options.startTimeText || 'Initial time'
    this.endTimeText = options.endTimeText || 'End time'

    this.selectedPeriod = options.selectedPeriod
    this.validPeriod = options.validPeriod

    this.onSelection = options.onSelection

    this._leftPicker = new BlipDatepicker(this._datepickerOptions(this.startTimeText))
    this._rightPicker = new BlipDatepicker(this._datepickerOptions(this.endTimeText))
  }

  createElement() {
    const daterangepicker = html`
    <div class="bp-daterange-picker">
      <div class="${inputContainerClass}">
        <input type="text" class="${startDateInputClass}" readonly>
        <span>~</span>
        <input type="text" class="${endDateInputClass}" readonly>
      </div>
      <div class="${dropdownClass}" style="display: none;">
        <div class="${datepickerContainerClass}"></div>
        <div class="bp-daterange-buttons">
            <button class="bp-btn bp-btn--small ${cancelButtonClass}">${this.cancelText}</button>
            <button class="bp-btn bp-btn--small ${applyButtonClass}">${this.applyText}</button>
        </div>
      </div>
    </div>`

    const today = new Date()
    const lastMonth = DateHelper.moveMonth(today, -1)

    const datepickerContainer = daterangepicker.querySelector(`.${datepickerContainerClass}`)
    datepickerContainer.appendChild(this._leftPicker.render(lastMonth))
    datepickerContainer.appendChild(this._rightPicker.render(today))

    this._daterangepicker = daterangepicker
    this.inputContainer = daterangepicker.querySelector(`.${inputContainerClass}`)
    this.startDateInput = daterangepicker.querySelector(`.${startDateInputClass}`)
    this.endDateInput = daterangepicker.querySelector(`.${endDateInputClass}`)

    this.dropdown = daterangepicker.querySelector(`.${dropdownClass}`)
    this.cancelButton = daterangepicker.querySelector(`.${cancelButtonClass}`)
    this.applyButton = daterangepicker.querySelector(`.${applyButtonClass}`)

    this._addEventListeners()
    this._applyDate()

    return daterangepicker
  }

  _addEventListeners() {
    this.startDateInput.addEventListener('focus', this._pickerActive)
    this.endDateInput.addEventListener('focus', this._pickerActive)

    this.cancelButton.addEventListener('click', this._cancelDate)
    this.applyButton.addEventListener('click', this._applyDate)
  }

  _datepickerOptions(timeInputText) {
    let leftOriginalDate
    let rightOriginalDate
    let staticPicker

    return {
      hasTime: true,
      i18n: {
        months: this.months,
        weekdays: this.weekdays,
        timeInputText: timeInputText,
      },
      selectedPeriod: this.selectedPeriod,
      validPeriod: this.validPeriod,
      onMonthButtonClick: (event) => {
        const button = eventPathFindElementByTag(event, 'BUTTON')
        const offset = Number(button.value)

        this._leftPicker.monthDate = DateHelper.moveMonth(this._leftPicker.monthDate, offset)
        this._rightPicker.monthDate = DateHelper.moveMonth(this._rightPicker.monthDate, offset)
      },
      onDateSelectorShow: () => {
        leftOriginalDate = new Date(this._leftPicker.monthDate)
        rightOriginalDate = new Date(this._rightPicker.monthDate)

        if (this._leftPicker.isShowingSelector) {
          staticPicker = this._rightPicker
        } else if (this._rightPicker.isShowingSelector) {
          staticPicker = this._leftPicker
        }
        staticPicker.interactive = false
      },
      onDateSelectorHide: () => {
        if (DateHelper.isEqual(leftOriginalDate, this._leftPicker.monthDate)) {
          this._leftPicker.monthDate = DateHelper.moveMonth(this._rightPicker.monthDate, -1)
        } else if (DateHelper.isEqual(rightOriginalDate, this._rightPicker.monthDate)) {
          this._rightPicker.monthDate = DateHelper.moveMonth(this._leftPicker.monthDate, 1)
        }
        staticPicker.interactive = true
      },
      onDayHovering: (date) => {
        this._leftPicker.hoveringDate = date
        this._rightPicker.hoveringDate = date
      },
      onDaySelection: () => {
        if (this._leftPicker.selectedDay) {
          this._rightPicker.selectedDay = this._leftPicker.selectedDay
        } else if (this._rightPicker.selectedDay) {
          this._leftPicker.selectedDay = this._rightPicker.selectedDay
        }
      },
      onPeriodSelection: () => {
        if (this._leftPicker.selectedPeriod) {
          this._rightPicker.selectedPeriod = this._leftPicker.selectedPeriod
        } else if (this._rightPicker.selectedPeriod) {
          this._leftPicker.selectedPeriod = this._rightPicker.selectedPeriod
        }
      },
    }
  }

  _pickerActive = () => {
    this.dropdown.style.display = 'block'
    this.inputContainer.classList.add(`${inputContainerClass}--active`)
  }

  _pickerNotActive = () => {
    this.dropdown.style.display = 'none'
    this.inputContainer.classList.remove(`${inputContainerClass}--active`)
  }

  _setDateOnInput = (date, input) => {
    const renderTwoDigit = value => `0${value}`.slice(-2)

    const day = renderTwoDigit(date.getDate())
    const month = this.months[date.getMonth()].slice(0, 3)
    const year = date.getFullYear()
    const time = `${renderTwoDigit(date.getHours())}:${renderTwoDigit(date.getMinutes())}`

    input.value = `${day} ${month}, ${year} - ${time}`
  }

  _setHoursOnDate = (dateHours, dateToSet) => {
    return new Date(dateToSet.getFullYear(),
      dateToSet.getMonth(),
      dateToSet.getDate(),
      dateHours.getHours(),
      dateHours.getMinutes()
    )
  }

  _applyDate = () => {
    const period = this._leftPicker.selectedPeriod || this._rightPicker.selectedPeriod
    if (period) {
      const startDate = this._setHoursOnDate(this._leftPicker.monthDate, period.startDate)
      const endDate = this._setHoursOnDate(this._rightPicker.monthDate, period.endDate)

      this.selectedPeriod = { startDate, endDate }
      this._setDateOnInput(startDate, this.startDateInput)
      this._setDateOnInput(endDate, this.endDateInput)

      if (this.onSelection) {
        this.onSelection(period)
      }
    }

    this._pickerNotActive()
  }

  _cancelDate = () => {
    this._leftPicker.selectedPeriod = this.selectedPeriod
    this._rightPicker.selectedPeriod = this.selectedPeriod

    this._pickerNotActive()
  }
}
