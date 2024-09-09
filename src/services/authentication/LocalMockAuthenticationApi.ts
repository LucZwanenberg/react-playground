import IAuthenticationApi, { User } from './IAuthenticationApi';
import IHttpClient from '../http/IHttpClient';
import UserSchema from './zod/UserSchema';

interface LocalMockAuthenticationConfig {
  httpClient: IHttpClient;
  port: number;
}

class LocalMockAuthenticationApi implements IAuthenticationApi {
  public constructor(private _config: LocalMockAuthenticationConfig) { }

  async fetchCurrentUser(): Promise<User | null> {
    const response = await this._config
      .httpClient
      .get(`http://localhost:${this._config.port}/authentication/user`);

    return UserSchema.parse(response.data);
  }
}

export default LocalMockAuthenticationApi;
