import IAuthenticationApi, { User } from "../services/authentication/IAuthenticationApi";

class AuthenticationApiMock implements IAuthenticationApi {
  private _fetchCurrentUser: () => Promise<User | null>;

  constructor(fetchCurrentUser: () => Promise<User | null>) {
    this._fetchCurrentUser = fetchCurrentUser;
  }

  public async fetchCurrentUser(): Promise<User | null> {
    return this._fetchCurrentUser();
  }
}

export default AuthenticationApiMock;
