import React from 'react';
import {View, Text} from 'react-native';
import {translate} from '../../../src/locales/i18n';
import styles from './styles';

class SearchScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: translate('searchScreen.headerTitle'),
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{translate('searchScreen.title')}</Text>
      </View>
    );
  }
}

export default SearchScreen;
