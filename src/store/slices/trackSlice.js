import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loadingEnd, loadingStart} from './commonSlice';
import Services from '../../services/services';
import {showAPIErrorAlert} from '../../utils/native';

const initialState = {
  bottle: null,
  breastfeed: null,
  pump: null,
};

export const fetchPrevAlarmValue = createAsyncThunk(
  'track/fetchPrevAlarmValue',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.getAlarm(data);
      if (response.data.result.error) {
        showAPIErrorAlert(response.data.result.error);
        dispatch(loadingEnd());
        return;
      }
      dispatch(
        setTrackAlarmValue({type: data.type, item: response.data.result}),
      );
      dispatch(loadingEnd());
    } catch (error) {
      dispatch(loadingEnd());
      // showAPIErrorAlert(error);
    }
  },
);

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setTrackAlarmValue: (state, action) => {
      state[action.payload.type] = action.payload.item;
    },
  },
});

export const {setTrackAlarmValue} = trackSlice.actions;

export default trackSlice.reducer;
