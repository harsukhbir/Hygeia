import Services from '../../../src/services/services';
import * as commonActions from './commonActions';
import {showAPIErrorAlert} from '../../utils/native';

export const ADD_BREASTFEED_START = 'ADD_BREASTFEED_START';
export const ADD_BREASTFEED_SUCCESS = 'ADD_BREASTFEED_SUCCESS';
export const BREASTFEED_LISTING_START = 'BREASTFEED_LISTING_START';
export const BREASTFEED_LISTING_SUCCESS = 'BREASTFEED_LISTING_SUCCESS';
export const BREASTFEED_LISTING_ERROR = 'BREASTFEED_LISTING_ERROR';
export const BREASTFEED_DELETE_START = 'BREASTFEED_DELETE_START';
export const BREASTFEED_DELETE_SUCCESS = 'BREASTFEED_DELETE_SUCCESS';
export const CLEAR_MSG = 'CLEAR_MSG';
export const EDIT_GET_DATA_BREASTFEED = 'EDIT_GET_DATA_BREASTFEED';
export const EDIT_BREASTFEED_START = 'EDIT_BREASTFEED_START';
export const EDIT_BREASTFEED_SUCCESS = 'EDIT_BREASTFEED_SUCCESS';
export const BREASTFEED_RESET = 'BREASTFEED_RESET';

/* LOGIN ACTIONS */
export const addBreastfeedStart = () => ({
  type: ADD_BREASTFEED_START,
});

export const addBreastfeedSuccess = data => ({
  type: ADD_BREASTFEED_SUCCESS,
  data,
});

export const BreastfeedListingStart = () => ({
  type: BREASTFEED_LISTING_START,
});

export const BreastfeedListingSuccess = data => ({
  type: BREASTFEED_LISTING_SUCCESS,
  data,
});

export const BreastfeedListingError = data => ({
  type: BREASTFEED_LISTING_ERROR,
  data,
});

export const BreastfeedDeleteStart = () => ({
  type: BREASTFEED_DELETE_START,
});

export const BreastfeedDeleteSuccess = data => ({
  type: BREASTFEED_DELETE_SUCCESS,
  data,
});

export const clearMsg = () => ({
  type: CLEAR_MSG,
});

export const EditGetDataBreastfeed = data => ({
  type: EDIT_GET_DATA_BREASTFEED,
  data,
});

export const editBreastfeedStart = () => ({
  type: EDIT_BREASTFEED_START,
});

export const editBreastfeedSuccess = data => ({
  type: EDIT_BREASTFEED_SUCCESS,
  data,
});

export const BreastfeedReset = () => ({
  type: BREASTFEED_RESET,
});

export function handleBreastfeedCreate(data) {
  return (dispatch, getState) => {
    dispatch(commonActions.loadingStart());
    dispatch(addBreastfeedStart());
    const state = getState();
    let listing = {};
    listing.result = [...state.breastfeedReducer.breastfeedListing.result];
    Services.handleBreastfeedCreate(data)
      .then(function (response) {
        listing.result.push(response.data.result);
        dispatch(commonActions.loadingEnd());
        dispatch({
          type: 'SET_REFRESH_DATA',
          payload: true,
        });
        dispatch(addBreastfeedSuccess(listing));
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        showAPIErrorAlert(error);
      });
  };
}

export function handleBreastfeedListing(data) {
  return dispatch => {
    // dispatch(commonActions.loadingStart());
    dispatch(BreastfeedListingStart());
    Services.handleBreastfeedListing(data)
      .then(function (response) {
        dispatch(BreastfeedListingSuccess(response.data));
        // dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        dispatch(BreastfeedListingError(error.response.data));
        // dispatch(commonActions.loadingEnd());
        // showAPIErrorAlert(error);
      });
  };
}

export function handleBreastfeedDelete(data) {
  return (dispatch, getState) => {
    dispatch(commonActions.loadingStart());
    dispatch(BreastfeedDeleteStart());
    const state = getState();
    let listing = {};
    listing.result = [...state.breastfeedReducer.breastfeedListing.result];
    Services.handleBreastfeedDelete(data)
      .then(function (response) {
        const dataFilter = listing.result.filter(
          el => el.id !== data.breastfeed_id,
        );
        listing.result = dataFilter;
        dispatch(commonActions.loadingEnd());
        dispatch(BreastfeedDeleteSuccess(listing));
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        showAPIErrorAlert(error);
      });
  };
}

export function handleBreastfeedEdit(data) {
  return (dispatch, getState) => {
    dispatch(commonActions.loadingStart());
    dispatch(editBreastfeedStart());
    const state = getState();
    let plisting = {};
    plisting.result = [...state.breastfeedReducer.breastfeedListing.result];
    Services.handleBreastfeedEdit(data)
      .then(function (response) {
        const dataFilter = [];
        plisting.result.forEach(el => {
          if (el.id === data.breastfeed_id) {
            el = data;
            el.id = data.breastfeed_id;
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
        dispatch(editBreastfeedSuccess(plisting));
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        showAPIErrorAlert(error);
      });
  };
}
