import Component from 'nanocomponent'
import html from 'nanohtml'
import raw from 'nanohtml/raw'

import { BlipDatepicker } from '../blipDatepicker'
import { DateHelper, Period } from './../shared'
import { eventPathFindElementByTag } from './../../lib/utils'

import Calendar from '../../img/calendar-outline.svg'

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

    this.hasTime = options.hasTime || false

    this.months = options.months || DateHelper.months
    this.weekdays = options.weekdays || DateHelper.weekdays

    this.cancelText = options.cancelText || 'Cancel'
    this.applyText = options.applyText || 'Apply'

    this.startDatePlaceholder = options.startDatePlaceholder || 'Start date' + (this.hasTime ? ' and time' : '')
    this.endDatePlaceholder = options.endDatePlaceholder || 'End date' + (this.hasTime ? ' and time' : '')

    this.startTimeText = options.startTimeText || 'Initial time'
    this.endTimeText = options.endTimeText || 'End time'

    this._selectedPeriod = options.selectedPeriod
    this.validPeriod = options.validPeriod

    this.onSelection = options.onSelection

    this._leftPicker = new BlipDatepicker(this._datepickerOptions(this.startTimeText))
    this._rightPicker = new BlipDatepicker(this._datepickerOptions(this.endTimeText))
  }

  get selectedPeriod() {
    return this._selectedPeriod
  }

  set selectedPeriod(newPeriod) {
    const [startDate, endDate] = [new Date(newPeriod.startDate), new Date(newPeriod.endDate)]
    const period = new Period(startDate, endDate)

    this._selectedPeriod = period
    this._leftPicker.selectedPeriod = period
    this._rightPicker.selectedPeriod = period

    this._setHoursOnDate(this._leftPicker.monthDate, period.startDate)
    this._setHoursOnDate(this._rightPicker.monthDate, period.endDate)

    this._setDateOnInput(period.startDate, this.startDateInput)
    this._setDateOnInput(period.endDate, this.endDateInput)

    this._leftPicker.monthDate = period.startDate
    this._rightPicker.monthDate = DateHelper.moveMonth(period.startDate, 1)
  }

  createElement() {
    const daterangepicker = html`
    <div class="bp-daterange-picker">
      <div class="${inputContainerClass}">
        <div class="bp-daterange-icon">${raw(Calendar)}</div>
        <input type="text" class="${startDateInputClass}" placeholder="${this.startDatePlaceholder}" readonly>
        <span>~</span>
        <input type="text" class="${endDateInputClass}" placeholder="${this.endDatePlaceholder}" readonly>
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
    this._setButtonsVisibility()
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
      hasTime: this.hasTime,
      i18n: {
        months: this.months,
        weekdays: this.weekdays,
        timeInputText: timeInputText,
      },
      selectedPeriod: this._selectedPeriod,
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
        this._setButtonsVisibility()
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

  _setButtonsVisibility() {
    const difference = DateHelper.monthDifference(this._leftPicker.monthDate, this._rightPicker.monthDate)
    const display = difference !== 1

    this._leftPicker.showNext = display
    this._rightPicker.showPrev = display
  }

  _pickerActive = () => {
    this.dropdown.style.display = 'block'
    this.inputContainer.classList.add(`${inputContainerClass}--active`)
  }

  _pickerNotActive = () => {
    if (this._selectedPeriod) {
      this._leftPicker.monthDate = this._selectedPeriod.startDate
      this._rightPicker.monthDate = DateHelper.moveMonth(this._selectedPeriod.startDate, 1)
      this._setButtonsVisibility()
    }

    this._leftPicker.showSelector = false
    this._rightPicker.showSelector = false

    this.dropdown.style.display = 'none'
    this.inputContainer.classList.remove(`${inputContainerClass}--active`)
  }

  _setDateOnInput = (date, input) => {
    const renderTwoDigit = value => `0${value}`.slice(-2)

    const day = renderTwoDigit(date.getDate())
    const month = this.months[date.getMonth()].slice(0, 3)
    const year = date.getFullYear()
    const time = `${renderTwoDigit(date.getHours())}:${renderTwoDigit(date.getMinutes())}`

    input.value = `${day} ${month}, ${year}${this.hasTime ? ` - ${time}` : ''}`
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

      this._selectedPeriod = { startDate, endDate }
      this._setDateOnInput(startDate, this.startDateInput)
      this._setDateOnInput(endDate, this.endDateInput)

      if (this.onSelection) {
        this.onSelection(this._selectedPeriod)
      }
    }

    this._pickerNotActive()
  }

  _cancelDate = () => {
    if (this._selectedPeriod) {
      this._leftPicker.selectedPeriod = this._selectedPeriod
      this._rightPicker.selectedPeriod = this._selectedPeriod
    }

    this._pickerNotActive()
  }
}
