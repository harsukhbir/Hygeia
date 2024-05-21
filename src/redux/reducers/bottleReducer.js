import {
  ADD_BOTTLE_START,
  ADD_BOTTLE_SUCCESS,
  BOTTLE_LISTING_START,
  BOTTLE_LISTING_SUCCESS,
  BOTTLE_DELETE_START,
  BOTTLE_LISTING_FAILURE,
  BOTTLE_DELETE_SUCCESS,
  EDIT_GET_DATA_BOTTLE,
  EDIT_BOTTLE_START,
  EDIT_BOTTLE_SUCCESS,
  CLEAR_MSG,
} from '../actions/bottleActions';

const initialState = {
  AddbottleSuccessful: false,
  bottleListing: {},
  BottleListingSuccessful: false,
  BottleDeleteSuccessful: false,
  EditBottleSuccessful: false,
  bottleEdit: {},
  msg: null,
};

const bottleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOTTLE_START:
      return {...state, AddbottleSuccessful: false};
    case ADD_BOTTLE_SUCCESS:
      return {
        ...state,
        AddbottleSuccessful: true,
        bottleListing: action.data,
        msg: 'ADD_BOTTLE_SUCCESS',
      };
    case BOTTLE_LISTING_START:
      return {...state, BottleListingSuccessful: true};
    case BOTTLE_LISTING_SUCCESS:
      return {
        ...state,
        BottleListingSuccessful: false,
        bottleListing: action.data,
      };
    case BOTTLE_LISTING_FAILURE:
      return {
        ...state,
        BottleListingSuccessful: false,
        bottleListing: action.data,
      };
    case BOTTLE_DELETE_START:
      return {...state, BottleDeleteSuccessful: false};
    case BOTTLE_DELETE_SUCCESS:
      return {
        ...state,
        BottleDeleteSuccessful: true,
        bottleListing: action.data,
      };
    case EDIT_GET_DATA_BOTTLE:
      return {...state, bottleEdit: action.data};
    case EDIT_BOTTLE_START:
      return {...state, EditBottleSuccessful: false};
    case EDIT_BOTTLE_SUCCESS:
      return {
        ...state,
        EditBottleSuccessful: true,
        bottleListing: action.data,
        msg: 'EDIT_BOTTLE_SUCCESS',
      };
    case CLEAR_MSG: {
      return {...state, msg: null};
    }
    default:
      return state;
  }
};

export default bottleReducer;
