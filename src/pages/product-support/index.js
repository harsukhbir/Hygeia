import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import TextInput from '../../../src/components/TextInput';
import {translate} from '../../../src/locales/i18n';
import ButtonComponent from '../../../src/components/ButtonComponent';
import {isEmpty, showAlert} from '../../../src/utils/native';
import * as contactFormActions from '../../../src/redux/actions/contactFormActions';
import styles from './styles';

class ProductSupportScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      validateInput: false,
      isEmailInvalid: false,
      emailErrorMessage: '',
      fullName: '',
      phonenumber: '',
      message: '',
    };
  }

  componentDidUpdate(prevProps) {
    const {contactForm} = this.props;
    if (
      prevProps.contactForm.isProductFormSuccessful === false &&
      contactForm.isProductFormSuccessful === true
    ) {
      this.setState(() => {
        showAlert('Success', 'contact info send successfully.', '', () => {
          this.resetForm();
        });
      });
    }
  }

  resetForm() {
    this.setState({email: '', fullName: '', phonenumber: '', message: ''});
  }

  onPhoneChanged(text) {
    this.setState({
      phonenumber: text.replace(/[^0-9]/g, ''),
    });
  }

  isValid() {
    const {email, fullName, phonenumber, message} = this.state;
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      isEmpty(email) ||
      isEmpty(fullName) ||
      isEmpty(phonenumber) ||
      isEmpty(message)
    ) {
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
  }

  SubmitHandler() {
    const {email, fullName, phonenumber, message} = this.state;
    if (this.isValid() === false) {
      this.setState({validateInput: true});
      return true;
    }

    const userData = {
      name: fullName,
      email: email,
      phone_no: phonenumber,
      message: message,
    };
    //   const {dispatchProductSupportContactForm} = this.props;
    //   if (this.isValid() === true) {
    //     dispatchProductSupportContactForm(userData);
    //   }
  }

  render() {
    const {
      validateInput,
      fullName,
      email,
      isEmailInvalid,
      emailErrorMessage,
      phonenumber,
      message,
    } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.supportdTitle}>Product Support</Text>
        <ScrollView>
          <Text style={styles.contactText}>
            If you're unable to resolve the issue using our videos or
            troubleshooting guides, please don't hesitate to contact us.
            {'\n'}
            {'\n'}
            Our Customer Care department is here to to support you. Hygeia
            customers can be reached by phone at{' '}
            <Text style={styles.number}>714-515-7571 extension #2</Text>, or if
            you complete the form below and we will contact you.
            {'\n'}
            {'\n'}
            If you need an update about a pump order from Hygeia or A Breast
            Pump and More, you can{' '}
            <Text
              style={styles.checkStatus}
              onPress={() =>
                Linking.openURL('https://status.hygeiahealth.com/')
              }>
              check your order status here.
            </Text>
          </Text>
          <View style={styles.contactForm}>
            <TextInput
              style={styles.textInput}
              inputStyle={styles.inputStyle}
              textLabelColor="#999999"
              textLabelBackground="white"
              placeholder="Name"
              value={fullName}
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
              style={styles.textInput}
              inputStyle={styles.inputStyle}
              textLabelColor="#999999"
              textLabelBackground="white"
              placeholder="Email"
              value={email}
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
                this.phoneInput = input;
              }}
              style={styles.textInput}
              inputStyle={styles.inputStyle}
              textLabelColor="#999999"
              textLabelBackground="white"
              placeholder="Phone Number"
              value={phonenumber}
              keyboardType="decimal-pad"
              autoCorrect={false}
              maxLength={12}
              isInvalid={validateInput && isEmpty(phonenumber)}
              returnKeyType="next"
              onChangeText={text => this.onPhoneChanged(text)}
              onSubmitEditing={() => {
                this.msgInput.focus();
              }}
            />
            <TextInput
              onRef={input => {
                this.msgInput = input;
              }}
              style={styles.textInput}
              inputStyle={styles.MsgInputStyle}
              textLabelColor="#999999"
              textLabelBackground="white"
              placeholder="Message"
              multiline
              numberOfLines={10}
              value={message}
              autoCorrect={false}
              isInvalid={validateInput && isEmpty(message)}
              returnKeyType="next"
              onChangeText={value => {
                this.setState({message: value});
              }}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
            />
            <View style={styles.submitButton}>
              <ButtonComponent
                ref={ref => (this.contactFormRef = ref)}
                style={styles.buttonContainer}
                buttonStyle={styles.submitButtonStyle}
                buttonText="Submit"
                buttonTextStyle={{color: '#fff'}}
                buttonClicked={() => this.SubmitHandler()}
              />
            </View>
          </View>
          <Text style={styles.contactBottomText}>
            *Our team operates during the business week, Monday-Friday, and
            celebrates major U.S. holidays with our families. During that time,
            we are unable to respond to phone calls or emails. However, if you
            reach out to us when we're not here, we promise we'll get back to
            you as soon as we return. Please note, we do not ship on weekends.
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  contactForm: state.contactFormReducer,
});

// const mapDispatchToProps = {
//   dispatchProductSupportContactForm: data =>
//     contactFormActions.handleProductForm(data),
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(ProductSupportScreen);

export default ProductSupportScreen;
