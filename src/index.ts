import { renderGeneralContent } from './components/render';
import { createNewCar } from './components/createCar';
import { selectCar } from './components/updateCar';
import { removeCar } from './components/removeCar';
import { generateCars} from './components/generateCars';
import { carsPagination } from './components/carsPagination';
import { engineControl } from './components/engineControl';
import { raceAll } from './components/raceAllCars';
import { resetAll } from './components/resetAllCars';
import { getCars, getWinners } from './components/api';
import {setPaginationDisabled, toogleView} from './common/generalFunctions';
import { winnersPagination } from './components/winnersPagination';
import { sortingWinners } from './components/sortingWinners';
import state from './common/state';
import './style.css';

(async function () {
  await getCars(state.carsPage);
  await getWinners(state.winnersPage, state.sort, state.order);
  renderGeneralContent();
  setPaginationDisabled();
  createNewCar();
  selectCar();
  removeCar();
  generateCars();
  carsPagination();
  engineControl();
  raceAll();
  resetAll();
  toogleView();
  winnersPagination();
  sortingWinners();
})();



