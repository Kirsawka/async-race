import { drawGarage, getNewCars } from '../common/generalFunctions';
import { getCar, updateCar } from './api';
import { Car } from '../common/types';

const getUpdateValues = () => {
  const updateNameInput = document.getElementById('update-name') as HTMLInputElement;
  const updateColorInput = document.getElementById('update-color') as HTMLInputElement;
  return [ updateNameInput, updateColorInput, { name: updateNameInput.value, color: updateColorInput.value } ];
};

const updateCarItem = (id: number) => {
  const updateButton = document.getElementById('update-button') as HTMLElement;
  updateButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const [ updateNameInput, updateColorInput, body ] = getUpdateValues();
    await updateCar(id, body as Car);
    await getNewCars();
    drawGarage();
    (updateNameInput as HTMLInputElement).value = '';
    (updateColorInput as HTMLInputElement).value = '#000000';
  });
};

const putValues = (data: Car) => {
  const updateNameInput = document.getElementById('update-name') as HTMLInputElement;
  const updateColorInput = document.getElementById('update-color') as HTMLInputElement;
  updateNameInput.value = data.name as string;
  updateColorInput.value = data.color as string;
  updateCarItem(data.id as number);
};

export const selectCar = () => {
  document.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;
    const idSubstr = 'select-car-';
    if (target.id.includes(idSubstr)) {
      const id = target.id.slice(idSubstr.length);
      const selectedCar = await getCar(+id);
      putValues(selectedCar);
    }
  });
};
