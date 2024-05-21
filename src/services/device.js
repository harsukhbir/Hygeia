import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import {isIOS} from '../utils/native';

export const getFirebaseToken = () => {
  return messaging().getToken();
};

export const getDeviceId = () => {
  return DeviceInfo.syncUniqueId();
};

export const getOS = () => {
  return isIOS() ? 'ios' : 'android';
};
