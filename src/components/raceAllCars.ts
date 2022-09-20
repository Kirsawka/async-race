import { getNewWinners, setPaginationDisabled, setWinnersPagesCount } from '../common/generalFunctions';
import { saveWinner } from './api';
import { animation, getAnimationParam, stopBrokenAnimation } from './animation';
import { Car } from '../common/types';
import state from '../common/state';

const getRacerParam = async (item: Car) => {
  (document.getElementById(`start-car-${item.id}`) as HTMLButtonElement).disabled = true;
  const car = document.getElementById(`car-${item.id}`) as HTMLElement;
  const idSubstr = 'car-';
  const id = car.id.slice(idSubstr.length);
  const {flagPosition, time} = await getAnimationParam(id);
  await animation(car, time, flagPosition);
  const success = await stopBrokenAnimation(id) as boolean;
  if (success) {
    return {name: item.name, id: +id, time: +(time / 1000).toFixed(2)};
  }
};

const getRacers = async (array: Car[]) => {
  const promises = array.map(async (item) => getRacerParam(item));
  const racers = await Promise.all(promises);
  return racers.filter((item) => item !== undefined);
};

export const raceAll = () => {
  document.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;
    if (target.id === 'race-all') {
      const cars = state.cars;
      const racers = await getRacers(cars);
      const newRacers: Array<{ name: string, id: number, time: number }> = [];
      racers.forEach(racer => {
        if (racer && racer.name) {
          newRacers.push({name: racer.name, id: racer.id, time: racer.time});
        }
      });
      const winner = newRacers.sort((a, b) => a.time - b.time)[0];
      if (winner) await saveWinner(winner.id, winner.time);
      const order = state.order;
      const sort = state.sort;
      await getNewWinners(sort, order);
      setWinnersPagesCount();
      setPaginationDisabled();
      const message = document.getElementById('message') as HTMLElement;
      message.style.display = 'block';
      message.innerText = `The winner is ${winner.name} with time ${winner.time} sec!`;
    }
  });
};
