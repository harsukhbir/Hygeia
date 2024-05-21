import {
	SET_ACTIVE_TAB_NAME,
	SET_TRACK_ACTIVE_TAB_NAME
} from "../actions/tabAction";

const initialState = {
	activeTab: "Dashboard",
	trackActiveTab: "Breastfeed"
};

const tabReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ACTIVE_TAB_NAME: {
			return {
				...state,
				activeTab: action.payload
			};
		}
		case SET_TRACK_ACTIVE_TAB_NAME: {
			return {
				...state,
				trackActiveTab: action.payload
			};
		}
		default:
			return state;
	}
};

export default tabReducer;
