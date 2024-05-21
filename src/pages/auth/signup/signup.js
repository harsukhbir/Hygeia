import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '../../../../src/components/ButtonComponent';
import {Images} from '../../../../src/assets/images';
import {isEmpty, showAlert, isEmptyObject} from '../../../../src/utils/native';
import * as authActions from '../../../../src/redux/actions/authActions';
import OtpInputs from '../../../../src/components/OtpInputs';
import {translate} from '../../../../src/locales/i18n';
import SignupForm from './form';
import styles from './styles';
import {getDeviceId, getOS} from '../../../services/device';

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDropDown: false,
      enableScrollViewScroll: true,
      formStep: 'signup-form',
      // formStep: "verify-signup-otp",
      otpErrorMessage: '',
      OTP: '',
      email: '',
      resetOTPInput: false,
    };
  }

  componentDidUpdate(prevProps) {
    const {auth, navigation} = this.props;
    if (
      prevProps.auth.isSignupSuccessful === false &&
      auth.isSignupSuccessful === true
    ) {
      const response = auth.signupResponse;
      if (!response.error) {
        showAlert(response.message, '', '', () => {
          this.setState({formStep: 'verify-signup-otp'});
        });
      }
    }
    if (
      prevProps.auth.isVerifySignupOTPSuccessful === false &&
      auth.isVerifySignupOTPSuccessful === true
    ) {
      const response = auth.verifySignupOTPResponse;
      if (!response.error) {
        showAlert(response.message, '', '', () => {
          navigation.navigate('Login');
          // this.signupRef.resetForm();
        });
      }
    }
  }

  fbClicked = () => {};

  googleClicked = () => {};

  logInHandler = () => {
    const {navigation} = this.props;
    navigation.navigate('Login');
    this.signupRef.resetForm();
  };

  async submitForm(values) {
    try {
      const device_id = await getDeviceId();
      const os_type = getOS();

      // const {dispatchSignUp} = this.props;
      if (!isEmptyObject(values)) {
        values = {
          ...values,
          device_id,
          os_type,
        };
        this.setState({email: values.email});
        // dispatchSignUp(values);
      }
    } catch (error) {
      console.log('error in signup', error);
    }
  }

  changePinHandler(otp) {
    // const {dispatchVerifySignUpOTP} = this.props;
    // const {email} = this.state;

    this.setState({OTP: otp});
    if (otp.length === 4) {
      Keyboard.dismiss();
      // const body = {
      //   email: email,
      //   otp: Number(otp),
      // };
      // dispatchVerifySignUpOTP(body);
      this.setState({resetOTPInput: true, OTP: '', otpErrorMessage: ''});
    }
  }

  closeDropdown() {
    this.setDropDownValue(false);
    this.onEnableScroll(true);
    Keyboard.dismiss();
  }

  setDropDownValue = value => {
    this.setState({isShowDropDown: value});
  };

  onEnableScroll(value) {
    this.setState({enableScrollViewScroll: value});
  }

  backHandler = () => {
    const {navigation} = this.props;
    navigation.pop();
  };

  resend = () => {
    // const {dispatchForgotPassword} = this.props;
    // dispatchForgotPassword({email: this.state.email});
  };

  render() {
    const {
      enableScrollViewScroll,
      isShowDropDown,
      formStep,
      resetOTPInput,
      otpErrorMessage,
      OTP,
    } = this.state;
    return (
      <LinearGradient style={styles.container} colors={['#F4E0C2', '#E4B166']}>
        {formStep === 'signup-form' && (
          <TouchableOpacity
            onPress={() => {
              this.backHandler();
            }}
            style={styles.backButton}>
            <Image
              source={Images.globalScreen.backIcon}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps={isShowDropDown ? 'always' : 'never'}
          extraScrollHeight={20}
          scrollEnabled={enableScrollViewScroll}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.closeDropdown();
            }}>
            <View style={styles.contentArea}>
              {formStep === 'signup-form' && (
                <SignupForm
                  ref={ref => (this.signupRef = ref)}
                  submitForm={values => this.submitForm(values)}
                  setDropDownValue={value => this.setDropDownValue(value)}
                  isShowDropDown={isShowDropDown}
                  onEnableScroll={value => this.onEnableScroll(value)}
                />
              )}

              {formStep === 'verify-signup-otp' && (
                <View style={styles.otpContainer}>
                  <Image
                    source={Images.authScreen.sendIcon}
                    style={styles.lockIcon}
                  />
                  <Text style={styles.headerText}>
                    {translate('forgotPasswordScreen.verifyOTPHeaderText')}
                  </Text>
                  <Text style={styles.headerSubText}>
                    {translate('forgotPasswordScreen.otpDescription')}
                  </Text>
                  <View style={styles.otpInputs}>
                    <OtpInputs
                      noOfBoxes={4}
                      custominputDigit={styles.custominputDigit}
                      onChangePin={otp => this.changePinHandler(otp)}
                      hideNumber={false}
                      resetOTPInput={resetOTPInput}
                    />
                    {!isEmpty(otpErrorMessage) && (
                      <Text style={styles.otpErrorMessage}>
                        {otpErrorMessage}
                      </Text>
                    )}
                  </View>
                  <View style={styles.resendTextDiv}>
                    <Text style={styles.resendText}>
                      Didn't receive a code?
                    </Text>
                    <TouchableOpacity onPress={() => this.resend()}>
                      <Text style={styles.resend}>Resend</Text>
                    </TouchableOpacity>
                  </View>
                  <ButtonComponent
                    buttonClicked={() => {
                      if (OTP.length !== 6) {
                        this.setState({
                          otpErrorMessage: translate(
                            'forgotPasswordScreen.otpErrorMessage',
                          ),
                        });
                        return;
                      }
                      this.changePinHandler(OTP);
                    }}
                    style={styles.buttonContainer}
                    buttonStyle={styles.buttonStyle}
                    buttonText={translate('forgotPasswordScreen.otpButton')}
                  />
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}
// const mapStateToProps = state => ({
//   auth: state.authReducer,
// });

// const mapDispatchToProps = {
//   dispatchSignUp: data => authActions.handleSignUp(data),
//   dispatchVerifySignUpOTP: data => authActions.handleVerifySignUpOTP(data),
//   dispatchForgotPassword: data => authActions.handleForgotPassword(data),
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
export default SignupScreen;
