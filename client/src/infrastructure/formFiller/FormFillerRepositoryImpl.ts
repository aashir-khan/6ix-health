import FormFiller from '../../domain/formFiller/FormFiller';
import { IFormFillerRepository } from '../../domain/formFiller/FormFillerRepository';
import { BaseAPI } from '../BaseApi';
import { FormFillerDTO } from './FormFillerDto';
import FormFillerMapper from './FormFillerMapper';

const formFillerApiURL = '/api/v1/form-filler';

interface Dependencies {
  baseApi: BaseAPI;
}
export default class FormFillerRepositoryImpl implements IFormFillerRepository {
  private baseApi: BaseAPI;

  constructor({ baseApi }: Dependencies) {
    this.baseApi = baseApi;
  }

  async addFormFiller(formFiller: FormFiller): Promise<FormFiller> {
    const formFillerToBeCreateDto = FormFillerMapper.toDTO(formFiller);

    const res = await this.baseApi.post<FormFillerDTO>(formFillerApiURL, {
      data: formFillerToBeCreateDto,
    });

    return FormFillerMapper.toDomain(res.data);
  }

  async getFormFillers(): Promise<FormFiller[]> {
    const res = await this.baseApi.get<FormFillerDTO[]>(formFillerApiURL);
    return res.data.map(FormFillerMapper.toDomain);
  }

  async updateFormFiller(formFiller: FormFiller): Promise<FormFiller> {
    const formFillerToBeUpdatedDto = FormFillerMapper.toDTO(formFiller);

    const res = await this.baseApi.put<FormFillerDTO>(formFillerApiURL, {
      data: formFillerToBeUpdatedDto,
    });

    return FormFillerMapper.toDomain(res.data);
  }

  async deleteFormFiller(formFiller: FormFiller): Promise<void> {
    await this.baseApi.delete(formFillerApiURL, {
      data: FormFillerMapper.toDTO(formFiller),
    });
  }
}
