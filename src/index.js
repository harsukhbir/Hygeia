import React, {Component} from 'react';
import {View} from 'react-native';
import AuthNavigator from './authNavigator';
import {Keys, KeyValueStore} from './utils/KeyValueStore';
import {isIOS} from './utils/native';

class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const language = await KeyValueStore.getItem(Keys.LANGUAGE);
    const {i18n} = this.props;

    if (language !== null) {
      i18n.changeLanguage(language);
    }

    if (isIOS()) {
    }
  }

  getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
      return this.getActiveRouteName(route);
    }
    return {route: route.routeName, params: route.params};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <AuthNavigator />
      </View>
    );
  }
}

export default App;
