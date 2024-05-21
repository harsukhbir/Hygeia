import Services from '../../../src/services/services';
import * as commonActions from './commonActions';
import {showAPIErrorAlert} from '../../utils/native';

export const ADD_BOTTLE_START = 'ADD_BOTTLE_START';
export const ADD_BOTTLE_SUCCESS = 'ADD_BOTTLE_SUCCESS';
export const BOTTLE_LISTING_START = 'BOTTLE_LISTING_START';
export const BOTTLE_LISTING_SUCCESS = 'BOTTLE_LISTING_SUCCESS';
export const BOTTLE_LISTING_FAILURE = 'BOTTLE_LISTING_FAILURE';
export const BOTTLE_DELETE_START = 'BOTTLE_DELETE_START';
export const BOTTLE_DELETE_SUCCESS = 'BOTTLE_DELETE_SUCCESS';
export const CLEAR_MSG = 'CLEAR_MSG';
export const EDIT_GET_DATA_BOTTLE = 'EDIT_GET_DATA_BOTTLE';
export const EDIT_BOTTLE_START = 'EDIT_BOTTLE_START';
export const EDIT_BOTTLE_SUCCESS = 'EDIT_BOTTLE_SUCCESS';

/* LOGIN ACTIONS */
export const addBottleStart = () => ({
  type: ADD_BOTTLE_START,
});

export const addBottleSuccess = data => ({
  type: ADD_BOTTLE_SUCCESS,
  data,
});

export const BottleListingStart = () => ({
  type: BOTTLE_LISTING_START,
});

export const BottleListingSuccess = data => ({
  type: BOTTLE_LISTING_SUCCESS,
  data,
});
export const BottleListingFailure = data => ({
  type: BOTTLE_LISTING_FAILURE,
  data,
});

export const BottleDeleteStart = () => ({
  type: BOTTLE_DELETE_START,
});

export const BottleDeleteSuccess = data => ({
  type: BOTTLE_DELETE_SUCCESS,
  data,
});

export const clearMsg = () => ({
  type: CLEAR_MSG,
});

export const EditGetDataBottle = data => ({
  type: EDIT_GET_DATA_BOTTLE,
  data,
});

export const editBottleStart = () => ({
  type: EDIT_BOTTLE_START,
});

export const editBottleSuccess = data => ({
  type: EDIT_BOTTLE_SUCCESS,
  data,
});

export function handleBottleCreate(data) {
  return (dispatch, getState) => {
    dispatch(commonActions.loadingStart());
    dispatch(addBottleStart());
    const state = getState();
    let plisting = {};
    plisting.result = [...state.bottleReducer.bottleListing.result];
    Services.handleBottleCreate(data)
      .then(function (response) {
        plisting.result.push(response.data.result);
        dispatch(commonActions.loadingEnd());
        dispatch({
          type: 'SET_REFRESH_DATA',
          payload: true,
        });
        dispatch(addBottleSuccess(plisting));
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        showAPIErrorAlert(error);
      });
  };
}

export function handleBottleListing(data) {
  return dispatch => {
    // dispatch(commonActions.loadingStart());
    dispatch(BottleListingStart());
    Services.handleBottleListing(data)
      .then(function (response) {
        dispatch(BottleListingSuccess(response.data));
        // dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        // dispatch(commonActions.loadingEnd());
        dispatch(BottleListingFailure(error.response.data));
        // showAPIErrorAlert(error);
      });
  };
}

export function handleBottleDelete(data) {
  return (dispatch, getState) => {
    dispatch(commonActions.loadingStart());
    dispatch(BottleDeleteStart());
    const state = getState();
    let plisting = {};
    plisting.result = [...state.bottleReducer.bottleListing.result];
    Services.handleBottleDelete(data)
      .then(function (response) {
        const dataFilter = plisting.result.filter(
          el => el.id !== data.bottle_id,
        );
        plisting.result = dataFilter;
        dispatch(commonActions.loadingEnd());
        dispatch(BottleDeleteSuccess(plisting));
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        showAPIErrorAlert(error);
      });
  };
}

export function handleBottleEdit(data) {
  return (dispatch, getState) => {
    dispatch(commonActions.loadingStart());
    dispatch(editBottleStart());
    const state = getState();
    let plisting = {};
    plisting.result = [...state.bottleReducer.bottleListing.result];
    Services.handleBottleEdit(data)
      .then(function (response) {
        const dataFilter = [];
        plisting.result.forEach(el => {
          if (el.id === data.bottle_id) {
            el = data;
            el.id = data.bottle_id;
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
        dispatch(editBottleSuccess(plisting));
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        showAPIErrorAlert(error);
      });
  };
}
