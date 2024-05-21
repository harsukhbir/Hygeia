import {createSelector} from 'reselect';

export const getActiveScreen = createSelector(
  state => state.commonReducer,
  user => user.currentScreen,
);
