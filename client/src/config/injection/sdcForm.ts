import { AwilixContainer, asClass, asFunction } from 'awilix';
import { defaultInjectionOptions } from '.';
import { ISDCFormRepository } from '../../domain/sdcForm/SDCFormRepository';
import { SDCFormDTO } from '../../infrastructure/sdcForm/SDCFormDto';
import { SDCFormRepositoryFake } from '../../infrastructure/sdcForm/SDCFormRepositoryFake';
import SDCFormRepositoryImpl from '../../infrastructure/sdcForm/SDCFormRepositoryImpl';
import { sdcFormDbCreator } from './creators';

export type SDCFormRegistrations = {
  sdcFormRepository: ISDCFormRepository;
  sdcFormDb: PouchDB.Database<SDCFormDTO>;
};

export const SDCFormInjection = ({
  runPouchDbAsStandaloneServer,
} = defaultInjectionOptions) => ({
  registerTestDependencies: (container: AwilixContainer) => {
    container.register({
      sdcFormRepository: asClass(SDCFormRepositoryFake).singleton(),
      sdcFormDb: asFunction(() =>
        sdcFormDbCreator(runPouchDbAsStandaloneServer)
      ).singleton(),
    });
  },

  registerProdAndDevCommonDependencies: (container: AwilixContainer) => {
    container.register({
      sdcFormRepository: asClass(SDCFormRepositoryImpl).singleton(),
    });
  },
});
