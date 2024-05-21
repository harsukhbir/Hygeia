import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchPrevAlarmValue} from './trackAction';
import {loadingEnd, loadingStart} from './commonSlice';
import {showAPIErrorAlert} from '../../utils/native';
import Services from '../../services/services';

const initialState = {
  isAdded: false,
  loading: false,
};

export const setAlarmAPI = createAsyncThunk(
  'alarm/setAlarm',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const result = await Services.setAlarm(data);
      dispatch(setAlarm());
      dispatch(fetchPrevAlarmValue({baby_id: data.baby_id, type: data.type}));
    } catch (error) {
      showAPIErrorAlert(error);
    } finally {
      dispatch(loadingEnd());
    }
  },
);

export const updateAlarmAPI = createAsyncThunk(
  'alarm/updateAlarm',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      await Services.updateAlarm(data);
      dispatch(setAlarm());
      dispatch(fetchPrevAlarmValue({baby_id: data.baby_id, type: data.type}));
    } catch (error) {
      showAPIErrorAlert(error);
    } finally {
      dispatch(loadingEnd());
    }
  },
);

const alarmSlice = createSlice({
  name: 'alarm',
  initialState,
  reducers: {
    setAlarm(state) {
      state.isAdded = true;
    },
    resetAlarmMsg(state) {
      state.isAdded = false;
    },
  },
  extraReducers: {
    [setAlarmAPI.pending]: state => {
      state.loading = true;
    },
    [setAlarmAPI.fulfilled]: state => {
      state.loading = false;
    },
    [setAlarmAPI.rejected]: state => {
      state.loading = false;
    },
    [updateAlarmAPI.pending]: state => {
      state.loading = true;
    },
    [updateAlarmAPI.fulfilled]: state => {
      state.loading = false;
    },
    [updateAlarmAPI.rejected]: state => {
      state.loading = false;
    },
  },
});

export const {setAlarm, resetAlarmMsg} = alarmSlice.actions;

export default alarmSlice.reducer;
