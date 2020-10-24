export const daysOfTheWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export const today = daysOfTheWeek[new Date().getDay()]

export const archiveDate = (date) => new Date(date).toLocaleDateString(undefined, {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
})

const now = Date.now()
const ONE_DAY = 1000 * 60 * 60 * 24
const offset = new Date().getDay() * ONE_DAY
const baseDate = now - offset

export const weekDateMap = daysOfTheWeek.map((day: string, index: number) => {
  return {
    dayOfTheWeek: day,
    date: archiveDate(baseDate + (index * ONE_DAY))
  }
})