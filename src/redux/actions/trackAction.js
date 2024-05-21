import Services from '../../../src/services/services';
import * as commonActions from './commonActions';
import {showAPIErrorAlert} from '../../utils/native';

export const SET_TRACK_ALARM_VALUE = 'SET_TRACK_ALARM_VALUE';

export const setTrackTabAlarm = data => ({
  type: SET_TRACK_ALARM_VALUE,
  payload: data,
});

export function fetchPrevAlarmValue(data) {
  return dispatch => {
    dispatch(commonActions.loadingStart());
    Services.getAlarm(data)
      .then(function (response) {
        if (response.data.result.error) {
          showAPIErrorAlert(response.data.result.error);
          dispatch(commonActions.loadingEnd());
          return;
        }
        dispatch(
          setTrackTabAlarm({
            type: data.type,
            item: response.data.result,
          }),
        );
        dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        // showAPIErrorAlert(error);
      });
  };
}
