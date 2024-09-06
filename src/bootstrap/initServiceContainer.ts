import FakeAuthenticationApi from "../api/FakeAuthenticationApi";
import IHttpClient from "../api/IHttpClient";
import ServiceContainer from "./ServiceContainer";

class HttpClient implements IHttpClient {
  fetch(url: string): Promise<string> {
    return new Promise(resolve => {
      fetch(url).then(response => resolve(`${response}`));
    });
  }
}

const initServiceContainer = (): ServiceContainer => ({
  authenticationAPI: new FakeAuthenticationApi({
    httpClient: new HttpClient(),
    protocol: 'https',
    host: "www.example.org",
    port: 8080
  })
});

export default initServiceContainer;
