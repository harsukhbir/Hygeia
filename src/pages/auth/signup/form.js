import React from 'react';
import {View, Keyboard} from 'react-native';
import TextInput from '../../../../src/components/TextInput';
import ButtonComponent from '../../../../src/components/ButtonComponent';
// import CountriesDropDown from "../../../../src/components/CountriesDropDown";
// import { countryCodes } from "../../../../src/constants";
import {isEmpty} from '../../../../src/utils/native';
import {translate} from '../../../../src/locales/i18n';
import styles from './styles';
import {checkPasswordStrength} from '../../../utils/passwordCheck';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      validateInput: false,
      isEmailInvalid: false,
      isPasswordInvalid: false,
      isconfirm_passwordInvalid: false,
      emailErrorMessage: '',
      passwordErrorMessage: '',
      confirm_passwordErrorMessage: '',
      fullName: '',
    };
  }

  componentDidMount() {}

  isValid() {
    const {email, password, confirm_password, fullName} = this.state;
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(confirm_password) ||
      isEmpty(fullName)
    ) {
      return false;
    }

    this.setState({
      emailErrorMessage: '',
      passwordErrorMessage: '',
      confirm_passwordErrorMessage: '',
      validateInput: false,
      isEmailInvalid: false,
      isPasswordInvalid: false,
      isconfirm_passwordInvalid: false,
    });

    /* EMAIL VALIDATION */
    if (reg.test(email) === false) {
      this.setState({
        emailErrorMessage: translate('formErrorMessage.emailErrorMessage'),
        isEmailInvalid: true,
      });
      return false;
    }

    /* PASSWORD VALIDATION */
    if (password.length < 6) {
      this.setState({
        passwordErrorMessage: translate(
          'formErrorMessage.passwordErrorMessage',
        ),
        isPasswordInvalid: true,
      });
      return false;
    }

    let passwordFlag = checkPasswordStrength(password);
    if (passwordFlag) {
      this.setState({
        passwordErrorMessage: passwordFlag,
        isPasswordInvalid: true,
      });
      return false;
    }
    /* CONFIRM PASSWORD VALIDATION */
    if (password !== confirm_password) {
      this.setState({
        confirm_passwordErrorMessage: translate(
          'formErrorMessage.cPasswordErrorMessage',
        ),
        isconfirm_passwordInvalid: true,
      });
      return false;
    }
    return true;
  }

  onSubmit() {
    const {submitForm} = this.props;
    const {email, password, fullName, confirm_password} = this.state;

    /* REQUIRED FIELDS VALIDATION */
    if (this.isValid() === false) {
      this.setState({validateInput: true});
      return true;
    }

    const userData = {
      name: fullName,
      email: email,
      password: password,
      confirm_password: confirm_password,
    };

    if (this.isValid() === true) {
      submitForm(userData);
    }
  }

  resetForm() {
    this.setState({
      email: '',
      password: '',
      confirm_password: '',
      validateInput: false,
    });
  }

  render() {
    const {
      email,
      password,
      confirm_password,
      validateInput,
      emailErrorMessage,
      isEmailInvalid,
      isPasswordInvalid,
      passwordErrorMessage,
      isconfirm_passwordInvalid,
      confirm_passwordErrorMessage,
      fullName,
    } = this.state;
    let {isShowDropDown, onEnableScroll} = this.props;
    return (
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInputContainer}
          textLabelBackground="#F0D4AB"
          textLabelColor="#fff"
          value={fullName}
          placeholder={translate('signupScreen.fullNamePlaceholder')}
          isInvalid={validateInput && isEmpty(fullName)}
          returnKeyType="next"
          onChangeText={value => {
            this.setState({fullName: value});
          }}
          onSubmitEditing={() => {
            this.emailInput.focus();
          }}
        />
        <TextInput
          onRef={input => {
            this.emailInput = input;
          }}
          style={styles.textInputContainer}
          textLabelBackground="#EECFA2"
          textLabelColor="#fff"
          value={email}
          placeholder={translate('signupScreen.emailPlaceholder')}
          keyboardType="email-address"
          autoCorrect={false}
          isInvalid={(validateInput && isEmpty(email)) || isEmailInvalid}
          errorMessage={emailErrorMessage}
          returnKeyType="next"
          onChangeText={value => {
            this.setState({email: value});
          }}
          onSubmitEditing={() => {
            this.phoneInput.focus();
          }}
        />
        <TextInput
          onRef={input => {
            this.passwordInput = input;
          }}
          style={styles.textInputContainer}
          textLabelBackground="#EDCA99"
          textLabelColor="#fff"
          value={password}
          placeholder={translate('signupScreen.passwordPlaceholder')}
          autoCorrect={false}
          secureTextEntry={true}
          isInvalid={(validateInput && isEmpty(password)) || isPasswordInvalid}
          errorMessage={passwordErrorMessage}
          returnKeyType="next"
          onChangeText={value => {
            this.setState({password: value});
          }}
          onSubmitEditing={() => {
            this.confirm_passwordInput.focus();
          }}
        />
        <TextInput
          onRef={input => {
            this.confirm_passwordInput = input;
          }}
          style={styles.textInputContainer}
          textLabelColor="#fff"
          value={confirm_password}
          placeholder={translate('signupScreen.cPaswordPlaceholder')}
          autoCorrect={false}
          secureTextEntry={true}
          isInvalid={
            (validateInput && isEmpty(confirm_password)) ||
            isconfirm_passwordInvalid
          }
          errorMessage={confirm_passwordErrorMessage}
          returnKeyType="done"
          onChangeText={value => {
            this.setState({confirm_password: value});
          }}
          onSubmitEditing={() => this.onSubmit()}
        />
        <ButtonComponent
          buttonClicked={() => this.onSubmit()}
          style={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          buttonText={translate('signupScreen.signUpButtonText')}
        />
      </View>
    );
  }
}

export default SignupForm;
