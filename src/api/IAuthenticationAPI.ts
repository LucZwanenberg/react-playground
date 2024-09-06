export type User = {
  first_name: string;
  last_name: string;
  email: string;
}

export default interface IAuthenticationApi {
  fetchCurrentUser(): Promise<User | null>;
}
