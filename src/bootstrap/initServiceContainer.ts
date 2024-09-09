import LocalMockAuthenticationApi from "../services/authentication/LocalMockAuthenticationApi";
import HttpClient from "../services/http/HttpClient";
import ServiceContainer from "./ServiceContainer";

const initServiceContainer = (overrides: Partial<ServiceContainer> = {}): ServiceContainer => ({
  authenticationAPI: new LocalMockAuthenticationApi({
    httpClient: new HttpClient(),
    port: 3000
  }),
  ...overrides
});

export default initServiceContainer;
