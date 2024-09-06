
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

export interface HttpResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

interface IHttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>;
  post<T>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>>;
  put<T>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>>;
  delete<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>;
}

export default IHttpClient;
