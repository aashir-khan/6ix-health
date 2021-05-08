import { asClass, asValue, AwilixContainer } from 'awilix';
import { EnvironmentTypes } from '.';
import { BaseAPI } from '../../infrastructure/BaseApi';

export type GeneralRegistrations = {
  environmentMode: EnvironmentTypes;
  baseApi: BaseAPI;
};

export const generalInjection = () => ({
  registerProdDependencies: (container: AwilixContainer) => {
    container.register({
      environmentMode: asValue('production'),
    });
  },

  registerDevDependencies: (container: AwilixContainer) => {
    container.register({
      environmentMode: asValue('development'),
    });
  },

  registerTestDependencies: (container: AwilixContainer) => {
    container.register({
      environmentMode: asValue('test'),
    });
  },

  registerProdAndDevCommonDependencies: (container: AwilixContainer) => {
    container.register({
      baseApi: asClass(BaseAPI).singleton(),
    });
  },
});
