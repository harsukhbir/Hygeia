import {createSelector} from 'reselect';

export const getActiveBaby = createSelector(
  state => state.user,
  user => user.babyEdit,
);
