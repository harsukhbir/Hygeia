import { createSelector } from "reselect";

export const getActiveBaby = createSelector(
	(state) => state.userReducer,
	(user) => user.babyEdit
);