import { asClass, asFunction, asValue, AwilixContainer } from 'awilix';
import { AppConfig, appConfigCreatingFunction } from 'config/AppConfig';
import { ExpressApp } from 'entrypoint/web/ExpressApp';
import { EnvironmentTypes } from '.';
import dotenv from 'dotenv';

export type GeneralRegistrations = {
  expressApp: ExpressApp;
  config: AppConfig;
  environmentMode: EnvironmentTypes;
  mongoBaseURL: string;
};

export const generalInjection = () => {
  let MONGO_DB_CONNECTION_STRING_PROD: string;
  let MONGO_DB_CONNECTION_STRING_DEV: string;
  if ((process.env.NODE_ENV as string) !== 'production') {
    const result = dotenv.config();

    if (result.error || result.parsed === undefined) {
      throw result.error;
    }

    MONGO_DB_CONNECTION_STRING_PROD =
      result.parsed.MONGO_DB_CONNECTION_STRING_PROD;
    MONGO_DB_CONNECTION_STRING_DEV =
      result.parsed.MONGO_DB_CONNECTION_STRING_DEV;
  } else {
    MONGO_DB_CONNECTION_STRING_PROD = process.env
      .MONGO_DB_CONNECTION_STRING_PROD as string;
  }

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
