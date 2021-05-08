import { formFillersActions } from '.';
import { AppThunk } from '..';
import { diContainer } from '../../../config/injection';
import FormFiller from '../../../domain/formFiller/FormFiller';

export const addFormFiller = (formFiller: FormFiller): AppThunk => {
  return async function (dispatch) {
    const { formFillerRepository } = diContainer().cradle;
    const createdFormFiller = await formFillerRepository.addFormFiller(
      formFiller
    );

    dispatch(formFillersActions.onAddFormFiller(createdFormFiller));
  };
};

export const getFormFillers = (): AppThunk => {
  return async function (dispatch) {
    const { formFillerRepository } = diContainer().cradle;
    const formFillerData = await formFillerRepository.getFormFillers();
    dispatch(formFillersActions.onGetFormFillers(formFillerData));
  };
};

export const updateFormFiller = (formFiller: FormFiller): AppThunk => {
  return async function (dispatch) {
    const { formFillerRepository } = diContainer().cradle;
    const updatedFormFiller = await formFillerRepository.updateFormFiller(
      formFiller
    );
    dispatch(formFillersActions.onUpdateFormFiller(updatedFormFiller));
  };
};

export const deleteFormFiller = (formFiller: FormFiller): AppThunk => {
  return async function (dispatch) {
    const { formFillerRepository } = diContainer().cradle;
    await formFillerRepository.deleteFormFiller(formFiller);
    dispatch(formFillersActions.onDeleteFormFiller(formFiller));
  };
};
