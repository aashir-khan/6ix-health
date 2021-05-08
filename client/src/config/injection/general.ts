import { asFunction, AwilixContainer } from 'awilix';
import { EnvironmentTypes } from '.';
import { IBaseAPI, BaseAPI } from '../../infrastructure/BaseApi';

export type GeneralRegistrations = {
  baseApi: IBaseAPI;
};

export const generalInjection = (environment: EnvironmentTypes) => ({
  registerProdAndDevCommonDependencies: (container: AwilixContainer) => {
    const baseUrl =
      environment === 'production'
        ? (process.env.REACT_APP_BASE_API_URL_PROD as string)
        : (process.env.REACT_APP_BASE_API_URL_DEV as string);

    container.register({
      baseApi: asFunction(() => new BaseAPI(baseUrl)).singleton(),
    });
  },
});
