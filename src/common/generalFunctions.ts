import { renderGarage, renderWinners } from '../components/render';
import { getCars, getWinners } from '../components/api';
import state from './state';

export const setCurrentPage = async (carsPage: number) => {
  await getCars(carsPage);
  localStorage.setItem('carsPage', String(carsPage));
  state.carsPage = carsPage;
};

export const setCurrentWinnersPage = async (winnersPage: number) => {
  const order = state.order;
  const sort = state.sort;
  await getWinners(winnersPage, sort, order);
  localStorage.setItem('winnersPage', String(winnersPage));
  state.winnersPage = winnersPage;
};

export const setPagesCount = () => {
  const carsOnPageLimit = 7;
  const carsCount = state.carsCount;
  if (+carsCount >= carsOnPageLimit) {
    const carsPagesCount = (+carsCount % carsOnPageLimit === 0) ? (+carsCount / carsOnPageLimit) : Math.floor(+carsCount / carsOnPageLimit) + 1;
    state.carsPagesCount = carsPagesCount;
    localStorage.setItem('carsPagesCount', String(carsPagesCount));
  }
};

export const setWinnersPagesCount = () => {
  const winnersOnPageLimit = 2;
  const winnersCount = state.winnersCount;
  if (+winnersCount >= winnersOnPageLimit) {
    const winnersPagesCount = (+winnersCount % winnersOnPageLimit === 0) ? (+winnersCount / winnersOnPageLimit) : Math.floor(+winnersCount / winnersOnPageLimit) + 1;
    state.winnersPagesCount = winnersPagesCount;
    localStorage.setItem('winnersPagesCount', String(winnersPagesCount));
  }
};

export const drawGarage = () => {
  const garage = document.querySelector('.garage-view') as HTMLElement;
  garage.innerHTML = renderGarage();
};

export const drawWinners = () => {
  const winners = document.querySelector('.winners-view') as HTMLElement;
  winners.innerHTML = renderWinners();
};

export const getNewCars = async () => {
  const carsPage = state.carsPage;
  await getCars(carsPage);
};

export const getNewWinners = async (id: string, sortOrder: string) => {
  const winnersPage = state.winnersPage;
  await getWinners(winnersPage, id, sortOrder);
};

export const setPaginationDisabled = () => {
  const page = state.carsPage;
  const pagesCount = state.carsPagesCount;
  if (page === 1) {
    (document.getElementById('prev') as HTMLButtonElement).disabled = true;
    (document.getElementById('first-page') as HTMLButtonElement).disabled = true;
  }
  if (page === pagesCount) {
    (document.getElementById('last-page') as HTMLButtonElement).disabled = true;
    (document.getElementById('next') as HTMLButtonElement).disabled = true;
  }
};

export const toogleView = () => {
  const winnersBtn = document.getElementById('winners') as HTMLElement;
  const winners = document.querySelector('.winners-view') as HTMLElement;
  const garage = document.querySelector('.garage-view') as HTMLElement;
  const garageBtn = document.getElementById('garage') as HTMLElement;
  const forms = document.querySelector('.forms') as HTMLElement;
  const mainControlBtns = document.querySelector('.main-control-buttons') as HTMLElement;

  winnersBtn.addEventListener('click', () => {
    garage.style.display = 'none';
    forms.style.display = 'none';
    mainControlBtns.style.display = 'none';
    winners.style.display = 'block';
    winners.innerHTML = renderWinners();
    const message = document.getElementById('message') as HTMLElement;
    message.style.display = 'none';
  });

  garageBtn.addEventListener('click', () => {
    winners.style.display = 'none';
    garage.style.display = 'block';
    forms.style.display = 'block';
    mainControlBtns.style.display = 'block';
  });
};

