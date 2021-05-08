import { asClass, asFunction, AwilixContainer } from 'awilix';
import { defaultInjectionOptions } from '.';
import { IPatientRepository } from '../../domain/patient/PatientRepository';
import { PatientDTO } from '../../infrastructure/patient/PatientDto';
import { PatientRepositoryFake } from '../../infrastructure/patient/PatientRepositoryFake';
import PatientRepositoryImpl from '../../infrastructure/patient/PatientRepositoryImpl';
import { patientDbCreator } from './creators';

export type PatientRegistrations = {
  patientRepository: IPatientRepository;
  patientDb: PouchDB.Database<PatientDTO>;
};

export const patientInjection = ({
  runPouchDbAsStandaloneServer,
} = defaultInjectionOptions) => ({
  registerTestDependencies: (container: AwilixContainer) => {
    container.register({
      patientRepository: asClass(PatientRepositoryFake).singleton(),
      patientDb: asFunction(() =>
        patientDbCreator(runPouchDbAsStandaloneServer)
      ).singleton(),
    });
  },

  registerProdAndDevCommonDependencies: (container: AwilixContainer) => {
    container.register({
      patientRepository: asClass(PatientRepositoryImpl).singleton(),
    });
  },
});
