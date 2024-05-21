import {
	PROFILE_CREATE_START,
	PROFILE_CREATE_SUCCESS,
	PROFILE_CREATE_FAILED,
} from "../actions/createBabyAction";

const initialState = {
	isLoading: false,
	babyDetails: [],
	loadingError: null,
	babyEdit: {},
};

const createBabyReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROFILE_CREATE_START:
			return { ...state, isLoading: true, babyDetails: [], loadingError: null };
		case PROFILE_CREATE_SUCCESS:
			return { ...state, isLoading: false, babyDetails: action.data, loadingError: null };
		case PROFILE_CREATE_FAILED:
			return { ...state, isLoading: false, loadingError: action.error };
		default:
			return state;
	}
};

export default createBabyReducer;