import React from 'react';
import {View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '../../../../src/components/ButtonComponent';
import {Images} from '../../../../src/assets/images';
import {translate} from '../../../../src/locales/i18n';
import styles from './styles';

class WelcomeScreen extends React.Component {
  signUpHandler = () => {
    const {navigation} = this.props;
    navigation.navigate('Signup');
  };

  logInHandler = () => {
    const {navigation} = this.props;
    navigation.navigate('Login');
  };

  render() {
    return (
      <LinearGradient
        style={styles.container}
        colors={['#F9EFE0', '#ECC894', '#E4B167']}>
        <View style={styles.contentArea}>
          <View style={styles.welcomeContent}>
            <Image source={Images.authScreen.logo} style={styles.logo} />
            <Text style={styles.welcomeText}>
              {translate('welcomeScreen.title')}
            </Text>
          </View>
          <ButtonComponent
            buttonClicked={() => {
              this.signUpHandler();
            }}
            style={styles.signButtonContainer}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
            buttonText="Sign up"
          />

          <ButtonComponent
            buttonClicked={() => {
              this.logInHandler();
            }}
            style={styles.buttonContainer}
            buttonText="Login"
          />
        </View>
      </LinearGradient>
    );
  }
}

export default WelcomeScreen;
