import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import * as authActions from '../../../../src/redux/actions/authActions';
import LanguageSwitcher from '../../../../src/components/LanguageSwitcher';
import {translate} from '../../../../src/locales/i18n';
import styles from './styles';

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

// const mapDispatchToProps = {
//   dispatchResetAuthState: () => authActions.resetAuthState(),
// };

// export default connect(null, mapDispatchToProps)(SuppliesScreen);
export default SuppliesScreen;
