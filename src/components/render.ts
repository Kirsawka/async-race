import { Car, Winner } from '../common/types';
import state from '../common/state';

const svg = require('../assets/sprite.svg');

export const renderCarImg = (color: string) => {
  return `<svg class="car-icon" style="fill: ${color}"><use xlink:href=${svg}#car></use></svg>`;
};

export const renderCar = (car: Car) => {
  return `
  <div class="car-change-buttons">
    <button id="select-car-${car.id}">SELECT</button>
    <button id="remove-car-${car.id}">REMOVE</button>
  </div>
  <span>${car.name}</span>
  <div class="car-container">
    <div class="car-control-buttons">
      <button id="start-car-${car.id}">start</button>
      <button id="stop-car-${car.id}" disabled="true">reset</button>
    </div>
    <div id="car-${car.id}">
      ${renderCarImg(car.color as string)}
    </div>
    <div class="flag-wrapper" id="flag-wrapper-${car.id}">
      <svg class="finish-icon" id="flag-${car.id}">
        <use xlink:href="${svg}#flag-finish"></use>
    </svg>
   </div>
  </div>`;
};

export const renderGarage = () => {
  const cars = state.cars;
  const carsCount = state.carsCount;
  const page = state.carsPage;
  return `<h1>Garage (${carsCount})</h1>
    <div class="pagination">
      <button class="first-page" id="first-page"><<</button>
      <button class="prev" id="prev"><</button>
      <span>Page #${page ? page : 1}</span>
      <button class="next" id="next">></button>
      <button class="last-page" id="last-page">>></button>
    </div>
   <div class="cars" id="cars">
     ${cars.map((car: Car) => `
       <div class="car" id="car-wrapper-${car.id}">${renderCar(car)}</div>
     `).join('')}
   </div>
  `;
};

const getArrowValue = (sortKey: string) => {
  const order = state.order;
  const sort = state.sort;
  if (sort === sortKey) {
    return (order === 'DESC') ? '🠕' : '🠗';
  }
  return '';
};

export const renderWinners = () => {
  const winnersCount = state.winnersCount;
  const winnersPage = state.winnersPage;
  const allWinners = state.allWinners;

  return `<h2>Winners (${winnersCount})</h2>
    <div class="pagination">
      <button class="prev" id="prev-winners-page"><</button>
      <span>Page #${winnersPage ? winnersPage : 1}</span>
      <button class="next" id="next-winners-page">></button>
    </div>
    
  <div class="table">
    <div class="first-row row">Number</div>
    <div class="first-row row">Car</div>
    <div class="first-row row">Name</div>
    <div class="first-row row sort" id="wins">Wins
      <span class="arrow" id="wins-arrow">${getArrowValue('wins')}</span>
    </div>
    <div class="first-row row sort" id="time">Best time (seconds)
      <span class="arrow" id="time-arrow">${getArrowValue('time')}</span>
    </div>
    
    ${allWinners.map((winner: Winner, ind: number) => `
    <div class="row">${ind + 1}</div>
    <div class="row">${renderCarImg(winner.car.color)}</div>
    <div class="row">${winner.car.name}</div>
    <div class="row">${winner.wins}</div>
    <div class="row">${winner.time}</div>
    `).join('')}
  </div>
  `;
};

export const renderGeneralContent = () => {
  const html = `
    <button id="garage">TO GARAGE</button>
    <button id="winners">TO WINNERS</button>
    <div class="forms">
      <form class="form" id="create">
        <input type="text" id="create-name" autocomplete="off">
        <input type="color" id="create-color">
        <button type="submit" id="create-button">CREATE</button>
      </form>
      <form class="form" id="update">
        <input type="text" id="update-name" autocomplete="off">
        <input type="color" id="update-color">
        <button type="submit" id="update-button">UPDATE</button>
      </form>
    </div>
    <div class="main-control-buttons">
      <button id="race-all">RACE ALL</button>
      <button id="reset-all">RESET ALL</button>
      <button id="generate">GENERATE CARS</button>
    </div>  
    <div class="garage-view">
      ${renderGarage()}
    </div>
    <p class="message" id="message"></p>
    <div class="winners-view" style="display: none">
      ${renderWinners()}
    </div>
`;
  document.body.innerHTML = '';
  const container = document.createElement('div');
  container.classList.add('container');
  container.innerHTML = html;
  document.body.appendChild(container);
};


