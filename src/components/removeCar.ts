import { setPagesCount, drawGarage, getNewCars, setPaginationDisabled, getNewWinners } from '../common/generalFunctions';
import { deleteCar, deleteWinner, getWinnerStatus } from './api';
import state from '../common/state';

export const removeCar = () => {
  document.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;
    const idSubstr = 'remove-car-';
    if (target.id.includes(idSubstr)) {
      const id = target.id.slice(idSubstr.length);
      await deleteCar(+id);
      await getNewCars();
      const winnerStatus = await getWinnerStatus(+id);
      if (winnerStatus === 200) {
        await deleteWinner(+id);
      }
      const order = state.order;
      const sort = state.sort;
      await getNewWinners(sort, order);
      drawGarage();
      setPagesCount();
      setPaginationDisabled();
    }
  });
};
