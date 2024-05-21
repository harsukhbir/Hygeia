import Services from '../../../src/services/services';
import * as commonActions from './commonActions';

export const DASHBOARD_LISTING_START = 'DASHBOARD_LISTING_START';
export const DASHBOARD_LISTING_SUCCESS = 'DASHBOARD_LISTING_SUCCESS';
export const DASHBOARD_LISTING_FAILURE = 'DASHBOARD_LISTING_FAILURE';
export const DASHBOARD_RESET = 'DASHBOARD_RESET';

export const DashboardListingStart = () => ({
  type: DASHBOARD_LISTING_START,
});

export const DashboardListingSuccess = data => ({
  type: DASHBOARD_LISTING_SUCCESS,
  data,
});
export const DashboardListingFailure = data => ({
  type: DASHBOARD_LISTING_FAILURE,
  data,
});
export const DashboardReset = data => ({
  type: DASHBOARD_RESET,
});

export function handleDashboard(data) {
  return dispatch => {
    dispatch(commonActions.loadingStart());
    dispatch(DashboardListingStart());
    Services.handleDashboard(data)
      .then(function (response) {
        dispatch(DashboardListingSuccess(response.data));
        dispatch(commonActions.loadingEnd());
      })
      .catch(function (error) {
        dispatch(commonActions.loadingEnd());
        dispatch(DashboardListingFailure(error));
        // showAPIErrorAlert(error);
      });
  };
}
