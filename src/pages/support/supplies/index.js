import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import LanguageSwitcher from '../../../../src/components/LanguageSwitcher';
import {translate} from '../../../../src/locales/i18n';
import styles from './styles';
import {resetAuthState} from '../../../store/slices/authSlice';

class SuppliesScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps: {i18n, insets}}) => {
    return {
      title: translate('suppliesScreen.headerTitle'),
      headerRight: () => (
        <LanguageSwitcher navigation={navigation} i18n={i18n} insets={insets} />
      ),
    };
  };

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text>Supplies</Text>
      </View>
    );
  }
}

const mapDispatchToProps = {
  dispatchResetAuthState: () => resetAuthState(),
};

export default connect(null, mapDispatchToProps)(SuppliesScreen);
