export const SET_ACTIVE_TAB_NAME = "SET_ACTIVE_TAB_NAME";
export const SET_TRACK_ACTIVE_TAB_NAME = "SET_TRACK_ACTIVE_TAB_NAME";

export const setActiveTab = (name) => ({
	type: SET_ACTIVE_TAB_NAME,
	payload: name
});

export const setTrackActiveTab = (name) => ({
	type: SET_TRACK_ACTIVE_TAB_NAME,
	payload: name
});