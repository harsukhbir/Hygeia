import {
  BABY_LISTING_START,
  BABY_LISTING_SUCCESS,
  BABY_LISTING_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_START,
  EDIT_GET_DATA_BABY,
  DELETE_BABY_START,
  DELETE_BABY_SUCCESS,
  DELETE_BABY_FAILED,
  UPDATE_USER_NOTIFICATION,
  RESET_BABY_DATA,
} from '../actions/userAction';
import {UPDATE_USER_LISTED_BABY_DETAIL} from '../actions/growthActions';

const initialState = {
  isLoading: false,
  babyDelete: false,
  babyDetails: [],
  loadingError: null,
  isBabyLoaded: false,
  babyEdit: {},
  notification: {
    breastfeed: true,
    pump: true,
    bottle: true,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case BABY_LISTING_START:
      return {
        ...state,
        isLoading: true,
        isBabyLoaded: false,
        babyDetails: [],
        loadingError: null,
      };
    case BABY_LISTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isBabyLoaded: true,
        babyDetails: action.data,
        loadingError: null,
      };
    case BABY_LISTING_FAIL:
      return {
        ...state,
        isLoading: false,
        isBabyLoaded: true,
        loadingError: action.error,
      };
    case DELETE_BABY_START:
      return {...state, babyDelete: true};
    case DELETE_BABY_SUCCESS:
      return {...state, babyDelete: false};
    case DELETE_BABY_FAILED:
      return {...state, babyDelete: false};
    case EDIT_GET_DATA_BABY:
      return {...state, babyEdit: action.data};
    case UPDATE_PROFILE_SUCCESS:
      let {babyEdit} = state;
      const index = action.data.findIndex(x => x.id === babyEdit.id);
      if (index > -1) {
        babyEdit = {...action.data[index]};
      }
      return {
        ...state,
        babyDetails: action.data,
        babyEdit,
        isLoading: false,
        loadingError: null,
      };
    case UPDATE_PROFILE_START:
      return {...state, isLoading: true};
    case UPDATE_USER_NOTIFICATION: {
      let obj = {
        breastfeed: true,
        pump: true,
        bottle: true,
      };
      const breastfeed = action.data.find(
        x => x.notification_type === 'breastfeed',
      );
      if (breastfeed) {
        obj.breastfeed = breastfeed.notification === 'on' ? true : false;
      }
      const pump = action.data.find(x => x.notification_type === 'pump');
      if (pump) {
        obj.pump = pump.notification === 'on' ? true : false;
      }
      const bottle = action.data.find(x => x.notification_type === 'bottle');
      if (bottle) {
        obj.bottle = bottle.notification === 'on' ? true : false;
      }

      return {
        ...state,
        notification: obj,
      };
    }
    case UPDATE_USER_LISTED_BABY_DETAIL: {
      const data = action.data;
      const {babyEdit, babyDetails} = state;
      if (babyEdit.id === data.babyprofile_id) {
        babyEdit.height = data.height;
        babyEdit.weight_lb = data.weight_lb;
        babyEdit.weight_oz = data.weight_oz;
      }

      const index = babyDetails.findIndex(x => x.id === data.babyprofile_id);
      if (index > -1) {
        babyDetails[index].height = data.height;
        babyDetails[index].weight_lb = data.weight_lb;
        babyDetails[index].weight_oz = data.weight_oz;
      }

      return {
        ...state,
        babyEdit,
        babyDetails,
      };
    }
    case RESET_BABY_DATA: {
      return {...state, ...initialState};
    }
    default:
      return state;
  }
};

export default userReducer;
