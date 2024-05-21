/**
 * @format
 */

// import {AppRegistry, LogBox} from 'react-native';
import {AppRegistry} from 'react-native';
import AppContainer from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => AppContainer);
