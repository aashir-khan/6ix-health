import { UseCase } from 'domain/definition/UseCase';
import { Right, Left, Either } from 'purify-ts/Either';
import {
  CreateSDCFormResponsePayload,
  ISDCFormResponseEntityGateway,
} from 'domain/usecases/SDCFormResponse/ISDCFormResponseEntityGateway';
import { SDCFormResponse } from 'domain/entities/SDCFormResponse';
import {
  CreateSDCFormResponseInvalidRequest,
  CreateSDCFormResponseValidationFailedRequest,
} from './CreateSDCFormResponseErrors';
import {
  NotFoundRequestError,
  UnknownRequestError,
} from 'domain/usecases/errors';
import { ISDCFormEntityGateway } from 'domain/usecases/SDCForm/ISDCFormEntityGateway';
import { SDCFormResponseService } from 'domain/services/SDCFormResponseService';

// Change back interface if need arises
type CreateSDCFormResponseRequestDTO = CreateSDCFormResponsePayload;

export type CreateSDCFormResponseResponseDTO = Either<
  | CreateSDCFormResponseInvalidRequest
  | NotFoundRequestError
  | CreateSDCFormResponseValidationFailedRequest,
  SDCFormResponse
>;

interface Dependencies {
  SDCFormResponseEntityGateway: ISDCFormResponseEntityGateway;
  SDCFormEntityGateway: ISDCFormEntityGateway;
  SDCFormResponseService: SDCFormResponseService;
}
export class CreateSDCFormResponseUseCase
  implements
    UseCase<CreateSDCFormResponseRequestDTO, CreateSDCFormResponseResponseDTO> {
  private SDCFormResponseEntityGateway: ISDCFormResponseEntityGateway;
  private SDCFormEntityGateway: ISDCFormEntityGateway;

  private SDCFormResponseService: SDCFormResponseService;

  constructor({
    SDCFormResponseEntityGateway,
    SDCFormEntityGateway,
    SDCFormResponseService,
  }: Dependencies) {
    this.SDCFormResponseEntityGateway = SDCFormResponseEntityGateway;
    this.SDCFormEntityGateway = SDCFormEntityGateway;
    this.SDCFormResponseService = SDCFormResponseService;
  }

  async execute(
    request: CreateSDCFormResponseRequestDTO
  ): Promise<CreateSDCFormResponseResponseDTO> {
    let SDCFormRelatingToFormResponse;

    try {
      SDCFormRelatingToFormResponse = await this.SDCFormEntityGateway.getSDCForm(
        request.SDCFormId
      );
      if (!SDCFormRelatingToFormResponse) {
        return Left(new NotFoundRequestError());
      }
    } catch (error) {
      return Left(new UnknownRequestError());
    }

    const formResponseValidationResult = this.SDCFormResponseService.validateSDCFormResponse(
      SDCFormRelatingToFormResponse,
      request // SDCFormResponse
    );

    if (
      formResponseValidationResult.status ===
      'FAILURE_ON_MATCHING_FORM_WITH_RES'
    ) {
      return Left(new CreateSDCFormResponseInvalidRequest());
    } else if (formResponseValidationResult.status === 'FAILED_QUESTIONS') {
      return Left(
        new CreateSDCFormResponseValidationFailedRequest(
          formResponseValidationResult
        )
      );
      // OK
    } else {
      try {
        const SDCFormResponse = await this.SDCFormResponseEntityGateway.createSDCFormResponse(
          request
        );

        return Right(SDCFormResponse);
      } catch (error) {
        return Left(new CreateSDCFormResponseInvalidRequest());
      }
    }
  }
}
