import {
	PRODUCT_SUPPORT_FORM_START,
	PRODUCT_SUPPORT_FORM_SUCCESS,
	TECH_SUPPORT_FORM_START,
	TECH_SUPPORT_FORM_SUCCESS,
} from "../actions/contactFormActions";

const initialState = {
	isProductFormSuccessful: false,
	isTechFormSuccessful: false,
};

const contactFormReducer = (state = initialState, action) => {
	switch (action.type) {
		case PRODUCT_SUPPORT_FORM_START:
			return { ...state, isProductFormSuccessful: false };
		case PRODUCT_SUPPORT_FORM_SUCCESS:
			return { ...state, isProductFormSuccessful: true };
		case TECH_SUPPORT_FORM_START:
			return { ...state, isTechFormSuccessful: false };
		case TECH_SUPPORT_FORM_SUCCESS:
			return { ...state, isTechFormSuccessful: true };
		default:
			return state;
	}
};

export default contactFormReducer;
