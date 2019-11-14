export class Period {
  constructor(date1, date2) {
    const smaller = date1 < date2 ? date1 : date2
    const bigger = date1 < date2 ? date2 : date1
    this.startDate = new Date(smaller)
    this.endDate = new Date(bigger)
  }
}
