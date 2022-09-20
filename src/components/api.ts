import { Car, Winner } from '../common/types';
import state from '../common/state';

const baseUrl = 'http://127.0.0.1:3000';
const garage = `${baseUrl}/garage`;
const engine = `${baseUrl}/engine`;
const winners = `${baseUrl}/winners`;

export const getCars = async (page: number, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  state.cars = await response.json();
  const carsCount = response.headers.get('X-Total-Count') as string;
  state.carsCount = +carsCount;
};

export const getCar = async (id: number) => {
  return (await fetch(`${garage}/${id}`)).json();
};

export const createCar = async (body: Car) => {
  const response = await fetch(`${garage}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const updateCar = async (id: number, body: Car) => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const deleteCar = async (id: number) => {
  return (await fetch(`${garage}/${id}`, {method: 'DELETE'})).json();
};

export const startEngine = async (id: number) => {
  return (await fetch(`${engine}?id=${id}&status=started`, {method: 'PATCH'})).json();
};

export const stopEngine = async (id: number) => {
  return (await fetch(`${engine}?id=${id}&status=stopped`, {method: 'PATCH'})).json();
};

export const drive = async (id: number) => {
  const response = await fetch(`${engine}?id=${id}&status=drive`, {method: 'PATCH'});
  return response.status !== 200 ? {success: false} : response.json();
};

export const getWinner = async (id: number) => {
  return (await fetch(`${winners}/${id}`)).json();
};

const getSortOrder = (sort: string, order: string) => {
  sort = state.sort;
  order = state.order;
  return `&_sort=${sort}&_order=${order}`;
};

export const getWinners = async (page: number, sort: string, order: string, limit = 10) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const data = await response.json();
  const winnersCount = response.headers.get('X-Total-Count') as string;
  const promises = data.map(async (winner: Winner) => {
    const id = winner.id as number;
    return {...winner, car: await getCar(id)};
  });
  state.allWinners = await Promise.all(promises);
  state.winnersCount = +winnersCount;
};

export const getWinnerStatus = async (id: number) => {
  const response = await fetch(`${winners}/${id}`);
  return response.status;
};

export const createWinner = async (body: { wins: number; id: number; time: number }) => {
  const response = await fetch(`${winners}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const deleteWinner = async (id: number) => {
  return (await fetch(`${winners}/${id}`, {method: 'DELETE'})).json();
};

export const updateWinner = async (id: number, body: Partial<Winner>) => {
  const response = await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const saveWinner = async (id: number, time: number) => {
  const winnerStatus = await getWinnerStatus(id);
  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time: time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};
