import Services from '../../../src/services/services';
import * as commonActions from './commonActions';
import {showAPIErrorAlert} from '../../utils/native';

export const ADD_DIAPER_START = 'ADD_DIAPER_START';
export const ADD_DIAPER_SUCCESS = 'ADD_DIAPER_SUCCESS';
export const DIAPER_LISTING_START = 'DIAPER_LISTING_START';
export const DIAPER_LISTING_SUCCESS = 'DIAPER_LISTING_SUCCESS';
export const DIAPER_LISTING_FAILURE = 'DIAPER_LISTING_FAILURE';
export const DIAPER_DELETE_START = 'DIAPER_DELETE_START';
export const DIAPER_DELETE_SUCCESS = 'DIAPER_DELETE_SUCCESS';
export const CLEAR_MSG = 'CLEAR_MSG';
export const EDIT_GET_DATA_DIAPER = 'EDIT_GET_DATA_DIAPER';
export const EDIT_DIAPER_START = 'EDIT_DIAPER_START';
export const EDIT_DIAPER_SUCCESS = 'EDIT_DIAPER_SUCCESS';

/* LOGIN ACTIONS */
export const addDiaperStart = () => ({
  type: ADD_DIAPER_START,
});

export const addDiaperSuccess = data => ({
  type: ADD_DIAPER_SUCCESS,
  data,
});

export const DiaperListingStart = () => ({
  type: DIAPER_LISTING_START,
});

export const DiaperListingSuccess = data => ({
  type: DIAPER_LISTING_SUCCESS,
  data,
});
export const DiaperListingFailure = data => ({
  type: DIAPER_LISTING_FAILURE,
  data,
});

export const DiaperDeleteStart = () => ({
  type: DIAPER_DELETE_START,
});

export const DiaperDeleteSuccess = data => ({
  type: DIAPER_DELETE_SUCCESS,
  data,
});

export const clearMsg = () => ({
  type: CLEAR_MSG,
});

export const EditGetDataDiaper = data => ({
  type: EDIT_GET_DATA_DIAPER,
  data,
});

export const editDiaperStart = () => ({
  type: EDIT_DIAPER_START,
});

export const editDiaperSuccess = data => ({
  type: EDIT_DIAPER_SUCCESS,
  data,
});

export function handleDiaperCreate(data) {
  return (dispatch, getState) => {
    dispatch(commonActions.loadingStart());
    dispatch(addDiaperStart());
    const state = getState();
    let plisting = {};
    plisting.result = [...state.diaperReducer.diaperListing.result];
    Services.handleDiaperCreate(data)
      .then(function (response) {
        plisting.result.push(response.data.result);
        dispatch(commonActions.loadingEnd());
        dispatch({
          type: 'SET_REFRESH_DATA',
          payload: true,
        });
        dispatch(addDiaperSuccess(plisting));
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        showAPIErrorAlert(error);
      });
  };
}

export function handleDiaperListing(data) {
  return dispatch => {
    // dispatch(commonActions.loadingStart());
    dispatch(DiaperListingStart());
    Services.handleDiaperListing(data)
      .then(function (response) {
        dispatch(DiaperListingSuccess(response.data));
        // dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        // dispatch(commonActions.loadingEnd());
        dispatch(DiaperListingFailure(error.response.data));
        // showAPIErrorAlert(error);
      });
  };
}

export function handleDiaperDelete(data) {
  return (dispatch, getState) => {
    dispatch(commonActions.loadingStart());
    dispatch(DiaperDeleteStart());
    const state = getState();
    let plisting = {};
    plisting.result = [...state.diaperReducer.diaperListing.result];
    Services.handleDiaperDelete(data)
      .then(function (response) {
        const dataFilter = plisting.result.filter(
          el => el.id !== data.diaper_id,
        );
        plisting.result = dataFilter;
        dispatch(commonActions.loadingEnd());
        dispatch(DiaperDeleteSuccess(plisting));
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        showAPIErrorAlert(error);
      });
  };
}

export function handleDiaperEdit(data) {
  return (dispatch, getState) => {
    dispatch(commonActions.loadingStart());
    dispatch(editDiaperStart());
    const state = getState();
    let plisting = {};
    plisting.result = [...state.diaperReducer.diaperListing.result];
    Services.handleDiaperEdit(data)
      .then(function (response) {
        const dataFilter = [];
        plisting.result.forEach(el => {
          if (el.id === data.diaper_id) {
            el = data;
            el.id = data.diaper_id;
          }
          dataFilter.push(el);
          return el;
        });
        plisting.result = dataFilter;
        dispatch(commonActions.loadingEnd());
        dispatch({
          type: 'SET_REFRESH_DATA',
          payload: true,
        });
        dispatch(editDiaperSuccess(plisting));
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        showAPIErrorAlert(error);
      });
  };
}
