export interface Car {
  name?: string,
  color?: string,
  id?: number
}

export interface Winner {
  id?: number,
  wins?: number,
  time?: number,
  car: { name: string; color: string },
}

export interface State {
  cars: Car[];
  allWinners: Winner[];
  order: string,
  sort: string,
  winnersCount: number,
  winnersPage: number,
  winnersPagesCount: number,
  carsCount: number,
  carsPage: number,
  carsPagesCount: number,
}
