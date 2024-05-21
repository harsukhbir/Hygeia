import {
  LOG_IN_START,
  LOG_IN_SUCCESS,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  VERIFY_SIGN_UP_OTP_START,
  VERIFY_SIGN_UP_OTP_SUCCESS,
  RESET_AUTH_STATE,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  VERIFY_OTP_START,
  VERIFY_OTP_SUCCESS,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  FB_LOG_IN_START,
  FB_LOG_IN_SUCCESS,
  GET_STARTED_SUCCESS,
  SHOW_OTP_INPUT,
} from '../actions/authActions';

const initialState = {
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
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_START:
      return {...state, isLoginSuccessful: false};
    case LOG_IN_SUCCESS:
      const isFirstTime = action.data.result.first_login == 'yes';
      return {
        ...state,
        isLoginSuccessful: true,
        user: action.data,
        loggedIn: true,
        isFirstTime: isFirstTime,
      };
    case SIGN_UP_START:
      return {...state, isSignupSuccessful: false};
    case SIGN_UP_SUCCESS:
      return {...state, isSignupSuccessful: true, signupResponse: action.data};
    case VERIFY_SIGN_UP_OTP_START:
      return {...state, isVerifySignupOTPSuccessful: false};
    case VERIFY_SIGN_UP_OTP_SUCCESS:
      return {
        ...state,
        isVerifySignupOTPSuccessful: true,
        verifySignupOTPResponse: action.data,
      };
    case FORGOT_PASSWORD_START:
      return {...state, isForgotPassSuccessful: false};
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isForgotPassSuccessful: true,
        forgotPassResponse: action.data,
      };
    case VERIFY_OTP_START:
      return {...state, isVerifyOTPSuccessful: false};
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isVerifyOTPSuccessful: true,
        verifyOTPResponse: action.data,
      };
    case RESET_PASSWORD_START:
      return {...state, isResetPassSuccessful: false};
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isResetPassSuccessful: true,
        resetPassResponse: action.data,
      };
    case FB_LOG_IN_START:
      return {...state, isLoginSuccessful: false};
    case FB_LOG_IN_SUCCESS:
      const firstTimeLogin = action.data.result.first_login == 'yes';
      return {
        ...state,
        isLoginSuccessful: true,
        user: action.data,
        loggedIn: true,
        isFirstTime: firstTimeLogin,
      };
    case GET_STARTED_SUCCESS:
      return {...state, isGetStarted: action.data, isFirstTime: false};
    case RESET_AUTH_STATE:
      return initialState;
    case SHOW_OTP_INPUT:
      return {...state, showOtpFromLogin: action.data};
    default:
      return state;
  }
};

export default authReducer;
