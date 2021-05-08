import { IBaseAPI } from '../../infrastructure/BaseApi';
import SDCFormRepositoryImpl from '../../infrastructure/sdcForm/SDCFormRepositoryImpl';
import { mocksForTesting } from '../mocks';

export const factoriesForTesting = {
  repositories: {
    createSDCFormRepository: (baseApi?: IBaseAPI) =>
      new SDCFormRepositoryImpl({
        baseApi: baseApi ?? mocksForTesting.getBaseApi(),
      }),
  },
};
