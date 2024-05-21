import * as apiRequest from '../store/api';

export default class Services {
  static handleProductForm = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/support/contactus', data);
  };

  static handleTechForm = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/support/contactus', data);
  };

  static handleDashboard = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/dashboard/latest/activity/alldata', data);
  };

  static handleBreastfeedCreate = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/breastfeed/create', data);
  };

  static handleBreastfeedEdit = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/breastfeed/update', data);
  };

  static handleBreastfeedListing = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/breastfeed/list', data);
  };

  static handleBreastfeedDelete = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/breastfeed/delete', data);
  };

  static handlePumpCreate = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/pump/create', data);
  };

  static handlePumpEdit = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/pump/update', data);
  };

  static handlePumpListing = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/pump/list', data);
  };

  static handlePumpDelete = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/pump/delete', data);
  };

  static updateProfile = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/baby/profile/update', data);
  };

  static BabyProfileGet = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.get('api/baby/profile/list', data);
  };

  static BabyProfileDelete = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/baby/profile/delete', data);
  };

  static CreateProfiles = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/baby/profile', data);
  };

  static profileListing = () => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.get('api/baby/profile/list');
  };

  static handleBottleCreate = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/bottles/create', data);
  };

  static handleBottleEdit = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/bottles/update', data);
  };

  static handleBottleListing = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/bottles/list', data);
  };

  static handleBottleDelete = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/bottles/delete', data);
  };

  static handleDiaperCreate = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/diapers/create', data);
  };

  static handleDiaperEdit = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/diapers/update', data);
  };

  static handleDiaperListing = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/diapers/list', data);
  };

  static handleDiaperDelete = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/diapers/delete', data);
  };

  static handleGrowthCreate = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/growths/create', data);
  };

  static handleGrowthListing = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/growths/list', data);
  };

  static handleChangePassword = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/password/change', data);
  };

  static getStatisticsListing = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/statistics/allevent', data);
  };

  static setAlarm = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/alarm/create', data);
  };

  static getAlarm = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/alarm/list/type', data);
  };

  static updateAlarm = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/track/alarm/update', data);
  };

  static updateNotification = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/notification/update', data);
  };

  static getNotification = () => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.get('api/notification-setting/get');
  };

  static updateDeviceToken = data => {
    const requestInstance = apiRequest.getAuthenticatedInstance();
    return requestInstance.post('api/user/token/update', data);
  };
}
