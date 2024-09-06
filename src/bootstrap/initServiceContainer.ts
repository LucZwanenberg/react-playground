import AuthenticationApi from "../services/authentication/FooAuthenticationApi";
import HttpClient from "../services/http/HttpClient";
import ServiceContainer from "./ServiceContainer";

const initServiceContainer = (): ServiceContainer => ({
  authenticationAPI: new AuthenticationApi({
    httpClient: new HttpClient(),
    protocol: 'https',
    host: "mpaccf2a06bbb3ffdb31.free.beeceptor.com",
    port: 443
  })
});

export default initServiceContainer;
