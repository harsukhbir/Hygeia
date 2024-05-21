import Services from '../../../src/services/services';
import * as commonActions from './commonActions';
import {showAPIErrorAlert} from '../../utils/native';

export const PRODUCT_SUPPORT_FORM_START = 'PRODUCT_SUPPORT_FORM_START';
export const PRODUCT_SUPPORT_FORM_SUCCESS = 'PRODUCT_SUPPORT_FORM_SUCCESS';
export const TECH_SUPPORT_FORM_START = 'TECH_SUPPORT_FORM_START';
export const TECH_SUPPORT_FORM_SUCCESS = 'TECH_SUPPORT_FORM_SUCCESS';

/* SIGNUP ACTIONS */
export const productSupportFormStart = () => ({
  type: PRODUCT_SUPPORT_FORM_START,
});

export const productSupportFormSuccess = data => ({
  type: PRODUCT_SUPPORT_FORM_SUCCESS,
  data,
});

export const techSupportFormStart = () => ({
  type: TECH_SUPPORT_FORM_START,
});

export const techSupportFormSuccess = data => ({
  type: TECH_SUPPORT_FORM_SUCCESS,
  data,
});

export function handleProductForm(data) {
  return dispatch => {
    dispatch(commonActions.loadingStart());
    dispatch(productSupportFormStart());
    Services.handleProductForm(data)
      .then(function (response) {
        dispatch(productSupportFormSuccess(response.data));
        dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        showAPIErrorAlert(error);
      });
  };
}

export function handleTechForm(data) {
  return dispatch => {
    dispatch(commonActions.loadingStart());
    dispatch(techSupportFormStart());
    Services.handleTechForm(data)
      .then(function (response) {
        dispatch(techSupportFormSuccess(response.data));
        dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        showAPIErrorAlert(error);
      });
  };
}
