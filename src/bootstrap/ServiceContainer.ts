import IAuthenticationApi from "../services/authentication/IAuthenticationApi";

export default interface ServiceContainer {
  authenticationAPI: IAuthenticationApi;
}
