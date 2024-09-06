import IAuthenticationAPI from "../api/IAuthenticationAPI";

export default interface ServiceContainer {
  authenticationAPI: IAuthenticationAPI;
}
