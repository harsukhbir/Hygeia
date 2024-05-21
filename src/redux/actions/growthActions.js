import Services from '../../../src/services/services';
import * as commonActions from './commonActions';
import {showAPIErrorAlert} from '../../utils/native';

export const ADD_GROWTH_START = 'ADD_GROWTH_START';
export const ADD_GROWTH_SUCCESS = 'ADD_GROWTH_SUCCESS';
export const GROWTH_LISTING_START = 'GROWTH_LISTING_START';
export const GROWTH_LISTING_SUCCESS = 'GROWTH_LISTING_SUCCESS';
export const GROWTH_LISTING_FAILURE = 'GROWTH_LISTING_FAILURE';
export const CLEAR_MSG = 'CLEAR_MSG';
export const UPDATE_USER_LISTED_BABY_DETAIL = 'UPDATE_USER_LISTED_BABY_DETAIL';
/* LOGIN ACTIONS */
export const addGrowthStart = () => ({
  type: ADD_GROWTH_START,
});

export const addGrowthSuccess = data => ({
  type: ADD_GROWTH_SUCCESS,
  data,
});

export const GrowthListingStart = () => ({
  type: GROWTH_LISTING_START,
});

export const GrowthListingSuccess = data => ({
  type: GROWTH_LISTING_SUCCESS,
  data,
});

export const GrowthListingFailure = data => ({
  type: GROWTH_LISTING_FAILURE,
  data,
});

export const clearMsg = () => ({
  type: CLEAR_MSG,
});

export const updateBabyDetails = data => ({
  type: UPDATE_USER_LISTED_BABY_DETAIL,
  data,
});

export function handleGrowthCreate(data) {
  return (dispatch, getState) => {
    dispatch(commonActions.loadingStart());
    dispatch(addGrowthStart());
    // const state = getState();
    // let plisting = {}
    // plisting.result = [...state.growthReducer.growthListing.result];
    Services.handleGrowthCreate(data)
      .then(function (response) {
        if (response.data.result.error) {
          showAPIErrorAlert(response.data.result.error);
          dispatch(commonActions.loadingEnd());
          return;
        }
        // plisting.result.push(response.data.result);

        dispatch(addGrowthSuccess(response.data.result));
        dispatch(updateBabyDetails(response.data.result));
        dispatch(commonActions.loadingEnd());
        // dispatch(addGrowthSuccess());
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        showAPIErrorAlert(error);
      });
  };
}

export function handleGrowthListing(data) {
  return dispatch => {
    dispatch(commonActions.loadingStart());
    dispatch(GrowthListingStart());
    Services.handleGrowthListing(data)
      .then(function (response) {
        if (response.data.result.error) {
          // dispatch(GrowthListingSuccess(response.data));
          // dispatch(GrowthListingFailure(response));
          dispatch(commonActions.loadingEnd());
        }
        dispatch(GrowthListingSuccess(response.data));
        dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        // dispatch(GrowthListingFailure(error));
        dispatch(GrowthListingFailure(error.response.data));
        // if(error && error.response) {
        // 	showAPIErrorAlert(error.response);
        // 	return
        // }
        showAPIErrorAlert(error);
      });
  };
}
