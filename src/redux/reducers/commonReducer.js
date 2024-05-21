import {
  LOADING_START,
  LOADING_SUCCESSFUL,
  LOADING_ERROR,
  GET_CURRENT_SCREEN,
  SET_REFRESH_DATA,
} from '../actions/commonActions';

const initialState = {
  isLoading: false,
  hasLoadingFailed: false,
  loadingError: null,
  currentScreen: null,
  refreshData: false,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        isLoading: true,
        hasLoadingFailed: false,
        loadingError: null,
      };
    case LOADING_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        hasLoadingFailed: false,
        loadingError: null,
      };
    case LOADING_ERROR:
      return {
        ...state,
        isLoading: false,
        hasLoadingFailed: true,
        loadingError: action.error,
      };
    case GET_CURRENT_SCREEN:
      return {...state, currentScreen: action.payload};
    case SET_REFRESH_DATA: {
      return {
        ...state,
        refreshData: action.payload,
      };
    }
    default:
      return state;
  }
};

export default commonReducer;
