/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApiResponse,
  FunctionExtraParameters,
  IBaseAPI,
} from '../../infrastructure/BaseApi';

class BaseAPIMock implements IBaseAPI {
  get<T = any>(
    url: string,
    extraParameters: FunctionExtraParameters
  ): Promise<ApiResponse<T>> {
    throw new Error('Method not implemented.');
  }

  post<T = any>(
    url: string,
    extraParameters: FunctionExtraParameters
  ): Promise<ApiResponse<T>> {
    throw new Error('Method not implemented.');
  }

  put<T = any>(
    url: string,
    extraParameters: FunctionExtraParameters
  ): Promise<ApiResponse<T>> {
    throw new Error('Method not implemented.');
  }

  delete<T = any>(
    url: string,
    extraParameters: FunctionExtraParameters
  ): Promise<ApiResponse<T>> {
    throw new Error('Method not implemented.');
  }
}
export const mocksForTesting = {
  getBaseApi: () => new BaseAPIMock(),
};
