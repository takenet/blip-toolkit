export class DateHelper {
  static months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  static weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday']

  static thisMonth(sourceDate) {
    return new Date(
      sourceDate.getFullYear(),
      sourceDate.getMonth()
    )
  }

  static moveMonth(sourceDate, offset, sourceTime = sourceDate) {
    let day = sourceDate.getDate()
    const month = sourceDate.getMonth() + offset
    const year = sourceDate.getFullYear()

    if (!this.isPresumedDay(year, month, day)) {
      day = this.amountOfDaysInMonth(year, month)
    }

    return new Date(
      year,
      month,
      day,
      sourceTime.getHours(),
      sourceTime.getMinutes()
    )
  }

  static moveDay(sourceDate, offset) {
    return new Date(
      sourceDate.getFullYear(),
      sourceDate.getMonth(),
      sourceDate.getDate() + offset,
      sourceDate.getHours(),
      sourceDate.getMinutes()
    )
  }

  static monthDifference(date1, date2) {
    return date2.getMonth() - date1.getMonth() +
      (12 * (date2.getFullYear() - date1.getFullYear()))
  }

  static isEqual(date1, date2) {
    return date1.getTime() === date2.getTime()
  }

  static isSameDay(date1, date2) {
    return (date1.getFullYear() === date2.getFullYear()) &&
           (date1.getMonth() === date2.getMonth()) &&
           (date1.getDate() === date2.getDate())
  }

  static isBetween(dateLimit1, dateLimit2, compareDate) {
    return (compareDate <= dateLimit1 && compareDate >= dateLimit2) ||
            (compareDate >= dateLimit1 && compareDate <= dateLimit2)
  }

  static amountOfDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate()
  }

  static isPresumedDay(year, month, day) {
    const date = new Date(year, month, day)
    return date.getDate() === day
  }
}
