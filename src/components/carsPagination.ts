import { drawGarage, setCurrentPage, setPaginationDisabled } from '../common/generalFunctions';
import state from '../common/state';

export const carsPagination = () => {
  document.addEventListener('click', async (event) => {
    const id = (event.target as HTMLElement).id;

    const carsPagesCount = state.carsPagesCount;
    let carsPage = state.carsPage;

    if (id === 'next') {
      if (carsPage < carsPagesCount) {
        carsPage++;
        await setCurrentPage(carsPage);
        drawGarage();
      }
    }
    if (id === 'prev') {
      if (carsPage >= 1) {
        carsPage--;
        await setCurrentPage(carsPage);
        drawGarage();
      }
    }
    if (id === 'first-page') {
      carsPage = 1;
      await setCurrentPage(carsPage);
      drawGarage();
    }
    if (id === 'last-page') {
      carsPage = carsPagesCount;
      await setCurrentPage(carsPage);
      drawGarage();
    }
    (document.getElementById('race-all') as HTMLButtonElement).disabled = false;
    setPaginationDisabled();
  });
};
