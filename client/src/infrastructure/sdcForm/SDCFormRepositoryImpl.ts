import { SDCForm } from '../../domain/sdcForm/SDCForm';
import { ISDCFormRepository } from '../../domain/sdcForm/SDCFormRepository';
import { IBaseAPI } from '../BaseApi';
import { SDCFormDTO } from './SDCFormDto';
import SDCFormMapper from './SDCFormMapper';

const SDCFormApiURL = '/api/v1/SDCForm/';

interface Dependencies {
  baseApi: IBaseAPI;
}
export default class SDCFormRepositoryImpl implements ISDCFormRepository {
  private baseApi: IBaseAPI;

  constructor({ baseApi }: Dependencies) {
    this.baseApi = baseApi;
  }

  async addSDCForm(sdcFormXML: File): Promise<SDCForm> {
    const xmlStr: string = await sdcFormXML.text();
    const res = await this.baseApi.post<SDCFormDTO>(SDCFormApiURL, {
      data: {
        XMLString: xmlStr,
      },
    });

    return SDCFormMapper.toDomain(res.data);
  }

  async getAllSDCForms(): Promise<SDCForm[]> {
    const res = await this.baseApi.get(SDCFormApiURL);
    return res.data.map(SDCFormMapper.toDomain);
  }

  async getSDCFormsByIds(...ids: string[]): Promise<SDCForm[]> {
    const res = await this.baseApi.get(SDCFormApiURL, {
      params: { SDCFormIds: ids },
    });
    return res.data.map(SDCFormMapper.toDomain);
  }

  async querySDCForms(
    SDCFormIds: string[],
    diagnosticProcedureIds: string[],
    queryText: string
  ): Promise<SDCForm[]> {
    const params: {
      [key: string]: string[] | string;
    } = {};

    if (SDCFormIds && SDCFormIds.length !== 0) {
      params.SDCFormIds = SDCFormIds.join(',');
    }

    if (diagnosticProcedureIds && diagnosticProcedureIds.length !== 0) {
      params.diagnosticProcedureIds = diagnosticProcedureIds.join(',');
    }

    if (queryText) params.query = queryText;

    const res = await this.baseApi.get(SDCFormApiURL, { params });
    return res.data.map(SDCFormMapper.toDomain);
  }

  async updateSDCForm(sdcForm: SDCForm, sdcFormXML: File): Promise<SDCForm> {
    const xmlStr: string = await sdcFormXML.text();
    // TODO might have to fix url params
    const res = await this.baseApi.put<SDCFormDTO>(SDCFormApiURL, {
      data: {
        SDCFormId: sdcForm.SDCFormId,
        XMLString: xmlStr,
      },
    });
    return SDCFormMapper.toDomain(res.data);
  }

  async deleteSDCForm(...ids: string[]): Promise<void> {
    const res = await this.baseApi.delete(SDCFormApiURL, {
      data: { SDCFormIds: ids },
    });

    return res.data;
  }
}
