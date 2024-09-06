export default interface IHttpClient {
  fetch(url: string): Promise<string>;
}
