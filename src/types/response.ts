export type Passenger = {
  _id: string;
  name: string;
  trips: number;
  airline: Airline[];
  __v: number;
  [key: string]: unknown;
};

export interface Airline {
  id: number;
  name: string;
  country: string;
  logo: string;
  slogan: string;
  head_quaters: string;
  website: string;
  established: string;
}

export type PaginationPassengerResponse = {
  totalPassengers: number;
  totalPages: number;
  data: Passenger[];
};

export type UseQueryPagination = {
  nextPage: number | undefined;
  previousPage: number | undefined;
  passengerResponse: PaginationPassengerResponse;
};

export type UseQueryDataType = {
  pages: Page[];
  pageParams: unknown[];
};

export type Page = {
  passengerResponse: PaginationPassengerResponse;
};
