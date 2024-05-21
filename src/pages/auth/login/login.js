import React, {useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, AppState} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Images} from '../../../../src/assets/images';
import {translate} from '../../../../src/locales/i18n';
import LoginForm from './form';
import styles from './styles';

const LoginScreen = ({navigation}) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [resetOTPInput, setResetOTPInput] = useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState('');
  const [OTP, setOTP] = useState('');
  const appState = useRef(AppState.currentState);

  const backHandler = () => {
    navigation.pop();
  };

  const submitForm = async formValues => {
    console.log('submit clicked! ', formValues);
    navigation.navigate('Home');
  };

  const forgotPasswordHandler = () => {
    navigation.navigate('ForgotPassword');
  };

  const resend = () => {
    console.log('resend called!');
  };

  const changePinHandler = otp => {
    setOTP(otp);
    if (otp.length === 4) {
      setResetOTPInput(true);
      setOTP('');
      setOtpErrorMessage('');
    }
  };

  return (
    <LinearGradient style={styles.container} colors={['#F4E0C2', '#E4B166']}>
      <>
        <TouchableOpacity onPress={backHandler} style={styles.backButton}>
          <Image
            source={Images.globalScreen.backIcon}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: isKeyboardShow ? 0.5 : 1}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.contentArea}>
            <LoginForm
              ref={ref => (this.loginRef = ref)}
              submitForm={formValues => {
                submitForm(formValues);
              }}
            />
            <View style={styles.forgotPassword}>
              <Text
                style={styles.forgotPasswordText}
                onPress={forgotPasswordHandler}>
                {translate('loginScreen.forgotPasswordText')}
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </>
    </LinearGradient>
  );
};

export default LoginScreen;
