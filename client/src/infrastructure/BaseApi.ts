import axios, { AxiosInstance } from 'axios';
import { setupCache } from 'axios-cache-adapter';
import { apiConfig } from '../config/api/api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ApiResponse<T = any> {
  data: T;
  status: number;
}

export class BaseAPI {
  axiosInstance: AxiosInstance;

  private baseUrl: string;

  constructor() {
    this.baseUrl = apiConfig.baseUrl;
    const cache = setupCache({ maxAge: 15 * 60 * 1000 });
    this.axiosInstance = axios.create({
      adapter: cache.adapter,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get<T = any>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { params }: { params?: any } = {}
  ): Promise<ApiResponse<T>> {
    const { data, status } = await this.axiosInstance({
      method: 'GET',
      url: `${this.baseUrl}${url}`,
      params,
    });

    return { data, status };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post<T = any>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { data: _data, params }: { data?: any; params?: any } = {}
  ): Promise<ApiResponse<T>> {
    const { data, status } = await this.axiosInstance({
      method: 'POST',
      url: `${this.baseUrl}${url}`,
      data: _data,
      params,
    });

    return { data, status };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async put<T = any>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { data: _data }: { data?: any } = {}
  ): Promise<ApiResponse<T>> {
    const { data, status } = await this.axiosInstance({
      method: 'PUT',
      url: `${this.baseUrl}${url}`,
      data: _data,
    });

    return { data, status };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async delete<T = any>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { data: _data }: { data?: any } = {}
  ): Promise<ApiResponse<T>> {
    const { data, status } = await this.axiosInstance({
      method: 'DELETE',
      url: `${this.baseUrl}${url}`,
      data: _data,
    });

    return { data, status };
  }
}
