import {
	FETCH_STATISTICS_LIST_SUCCESS,
	FETCH_STATISTICS_LIST_FAILED,
	FETCH_STATISTICS_LIST_FETHCING,
	STATISTICS_RESET
} from "../actions/statisticsAction";

const initialState = {
	isFetching: false,
	statistics: null,
	msg: null,
};

const statisticsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_STATISTICS_LIST_FETHCING: {
			return {
				...state,
				isFetching: true,
				statistics: null
			};
		}
		case FETCH_STATISTICS_LIST_SUCCESS: {
			return {
				...state,
				isFetching: false,
				statistics: action.data
			};
		}
		case FETCH_STATISTICS_LIST_FAILED: {
			return {
				...state,
				isFetching: false,
				statistics: null
			};
		}
		case STATISTICS_RESET: {
			return {
				...state,
				...initialState
			};
		}
		default:
			return state;
	}
};

export default statisticsReducer;
