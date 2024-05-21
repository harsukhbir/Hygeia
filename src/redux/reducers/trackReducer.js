import {SET_TRACK_ALARM_VALUE} from '../actions/trackAction';

const initialState = {
  bottle: null,
  breastfeed: null,
  pump: null,
};

const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACK_ALARM_VALUE: {
      return {
        ...state,
        [action.payload.type]: action.payload.item,
      };
    }
    default:
      return state;
  }
};

export default trackReducer;
