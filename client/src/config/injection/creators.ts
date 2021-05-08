import PouchDB from 'pouchdb';

import { FormFillerDTO } from '../../infrastructure/formFiller/FormFillerDto';
import { PatientDTO } from '../../infrastructure/patient/PatientDto';
import { SDCFormDTO } from '../../infrastructure/sdcForm/SDCFormDto';

export const formFillerDbCreator = (runPouchDbAsStandaloneServer: boolean) => {
  return new PouchDB<FormFillerDTO>(
    runPouchDbAsStandaloneServer
      ? 'http://localhost:5984/formFillers'
      : 'formFillers'
  );
};

export const patientDbCreator = (runPouchDbAsStandaloneServer: boolean) => {
  return new PouchDB<PatientDTO>(
    runPouchDbAsStandaloneServer ? 'http://localhost:5984/patients' : 'patients'
  );
};

export const sdcFormDbCreator = (runPouchDbAsStandaloneServer: boolean) => {
  return new PouchDB<SDCFormDTO>(
    runPouchDbAsStandaloneServer ? 'http://localhost:5984/SDCForms' : 'SDCForms'
  );
};
