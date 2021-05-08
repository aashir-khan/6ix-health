import { AwilixContainer, asClass } from 'awilix';
import { ISDCFormResponseRepository } from '../../domain/sdcFormResponse/SDCFormResponseRepository';
import { SDCFormResponseRepositoryFake } from '../../infrastructure/sdcFormResponse/SDCFormResponseRepositoryFake';
import SDCFormResponseRepositoryImpl from '../../infrastructure/sdcFormResponse/SDCFormResponseRepositoryImpl';

export type SDCFormResponseRegistrations = {
  sdcFormResponseRepository: ISDCFormResponseRepository;
};

export const SDCFormResponseInjection = () => ({
  registerTestDependencies: (container: AwilixContainer) => {
    container.register({
      sdcFormResponseRepository: asClass(
        SDCFormResponseRepositoryFake
      ).singleton(),
    });
  },

  registerProdAndDevCommonDependencies: (container: AwilixContainer) => {
    container.register({
      sdcFormResponseRepository: asClass(
        SDCFormResponseRepositoryImpl
      ).singleton(),
    });
  },
});
