import IAuthenticationApi from "../api/IAuthenticationApi";

export default interface ServiceContainer {
  authenticationAPI: IAuthenticationApi;
}
