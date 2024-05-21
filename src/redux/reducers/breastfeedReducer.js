import {
  ADD_BREASTFEED_START,
  ADD_BREASTFEED_SUCCESS,
  BREASTFEED_LISTING_START,
  BREASTFEED_LISTING_SUCCESS,
  BREASTFEED_LISTING_ERROR,
  BREASTFEED_DELETE_START,
  BREASTFEED_DELETE_SUCCESS,
  EDIT_GET_DATA_BREASTFEED,
  EDIT_BREASTFEED_START,
  EDIT_BREASTFEED_SUCCESS,
  CLEAR_MSG,
  BREASTFEED_RESET,
} from '../actions/breastfeedActions';

const initialState = {
  AddBreastfeedSuccessful: false,
  breastfeedCreate: null,
  breastfeedListing: [],
  breastfeedEdit: {},
  BreastfeedListingSuccessful: false,
  BreastfeedDeleteSuccessful: false,
  EditBreastfeedSuccessful: false,
  msg: null,
};

const breastfeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BREASTFEED_START:
      return {...state, AddBreastfeedSuccessful: false};
    case ADD_BREASTFEED_SUCCESS:
      return {
        ...state,
        AddBreastfeedSuccessful: true,
        breastfeedListing: action.data,
        msg: 'ADD_BREASTFEED_SUCCESS',
      };
    case BREASTFEED_LISTING_START:
      return {...state, BreastfeedListingSuccessful: false};
    case BREASTFEED_LISTING_SUCCESS:
      return {
        ...state,
        BreastfeedListingSuccessful: true,
        breastfeedListing: action.data,
      };
    case BREASTFEED_LISTING_ERROR:
      return {
        ...state,
        BreastfeedListingSuccessful: false,
        breastfeedListing: action.data,
      };
    case BREASTFEED_DELETE_START:
      return {...state, BreastfeedDeleteSuccessful: false};
    case BREASTFEED_DELETE_SUCCESS:
      return {
        ...state,
        BreastfeedDeleteSuccessful: true,
        breastfeedListing: action.data,
      };
    case EDIT_GET_DATA_BREASTFEED:
      return {...state, breastfeedEdit: action.data};
    case EDIT_BREASTFEED_START:
      return {...state, EditBreastfeedSuccessful: false};
    case EDIT_BREASTFEED_SUCCESS:
      return {
        ...state,
        EditBreastfeedSuccessful: true,
        breastfeedListing: action.data,
        msg: 'EDIT_BREASTFEED_SUCCESS',
      };
    case CLEAR_MSG: {
      return {...state, msg: null};
    }
    case BREASTFEED_RESET: {
      return {...state, ...initialState};
    }
    default:
      return state;
  }
};

export default breastfeedReducer;
