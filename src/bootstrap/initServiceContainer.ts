import FakeAuthenticationApi from "../services/authentication/FakeAuthenticationApi";
import HttpClient from "../services/http/HttpClient";
import ServiceContainer from "./ServiceContainer";

const initServiceContainer = (overrides: Partial<ServiceContainer> = {}): ServiceContainer => ({
  authenticationAPI: new FakeAuthenticationApi({
    httpClient: new HttpClient(),
    protocol: 'https',
    host: "localhost",
    port: 443
  }),
  ...overrides
});

export default initServiceContainer;
