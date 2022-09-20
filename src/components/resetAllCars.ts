import { stopAnimation } from './animation';
import state from '../common/state';

export const resetAll = () => {
  document.addEventListener('click', (event) => {
    const message = document.getElementById('message') as HTMLElement;
    message.style.display = 'none';
    message.innerText = '';

    const target = event.target as HTMLElement;
    if (target.id === 'reset-all') {
      (document.getElementById('race-all') as HTMLButtonElement).disabled = false;
      const allCars = state.cars;
      allCars.forEach(async (car) => {
        (document.getElementById(`start-car-${car.id}`) as HTMLButtonElement).disabled = false;
        if (car.id) await stopAnimation(car.id);
      });
    }
  });
};
