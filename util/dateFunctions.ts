export const daysOfTheWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export const today = daysOfTheWeek[new Date().getDay()]

export const archiveDate = new Date().toLocaleDateString(undefined, {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
})