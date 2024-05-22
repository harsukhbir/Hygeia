import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Image,
  Keyboard,
  LayoutAnimation,
  TouchableOpacity,
  BackHandler,
  AppState,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Images} from '../../../../src/assets/images';
import {isEmptyObject, isEmpty} from '../../../../src/utils/native';
import {translate} from '../../../../src/locales/i18n';
import LoginForm from './form';
import styles from './styles';
import {getDeviceId, getOS, getFirebaseToken} from '../../../services/device';
import OtpInputs from '../../../../src/components/OtpInputs';
import ButtonComponent from '../../../../src/components/ButtonComponent';
import {handleLogIn, handleOtpInput} from '../../../store/slices/authSlice';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isKeyboardShow: false,
      showOtpScreen: false,
      resetOTPInput: false,
      otpErrorMessage: '',
      OTP: '',
      values: null,
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    this.props.dispatchHandleOtpInput(false);
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

    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.dispatchHandleOtpInput(false);
    });

    // AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.props.dispatchHandleOtpInput(false);
    // AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    console.log('nextappstate', nextAppState);
    console.log('appstate', this.state.appState);
    if (this.state.appState.match(/inactive|background/)) {
      this.props.dispatchHandleOtpInput(false);
    }
    this.setState({appState: nextAppState});
  };

  componentDidUpdate(prevProps) {
    const {auth, navigation} = this.props;
    if (
      prevProps.auth.isLoginSuccessful === false &&
      auth.isLoginSuccessful === true
    ) {
      navigation.navigate('Home');
      this.loginRef.resetForm();
    } else if (
      auth.isVerifySignupOTPSuccessful === true &&
      prevProps.auth.isLoginSuccessful === false
    ) {
      navigation.navigate('Home');
    }
  }

  fbClicked = data => {
    const {dispatchFBLogin} = this.props;
    dispatchFBLogin({access_token: data.accessToken.toString()});
  };

  googleClicked = () => {};

  backHandler = () => {
    const {navigation} = this.props;
    navigation.pop();
  };

  async submitForm(values) {
    // const { navigation } = this.props;
    // navigation.navigate("Purchased");
    try {
      // const device_token = await getFirebaseToken();
      const device_id = await getDeviceId();
      const os_type = getOS();

      const {dispatchLogin} = this.props;
      if (!isEmptyObject(values)) {
        values = {
          ...values,
          device_id,
          // device_token,
          os_type,
        };
        console.log('login params', values);
        dispatchLogin(values);
      }
    } catch (e) {
      console.log('error in screen', e);
    }
  }

  forgotPasswordHandler = () => {
    const {navigation} = this.props;
    navigation.navigate('ForgotPassword');
  };

  resend = () => {
    const {dispatchForgotPassword} = this.props;
    dispatchForgotPassword({email: this.state.values.email});
  };

  changePinHandler(otp) {
    const {dispatchVerifySignUpOTP} = this.props;
    const {email, values} = this.state;

    this.setState({OTP: otp});
    if (otp.length === 4) {
      Keyboard.dismiss();
      const body = {
        email: values?.email,
        otp: Number(otp),
      };
      dispatchVerifySignUpOTP(body);
      this.setState({resetOTPInput: true, OTP: '', otpErrorMessage: ''});
    }
  }

  renderOtpInputScreen = () => {
    const {resetOTPInput, otpErrorMessage, showOtpScreen, OTP} = this.state;

    return (
      <View style={styles.otpContainer}>
        <TouchableOpacity
          onPress={() => {
            this.props.dispatchHandleOtpInput(false);
          }}
          style={styles.backButton}>
          <Image
            source={Images.globalScreen.backIcon}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Image source={Images.authScreen.sendIcon} style={styles.lockIcon} />
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
          buttonStyle={styles.otpButtonStyle}
          buttonText={translate('forgotPasswordScreen.otpButton')}
        />
      </View>
    );
  };

  render() {
    const {isKeyboardShow} = this.state;

    console.log('sppstate', this.state.appState);

    return (
      <LinearGradient style={styles.container} colors={['#F4E0C2', '#E4B166']}>
        {this.props.auth.showOtpFromLogin ? (
          this.renderOtpInputScreen()
        ) : (
          <>
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
            <KeyboardAwareScrollView
              contentContainerStyle={{flexGrow: isKeyboardShow ? 0.5 : 1}}>
              <View style={styles.contentArea}>
                <LoginForm
                  ref={ref => (this.loginRef = ref)}
                  submitForm={values => {
                    console.log(values);
                    this.setState({values});
                    this.submitForm(values);
                  }}
                />
                <View style={styles.forgotPassword}>
                  <Text
                    style={styles.forgotPasswordText}
                    onPress={() => {
                      this.forgotPasswordHandler();
                    }}>
                    {translate('loginScreen.forgotPasswordText')}
                  </Text>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </>
        )}
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  dispatchLogin: data => handleLogIn(data),
  // dispatchFBLogin: data => handleFBLogIn(data),
  // dispatchVerifySignUpOTP: data => handleVerifySignUpOTP(data),
  dispatchHandleOtpInput: data => handleOtpInput(data),
  // dispatchForgotPassword: data => handleForgotPassword(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
