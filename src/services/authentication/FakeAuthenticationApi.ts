import IAuthenticationApi, { User } from './IAuthenticationApi';
import IHttpClient from '../http/IHttpClient';

interface FakeAPIConfig {
  httpClient: IHttpClient;
  protocol: "http" | "https";
  host: string;
  port: number;
}

class FakeAuthenticationApi implements IAuthenticationApi {
  public constructor(_config: FakeAPIConfig) { }

  private readonly fakeUser: User = {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
  };

  async fetchCurrentUser(): Promise<User | null> {
    await this.simulateNetworkDelay();
    const isAuthenticated = Math.random() > 0.25;
    return isAuthenticated ? this.fakeUser : null;
  }

  private simulateNetworkDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

export default FakeAuthenticationApi;
