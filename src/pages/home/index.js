import React from 'react';
import {View, Text} from 'react-native';
import LanguageSwitcher from '../../../src/components/LanguageSwitcher';
import {translate} from '../../../src/locales/i18n';
import styles from './styles';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps: {i18n, insets}}) => {
    return {
      title: translate('homeScreen.headerTitle'),
      headerRight: () => (
        <LanguageSwitcher navigation={navigation} i18n={i18n} insets={insets} />
      ),
    };
  };

  componentDidMount() {}

  logOutHandler() {
    console.log('log out clicked!');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{translate('homeScreen.title')}</Text>
        <Text
          onPress={() => {
            this.logOutHandler();
          }}>
          Logout
        </Text>
      </View>
    );
  }
}

export default HomeScreen;
