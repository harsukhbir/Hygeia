import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getDeviceId} from '../../services/device';
import {loadingEnd, loadingStart} from './commonSlice';
import AuthService from '../../services/authService';
import {showAPIErrorAlert} from '../../utils/native';
import {STATISTICS_RESET} from './statisticsSlice';

// Thunks
export const handleLogIn = createAsyncThunk(
  'auth/handleLogIn',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await AuthService.handleLogin(data);
      dispatch(loadingEnd());
      console.log('login response:  ', response.data);
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
      console.log(response.data);
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
      dispatch(STATISTICS_RESET());
      return true;
    } catch (error) {
      dispatch(loadingEnd());
      throw error;
    }
  },
);

export const handleVerifySignUpOTP = createAsyncThunk(
  'auth/handleVerifySignUpOTP',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await AuthService.handleSignupVerifyOTP(data);
      dispatch(loadingEnd());
      dispatch(handleOtpInput(false));
      return response.data;
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      dispatch(handleOtpInput(false));
      throw error;
    }
  },
);

export const handleForgotPassword = createAsyncThunk(
  'auth/handleForgotPassword',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await AuthService.handleForgotPassword(data);
      dispatch(loadingEnd());
      return response.data;
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      throw error;
    }
  },
);

export const handleVerifyOTP = createAsyncThunk(
  'auth/handleVerifyOTP',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await AuthService.handleVerifyOTP(data);
      dispatch(loadingEnd());
      return response.data;
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      throw error;
    }
  },
);

export const handleResetPassword = createAsyncThunk(
  'auth/handleResetPassword',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await AuthService.handleResetPassword(data);
      dispatch(loadingEnd());
      return response.data;
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      throw error;
    }
  },
);

export const handleFBLogIn = createAsyncThunk(
  'auth/handleFBLogIn',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await AuthService.handleFacebookLogin(data);
      dispatch(loadingEnd());
      return response.data;
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      throw error;
    }
  },
);

export const handleLogout = createAsyncThunk(
  'auth/handleLogout',
  async (_, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const deviceId = await getDeviceId();
      await AuthService.handleLogout({device_id: deviceId});
      dispatch(loadingEnd());
      dispatch(resetAuthState());
      dispatch(resetUserBaby());
      dispatch(dashboardReset());
      dispatch(breastfeedReset());
      dispatch(statisticsReset());
    } catch (error) {
      dispatch(loadingEnd());
      throw error;
    }
  },
);

// Slice
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
    resetUserBaby: state => {
      state.userBaby = null;
    },
    dashboardReset: state => {
      state.dashboard = null;
    },
    breastfeedReset: state => {
      state.breastfeed = null;
    },
    statisticsReset: state => {
      state.statistics = null;
    },
    logInStart: state => {
      state.isLoginSuccessful = false;
    },
    logInSuccess: (state, action) => {
      const isFirstTime = action.payload.result.first_login === 'yes';
      state.isLoginSuccessful = true;
      state.user = action.payload;
      state.loggedIn = true;
      state.isFirstTime = isFirstTime;
    },
    signUpStart: state => {
      state.isSignupSuccessful = false;
    },
    signUpSuccess: (state, action) => {
      state.isSignupSuccessful = true;
      state.signupResponse = action.payload;
    },
    verifySignUpOTPStart: state => {
      state.isVerifySignupOTPSuccessful = false;
    },
    verifySignUpOTPSuccess: (state, action) => {
      state.isVerifySignupOTPSuccessful = true;
      state.verifySignupOTPResponse = action.payload;
    },
    forgotPasswordStart: state => {
      state.isForgotPassSuccessful = false;
    },
    forgotPasswordSuccess: (state, action) => {
      state.isForgotPassSuccessful = true;
      state.forgotPassResponse = action.payload;
    },
    verifyOTPStart: state => {
      state.isVerifyOTPSuccessful = false;
    },
    verifyOTPSuccess: (state, action) => {
      state.isVerifyOTPSuccessful = true;
      state.verifyOTPResponse = action.payload;
    },
    resetPasswordStart: state => {
      state.isResetPassSuccessful = false;
    },
    resetPasswordSuccess: (state, action) => {
      state.isResetPassSuccessful = true;
      state.resetPassResponse = action.payload;
    },
    fbLogInStart: state => {
      state.isLoginSuccessful = false;
    },
    fbLogInSuccess: (state, action) => {
      const firstTimeLogin = action.payload.result.first_login === 'yes';
      state.isLoginSuccessful = true;
      state.user = action.payload;
      state.loggedIn = true;
      state.isFirstTime = firstTimeLogin;
    },
    getStartedSuccess: (state, action) => {
      state.isGetStarted = action.payload;
      state.isFirstTime = false;
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
      .addCase(handleVerifySignUpOTP.fulfilled, (state, action) => {
        Object.assign(state, {
          isVerifySignupOTPSuccessful: true,
          verifySignupOTPResponse: action.payload,
        });
      })
      .addCase(handleForgotPassword.fulfilled, (state, action) => {
        Object.assign(state, {
          isForgotPassSuccessful: true,
          forgotPassResponse: action.payload,
        });
      })
      .addCase(handleVerifyOTP.fulfilled, (state, action) => {
        Object.assign(state, {
          isVerifyOTPSuccessful: true,
          verifyOTPResponse: action.payload,
        });
      })
      .addCase(handleResetPassword.fulfilled, (state, action) => {
        Object.assign(state, {
          isResetPassSuccessful: true,
          resetPassResponse: action.payload,
        });
      })
      .addCase(handleFBLogIn.fulfilled, (state, action) => {
        const firstTimeLogin = action.payload.result.first_login === 'yes';
        Object.assign(state, {
          isLoginSuccessful: true,
          user: action.payload,
          loggedIn: true,
          isFirstTime: firstTimeLogin,
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

export const {
  handleOtpInput,
  resetUserBaby,
  dashboardReset,
  breastfeedReset,
  statisticsReset,
  logInStart,
  logInSuccess,
  signUpStart,
  signUpSuccess,
  verifySignUpOTPStart,
  verifySignUpOTPSuccess,
  forgotPasswordStart,
  forgotPasswordSuccess,
  verifyOTPStart,
  verifyOTPSuccess,
  resetPasswordStart,
  resetPasswordSuccess,
  fbLogInStart,
  fbLogInSuccess,
  getStartedSuccess,
} = authSlice.actions;

export default authSlice.reducer;
