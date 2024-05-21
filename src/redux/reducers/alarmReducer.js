const initialState = {
  isAdded: false,
};

const alarmReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALARM_START': {
      return {
        ...state,
        isAdded: true,
      };
    }
    case 'RESET_ALARM_MSG': {
      return {
        ...state,
        isAdded: false,
      };
    }
    default:
      return state;
  }
};

export default alarmReducer;
