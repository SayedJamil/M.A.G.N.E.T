export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  source: string;
  verified: boolean;
  creationDate: string;
}

export interface CreateUserInput {
  email: string;
  fullName: string;
  password: string;
}
export interface CredentialsInput {
  email: string;
  password: string;
}
