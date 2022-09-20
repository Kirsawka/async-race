import { drive, startEngine, stopEngine } from './api';

export const getAnimationParam = async (id: string) => {
  const flag = document.getElementById(`flag-wrapper-${id}`) as HTMLElement;
  const flagPosition = flag.offsetLeft - 50;
  const {velocity, distance} = await startEngine(+id);
  const time = Math.round(distance / velocity);
  return {flagPosition, time};
};

export const animation = (car: HTMLElement, time: number, flagPosition: number) => {
  let start = 0;
  const framesCount = time / 1000 * 60;
  const moveX = flagPosition / framesCount;
  let requestId: number;
  const step = () => {
    (document.getElementById('race-all') as HTMLButtonElement).disabled = true;
    start += moveX;
    car.style.transform = `translateX(${start}px)`;
    if (start < flagPosition) {
      requestId = requestAnimationFrame(step);
    }
    localStorage.setItem(`requestId-${car.id}`, JSON.stringify(requestId));
  };
  step();
};

export const stopAnimation = async (id: number) => {
  await stopEngine(id);
  const requestId = await localStorage.getItem(`requestId-car-${id}`) as string;
  cancelAnimationFrame(+requestId);
  localStorage.removeItem(`requestId-car-${id}`);
  const carItem = document.getElementById(`car-${id}`) as HTMLElement;
  carItem.style.transform = 'translateX(0)';
  (document.getElementById('race-all') as HTMLButtonElement).disabled = false;
};

export const stopBrokenAnimation = async (id: string) => {
  const { success } = await drive(+id);
  if (!success) {
    const requestId = localStorage.getItem(`requestId-car-${id}`) as string;
    cancelAnimationFrame(+requestId);
    localStorage.removeItem(`requestId-car-${id}`);
  }
  return success;
};

