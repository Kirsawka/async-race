import { getNewWinners } from '../common/generalFunctions';
import { renderWinners } from './render';
import state from '../common/state';

const setSortOrder = (sortBy: string) => {
  let sortOrder = state.order === 'ASC' ? 'DESC' : 'ASC';
  if (!sortOrder) sortOrder = 'ASC';
  state.order = sortOrder;
  state.sort = sortBy;
  return sortOrder;
};

const toggleArrow = (sortOrder: string, arrow: HTMLElement) => {
  if (sortOrder === 'ASC') {
    arrow.innerText = '🠗';
  }
  if (sortOrder === 'DESC') {
    arrow.innerText = '🠕';
  }
};

export const sortingWinners = () => {
  const winners = document.querySelector('.winners-view') as HTMLElement;
  document.addEventListener('click', async (event) => {
    const id = (event.target as HTMLElement).id;
    if (id === 'wins') {
      const sortOrder = setSortOrder(id);
      const winsArrow = document.getElementById('wins-arrow') as HTMLElement;
      await getNewWinners(id, sortOrder);
      toggleArrow(sortOrder, winsArrow);
    }
    if (id === 'time') {
      const sortOrder = setSortOrder(id);
      const timeArrow = document.getElementById('time-arrow') as HTMLElement;
      await getNewWinners(id, sortOrder);
      toggleArrow(sortOrder, timeArrow);
    }
    winners.innerHTML = renderWinners();
  });
};
