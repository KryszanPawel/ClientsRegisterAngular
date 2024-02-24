/* eslint-disable prettier/prettier */
export interface UserLoginData {
  username: string;
  userPassword: string;
}

export interface GetUserResponse {
  id: number;
  email: string;
  password: string;
  username: string;

  //   clients: {
  //     id: 1;
  //     firstname: 'Test';
  //     surename: 'Testowy';
  //     email: 'test@gmail.com';
  //     address: 'Miasto ul: Testowa 12';
  //     postcode: '11-111';
  //   };
}

export type PostUserResponse = GetUserResponse;

export type PostUser = Omit<GetUserResponse, 'id'>;

export class User {
  constructor(
    public email: string,
    public username: string,
  ) {}
}
