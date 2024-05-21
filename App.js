import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {StyleProvider, Root} from 'native-base';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import App from './src/index';
import getTheme from './native-base-theme/components';
import {MenuProvider} from 'react-native-popup-menu';
import './src/locales/i18n';
import {store} from './src/store';

enableScreens();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const AppContainer = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <StyleProvider style={getTheme()}>
        <Root>
          <SafeAreaProvider>
            <View style={styles.container}>
              <MenuProvider>
                <App />
              </MenuProvider>
            </View>
          </SafeAreaProvider>
        </Root>
      </StyleProvider>
    </Provider>
  );
};

export default AppContainer;
