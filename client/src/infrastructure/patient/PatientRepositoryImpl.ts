import Patient from '../../domain/patient/Patient';
import { IPatientRepository } from '../../domain/patient/PatientRepository';
import { IBaseAPI } from '../BaseApi';
import { PatientDTO } from './PatientDto';
import PatientMapper from './PatientMapper';

const patientApiURL = '/api/v1/patient';

interface Dependencies {
  baseApi: IBaseAPI;
}

export default class PatientRepositoryImpl implements IPatientRepository {
  private baseApi: IBaseAPI;

  constructor({ baseApi }: Dependencies) {
    this.baseApi = baseApi;
  }

  async addPatient(patient: Patient): Promise<Patient> {
    const patientToBeCreateDto = PatientMapper.toDTO(patient);

    const res = await this.baseApi.post<PatientDTO>(patientApiURL, {
      data: patientToBeCreateDto,
    });

    return PatientMapper.toDomain(res.data);
  }

  async getPatients(): Promise<Patient[]> {
    const res = await this.baseApi.get<PatientDTO[]>(patientApiURL);
    return res.data.map(PatientMapper.toDomain);
  }

  async updatePatient(patient: Patient): Promise<Patient> {
    const patientToBeUpdatedDto = PatientMapper.toDTO(patient);

    const res = await this.baseApi.put<PatientDTO>(patientApiURL, {
      data: patientToBeUpdatedDto,
    });

    return PatientMapper.toDomain(res.data);
  }

  async deletePatient(patient: Patient): Promise<void> {
    await this.baseApi.delete(patientApiURL, {
      data: PatientMapper.toDTO(patient),
    });
  }
}
