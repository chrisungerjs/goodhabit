export type History = {
  date: string,
  completed: boolean,
}

export type Habit = {
  _id: string,
  name: string,
  repeats: {
    mon: string,
    tue: string,
    wed: string,
    thu: string,
    fri: string,
    sat: string,
  },
  history: [History],
}