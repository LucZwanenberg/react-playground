import IHttpClient, { HttpResponse, RequestConfig } from "./IHttpClient";

class HttpClient implements IHttpClient {
  async get<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
    const response = await fetch(url, {
      method: 'GET',
      headers: config?.headers,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: config?.headers,
    });

    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<HttpResponse<T>> {
    const data = await response.json();
    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: this.parseHeaders(response.headers),
    };
  }

  private parseHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
}

export default HttpClient;
