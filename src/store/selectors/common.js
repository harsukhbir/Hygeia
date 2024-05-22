import {createSelector} from 'reselect';

export const getActiveScreen = createSelector(
  state => state.common,
  user => user.currentScreen,
);
