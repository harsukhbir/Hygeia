import React from 'react';
import {View} from 'react-native';
import TextInput from '../../../../src/components/TextInput';
import ButtonComponent from '../../../../src/components/ButtonComponent';
import {isEmpty} from '../../../../src/utils/native';
import {translate} from '../../../../src/locales/i18n';
import styles from './styles';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validateInput: false,
      isEmailInvalid: false,
      isPasswordInvalid: false,
      emailErrorMessage: '',
      passwordErrorMessage: '',
    };
  }

  onSubmit = () => {
    const {submitForm} = this.props;
    const {email, password} = this.state;
    const data = {
      email: email,
      password: password,
    };

    submitForm(data);
  };

  resetForm = () => {
    this.setState({email: '', password: '', validateInput: false});
  };

  render() {
    const {
      email,
      password,
      validateInput,
      emailErrorMessage,
      isEmailInvalid,
      isPasswordInvalid,
      passwordErrorMessage,
    } = this.state;
    return (
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInputContainer}
          textLabelBackground="#EFD0A3"
          textLabelColor="#fff"
          value={email}
          placeholder={translate('loginScreen.emailPlaceholder')}
          keyboardType="email-address"
          autoCorrect={false}
          isInvalid={(validateInput && isEmpty(email)) || isEmailInvalid}
          errorMessage={emailErrorMessage}
          returnKeyType="next"
          onChangeText={value => {
            this.setState({email: value});
          }}
          onSubmitEditing={() => {
            this.passwordInput.focus();
          }}
        />
        <TextInput
          onRef={input => {
            this.passwordInput = input;
          }}
          style={styles.textInputContainer}
          textLabelBackground="#EDCB9A"
          textLabelColor="#fff"
          value={password}
          placeholder={translate('loginScreen.passwordPlaceholder')}
          autoCorrect={false}
          secureTextEntry={true}
          isInvalid={(validateInput && isEmpty(password)) || isPasswordInvalid}
          errorMessage={passwordErrorMessage}
          returnKeyType="done"
          onChangeText={value => {
            this.setState({password: value});
          }}
          onSubmitEditing={() => {
            this.onSubmit();
          }}
        />
        <ButtonComponent
          buttonClicked={() => {
            this.onSubmit();
          }}
          style={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          buttonText={translate('loginScreen.logInButtonText')}
        />
      </View>
    );
  }
}

export default LoginForm;
