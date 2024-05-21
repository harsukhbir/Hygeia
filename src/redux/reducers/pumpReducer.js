import {
	ADD_PUMP_START,
	ADD_PUMP_SUCCESS,
	PUMP_LISTING_START,
	PUMP_LISTING_SUCCESS,
	PUMP_DELETE_START,
	PUMP_LISTING_FAILURE,
	PUMP_DELETE_SUCCESS,
	EDIT_GET_DATA_PUMP,
	EDIT_PUMP_START,
	EDIT_PUMP_SUCCESS,
	CLEAR_MSG,
} from "../actions/pumpActions";

const initialState = {
	AddpumpSuccessful: false,
	pumpListing: {},
	PumpListingSuccessful: false,
	PumpDeleteSuccessful: false,
	EditPumpSuccessful: false,
	pumpEdit: {},
	msg: null,
};

const pumpReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_PUMP_START:
			return { ...state, AddpumpSuccessful: false };
		case ADD_PUMP_SUCCESS:
			return { ...state, AddpumpSuccessful: true, pumpListing: action.data, msg: "ADD_PUMP_SUCCESS" };
		case PUMP_LISTING_START:
			return { ...state, PumpListingSuccessful: true };
		case PUMP_LISTING_SUCCESS:
			return { ...state, PumpListingSuccessful: false, pumpListing: action.data };
		case PUMP_LISTING_FAILURE:
			return { ...state, PumpListingSuccessful: false, pumpListing: action.data };
		case PUMP_DELETE_START:
			return { ...state, PumpDeleteSuccessful: false };
		case PUMP_DELETE_SUCCESS:
			return { ...state, PumpDeleteSuccessful: true, pumpListing: action.data };
		case EDIT_GET_DATA_PUMP:
			return { ...state, pumpEdit: action.data };
		case EDIT_PUMP_START:
			return { ...state, EditPumpSuccessful: false };
		case EDIT_PUMP_SUCCESS:
			return { ...state, EditPumpSuccessful: true, pumpListing: action.data, msg: "EDIT_PUMP_SUCCESS" };
		case CLEAR_MSG: {
			return { ...state, msg: null };
		}
		default:
			return state;
	}
};

export default pumpReducer;
