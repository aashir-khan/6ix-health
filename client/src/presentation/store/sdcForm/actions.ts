import { SDCActions } from '.';
import { AppThunk } from '..';
import { diContainer } from '../../../config/injection';
import { SDCForm } from '../../../domain/sdcForm/SDCForm';

export const getAllSDCForms = (): AppThunk => {
  return async function (dispatch) {
    const { sdcFormRepository } = diContainer().cradle;
    const SDCFormData = await sdcFormRepository.getAllSDCForms();
    dispatch(SDCActions.onGetSDCFormsSuccess(SDCFormData));
  };
};

export const querySDCForms = (
  data: {
    queryText: string;
    SDCFormIds: string[];
    diagnosticProcedureIds: string[];
  } | null
): AppThunk => {
  return async function (dispatch) {
    const { sdcFormRepository } = diContainer().cradle;

    dispatch(SDCActions.clearSearchResults());

    if (data === null) {
      return;
    }

    dispatch(SDCActions.onStartSearch());

    try {
      const SDCFormData = await sdcFormRepository.querySDCForms(
        data.SDCFormIds,
        data.diagnosticProcedureIds,
        data.queryText
      );

      dispatch(SDCActions.onSearchSDCFormsSuccess(SDCFormData));
    } catch (err) {
      dispatch(SDCActions.onSearchSDCFormsFailure());
    }
  };
};

export const addSDCForm = (sdcFormFile: File): AppThunk => {
  return async (dispatch) => {
    const { sdcFormRepository } = diContainer().cradle;
    const createdSDCForm = await sdcFormRepository.addSDCForm(sdcFormFile);
    dispatch(SDCActions.onAddSDCForm(createdSDCForm));
  };
};

// not actually implemented properly yet
export const updateSDCForm = (
  sdcForm: SDCForm,
  sdcFormFile: File
): AppThunk => {
  return async function (dispatch) {
    const { sdcFormRepository } = diContainer().cradle;
    const updatedSDCForm = await sdcFormRepository.updateSDCForm(
      sdcForm,
      sdcFormFile
    );
    dispatch(SDCActions.onUpdateSDCForm(updatedSDCForm));
  };
};

export const deleteSDCForm = (sdcForm: SDCForm): AppThunk => {
  return async function (dispatch) {
    const { sdcFormRepository } = diContainer().cradle;
    await sdcFormRepository.deleteSDCForm(...[sdcForm.SDCFormId]);
    dispatch(SDCActions.onDeleteSDCForm(sdcForm));
  };
};
