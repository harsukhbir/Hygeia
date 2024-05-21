import React from 'react';
import {View, Text} from 'react-native';
import {translate} from '../../../src/locales/i18n';
import styles from './styles';

class AccountScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: translate('accountScreen.headerTitle'),
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{translate('accountScreen.title')}</Text>
      </View>
    );
  }
}

export default AccountScreen;
