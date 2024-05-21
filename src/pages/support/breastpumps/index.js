import React from 'react';
import {View, Text, Image} from 'react-native';
import LanguageSwitcher from '../../../../src/components/LanguageSwitcher';
import ButtonComponent from '../../../../src/components/ButtonComponent';
import {Images} from '../../../../src/assets/images';
import {translate} from '../../../../src/locales/i18n';
import styles from './styles';

class BreastpumpsScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps: {i18n, insets}}) => {
    return {
      title: translate('breastpumpsScreen.headerTitle'),
      headerRight: () => (
        <LanguageSwitcher navigation={navigation} i18n={i18n} insets={insets} />
      ),
    };
  };

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.breastpumptext}>
          Get your Hygeia Breastpump through
          {'\n'}
          insurance today!
        </Text>
        <View>
          <ButtonComponent
            style={styles.buttonContainer}
            buttonStyle={styles.savebuttonStyle}
            buttonTextStyle={styles.savebuttontextStyle}
            buttonText={'Apply to\n order a\n breastpump'}
          />
          <View style={styles.learnmorebutton}>
            <Text style={styles.learnmoreText}>
              Visit our website to learn more
            </Text>
            <Image
              source={Images.Breastpumps.leftarrowIcon}
              style={styles.dashboardboxImage}
            />
          </View>
        </View>
      </View>
    );
  }
}

// const mapDispatchToProps = {
//   dispatchResetAuthState: () => authActions.resetAuthState(),
// };

// export default connect(null, mapDispatchToProps)(BreastpumpsScreen);
export default BreastpumpsScreen;
