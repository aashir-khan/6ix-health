import sinon from 'sinon';
import SDCFormRepositoryImpl from '../../../infrastructure/sdcForm/SDCFormRepositoryImpl';
import { SDCForm } from '../../../domain/sdcForm/SDCForm';
import { BaseAPI } from '../../../infrastructure/BaseApi';

const mockedFile = <File>{ text: () => Promise.resolve('Some file contents') };

const mockedForms = [
  {
    SDCFormId: 'id-1',
    Version: 1,
    DiagnosticProcedureId: '1',
    Title: '1',
    LastModified: '1',
  },
  {
    SDCFormId: 'id-2',
    Version: 2,
    DiagnosticProcedureId: '2',
    Title: '2',
    LastModified: '2',
  },
];

const stubs: { [K: string]: sinon.SinonStub } = {};
describe('SDCFormRepositoryImpl', () => {
  let sdcFormRepository: SDCFormRepositoryImpl;
  const baseApi = new BaseAPI();

  beforeAll(() => {
    stubs.baseApiDelete = sinon
      .stub(baseApi, 'delete')
      .resolves({ data: {}, status: 200 });

    stubs.baseApiGet = sinon
      .stub(baseApi, 'get')
      .resolves({ data: mockedForms, status: 200 });

    stubs.baseApiPost = sinon
      .stub(baseApi, 'post')
      .resolves({ data: {}, status: 200 });

    stubs.baseApiPut = sinon
      .stub(baseApi, 'put')
      .resolves({ data: mockedForms, status: 200 });
  });

  beforeEach(() => {
    sdcFormRepository = new SDCFormRepositoryImpl({ baseApi });
  });

  afterAll(() => {
    Object.keys(stubs).forEach((key) => {
      stubs[key].restore();
    });
  });

  describe('addSDCForm', () => {
    it('should post form xml as string on endpoint', async () => {
      const form = await sdcFormRepository.addSDCForm(mockedFile);

      expect(form).toBeInstanceOf(SDCForm);

      expect(
        stubs.baseApiPost.calledWith('/api/v1/SDCForm/', {
          data: {
            XMLString: 'Some file contents',
          },
        })
      ).toBeTruthy();
    });
  });

  describe('getAllSDCForms', () => {
    it('should get all forms from endpoint', async () => {
      const forms = await sdcFormRepository.getAllSDCForms();

      forms.map((form) => expect(form).toBeInstanceOf(SDCForm));
      expect(stubs.baseApiGet.calledWith('/api/v1/SDCForm/')).toBeTruthy();
    });
  });

  describe('getSDCFormsByIds', () => {
    it('should call endpoint with correct query parameters', async () => {
      const forms = await sdcFormRepository.getSDCFormsByIds('1');

      forms.map((form) => expect(form).toBeInstanceOf(SDCForm));

      expect(
        stubs.baseApiGet.calledWith('/api/v1/SDCForm/', {
          params: { SDCFormIds: ['1'] },
        })
      ).toBeTruthy();
    });
  });

  describe('querySDCForms', () => {
    it('should call endpoint with all query parameters', async () => {
      const forms = await sdcFormRepository.querySDCForms(
        ['abc-1', 'abc-2'],
        ['xyz-1', 'xyz-2'],
        'This is a query'
      );

      forms.map((form) => expect(form).toBeInstanceOf(SDCForm));

      expect(
        stubs.baseApiGet.calledWith('/api/v1/SDCForm/', {
          params: {
            SDCFormIds: 'abc-1,abc-2',
            diagnosticProcedureIds: 'xyz-1,xyz-2',
            query: 'This is a query',
          },
        })
      );
    });

    it('should call endpoint with only "SDCFormIds" query parameter', async () => {
      await sdcFormRepository.querySDCForms(['abc-1', 'abc-2'], [], '');

      expect(
        stubs.baseApiGet.calledWith('/api/v1/SDCForm/', {
          params: { SDCFormIds: 'abc-1,abc-2' },
        })
      );
    });

    it('should call endpoint with only "diagnosticProcedureIds" query parameter', async () => {
      await sdcFormRepository.querySDCForms([], ['xyz-1', 'xyz-2'], '');

      expect(
        stubs.baseApiGet.calledWith('/api/v1/SDCForm/', {
          params: { diagnosticProcedureIds: 'xyz-1,xyz-2' },
        })
      );
    });

    it('should call endpoint with only "query" query parameter', async () => {
      await sdcFormRepository.querySDCForms([], [], 'This is a query');

      expect(
        stubs.baseApiGet.calledWith('/api/v1/SDCForm/', {
          params: { query: 'This is a query' },
        })
      );
    });
  });

  describe('updateSDCForm', () => {
    it('should call endpoint with correct body', async () => {
      const sdcForm = new SDCForm({ SDCFormId: 'id-1' });
      const form = await sdcFormRepository.updateSDCForm(sdcForm, mockedFile);

      expect(form).toBeInstanceOf(SDCForm);

      expect(
        stubs.baseApiPut.calledWith('/api/v1/SDCForm/', {
          data: {
            SDCFormId: 'id-1',
            XMLString: 'Some file contents',
          },
        })
      );
    });
  });

  describe.skip('deleteSDCForm', () => {
    it('should call DELETE on endpoint with correct query param', async () => {
      await sdcFormRepository.deleteSDCForm('id-1');

      expect(
        stubs.baseApiDelete.calledWith('/api/v1/SDCForm/', {
          params: { SDCFormIds: ['id-1'] },
        })
      );
    });
  });
});
