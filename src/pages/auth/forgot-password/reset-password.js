import React from 'react';
import {View, Keyboard, Text} from 'react-native';
import TextInput from '../../../../src/components/TextInput';
import ButtonComponent from '../../../../src/components/ButtonComponent';
import {isEmpty} from '../../../../src/utils/native';
import {translate} from '../../../../src/locales/i18n';
import styles from './styles';
import {checkPasswordStrength} from '../../../utils/passwordCheck';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validateInput: false,
      isPasswordInvalid: false,
      iscPasswordInvalid: false,
      passwordErrorMessage: '',
      cPasswordErrorMessage: '',
      password: '',
      cpassword: '',
    };
  }

  isValidResetPasswordFileds = () => {
    const {password, cpassword} = this.state;

    if (isEmpty(password) || isEmpty(cpassword)) {
      return false;
    }

    this.setState({
      passwordErrorMessage: '',
      cPasswordErrorMessage: '',
      validateInput: false,
      isPasswordInvalid: false,
      iscPasswordInvalid: false,
    });

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
    if (password !== cpassword) {
      this.setState({
        cPasswordErrorMessage: translate(
          'formErrorMessage.cPasswordErrorMessage',
        ),
        iscPasswordInvalid: true,
      });
      return false;
    }

    return true;
  };

  onSubmit() {
    const {resetPasswordHandler} = this.props;
    const {password} = this.state;

    /* REQUIRED FIELDS VALIDATION */
    if (this.isValidResetPasswordFileds() === false) {
      this.setState({validateInput: true});
      return true;
    }

    if (this.isValidResetPasswordFileds() === true) {
      Keyboard.dismiss();
      const body = {
        new_password: password,
        confirm_password: password,
      };
      resetPasswordHandler(body);
    }
  }

  render() {
    const {
      password,
      validateInput,
      isPasswordInvalid,
      passwordErrorMessage,
      cpassword,
      iscPasswordInvalid,
      cPasswordErrorMessage,
    } = this.state;
    return (
      <View style={{width: '100%'}}>
        <TextInput
          textLabelBackground="#E8BC7D"
          textLabelColor="#fff"
          style={styles.textInputContainer}
          value={password}
          placeholder={translate('signupScreen.passwordPlaceholder')}
          secureTextEntry={true}
          isInvalid={(validateInput && isEmpty(password)) || isPasswordInvalid}
          errorMessage={passwordErrorMessage}
          returnKeyType="next"
          onChangeText={value => {
            this.setState({password: value});
          }}
        />
        <TextInput
          textLabelBackground="#E8BC7D"
          textLabelColor="#fff"
          style={styles.textInputContainer}
          value={cpassword}
          placeholder={translate('signupScreen.cPaswordPlaceholder')}
          secureTextEntry={true}
          isInvalid={
            (validateInput && isEmpty(cpassword)) || iscPasswordInvalid
          }
          errorMessage={cPasswordErrorMessage}
          returnKeyType="done"
          onChangeText={value => {
            this.setState({cpassword: value});
          }}
          onSubmitEditing={() => this.onSubmit()}
        />
        <Text style={styles.note}>Both passwords must match.</Text>
        <ButtonComponent
          buttonClicked={() => this.onSubmit()}
          style={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          buttonText={translate('forgotPasswordScreen.resetPasswordButton')}
        />
      </View>
    );
  }
}

export default ResetPassword;
