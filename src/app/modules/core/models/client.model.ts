/* eslint-disable prettier/prettier */
export interface ClientResponse {
  id: number;
  firstname: string;
  surename: string;
  email: string;
  address: string;
  postcode: string;
}

export type PostClient = Omit<ClientResponse, 'id'>;

export class Client implements ClientResponse {
  constructor(
    public id: number,
    public firstname: string,
    public surename: string,
    public email: string,
    public address: string,
    public postcode: string,
  ) {}
}

export interface GetClientsResponse {
  clients: Client[];
  totalCount: number;
}
