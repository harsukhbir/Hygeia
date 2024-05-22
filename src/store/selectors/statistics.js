import {createSelector} from 'reselect';

export const getStatistics = createSelector(
  state => state.statistics,
  data => data && data.statistics,
);
