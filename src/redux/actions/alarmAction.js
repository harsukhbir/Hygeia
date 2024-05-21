import Services from '../../../src/services/services';
import * as commonActions from './commonActions';
import {showAPIErrorAlert} from '../../utils/native';
import {fetchPrevAlarmValue} from './trackAction';

export const resetAlarmFlag = () => ({
  type: 'RESET_ALARM_MSG',
});

export const setAlarmAPI = data => {
  return dispatch => {
    dispatch(commonActions.loadingStart());

    Services.setAlarm(data)
      .then(function (result) {
        dispatch({
          type: 'SET_ALARM_START',
        });
        dispatch(
          fetchPrevAlarmValue({
            baby_id: data.baby_id,
            type: data.type,
          }),
        );
        dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        showAPIErrorAlert(error);
        dispatch(commonActions.loadingEnd());
      });
  };
};

export const updateAlarmAPI = data => {
  return dispatch => {
    dispatch(commonActions.loadingStart());

    Services.updateAlarm(data)
      .then(function () {
        dispatch({
          type: 'SET_ALARM_START',
        });
        dispatch(
          fetchPrevAlarmValue({
            baby_id: data.baby_id,
            type: data.type,
          }),
        );
        dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        showAPIErrorAlert(error);
        dispatch(commonActions.loadingEnd());
      });
  };
};
