import {createSelector} from 'reselect';

export const getStatistics = createSelector(
  state => state.statisticsReducer,
  data => data && data.statistics,
);
