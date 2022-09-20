import { State } from './types';

const carsPagesCount = localStorage.getItem('carsPagesCount');
const winnersPagesCount = localStorage.getItem('winnersPagesCount');

const state: State = {
  cars: [],
  allWinners: [],
  order: '',
  sort: '',
  winnersCount: 1,
  winnersPage: 1,
  carsCount: 4,
  carsPage: 1,
  winnersPagesCount: winnersPagesCount ? +winnersPagesCount : 1,
  carsPagesCount: carsPagesCount ? +carsPagesCount : 1,
};

export default state;
