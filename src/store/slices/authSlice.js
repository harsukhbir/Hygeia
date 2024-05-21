import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getDeviceId} from '../../services/device';
import {loadingEnd, loadingStart} from './commonSlice';
import AuthService from '../../services/authService';
import {showAPIErrorAlert} from '../../utils/native';

export const handleLogIn = createAsyncThunk(
  'auth/handleLogIn',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await AuthService.handleLogin(data);
      dispatch(loadingEnd());
      return response.data;
    } catch (error) {
      dispatch(loadingEnd());
      if (error.response && error.response.data.active_status) {
        dispatch(handleOtpInput(false));
        showAPIErrorAlert(error);
      } else {
        dispatch(handleOtpInput(true));
      }
      throw error;
    }
  },
);

export const handleSignUp = createAsyncThunk(
  'auth/handleSignUp',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await AuthService.handleSignup(data);
      dispatch(loadingEnd());
      return response.data;
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      throw error;
    }
  },
);

export const resetAuthState = createAsyncThunk(
  'auth/resetAuthState',
  async (_, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const deviceId = await getDeviceId();
      await AuthService.handleLogout({device_id: deviceId});
      dispatch(loadingEnd());
    } catch (error) {
      dispatch(loadingEnd());
      throw error;
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loadingError: null,
    loggedIn: false,
    isLoginSuccessful: false,
    user: null,
    isSignupSuccessful: false,
    signupResponse: null,
    isVerifySignupOTPSuccessful: false,
    verifySignupOTPResponse: null,
    isForgotPassSuccessful: false,
    forgotPassResponse: null,
    isVerifyOTPSuccessful: false,
    verifyOTPResponse: null,
    isResetPassSuccessful: false,
    resetPassResponse: null,
    isGetStarted: false,
    isFirstTime: false,
    showOtpFromLogin: false,
  },
  reducers: {
    handleOtpInput: (state, action) => {
      state.showOtpFromLogin = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleLogIn.fulfilled, (state, action) => {
        const isFirstTime = action.payload.result.first_login === 'yes';
        Object.assign(state, {
          isLoginSuccessful: true,
          user: action.payload,
          loggedIn: true,
          isFirstTime: isFirstTime,
        });
      })
      .addCase(handleSignUp.fulfilled, (state, action) => {
        Object.assign(state, {
          isSignupSuccessful: true,
          signupResponse: action.payload,
        });
      })
      .addCase(resetAuthState.fulfilled, state => {
        Object.assign(state, {
          loadingError: null,
          loggedIn: false,
          isLoginSuccessful: false,
          user: null,
          isSignupSuccessful: false,
          signupResponse: null,
          isVerifySignupOTPSuccessful: false,
          verifySignupOTPResponse: null,
          isForgotPassSuccessful: false,
          forgotPassResponse: null,
          isVerifyOTPSuccessful: false,
          verifyOTPResponse: null,
          isResetPassSuccessful: false,
          resetPassResponse: null,
          isGetStarted: false,
          isFirstTime: false,
          showOtpFromLogin: false,
        });
      });
  },
});

export const {handleOtpInput} = authSlice.actions;

export default authSlice.reducer;
