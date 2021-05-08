/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';
import { setupCache } from 'axios-cache-adapter';

export interface FunctionExtraParameters {
  data?: any;
  params?: any;
}
export interface ApiResponse<T = any> {
  data: T;
  status: number;
}

export abstract class IBaseAPI {
  abstract get<T = any>(
    url: string,
    extraParameters?: FunctionExtraParameters
  ): Promise<ApiResponse<T>>;

  abstract post<T = any>(
    url: string,
    extraParameters?: FunctionExtraParameters
  ): Promise<ApiResponse<T>>;

  abstract put<T = any>(
    url: string,
    extraParameters?: FunctionExtraParameters
  ): Promise<ApiResponse<T>>;

  abstract delete<T = any>(
    url: string,
    extraParameters?: FunctionExtraParameters
  ): Promise<ApiResponse<T>>;
}

export class BaseAPI implements IBaseAPI {
  axiosInstance: AxiosInstance;

  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    const cache = setupCache({ maxAge: 15 * 60 * 1000 });
    this.axiosInstance = axios.create({
      adapter: cache.adapter,
    });
  }

  async get<T = any>(
    url: string,
    { params }: FunctionExtraParameters = {}
  ): Promise<ApiResponse<T>> {
    const { data, status } = await this.axiosInstance({
      method: 'GET',
      url: `${this.baseUrl}${url}`,
      params,
    });

    return { data, status };
  }

  async post<T = any>(
    url: string,
    { data: _data, params }: FunctionExtraParameters = {}
  ): Promise<ApiResponse<T>> {
    const { data, status } = await this.axiosInstance({
      method: 'POST',
      url: `${this.baseUrl}${url}`,
      data: _data,
      params,
    });

    return { data, status };
  }

  async put<T = any>(
    url: string,
    { data: _data }: FunctionExtraParameters = {}
  ): Promise<ApiResponse<T>> {
    const { data, status } = await this.axiosInstance({
      method: 'PUT',
      url: `${this.baseUrl}${url}`,
      data: _data,
    });

    return { data, status };
  }

  async delete<T = any>(
    url: string,
    { data: _data }: FunctionExtraParameters = {}
  ): Promise<ApiResponse<T>> {
    const { data, status } = await this.axiosInstance({
      method: 'DELETE',
      url: `${this.baseUrl}${url}`,
      data: _data,
    });

    return { data, status };
  }
}
