import {configureStore} from '@reduxjs/toolkit';

import commonReducer from './slices/commonSlice';
import alarmReducer from './slices/alarmSlice';
import authReducer from './slices/authSlice';
import bottleReducer from './slices/bottleSlice';
import breastfeedReducer from './slices/breastfeedSlice';
import contactFormReducer from './slices/contactFormSlice';
import createBabyReducer from './slices/createBabySlice';
import dashboardReducer from './slices/dashboardSlice';
import diaperReducer from './slices/diaperSlice';
import growthReducer from './slices/growthSlice';
import pumpReducer from './slices/pumpSlice';
import statisticsReducer from './slices/statisticsSlice';
import tabReducer from './slices/tabSlice';
import trackReducer from './slices/trackSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    alarm: alarmReducer,
    auth: authReducer,
    bottle: bottleReducer,
    breastfeed: breastfeedReducer,
    contactForm: contactFormReducer,
    createBaby: createBabyReducer,
    dashboard: dashboardReducer,
    diaper: diaperReducer,
    growth: growthReducer,
    pump: pumpReducer,
    statistics: statisticsReducer,
    tab: tabReducer,
    track: trackReducer,
    user: userReducer,
  },
});
