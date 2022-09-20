import { drawGarage, getNewCars, setPaginationDisabled } from '../common/generalFunctions';
import { createCar } from './api';
import state from '../common/state';

const carBrand = [
  'Acura', 'Alfa Romeo', 'Alpine', 'Apollo', 'Apple', 'Aston Martin', 'Audi', 'Automobili Pininfarina', 'Bentley', 'BMW', 'Bollinger',
  'Brilliance', 'Bugatti', 'Buick', 'BYD', 'Cadillac', 'Chana', 'Chery', 'Chevrolet', 'Chrysler', 'Citroen', 'Continental', 'CUPRA',
  'Dacia', 'Daewoo', 'Daihatsu', 'Datsun', 'Detroit Electric', 'Dodge', 'DS Automobiles', 'FAW', 'Ferrari', 'Fiat', 'Fisker', 'Ford',
  'Foxtron', 'Geely', 'Genesis', 'GMC', 'Great Wall', 'Haval', 'Honda', 'Hummer', 'Hyundai', 'Ineos', 'Infiniti', 'Iran Khodro', 'JAC',
  'Jaguar', 'Jeep', 'JETOUR', 'KIA', 'Koenigsegg', 'Lada', 'Lamborghini', 'Lancia', 'Land Rover', 'Lexus', 'Lifan', 'Lincoln', 'Lordstown',
  'Lotus', 'Lucid', 'LvChi', 'Lynk & Co', 'Maserati', 'Maybach', 'Mazda', 'MCLaren', 'Mercedes-Benz', 'MG', 'MINI', 'Mitsubishi', 'Nikola',
  'NIO', 'Nissan', 'Opel', 'Pagani', 'Peugeot', 'Polestar', 'Porsche', 'Qoros', 'Range Rover', 'Ravon', 'Renault', 'Rimac', 'Rivian',
  'Rolls-Royce', 'Saab', 'Saipa', 'SEAT', 'Skoda', 'smart', 'SsangYong', 'SSC North America', 'Stellantis', 'Subaru', 'Suzuki', 'Tata',
  'Tesla', 'Torsus', 'Toyota', 'VinFast', 'Volkswagen', 'Volvo', 'Xpeng', 'Zotye',
];
const carModal = [
  'Durango', 'Ram', 'Challenger', 'Charger', 'Grand Caravan', 'X7', 'X5', 'X3', 'X6 M', 'X6', 'X1', 'X4', 'C3 Aircross', 'C5 Aircross', 'Duster', 'CR-V', 'Corolla', 'DS3 Crossback', 'C1', 'C3', 'Berlingo Multispace', 'DS4 Crossback', 'UX 250h', 'NX 300h', 'LC 500', 'RX 350/200t', 'Rapid', 'Largus',
  'IS 200t', 'LS 500h', 'RX', 'ES 200/250/350', 'Hatchback', 'CX-5', 'Sedan', 'CX-30', 'CX-9', 'CX-3', 'MX-5 Roadster', 'Phantom', 'Camry', 'Polo',
  'Cullinan', 'Ghost', 'Dawn', 'Duster', 'Arkana', 'Sandero', 'Logan', 'Trafic Fourgon', 'Logan MCV', 'Captur', 'Kadjar', 'RAV4', 'Rio', 'Creta', 'Solaris',
];

const getRandomName = () => {
  const model = carBrand[Math.floor(Math.random() * carBrand.length)];
  const name = carModal[Math.floor(Math.random() * carModal.length)];
  return `${model} ${name}`;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

const generateRandomCars = () => {
  return Array.from({length: 100}, () => ({ name: getRandomName(), color: getRandomColor() }));
};

export const generateCars = () => {
  const generate = document.getElementById('generate') as HTMLElement;
  generate.addEventListener('click', async () => {
    const cars = generateRandomCars();
    await Promise.all(cars.map(async (item) => createCar(item)));
    await getNewCars();
    drawGarage();
    const carsCount = state.carsCount;
    const carsOnPageLimit = 7;
    const carsPagesCount = (carsCount % carsOnPageLimit === 0) ? (carsCount / carsOnPageLimit) : Math.floor(carsCount / carsOnPageLimit) + 1;
    localStorage.setItem('carsPagesCount', JSON.stringify(carsPagesCount));
    state.carsPagesCount = carsPagesCount;
    setPaginationDisabled();
  });
};

