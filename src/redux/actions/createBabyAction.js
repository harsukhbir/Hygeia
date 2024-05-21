import Services from '../../../src/services/services';
import * as commonActions from './commonActions';
import {showAPIErrorAlert, showAlert} from '../../utils/native';
import {updateProfileSucess} from './userAction';

export const PROFILE_CREATE_START = 'PROFILE_CREATE_START';
export const PROFILE_CREATE_SUCCESS = 'PROFILE_CREATE_SUCCESS';
export const PROFILE_CREATE_FAILED = 'PROFILE_CREATE_FAILED';

export const createProfileStart = () => ({
  type: PROFILE_CREATE_START,
});

export const createProfileSuccess = () => ({
  type: PROFILE_CREATE_SUCCESS,
});

export const createProfileFailed = () => ({
  type: PROFILE_CREATE_FAILED,
});

export function CreateProfiles(data, navigation) {
  return (dispatch, getState) => {
    dispatch(commonActions.loadingStart());
    dispatch(createProfileStart());
    const state = getState();
    const babyUser = state.userReducer.babyDetails;
    const updateData = [...babyUser];
    Services.CreateProfiles(data)
      .then(function (response) {
        dispatch(createProfileSuccess());
        updateData.push(response.data.result.profiles);
        dispatch(updateProfileSucess(updateData));
        navigation.goBack();
        dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        showAPIErrorAlert(error);
        dispatch(createProfileFailed());
        dispatch(commonActions.loadingEnd());
      });
  };
}
