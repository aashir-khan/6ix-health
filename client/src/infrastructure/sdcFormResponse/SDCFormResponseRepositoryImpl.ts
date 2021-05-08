import { SDCForm } from '../../domain/sdcForm/SDCForm';
import { FailureOnQuestionsResult } from '../../domain/sdcForm/SDCFormResponseValidationResult';
import { SDCFormResponse } from '../../domain/sdcFormResponse/SDCFormResponse';
import { ISDCFormResponseRepository } from '../../domain/sdcFormResponse/SDCFormResponseRepository';
import { IBaseAPI } from '../BaseApi';
import { SDCFormResponseDTO } from './SDCFormResponseDto';
import SDCFormResponseMapper from './SDCFormResponseMapper';

const SDCFormResponseApiURL = '/api/v1/SDCFormResponse';

interface Dependencies {
  baseApi: IBaseAPI;
}
export default class SDCFormResponseRepositoryImpl
  implements ISDCFormResponseRepository {
  private baseApi: IBaseAPI;

  constructor({ baseApi }: Dependencies) {
    this.baseApi = baseApi;
  }

  async getDefaultAnswersForForm(sdcForm: SDCForm): Promise<SDCFormResponse> {
    const res = await this.baseApi.get<SDCFormResponseDTO>(
      `${SDCFormResponseApiURL}/default`,
      {
        params: { SDCFormId: sdcForm.SDCFormId },
      }
    );

    return SDCFormResponseMapper.toDomain(res.data);
  }

  async getAllSDCFormResponses(): Promise<SDCFormResponse[]> {
    const res = await this.baseApi.get<SDCFormResponseDTO[]>(
      SDCFormResponseApiURL
    );
    return res.data.map(SDCFormResponseMapper.toDomain);
  }

  async submitSDCFormResponse(
    sdcFormResponse: SDCFormResponse
  ): Promise<SDCFormResponse | FailureOnQuestionsResult> {
    let res;
    try {
      res = await this.baseApi.post(SDCFormResponseApiURL, {
        data: SDCFormResponseMapper.toDTO(sdcFormResponse),
      });
      return SDCFormResponseMapper.toDomain(res.data);
    } catch (error) {
      const questionValidationResult = JSON.parse(
        error.response.data.message
      ) as FailureOnQuestionsResult;
      return questionValidationResult;
    }
  }
}
