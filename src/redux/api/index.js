import axios from 'axios';
import {getTimeZone} from 'react-native-localize';
import {getUniqueId} from 'react-native-device-info';

import {store} from '../store';

export function getUnauthenticatedInstance() {
  return axios.create({
    baseURL: 'http://mobile-app-1.hygeiahealth.com/breastfeeding-api-lv/',
    headers: {
      'device-id': getUniqueId(),
      Authorization: `${'Bearer' + ' '}${
        store?.getState()?.authReducer?.user?.result?.access_token
      }`,
      HEADER_LOCALE_TIME: getTimeZone(),
    },
    timeout: 20000,
  });
}

export function getAuthenticatedInstance() {
  return axios.create({
    baseURL: 'http://mobile-app-1.hygeiahealth.com/breastfeeding-api-lv/',
    headers: {
      'device-id': getUniqueId(),
      Authorization: `${'Bearer' + ' '}${
        store?.getState()?.authReducer?.user?.result?.access_token
      }`,
      HEADER_LOCALE_TIME: getTimeZone(),
    },
    timeout: 20000,
  });
}
