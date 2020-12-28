import SDCForm from 'domain/entities/SDCForm';
import SDCFormResponse from 'domain/entities/SDCFormResponse';
import { SDCFormResponseValidationResult } from 'domain/entities/SDCFormResponseValidationResult';
import { SDCFormResponseValidatorUtility } from 'domain/services/formValidation';

// This is a "domain service" as looked at from DDD
export class SDCFormResponseService {
  // can be used by various usecases
  validateSDCFormResponse(
    sdcForm: SDCForm,
    sdcFormResponse: Omit<
      SDCFormResponse,
      'formFillerId' | 'OHIPNumber' | 'lastModified'
    >
  ): SDCFormResponseValidationResult {
    // complex validation pushed off to another file to keep the service file reasonable in size
    return SDCFormResponseValidatorUtility.validateSDCFormResponse(
      sdcFormResponse,
      sdcForm
    );
  }
}
