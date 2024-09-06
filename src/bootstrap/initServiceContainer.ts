import FakeAuthenticationAPI from "../api/FakeAuthenticationAPI";
import ServiceContainer from "./ServiceContainer";

const initServiceContainer = (): ServiceContainer => ({
  authenticationAPI: new FakeAuthenticationAPI({
    protocol: 'https',
    host: "www.example.org",
    port: 8080
  })
});

export default initServiceContainer;
