import { patientsActions } from '.';
import { AppThunk } from '..';
import { diContainer } from '../../../config/injection';
import Patient from '../../../domain/patient/Patient';

export const addPatient = (patient: Patient): AppThunk => {
  return async function (dispatch) {
    const { patientRepository } = diContainer().cradle;
    const createdPatient = await patientRepository.addPatient(patient);

    dispatch(patientsActions.onAddPatient(createdPatient));
  };
};

export const getPatients = (): AppThunk => {
  return async function (dispatch) {
    const { patientRepository } = diContainer().cradle;
    const patientData = await patientRepository.getPatients();
    dispatch(patientsActions.onGetPatients(patientData));
  };
};

export const updatePatient = (patient: Patient): AppThunk => {
  return async function (dispatch) {
    const { patientRepository } = diContainer().cradle;
    const updatedPatient = await patientRepository.updatePatient(patient);
    dispatch(patientsActions.onUpdatePatient(updatedPatient));
  };
};

export const deletePatient = (patient: Patient): AppThunk => {
  return async function (dispatch) {
    const { patientRepository } = diContainer().cradle;
    await patientRepository.deletePatient(patient);
    dispatch(patientsActions.onDeletePatient(patient));
  };
};
