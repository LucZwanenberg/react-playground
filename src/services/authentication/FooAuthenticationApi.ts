import IAuthenticationApi, { User } from './IAuthenticationApi';
import IHttpClient from '../http/IHttpClient';
import UserSchema from './zod/UserSchema';

interface APIConfig {
  httpClient: IHttpClient;
  protocol: "http" | "https";
  host: string;
  port: number;
}

class AuthenticationApi implements IAuthenticationApi {
  private readonly httpClient: IHttpClient;
  private readonly baseURL: string;

  public constructor(config: APIConfig) {
    this.httpClient = config.httpClient;
    this.baseURL = `${config.protocol}://${config.host}:${config.port}`;
  }

  async fetchCurrentUser(): Promise<User | null> {
    const response = await this.httpClient
      .get(`${this.baseURL}/current-user`);

    return UserSchema.parse(response.data);
  }
}

export default AuthenticationApi;
