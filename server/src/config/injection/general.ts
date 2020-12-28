import { asClass, asFunction, asValue, AwilixContainer } from 'awilix';
import { AppConfig, appConfigCreatingFunction } from 'config/AppConfig';
import { ExpressApp } from 'entrypoint/web/ExpressApp';
import { EnvironmentTypes } from '.';
import dotenv from 'dotenv';
import { assert } from 'console';

export type GeneralRegistrations = {
  expressApp: ExpressApp;
  config: AppConfig;
  environmentMode: EnvironmentTypes;
  mongoBaseURL: string;
};

export const generalInjection = () => {
  const result = dotenv.config();

  if (result.error || result.parsed === undefined) {
    throw result.error;
  }

  const {
    MONGO_DB_CONNECTION_STRING_PROD,
    MONGO_DB_CONNECTION_STRING_DEV,
  } = result.parsed;

  assert(
    MONGO_DB_CONNECTION_STRING_PROD !== undefined,
    'MONGO_DB_CONNECTION_STRING_PROD not provided'
  );
  assert(
    MONGO_DB_CONNECTION_STRING_DEV !== undefined,
    'MONGO_DB_CONNECTION_STRING_DEV not provided'
  );

  return {
    registerProdDependencies: (container: AwilixContainer) => {
      container.register({
        environmentMode: asValue('production'),
        mongoBaseURL: asValue(MONGO_DB_CONNECTION_STRING_PROD),
      });
    },

    registerDevDependencies: (container: AwilixContainer) => {
      container.register({
        environmentMode: asValue('development'),
        mongoBaseURL: asValue(MONGO_DB_CONNECTION_STRING_DEV),
      });
    },

    registerTestDependencies: (container: AwilixContainer) => {
      container.register({
        environmentMode: asValue('test'),
      });
    },

    registerEnvironmentIndependentDependencies: (
      container: AwilixContainer
    ) => {
      container.register({
        config: asFunction(() =>
          appConfigCreatingFunction(container.cradle.environmentMode)
        ).singleton(),
        expressApp: asClass(ExpressApp).singleton(),
      });
    },
  };
};
