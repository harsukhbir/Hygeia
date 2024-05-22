import React from 'react';
import {
  View,
  Text,
  Image,
  Keyboard,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '../../../../src/components/ButtonComponent';
import OtpInputs from '../../../../src/components/OtpInputs';
import {Images} from '../../../../src/assets/images';
import {isEmpty, showAlert, isEmptyObject} from '../../../../src/utils/native';
import {translate} from '../../../../src/locales/i18n';
import ForgotPasswordForm from './form';
import ResetPassword from './reset-password';
import styles from './styles';

class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      otpErrorMessage: '',
      OTP: '',
      // formStep: "verify-otp",
      // formStep: "reset-password",
      formStep: 'forgot-password',
      // formStep: "send-email",
      // formStep: "successful-reset",
      token: '',
      resetOTPInput: false,
      isKeyboardShow: false,
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({isKeyboardShow: true});
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      },
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({isKeyboardShow: false});
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      },
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentDidUpdate(prevProps) {
    const {auth, navigation} = this.props;
    if (
      prevProps.auth.isForgotPassSuccessful === false &&
      auth.isForgotPassSuccessful === true
    ) {
      const response = auth.forgotPassResponse;
      if (!response.error) {
        showAlert(response.message, '', '', () => {
          this.setState({formStep: 'verify-otp'});
        });
      }
    }
    if (
      prevProps.auth.isVerifyOTPSuccessful === false &&
      auth.isVerifyOTPSuccessful === true
    ) {
      const response = auth.verifyOTPResponse;
      if (!response.error) {
        showAlert(response.message, '', '', () => {
          this.setState({
            formStep: 'reset-password',
            otpErrorMessage: '',
            token: response.result[0].token,
          });
        });
      }
    }
    if (
      prevProps.auth.isResetPassSuccessful === false &&
      auth.isResetPassSuccessful === true
    ) {
      const response = auth.resetPassResponse;
      if (!response.error) {
        showAlert(response.message, '', '', () => {
          this.setState({formStep: 'successful-reset'});
        });
      }
    }
  }

  getOTPHandler(data) {
    const {dispatchForgotPassword} = this.props;
    if (!isEmptyObject(data)) {
      this.setState({email: data.email});
      dispatchForgotPassword(data);
      // this.setState({ formStep: "verify-otp" });
    }
  }

  changePinHandler(otp) {
    const {dispatchVerifyOTP} = this.props;
    const {email} = this.state;

    this.setState({OTP: otp});
    if (otp.length === 4) {
      Keyboard.dismiss();
      const body = {
        email: email,
        otp: Number(otp),
      };
      dispatchVerifyOTP(body);
      this.setState({resetOTPInput: true, OTP: '', otpErrorMessage: ''});
      // this.setState({ formStep: "reset-password" });
    }
  }

  resetPasswordHandler(data) {
    const {dispatchResetPassword} = this.props;
    const {email, token} = this.state;
    if (!isEmptyObject(data)) {
      let body = data;
      body.token = token;
      body.email = email;
      dispatchResetPassword(body);
      // this.setState({ formStep: "successful-reset" });
    }
  }

  backHandler = () => {
    const {navigation} = this.props;
    navigation.pop();
  };

  logInHandler = () => {
    const {navigation} = this.props;
    navigation.navigate('Login');
  };

  render() {
    const {formStep, otpErrorMessage, OTP, resetOTPInput, isKeyboardShow} =
      this.state;
    return (
      <LinearGradient style={styles.container} colors={['#E8BC7D', '#E8BC7D']}>
        {formStep != 'successful-reset' && (
          <TouchableOpacity
            onPress={() => {
              this.backHandler();
            }}
            style={styles.backButton}>
            <Image
              source={Images.globalScreen.backIconWhite}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: isKeyboardShow ? 0.5 : 1}}
          keyboardShouldPersistTaps="handled">
          {formStep === 'forgot-password' && (
            <View style={styles.contentArea}>
              <Image
                source={Images.authScreen.lockIcon}
                style={styles.lockIcon}
              />
              <Text style={styles.headerText}>
                {translate('forgotPasswordScreen.title')}
              </Text>
              <Text style={styles.headerSubText}>
                {translate('forgotPasswordScreen.forgotText')}
              </Text>
              <ForgotPasswordForm
                getOTPHandler={data => this.getOTPHandler(data)}
              />
            </View>
          )}
          {formStep === 'verify-otp' && (
            <View style={styles.contentArea}>
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
                  <Text style={styles.otpErrorMessage}>{otpErrorMessage}</Text>
                )}
              </View>
              <View style={styles.resendTextDiv}>
                <Text style={styles.resendText}>Didn't receive a code?</Text>
                <Text style={styles.resend}>Resend</Text>
              </View>
              <ButtonComponent
                buttonClicked={() => {
                  if (OTP.length !== 4) {
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
          {formStep === 'reset-password' && (
            <View style={styles.contentArea}>
              <Image
                source={Images.authScreen.resetIcon}
                style={styles.lockIcon}
              />
              <Text style={styles.ResetPasswordheaderText}>
                {translate('forgotPasswordScreen.resetPasswordHeaderText')}
              </Text>
              <ResetPassword
                resetPasswordHandler={data => this.resetPasswordHandler(data)}
              />
            </View>
          )}
          {formStep === 'successful-reset' && (
            <View style={styles.contentArea}>
              <Image
                source={Images.authScreen.successIcon}
                style={styles.lockIcon}
              />
              <Text style={styles.headerText}>Success!</Text>
              <Text style={styles.headerSubText}>
                Your password has been reset succesfully. You can now login with
                your new password.
              </Text>
              <ButtonComponent
                buttonClicked={() => {
                  this.logInHandler();
                }}
                style={styles.buttonContainer}
                buttonStyle={styles.buttonStyle}
                buttonText="Login"
              />
            </View>
          )}
        </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  //   dispatchForgotPassword: data => authActions.handleForgotPassword(data),
  //   dispatchVerifyOTP: data => authActions.handleVerifyOTP(data),
  //   dispatchResetPassword: data => authActions.handleResetPassword(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordScreen);
