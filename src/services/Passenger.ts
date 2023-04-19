import axios from 'axios';
import _ from 'lodash';

import { PaginationPassengerResponse, Passenger } from '@/types/response';

const BASE_URL = 'https://api.instantwebtools.net/v1';
export const DEFAULT_PASSENGER_LIST_RESPONSE = {
  passengerResponse: { totalPassengers: 0, totalPages: 0, data: [] },
} as { passengerResponse: PaginationPassengerResponse };

export async function getPassengers() {
  return axios
    .get<PaginationPassengerResponse>(`${BASE_URL}/passenger`, {
      params: { _sort: 'title' },
    })
    .then((res) => res.data);
}

export async function getPassengerPaginated(page: number, size: number) {
  return axios
    .get<PaginationPassengerResponse>(`${BASE_URL}/passenger`, {
      params: { page, size },
    })
    .then((res) => {
      // const hasNext = page * 2 <= parseInt(res.headers['x-total-count']);
      const hasNext = page < _.get(res, 'data.totalPages', 0);
      return {
        nextPage: hasNext ? page + 1 : undefined,
        previousPage: page > 0 ? page - 1 : undefined,
        passengerResponse: res.data,
      };
    });
}

export async function getPassenger(id: string) {
  return axios
    .get<Passenger>(`${BASE_URL}/passenger/${id}`)
    .then((res) => res.data);
}

export async function getAirline(id: number) {
  return axios.get(`${BASE_URL}/airlines/${id}`).then((res) => res.data);
}

export async function createPassenger({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return axios
    .post(`${BASE_URL}/passenger`, {
      title,
      body,
      userId: 1,
      id: Date.now(),
    })
    .then((res) => res.data);
}
