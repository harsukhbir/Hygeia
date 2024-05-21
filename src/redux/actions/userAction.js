import Services from '../../../src/services/services';
import * as commonActions from './commonActions';
import {showAPIErrorAlert, showAlert} from '../../utils/native';
import {getStartedSuccess} from './authActions';
import {getFirebaseToken, getDeviceId, getOS} from '../../services/device';

export const BABY_LISTING_START = 'BABY_LISTING_START';
export const BABY_LISTING_SUCCESS = 'BABY_LISTING_SUCCESS';
export const BABY_LISTING_FAIL = 'BABY_LISTING_FAIL';

export const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILED = 'UPDATE_PROFILE_FAILED';

export const DELETE_BABY_START = 'DELETE_BABY_START';
export const DELETE_BABY_SUCCESS = 'DELETE_BABY_SUCCESS';
export const DELETE_BABY_FAILED = 'DELETE_BABY_FAILED';

export const USER_PROFILE_CREATE_START = 'USER_PROFILE_CREATE_START';
export const USER_PROFILE_CREATE_SUCCESS = 'USER_PROFILE_CREATE_SUCCESS';
export const USER_PROFILE_CREATE_FAILED = 'USER_PROFILE_CREATE_FAILED';

export const BABY_PROFILE_LISTING_START = 'BABY_PROFILE_LISTING_START';

export const EDIT_GET_DATA_BABY = 'EDIT_GET_DATA_BABY';
export const RESET_BABY_DATA = 'RESET_BABY_DATA';

export const UPDATE_USER_NOTIFICATION = 'UPDATE_USER_NOTIFICATION';

export const badyListingStart = () => ({
  type: BABY_LISTING_START,
});

export const badyListingSuccess = data => ({
  type: BABY_LISTING_SUCCESS,
  data,
});

export const createProfileStart = () => ({
  type: USER_PROFILE_CREATE_START,
});

export const createProfileSuccess = () => ({
  type: USER_PROFILE_CREATE_SUCCESS,
});

export const createProfileFailed = () => ({
  type: USER_PROFILE_CREATE_FAILED,
});

export const babyListingFailed = error => ({
  type: BABY_LISTING_FAIL,
  error,
});

export const updateProfileStart = () => ({
  type: UPDATE_PROFILE_START,
});

export const updateProfileSucess = data => ({
  type: UPDATE_PROFILE_SUCCESS,
  data,
});
export const updateProfileFailed = error => ({
  type: UPDATE_PROFILE_FAILED,
  error,
});

export const deleteBabyStart = () => ({
  type: DELETE_BABY_START,
});

export const deleteBabySucess = data => ({
  type: DELETE_BABY_SUCCESS,
  data,
});
export const deleteBabyFailed = error => ({
  type: BABY_LISTING_FAIL,
  error,
});

export const EditGetDataBaby = data => ({
  type: EDIT_GET_DATA_BABY,
  data,
});

export const resetUserBaby = () => ({
  type: RESET_BABY_DATA,
});

export function deleteBadyProfile(data) {
  return dispatch => {
    dispatch(commonActions.loadingStart());
    dispatch(deleteBabyStart());
    Services.BabyProfileDelete(data)
      .then(function (response) {
        dispatch(deleteBabySucess(response));
        dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        dispatch(deleteBabyFailed(error));
      });
  };
}

export function updateProfileData(data, navigation) {
  return (dispatch, getState) => {
    dispatch(commonActions.loadingStart());
    const state = getState();
    const babyUser = state.userReducer.babyDetails;
    const updateData = [];
    // dispatch(updateProfileStart());
    Services.updateProfile(data)
      .then(function (response) {
        babyUser.filter(el => {
          if (el.id === response.data.result.id) {
            el = response.data.result;
          }
          updateData.push(el);
          return el;
        });
        dispatch(updateProfileSucess(updateData));
        navigation.goBack();
        dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        showAPIErrorAlert(error);
        dispatch(updateProfileFailed(error));
      });
  };
}

export function getBadyProfile() {
  return dispatch => {
    dispatch(commonActions.loadingStart());
    dispatch(badyListingStart());
    Services.BabyProfileGet()
      .then(function (response) {
        dispatch(badyListingSuccess(response.data.result));
        dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        dispatch(babyListingFailed(error));
      });
  };
}

export function CreateProfiles(data) {
  return dispatch => {
    dispatch(commonActions.loadingStart());
    Services.CreateProfiles(data)
      .then(function () {
        dispatch(getStartedSuccess(true));
        dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        showAPIErrorAlert(error);
        dispatch(commonActions.loadingEnd());
      });
  };
}

export function changePassword(data) {
  return dispatch => {
    dispatch(commonActions.loadingStart());
    Services.handleChangePassword(data)
      .then(function () {
        showAlert('Success', 'Password update sucessfully.', '', () => {});
        dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        dispatch(commonActions.loadingFailed());
        showAPIErrorAlert(error);
      });
  };
}

export function updateUserNotification(data) {
  return dispatch => {
    dispatch(commonActions.loadingStart());
    Services.updateNotification(data)
      .then(function () {
        showAlert(
          'Success',
          'Notification change updated sucessfully.',
          '',
          () => {},
        );
        dispatch(commonActions.loadingEnd());

        // dispatch(getUserNotification());
      })
      .catch(function (error) {
        dispatch(commonActions.loadingFailed());
        showAPIErrorAlert(error);
      });
  };
}

export function getUserNotification() {
  return dispatch => {
    dispatch(commonActions.loadingStart());
    Services.getNotification()
      .then(function (response) {
        dispatch(commonActions.loadingEnd());
        dispatch({
          type: UPDATE_USER_NOTIFICATION,
          data: response.data.result,
        });
      })
      .catch(function (error) {
        dispatch(commonActions.loadingFailed());
        showAPIErrorAlert(error);
      });
  };
}

export async function updateDeviceToken() {
  try {
    const device_token = await getFirebaseToken();
    const device_id = await getDeviceId();
    const os_type = getOS();

    let obj = {
      device_id,
      device_token,
      os_type,
    };
    Services.updateDeviceToken(obj)
      .then(function () {})
      .catch(function (error) {});
  } catch (e) {}
}
