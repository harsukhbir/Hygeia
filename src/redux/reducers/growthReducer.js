import {
	ADD_GROWTH_START,
	ADD_GROWTH_SUCCESS,
	GROWTH_LISTING_START,
	GROWTH_LISTING_SUCCESS,
	GROWTH_LISTING_FAILURE,
	CLEAR_MSG,
} from "../actions/growthActions";

const initialState = {
	AddgrowthSuccessful: false,
	growthListing: [],
	GrowthListingSuccessful: false,
	msg: null,
};

const growthReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_GROWTH_START:
			return { ...state, AddgrowthSuccessful: false };
		case ADD_GROWTH_SUCCESS:
			return { ...state, AddgrowthSuccessful: true, growthListing: [...state.growthListing, action.data], msg: "ADD_GROWTH_SUCCESS" };
		case GROWTH_LISTING_START:
			return { ...state, GrowthListingSuccessful: true };
		case GROWTH_LISTING_SUCCESS:
			return { ...state, GrowthListingSuccessful: false, growthListing: action.data.result };
		case GROWTH_LISTING_FAILURE:
			return { ...state, GrowthListingSuccessful: false, growthListing: [] };
		case CLEAR_MSG: {
			return { ...state, msg: null };
		}
		default:
			return state;
	}
};

export default growthReducer;
