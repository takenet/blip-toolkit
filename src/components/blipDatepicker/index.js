import Component from 'nanocomponent'
import html from 'nanohtml'
import raw from 'nanohtml/raw'
import DateHelper from './DateHelper'

import ArrowLeft from '../../img/arrow-ball-left-solid.svg'
import ArrowRight from '../../img/arrow-ball-right-solid.svg'
import Clock from '../../img/clock-outline.svg'

class Period {
  constructor(date1, date2) {
    var smaller = date1 < date2 ? date1 : date2
    var bigger = date1 < date2 ? date2 : date1
    this.startDate = new Date(smaller)
    this.endDate = new Date(bigger)
  }
}

export class BlipDatepicker extends Component {
  static weekSize = 7
  static monthRows = 6
  static selectorRows = 4
  static selectorColumns = 3
  static i18nEN = {
    months: ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'],
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'],
    timeInputText: 'Time',
  }
  static style = {
    datepicker: 'blip-datepicker',
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
    clockIcon: 'clock-icon',
    timeInput: 'time-input',
    dateSelector: 'date-selector',
    dateSelectorOption: 'date-selector-option',
  }

  constructor(options) {
    super()

    this.hasTime = options.hasTime || false

    this.i18n = options.i18n || BlipDatepicker.i18nEN

    this._selectedDay = options.selectedDay || undefined
    this._selectedPeriod = options.selectedPeriod || undefined
    this._validPeriod = options.validPeriod || undefined

    this._onMonthButtonClick = options.onMonthButtonClick || this._onMonthButtonClick
    this.onDateSelectorShow = options.onDateSelectorShow || undefined
    this.onDateSelectorHide = options.onDateSelectorHide || undefined
    this.onDayHovering = options.onDayHovering || undefined
    this.onDaySelection = options.onDaySelection || undefined
    this.onPeriodSelection = options.onPeriodSelection || undefined
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
    this._renderTime()
  }

  set selectedDay(newDate) {
    this._selectedDay = new Date(newDate)
    this._selectedPeriod = undefined
    this._clearSelection()
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

  createElement(monthDate) {
    this._datepicker = this._createHTMLElement('div', BlipDatepicker.style.datepicker)

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
    var monthTable = this._createHTMLElement('table', BlipDatepicker.style.monthTable)
    var tableHead = monthTable.createTHead()
    var tableBody = monthTable.createTBody()

    var headerRow = tableHead.insertRow()

    var titleCell = this._createHTMLElement('th')
    var prevCell = this._createHTMLElement('th')
    var nextCell = this._createHTMLElement('th')

    var monthTitle = this._createHTMLElement('span', BlipDatepicker.style.monthTitle)
    var yearInput = this._createHTMLElement('input', BlipDatepicker.style.yearInput)
    yearInput.type = 'number'

    var createButton = (icon, value, ...classes) => {
      var button = html`<button class="${BlipDatepicker.style.monthButton}">${raw(icon)}</button>`
      if (classes) classes.forEach(className => button.classList.add(className))
      button.value = value
      return button
    }

    var prevButton = createButton(ArrowLeft, '-1', BlipDatepicker.style.monthPrev)
    var nextButton = createButton(ArrowRight, '1', BlipDatepicker.style.monthNext)

    titleCell.colSpan = '5'
    titleCell.appendChild(monthTitle)
    titleCell.appendChild(yearInput)
    prevCell.appendChild(prevButton)
    nextCell.appendChild(nextButton)

    headerRow.appendChild(prevCell)
    headerRow.appendChild(titleCell)
    headerRow.appendChild(nextCell)

    var weekdayRow = tableBody.insertRow()
    weekdayRow.classList.add(BlipDatepicker.style.weekdayWeek)
    for (var day = 0; day < BlipDatepicker.weekSize; day++) {
      var weekday = weekdayRow.insertCell()
      weekday.classList.add(BlipDatepicker.style.weekDay)
      weekday.innerText = this.i18n.weekdays[day][0]
      weekday.title = this.i18n.weekdays[day]
    }

    var daysRows = []
    var monthDays = []
    for (var week = 0; week < BlipDatepicker.monthRows; week++) {
      var weekRow = tableBody.insertRow()
      for (day = 0; day < BlipDatepicker.weekSize; day++) {
        var monthDay = weekRow.insertCell()
        monthDay.classList.add(BlipDatepicker.style.monthDay)

        var dayDiv = this._createHTMLElement('div')
        monthDay.appendChild(dayDiv)

        monthDays.push(monthDay)
      }
      daysRows.push(weekRow)
    }

    this._datepicker.appendChild(monthTable)

    this._monthTable = monthTable
    this._monthTitle = monthTitle
    this._yearInput = yearInput
    this._prevButton = prevButton
    this._nextButton = nextButton
    this._tableBody = tableBody
    this._daysRows = daysRows
    this._monthDays = monthDays
  }

  _createDateSelector() {
    var dateSelector = this._createHTMLElement('div', BlipDatepicker.style.dateSelector)

    var selectorOptions = []
    var selectorInputs = []
    for (var row = 0; row < BlipDatepicker.selectorRows; row++) {
      var rowDiv = this._createHTMLElement('div')
      for (var option = 0; option < BlipDatepicker.selectorColumns; option++) {
        var optionDiv = this._createHTMLElement('label', BlipDatepicker.style.dateSelectorOption)

        var radioInput = this._createHTMLElement('input')
        var textSpan = this._createHTMLElement('div')

        radioInput.type = 'radio'
        radioInput.name = 'dateSelector'
        radioInput.style.display = 'none'

        optionDiv.appendChild(radioInput)
        optionDiv.appendChild(textSpan)
        rowDiv.appendChild(optionDiv)

        selectorOptions.push(textSpan)
        selectorInputs.push(radioInput)
      }
      dateSelector.appendChild(rowDiv)
    }

    this._setElementVisibility(dateSelector, false)
    dateSelector.style.position = 'absolute'

    this._datepicker.appendChild(dateSelector)

    this._dateSelector = dateSelector
    this._selectorOptions = selectorOptions
    this._selectorInputs = selectorInputs

    this.pickMonth = false
    this.pickYear = false
  }

  _createTimeStructure() {
    var separator = this._createHTMLElement('hr')

    var timeContainer = this._createHTMLElement('div', BlipDatepicker.style.timeContainer)
    timeContainer.innerText = this.i18n.timeInputText

    var timeInputContainer = this._createHTMLElement('div', BlipDatepicker.style.timeInputContainer)

    var timeIcon = html`<div class="${BlipDatepicker.style.clockIcon}">${raw(Clock)}</div>`

    var timeInput = this._createHTMLElement('input', BlipDatepicker.style.timeInput)
    timeInput.type = 'time'
    timeInput.required = true

    timeInputContainer.appendChild(timeIcon)
    timeInputContainer.appendChild(timeInput)
    timeContainer.appendChild(timeInputContainer)

    this._datepicker.appendChild(separator)
    this._datepicker.appendChild(timeContainer)

    this._timeInput = timeInput
  }

  _createHTMLElement(elementTag, ...classes) {
    var element = document.createElement(elementTag)
    if (classes) classes.forEach(className => element.classList.add(className))
    return element
  }

  _setElementVisibility(element, visibility) {
    element.style.visibility = visibility ? 'visible' : 'hidden'
  }

  _isValidDay(day) {
    return day.classList.contains(BlipDatepicker.style.currentMonth) && !day.classList.contains(BlipDatepicker.style.invalidDay)
  }

  _renderMonth() {
    var monthName = this.i18n.months[this.monthDate.getMonth()]
    this._monthTitle.innerText = monthName
    this._yearInput.value = this.monthDate.getFullYear()

    var firstDay = DateHelper.thisMonth(this.monthDate)
    var firstDayNextMonth = DateHelper.moveMonth(firstDay, 1)
    var firstDayOfWeek = DateHelper.moveDay(firstDay, -firstDay.getDay())

    this._daysRows.forEach(
      week => {
        week.className = firstDayOfWeek < firstDayNextMonth
          ? BlipDatepicker.style.monthWeek
          : BlipDatepicker.style.nextMonthWeek

        Array.from(week.cells).forEach(
          (day, index) => {
            var dayDate = DateHelper.moveDay(firstDayOfWeek, index)

            var dateDiv = day.querySelector('div')
            dateDiv.innerText = dayDate.getDate()

            day.setAttribute('time', dayDate.getTime())
            day.className = BlipDatepicker.style.monthDay

            switch (DateHelper.monthDifference(dayDate, firstDay)) {
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

  _renderSelection(hoverDate = undefined) {
    this._monthDays.forEach(
      dayCell => {
        if (this._isValidDay(dayCell)) {
          var dayDate = new Date(Number(dayCell.getAttribute('time')))

          if (this._selectedPeriod) {
            if (DateHelper.isEqual(this._selectedPeriod.startDate, dayDate) || DateHelper.isEqual(this._selectedPeriod.endDate, dayDate)) {
              dayCell.classList.add(BlipDatepicker.style.rangeLimit)
            }
            if (DateHelper.isBetween(this._selectedPeriod.startDate, this._selectedPeriod.endDate, dayDate)) {
              dayCell.classList.add(BlipDatepicker.style.inRange)
            } else {
              dayCell.classList.remove(BlipDatepicker.style.inRange)
            }
          } else if (this._selectedDay && hoverDate) {
            if (DateHelper.isEqual(this._selectedDay, dayDate)) {
              dayCell.classList.add(BlipDatepicker.style.rangeLimit)
            }
            if (DateHelper.isBetween(this._selectedDay, hoverDate, dayDate)) {
              dayCell.classList.add(BlipDatepicker.style.inRange)
            } else {
              dayCell.classList.remove(BlipDatepicker.style.inRange)
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
    var optionsSize = this.i18n.months.length
    var baseYearIndex = baseYear % optionsSize

    return Array.from({length: optionsSize},
      (_, index) => {
        var year = String(baseYear + index - baseYearIndex)
        return { text: year, value: year }
      })
  }

  _renderDateSelector(options, selected = undefined) {
    var addPxToValue = value => `${value}px`
    var { top, left } = this._tableBody.getBoundingClientRect()

    this._dateSelector.style.top = addPxToValue(top)
    this._dateSelector.style.left = addPxToValue(left)
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

    if (selected) this._selectorInputs[selected].checked = true
    else this._selectorInputs.forEach(input => { input.checked = false })
    this._setElementVisibility(this._dateSelector, true)

    if (this.onDateSelectorShow) this.onDateSelectorShow()
  }

  _clearSelection() {
    this._monthDays.forEach(
      (dayCell) => {
        dayCell.classList.remove(BlipDatepicker.style.rangeLimit)
        dayCell.classList.remove(BlipDatepicker.style.inRange)
      })
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
    this._selectorOptions.forEach(
      option => {
        option.innerText = ''
      })

    if (this.onDateSelectorHide) this.onDateSelectorHide()
  }

  _renderTime() {
    var renderTwoDigit = value => `0${value}`.slice(-2)

    var hours = renderTwoDigit(this.monthDate.getHours())
    var minutes = renderTwoDigit(this.monthDate.getMinutes())

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

    if (this.hasTime) this._timeInput.addEventListener('change', this._onTimeInputChange)
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

    if (this.hasTime) this._timeInput.removeEventListener('change', this._onTimeInputChange)
  }

  _onMonthButtonClick = event => {
    var button = event.composedPath().find(el => el.tagName === 'BUTTON')
    var offset = Number(button.value)
    this.monthDate = DateHelper.moveMonth(this.monthDate, offset)
  }

  _onMonthTitleClick = _ => {
    this.pickMonth = true
    this.pickYear = false

    var options = this._renderMonthOptions()
    this._renderDateSelector(options, this.monthDate.getMonth())
  }

  _onYearInputClick = event => {
    this.pickMonth = false
    this.pickYear = true
    event.target.select()

    var optionsSize = this.i18n.months.length
    var thisYear = this.monthDate.getFullYear()
    var yearIndex = thisYear % optionsSize

    var options = this._renderYearOptions(thisYear)

    this._renderDateSelector(options, yearIndex)
  }

  _onYearRangeClick = event => {
    var button = event.composedPath().find(el => el.tagName === 'BUTTON')
    var optionsSize = this.i18n.months.length
    var offset = Number(button.value) * optionsSize
    var baseYear = Number(this._selectorInputs[0].value)
    var options = this._renderYearOptions(baseYear + offset)

    this._renderDateSelector(options)
  }

  _onYearInputKeyup = event => {
    if (event.key === 'Enter') {
      this._yearInput.blur()
      this._onDateSelection(event)
    }
  }

  _onDateSelection = event => {
    var targetValue = Number(event.target.value)
    var monthDate = new Date(this.monthDate)

    this.monthDate = this.pickMonth ? monthDate.setMonth(targetValue) : monthDate.setYear(targetValue)
    this._clearDateSelector()
  }

  _onDayHover = event => {
    var currentCell = event.composedPath().find(el => el.tagName === 'TD')

    if (this._selectedDay && this._isValidDay(currentCell)) {
      var cellDate = new Date(Number(currentCell.getAttribute('time')))
      this._renderSelection(cellDate)

      if (this.onDayHovering) this.onDayHovering(cellDate)
    }
  }

  _onDayClick = event => {
    var dayCell = event.composedPath().find(el => el.tagName === 'TD')

    if (this._isValidDay(dayCell)) {
      var dayDate = new Date(Number(dayCell.getAttribute('time')))

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
    var [hour, minute] = event.target.value.split(':')
    this._monthDate.setHours(hour, minute)
  }
}
