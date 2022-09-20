import { animation, stopAnimation, stopBrokenAnimation, getAnimationParam } from './animation';

export const startDriving = async (id: string) => {
  (document.getElementById(`start-car-${id}`) as HTMLButtonElement).disabled = true;
  (document.getElementById(`stop-car-${id}`) as HTMLButtonElement).disabled = false;
  const car = document.getElementById(`car-${id}`) as HTMLElement;
  const { flagPosition, time } = await getAnimationParam(id);
  animation(car, time, flagPosition);
  const success = await stopBrokenAnimation(id) as string;
  return { success, id, time };
};

const stopDriving = async (id: string) => {
  (document.getElementById(`start-car-${id}`) as HTMLButtonElement).disabled = false;
  (document.getElementById(`stop-car-${id}`) as HTMLButtonElement).disabled = true;
  await stopAnimation(+id);
};

export const engineControl = () => {
  document.addEventListener('click', async (event) => {
    let id = (event.target as HTMLElement).id;
    const startBtnIdSubstr = 'start-car-';
    const stopBtnIdSubstr = 'stop-car-';
    if (id.includes(startBtnIdSubstr)) {
      id = id.slice(startBtnIdSubstr.length);
      await startDriving(id);
    }
    if (id.includes(stopBtnIdSubstr)) {
      id = id.slice(stopBtnIdSubstr.length);
      await stopDriving(id);
    }
  });
};


