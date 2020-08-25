import Component from 'nanocomponent'
import html from 'nanohtml'
import raw from 'nanohtml/raw'
import { Period, DateHelper } from './../shared'
import { eventPathFindElementByTag } from './../../lib/utils'

import ArrowLeft from '../../img/arrow-ball-left-solid.svg'
import ArrowRight from '../../img/arrow-ball-right-solid.svg'
export class BlipDatepicker extends Component {
  static weekSize = 7
  static monthRows = 6
  static selectorRows = 4
  static selectorColumns = 3
  static timeInputText = 'Time'

  static style = {
    datepicker: 'bp-datepicker',
    monthTable: 'month-table',
    monthButton: 'month-button',
    monthPrev: 'month-prev',
    monthNext: 'month-next',
    monthTitle: 'month-title',
    yearInput: 'year-input',
    monthWeek: 'month-week',
    nextMonthWeek: 'next-month-week',
    weekdayWeek: 'weekday-week',
    weekDay: 'week-day',
    monthDay: 'month-day',
    lastMonth: 'last-month',
    nextMonth: 'next-month',
    invalidDay: 'invalid-day',
    currentMonth: 'current-month',
    rangeLimit: 'range-limit',
    inRange: 'in-range',
    timeContainer: 'time-container',
    timeInputContainer: 'time-input-container',
    timeInput: 'time-input',
    dateSelector: 'date-selector',
    dateSelectorOption: 'date-selector-option',
  }

  constructor(options) {
    super()

    options = options || {}

    this.name = options.name
    this.hasTime = options.hasTime || false

    this.i18n = options.i18n || {
      months: DateHelper.months,
      weekdays: DateHelper.weekdays,
      timeInputText: BlipDatepicker.timeInputText,
    }

    this._selectedPeriod = options.selectedPeriod
    this._validPeriod = options.validPeriod

    this._onMonthButtonClick = options.onMonthButtonClick || this._onMonthButtonClick
    this.onTimeChange = options.onTimeChange
    this.onDateSelectorShow = options.onDateSelectorShow
    this.onDateSelectorHide = options.onDateSelectorHide
    this.onDayHovering = options.onDayHovering
    this.onDaySelection = options.onDaySelection
    this.onPeriodSelection = options.onPeriodSelection
  }

  get isShowingSelector() {
    return this.pickMonth || this.pickYear
  }

  get monthDate() {
    return this._monthDate
  }

  get selectedDay() {
    return this._selectedDay
  }

  get selectedPeriod() {
    return this._selectedPeriod
  }

  set hoveringDate(newDate) {
    this._renderSelection(newDate)
  }

  set interactive(newValue) {
    this.showPrev = newValue
    this.showNext = newValue
    this._yearInput.disabled = !newValue
    this._timeInput.disabled = !newValue
    if (newValue) {
      this._addEventListeners()
    } else {
      this._removeEventListeners()
    }
  }

  set monthDate(newDate) {
    this._monthDate = new Date(newDate)
    this._renderMonth()
    if (this.hasTime) {
      this._renderTime()
    }
  }

  set selectedDay(newDate) {
    this._selectedDay = new Date(newDate)
    this._selectedPeriod = undefined
    this._renderSelection(newDate)
  }

  set selectedPeriod(newPeriod) {
    this._selectedPeriod = new Period(newPeriod.startDate, newPeriod.endDate)
    this._selectedDay = undefined
    this._renderSelection()
  }

  set showPrev(visibility) {
    this._setElementVisibility(this._prevButton, visibility)
  }

  set showNext(visibility) {
    this._setElementVisibility(this._nextButton, visibility)
  }

  set showSelector(visibility) {
    this._setElementVisibility(this._dateSelector, visibility)
  }

  createElement(monthDate) {
    this._datepicker = html`<div class="${BlipDatepicker.style.datepicker}"></div>`

    this._createMonthTable()
    this._createDateSelector()
    if (this.hasTime) {
      this._createTimeStructure()
    }

    this._addEventListeners()

    this.monthDate = new Date(monthDate)

    return this._datepicker
  }

  _createMonthTable() {
    const monthTable = html`
    <table class="${BlipDatepicker.style.monthTable}">
      <thead>
        <tr>
          <th>
            <button class="${BlipDatepicker.style.monthButton} ${BlipDatepicker.style.monthPrev}"
            value="-1">${raw(ArrowLeft)}</button>
          </th>
          <th colspan="6">
            <span class="${BlipDatepicker.style.monthTitle}"></span>
            <input class="${BlipDatepicker.style.yearInput}" type="number">
          </th>
          <th>
            <button class="${BlipDatepicker.style.monthButton} ${BlipDatepicker.style.monthNext}"
            value="1">${raw(ArrowRight)}</button>
          </th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>`

    const tableBody = monthTable.querySelector('tbody')

    const weekdayRow = tableBody.insertRow()
    weekdayRow.classList.add(BlipDatepicker.style.weekdayWeek)
    this.i18n.weekdays.forEach(day => {
      const weekDay = html`
      <td class="${BlipDatepicker.style.weekDay}" title="${day}">
        ${day[0]}
      </td>`
      weekdayRow.appendChild(weekDay)
    })

    const daysRows = []
    const monthDays = []
    for (let week = 0; week < BlipDatepicker.monthRows; week++) {
      const weekRow = tableBody.insertRow()
      this.i18n.weekdays.forEach(_ => {
        const monthDay = html`
        <td class="${BlipDatepicker.style.monthDay}">
          <div></div>
        </td>`
        monthDays.push(monthDay)
        weekRow.appendChild(monthDay)
      })
      daysRows.push(weekRow)
    }

    this._datepicker.appendChild(monthTable)

    this._monthTable = monthTable

    this._tableHead = monthTable.querySelector('thead')
    this._monthTitle = monthTable.querySelector(`.${BlipDatepicker.style.monthTitle}`)
    this._yearInput = monthTable.querySelector(`.${BlipDatepicker.style.yearInput}`)
    this._prevButton = monthTable.querySelector(`.${BlipDatepicker.style.monthPrev}`)
    this._nextButton = monthTable.querySelector(`.${BlipDatepicker.style.monthNext}`)

    this._tableBody = tableBody
    this._daysRows = daysRows
    this._monthDays = monthDays
  }

  _createDateSelector() {
    const dateSelector = html`
    <div class="${BlipDatepicker.style.dateSelector}" style="position: absolute;"></div>`

    const selectorOptions = []
    const selectorInputs = []
    for (let row = 0; row < BlipDatepicker.selectorRows; row++) {
      const rowDiv = html`<div></div>`
      for (let option = 0; option < BlipDatepicker.selectorColumns; option++) {
        const optionLabel = html`
        <label>
          <input type="radio" name="dateSelector" style="display: none;">
          <div></div>
        </label>`

        const radioInput = optionLabel.querySelector('input')
        const textDiv = optionLabel.querySelector('div')

        selectorOptions.push(textDiv)
        selectorInputs.push(radioInput)

        rowDiv.appendChild(optionLabel)
      }
      dateSelector.appendChild(rowDiv)
    }

    this.pickMonth = false
    this.pickYear = false
    this._setElementVisibility(dateSelector, false)

    this._datepicker.appendChild(dateSelector)

    this._dateSelector = dateSelector
    this._selectorOptions = selectorOptions
    this._selectorInputs = selectorInputs
  }

  _createTimeStructure() {
    const timeContainer = html`
    <div class="${BlipDatepicker.style.timeContainer}">
      ${this.i18n.timeInputText}
    </div>`

    const timeInputContainer = html`
    <div class="${BlipDatepicker.style.timeInputContainer}">
      <input class="${BlipDatepicker.style.timeInput}" type="time" required />
    </div>`

    timeContainer.appendChild(timeInputContainer)

    this._datepicker.appendChild(html`<hr>`)
    this._datepicker.appendChild(timeContainer)

    this._timeInput = timeInputContainer.querySelector('input')
  }

  _setElementVisibility(element, visibility) {
    element.style.visibility = visibility ? 'visible' : 'hidden'
  }

  _isValidDay(day) {
    return day.classList.contains(BlipDatepicker.style.currentMonth) && !day.classList.contains(BlipDatepicker.style.invalidDay)
  }

  _renderMonth() {
    const monthName = this.i18n.months[this.monthDate.getMonth()]
    this._monthTitle.innerText = monthName
    this._yearInput.value = this.monthDate.getFullYear()

    const firstDay = DateHelper.thisMonth(this.monthDate)
    const firstDayNextMonth = DateHelper.moveMonth(firstDay, 1)
    let firstDayOfWeek = DateHelper.moveDay(firstDay, -firstDay.getDay())

    this._daysRows.forEach(
      week => {
        week.className = firstDayOfWeek < firstDayNextMonth
          ? BlipDatepicker.style.monthWeek
          : BlipDatepicker.style.nextMonthWeek

        Array.from(week.cells).forEach(
          (day, index) => {
            const dayDate = DateHelper.moveDay(firstDayOfWeek, index)

            const dateDiv = day.querySelector('div')
            dateDiv.innerText = dayDate.getDate()

            day.setAttribute('time', dayDate.getTime())
            day.className = BlipDatepicker.style.monthDay

            switch (DateHelper.monthDifference(firstDay, dayDate)) {
              case -1:
                day.classList.add(BlipDatepicker.style.lastMonth)
                break
              case 0:
                day.classList.add(BlipDatepicker.style.currentMonth)
                break
              case 1:
                day.classList.add(BlipDatepicker.style.nextMonth)
                break
            }
            if (this._validPeriod && !DateHelper.isBetween(this._validPeriod.startDate, this._validPeriod.endDate, dayDate)) {
              day.classList.add(BlipDatepicker.style.invalidDay)
            }
          }
        )
        firstDayOfWeek = DateHelper.moveDay(firstDayOfWeek, BlipDatepicker.weekSize)
      }
    )
    this._renderSelection(this._selectedDay)
  }

  _renderSelection(hoverDate) {
    this._monthDays.forEach(
      dayCell => {
        if (this._isValidDay(dayCell)) {
          dayCell.classList.remove(BlipDatepicker.style.rangeLimit)
          dayCell.classList.remove(BlipDatepicker.style.inRange)

          const dayDate = new Date(Number(dayCell.getAttribute('time')))

          if (this._selectedPeriod) {
            if (DateHelper.isSameDay(this._selectedPeriod.startDate, dayDate) || DateHelper.isSameDay(this._selectedPeriod.endDate, dayDate)) {
              dayCell.classList.add(BlipDatepicker.style.rangeLimit)
            }
            if (DateHelper.isBetween(this._selectedPeriod.startDate, this._selectedPeriod.endDate, dayDate)) {
              dayCell.classList.add(BlipDatepicker.style.inRange)
            }
          } else if (this._selectedDay && hoverDate) {
            if (DateHelper.isSameDay(this._selectedDay, dayDate)) {
              dayCell.classList.add(BlipDatepicker.style.rangeLimit)
            }
            if (DateHelper.isBetween(this._selectedDay, hoverDate, dayDate)) {
              dayCell.classList.add(BlipDatepicker.style.inRange)
            }
          }
        }
      }
    )
  }

  _renderMonthOptions() {
    return this.i18n.months.map(
      (monthName, index) => ({text: monthName.substr(0, 3), value: index})
    )
  }

  _renderYearOptions(baseYear) {
    const optionsSize = this.i18n.months.length
    const baseYearIndex = baseYear % optionsSize

    return Array.from({length: optionsSize},
      (_, index) => {
        const year = String(baseYear + index - baseYearIndex)
        return { text: year, value: year }
      })
  }

  _renderDateSelector(options, selected = undefined) {
    const addPxToValue = value => `${value}px`
    const { height: theadHeight } = this._tableHead.getBoundingClientRect()

    this._dateSelector.style.top = addPxToValue(theadHeight)
    this._dateSelector.style.height = addPxToValue(this._tableBody.offsetHeight)
    this._dateSelector.style.width = addPxToValue(this._tableBody.offsetWidth)

    this._selectorOptions.forEach(
      (option, index) => {
        option.innerText = options[index].text
      })

    this._selectorInputs.forEach(
      (input, index) => {
        input.value = options[index].value
      })

    if (this.pickMonth) {
      this._yearInput.style.display = 'none'
      this.showPrev = false
      this.showNext = false
    }

    if (this.pickYear) {
      this._monthTitle.style.display = 'none'

      this._prevButton.removeEventListener('click', this._onMonthButtonClick)
      this._nextButton.removeEventListener('click', this._onMonthButtonClick)

      this._prevButton.addEventListener('click', this._onYearRangeClick)
      this._nextButton.addEventListener('click', this._onYearRangeClick)

      this.showPrev = true
      this.showNext = true
    }

    if (selected) {
      this._selectorInputs[selected].checked = true
    } else {
      this._selectorInputs.forEach(input => { input.checked = false })
    }
    this._setElementVisibility(this._dateSelector, true)

    if (this.onDateSelectorShow) this.onDateSelectorShow()
  }

  _clearDateSelector() {
    if (this.pickMonth) {
      this.showPrev = true
      this.showNext = true
      this._yearInput.style.display = 'initial'
    }

    if (this.pickYear) {
      this._monthTitle.style.display = 'initial'

      this._prevButton.removeEventListener('click', this._onYearRangeClick)
      this._nextButton.removeEventListener('click', this._onYearRangeClick)

      this._prevButton.addEventListener('click', this._onMonthButtonClick)
      this._nextButton.addEventListener('click', this._onMonthButtonClick)
    }

    this.pickMonth = false
    this.pickYear = false

    this._setElementVisibility(this._dateSelector, false)
    this._selectorOptions.forEach(option => { option.innerText = '' })

    if (this.onDateSelectorHide) this.onDateSelectorHide()
  }

  _renderTime() {
    const renderTwoDigit = value => `0${value}`.slice(-2)

    const hours = renderTwoDigit(this.monthDate.getHours())
    const minutes = renderTwoDigit(this.monthDate.getMinutes())

    this._timeInput.value = `${hours}:${minutes}`
  }

  _addEventListeners() {
    this._prevButton.addEventListener('click', this._onMonthButtonClick)
    this._nextButton.addEventListener('click', this._onMonthButtonClick)

    this._monthTitle.addEventListener('click', this._onMonthTitleClick)
    this._yearInput.addEventListener('click', this._onYearInputClick)
    this._yearInput.addEventListener('keyup', this._onYearInputKeyup)

    this._selectorInputs.forEach(
      input => {
        input.addEventListener('click', this._onDateSelection)
      })

    this._monthDays.forEach(
      day => {
        day.addEventListener('mouseover', this._onDayHover)
        day.addEventListener('click', this._onDayClick)
      })

    if (this.hasTime) {
      this._timeInput.addEventListener('change', this._onTimeInputChange)
      this._timeInput.addEventListener('keyup', this._onTimeInputKeyup)
    }
  }

  _removeEventListeners() {
    this._prevButton.removeEventListener('click', this._onMonthButtonClick)
    this._nextButton.removeEventListener('click', this._onMonthButtonClick)

    this._monthTitle.removeEventListener('click', this._onMonthTitleClick)
    this._yearInput.removeEventListener('click', this._onYearInputClick)
    this._yearInput.removeEventListener('keyup', this._onYearInputKeyup)

    this._selectorInputs.forEach(
      input => {
        input.removeEventListener('click', this._onDateSelection)
      })

    this._monthDays.forEach(
      day => {
        day.removeEventListener('mouseover', this._onDayHover)
        day.removeEventListener('click', this._onDayClick)
      })

    if (this.hasTime) {
      this._timeInput.removeEventListener('change', this._onTimeInputChange)
      this._timeInput.removeEventListener('keyup', this._onTimeInputKeyup)
    }
  }

  _onMonthButtonClick = event => {
    const button = eventPathFindElementByTag(event, 'BUTTON')
    const offset = Number(button.value)
    this.monthDate = DateHelper.moveMonth(this.monthDate, offset)
  }

  _onMonthTitleClick = _ => {
    this.pickMonth = true
    this.pickYear = false

    const options = this._renderMonthOptions()
    this._renderDateSelector(options, this.monthDate.getMonth())
  }

  _onYearInputClick = event => {
    this.pickMonth = false
    this.pickYear = true
    event.target.select()

    const optionsSize = this.i18n.months.length
    const thisYear = this.monthDate.getFullYear()
    const yearIndex = thisYear % optionsSize

    const options = this._renderYearOptions(thisYear)

    this._renderDateSelector(options, yearIndex)
  }

  _onYearRangeClick = event => {
    const button = eventPathFindElementByTag(event, 'BUTTON')
    const optionsSize = this.i18n.months.length
    const offset = Number(button.value) * optionsSize
    const baseYear = Number(this._selectorInputs[0].value)
    const options = this._renderYearOptions(baseYear + offset)

    this._renderDateSelector(options)
  }

  _onYearInputKeyup = event => {
    if (event.key === 'Enter') {
      this._yearInput.blur()
      this._onDateSelection(event)
    }
  }

  _onDateSelection = event => {
    const targetValue = Number(event.target.value)
    const monthDate = new Date(this.monthDate)

    this.monthDate = this.pickMonth ? monthDate.setMonth(targetValue) : monthDate.setYear(targetValue)
    this._clearDateSelector()
  }

  _onDayHover = event => {
    const currentCell = eventPathFindElementByTag(event, 'TD')

    if (this._selectedDay && this._isValidDay(currentCell)) {
      const cellDate = new Date(Number(currentCell.getAttribute('time')))
      this._renderSelection(cellDate)

      if (this.onDayHovering) this.onDayHovering(cellDate)
    }
  }

  _onDayClick = event => {
    const dayCell = eventPathFindElementByTag(event, 'TD')

    if (this._isValidDay(dayCell)) {
      const dayDate = new Date(Number(dayCell.getAttribute('time')))

      if (this._selectedDay) {
        this.selectedPeriod = new Period(this._selectedDay, dayDate)
        if (this.onPeriodSelection) this.onPeriodSelection()
      } else {
        this.selectedDay = dayDate
        if (this.onDaySelection) this.onDaySelection()
      }
    }
  }

  _onTimeInputChange = event => {
    const [hour, minute] = event.target.value.split(':')
    if (hour && minute) {
      this._monthDate.setHours(hour, minute)
    }

    if (this.onTimeChange) this.onTimeChange()
  }

  _onTimeInputKeyup = event => {
    if (event.key === 'Enter') {
      this._timeInput.blur()
      this._onTimeInputChange(event)
    }
  }
}
