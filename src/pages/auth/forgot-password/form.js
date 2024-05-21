import React from 'react';
import {View, Keyboard} from 'react-native';
import TextInput from '../../../../src/components/TextInput';
import ButtonComponent from '../../../../src/components/ButtonComponent';
import {isEmpty} from '../../../../src/utils/native';
import {translate} from '../../../../src/locales/i18n';
import styles from './styles';

class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      validateInput: false,
      isEmailInvalid: false,
      emailErrorMessage: '',
    };
  }

  isValid = () => {
    const {email} = this.state;
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (isEmpty(email)) {
      return false;
    }

    this.setState({
      emailErrorMessage: '',
      validateInput: false,
      isEmailInvalid: false,
    });

    /* EMAIL VALIDATION */
    if (reg.test(email) === false) {
      this.setState({
        emailErrorMessage: translate('formErrorMessage.emailErrorMessage'),
        isEmailInvalid: true,
      });
      return false;
    }
    return true;
  };

  onSubmit() {
    const {getOTPHandler} = this.props;
    const {email} = this.state;

    /* REQUIRED FIELDS VALIDATION */
    if (this.isValid() === false) {
      this.setState({validateInput: true});
      return true;
    }

    if (this.isValid() === true) {
      Keyboard.dismiss();
      const body = {
        email: email,
      };
      getOTPHandler(body);
    }
  }

  render() {
    const {email, validateInput, emailErrorMessage, isEmailInvalid} =
      this.state;
    return (
      <View style={{width: '100%'}}>
        <TextInput
          style={styles.textInputContainer}
          textLabelBackground="#E8BC7D"
          textLabelColor="#fff"
          value={email}
          placeholder={translate('forgotPasswordScreen.emailPlaceholder')}
          isInvalid={(validateInput && isEmpty(email)) || isEmailInvalid}
          errorMessage={emailErrorMessage}
          returnKeyType="done"
          onChangeText={value => {
            this.setState({email: value});
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
          buttonText={translate('forgotPasswordScreen.getOTP')}
        />
      </View>
    );
  }
}

export default ForgotPasswordForm;
