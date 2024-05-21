import {createSlice} from '@reduxjs/toolkit';
import {showAlert} from '../../utils/native';
import {resetAuthState} from './authSlice';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    isLoading: false,
    hasLoadingFailed: false,
    loadingError: null,
    currentScreen: null,
    refreshData: false,
  },
  reducers: {
    loadingStart: state => {
      state.isLoading = true;
      state.hasLoadingFailed = false;
      state.loadingError = null;
    },
    loadingEnd: state => {
      state.isLoading = false;
      state.hasLoadingFailed = false;
      state.loadingError = null;
    },
    loadingFailed: (state, action) => {
      state.isLoading = false;
      state.hasLoadingFailed = true;
      state.loadingError = action.payload.error;

      if (
        action.payload.error.response &&
        action.payload.error.response.status === 401
      ) {
        showAlert(
          'Error',
          'Your login session has been expired!',
          '',
          () => {},
        );
        // Dispatching resetAuthState thunk action to reset authentication state
        action.payload.dispatch(resetAuthState());
      } else {
        let errorMessage =
          action.payload.error.response &&
          action.payload.error.response.data &&
          action.payload.error.response.data.error
            ? action.payload.error.response.data.message
            : 'Something went wrong please try later!';
        showAlert('Error', errorMessage, '', () => {});
      }
    },
    getCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
    setRefreshData: (state, action) => {
      state.refreshData = action.payload;
    },
  },
});

export const {
  loadingStart,
  loadingEnd,
  loadingFailed,
  getCurrentScreen,
  setRefreshData,
} = commonSlice.actions;

export default commonSlice.reducer;
