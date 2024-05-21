import * as apiRequest from '../../src/redux/api';

export default class AuthService {
  static handleLogin = data => {
    const requestInstance = apiRequest.getUnauthenticatedInstance();
    return requestInstance.post('api/login', data);
  };

  static handleSignup = data => {
    const requestInstance = apiRequest.getUnauthenticatedInstance();
    return requestInstance.post('api/signup', data);
  };

  static handleSignupVerifyOTP = data => {
    const requestInstance = apiRequest.getUnauthenticatedInstance();
    return requestInstance.post('api/verifyotp/activeuser', data);
  };

  static handleForgotPassword = data => {
    const requestInstance = apiRequest.getUnauthenticatedInstance();
    return requestInstance.post('api/forgetpassword/sendotp', data);
  };

  static handleVerifyOTP = data => {
    const requestInstance = apiRequest.getUnauthenticatedInstance();
    return requestInstance.post('api/forgetpassword/verifyotp', data);
  };

  static handleResetPassword = data => {
    const requestInstance = apiRequest.getUnauthenticatedInstance();
    return requestInstance.post('api/password/reset', data);
  };

  static handleFacebookLogin = data => {
    const requestInstance = apiRequest.getUnauthenticatedInstance();
    return requestInstance.post('auth/facebook-authenticate', data);
  };

  static handleLogout = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/logout', data);
  };
}
