import {
	ADD_DIAPER_START,
	ADD_DIAPER_SUCCESS,
	DIAPER_LISTING_START,
	DIAPER_LISTING_SUCCESS,
	DIAPER_DELETE_START,
	DIAPER_LISTING_FAILURE,
	DIAPER_DELETE_SUCCESS,
	EDIT_GET_DATA_DIAPER,
	EDIT_DIAPER_START,
	EDIT_DIAPER_SUCCESS,
	CLEAR_MSG,
} from "../actions/diaperActions";

const initialState = {
	AddDiaperSuccessful: false,
	EditDiaperSuccessful: false,
	diaperListing: {},
	DiaperListingSuccessful: false,
	DiaperDeleteSuccessful: false,
	diaperEdit: {},
	msg: null,
};

const diaperReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_DIAPER_START:
			return { ...state, AddDiaperSuccessful: false };
		case ADD_DIAPER_SUCCESS:
			return { ...state, AddDiaperSuccessful: true, diaperListing: action.data, msg: "ADD_DIAPER_SUCCESS" };
		case DIAPER_LISTING_START:
			return { ...state, DiaperListingSuccessful: true };
		case DIAPER_LISTING_SUCCESS:
			return { ...state, DiaperListingSuccessful: false, diaperListing: action.data };
		case DIAPER_LISTING_FAILURE:
			return { ...state, DiaperListingSuccessful: false, diaperListing: action.data };
		case DIAPER_DELETE_START:
			return { ...state, DiaperDeleteSuccessful: false };
		case DIAPER_DELETE_SUCCESS:
			return { ...state, DiaperDeleteSuccessful: true, diaperListing: action.data };
		case EDIT_GET_DATA_DIAPER:
			return { ...state, diaperEdit: action.data };
		case EDIT_DIAPER_START:
			return { ...state, EditDiaperSuccessful: false };
		case EDIT_DIAPER_SUCCESS:
			return { ...state, EditDiaperSuccessful: true, diaperListing: action.data, msg: "EDIT_DIAPER_SUCCESS" };
		case CLEAR_MSG: {
			return { ...state, msg: null };
		}
		default:
			return state;
	}
};

export default diaperReducer;
