import { setPagesCount, drawGarage, getNewCars, setPaginationDisabled } from '../common/generalFunctions';
import { createCar } from './api';
import { Car } from '../common/types';

const getCreateValues = () => {
  const createNameInput = document.getElementById('create-name') as HTMLInputElement;
  const createColorInput = document.getElementById('create-color') as HTMLInputElement;
  return [ createNameInput, createColorInput, { name: createNameInput.value, color: createColorInput.value } ];
};

export const createNewCar = () => {
  const createButton = document.getElementById('create-button') as HTMLElement;
  createButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const [ createNameInput, createColorInput, body ] = getCreateValues();
    await createCar(body as Car);
    await getNewCars();
    drawGarage();
    setPagesCount();
    setPaginationDisabled();
    (createNameInput as HTMLInputElement).value = '';
    (createColorInput as HTMLInputElement).value = '#000000';
  });
};
