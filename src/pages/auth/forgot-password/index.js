import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Keyboard,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
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

const ForgotPasswordScreen = ({auth, navigation}) => {
  const [state, setState] = useState({
    email: '',
    otpErrorMessage: '',
    OTP: '',
    formStep: 'forgot-password',
    token: '',
    resetOTPInput: false,
    isKeyboardShow: false,
  });

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       setState(prevState => ({
  //         ...prevState,
  //         isKeyboardShow: true,
  //       }));
  //       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //     },
  //   );

  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       setState(prevState => ({
  //         ...prevState,
  //         isKeyboardShow: false,
  //       }));
  //       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //     },
  //   );

  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);

  useEffect(() => {
    const handleForgotPassResponse = () => {
      if (
        auth?.isForgotPassSuccessful === false &&
        auth?.isForgotPassSuccessful === true
      ) {
        const response = auth?.forgotPassResponse;
        if (!response.error) {
          showAlert(response.message, '', '', () => {
            setState(prevState => ({
              ...prevState,
              formStep: 'verify-otp',
            }));
          });
        }
      }
    };

    const handleVerifyOTPResponse = () => {
      if (
        auth?.isVerifyOTPSuccessful === false &&
        auth?.isVerifyOTPSuccessful === true
      ) {
        const response = auth?.verifyOTPResponse;
        if (!response.error) {
          showAlert(response.message, '', '', () => {
            setState(prevState => ({
              ...prevState,
              formStep: 'reset-password',
              otpErrorMessage: '',
              token: response.result[0].token,
            }));
          });
        }
      }
    };

    const handleResetPassResponse = () => {
      if (
        auth?.isResetPassSuccessful === false &&
        auth?.isResetPassSuccessful === true
      ) {
        const response = auth?.resetPassResponse;
        if (!response.error) {
          showAlert(response.message, '', '', () => {
            setState(prevState => ({
              ...prevState,
              formStep: 'successful-reset',
            }));
          });
        }
      }
    };

    handleForgotPassResponse();
    handleVerifyOTPResponse();
    handleResetPassResponse();
  }, [auth]);

  const getOTPHandler = data => {
    if (!isEmptyObject(data)) {
      setState(prevState => ({
        ...prevState,
        email: data.email,
      }));
    }
  };

  const changePinHandler = otp => {
    setState(prevState => ({
      ...prevState,
      OTP: otp,
    }));
    if (otp.length === 4) {
      // Keyboard.dismiss();
      setState(prevState => ({
        ...prevState,
        resetOTPInput: true,
        OTP: '',
        otpErrorMessage: '',
      }));
    }
  };

  const resetPasswordHandler = data => {
    if (!isEmptyObject(data)) {
      // Implement your logic here
    }
  };

  const backHandler = () => {
    navigation.pop();
  };

  const logInHandler = () => {
    navigation.navigate('Login');
  };

  const {
    email,
    otpErrorMessage,
    OTP,
    formStep,
    token,
    resetOTPInput,
    isKeyboardShow,
  } = state;

  return (
    <LinearGradient style={styles.container} colors={['#E8BC7D', '#E8BC7D']}>
      {formStep !== 'successful-reset' && (
        <TouchableOpacity onPress={backHandler} style={styles.backButton}>
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
            <ForgotPasswordForm getOTPHandler={getOTPHandler} />
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
                onChangePin={changePinHandler}
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
                  setState(prevState => ({
                    ...prevState,
                    otpErrorMessage: translate(
                      'forgotPasswordScreen.otpErrorMessage',
                    ),
                  }));
                  return;
                }
                changePinHandler(OTP);
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
            <ResetPassword resetPasswordHandler={resetPasswordHandler} />
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
              buttonClicked={logInHandler}
              style={styles.buttonContainer}
              buttonStyle={styles.buttonStyle}
              buttonText="Login"
            />
          </View>
        )}
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

const mapStateToProps = state => ({
  auth: state.authReducer,
});

// export default connect(mapStateToProps)(ForgotPasswordScreen);
export default ForgotPasswordScreen;
