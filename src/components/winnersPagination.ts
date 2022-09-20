import { drawWinners, setCurrentWinnersPage } from '../common/generalFunctions';
import state from '../common/state';

export const winnersPagination = () => {
  document.addEventListener('click', async (event) => {
    const id = (event.target as HTMLElement).id;
    let winnersPage = state.winnersPage;
    const winnersPagesCount = state.winnersPagesCount;

    if (id.includes('next-winners-page')) {
      if (winnersPage < winnersPagesCount) {
        winnersPage++;
        await setCurrentWinnersPage(winnersPage);
        drawWinners();
      }
    }
    if (id.includes('prev-winners-page')) {
      if (winnersPage >= 1) {
        winnersPage--;
        await setCurrentWinnersPage(winnersPage);
        drawWinners();
      }
    }
  });
};
