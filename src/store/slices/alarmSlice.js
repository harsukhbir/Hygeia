import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loadingEnd, loadingStart} from './commonSlice';
import {showAPIErrorAlert} from '../../utils/native';
import Services from '../../services/services';
import {fetchPrevAlarmValue} from './trackSlice';

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
  extras: builder => {
    builder
      .addCase(setAlarmAPI.pending, state => {
        state.loading = true;
      })
      .addCase(setAlarmAPI.fulfilled, state => {
        state.loading = false;
      })
      .addCase(setAlarmAPI.rejected, state => {
        state.loading = false;
      })
      .addCase(updateAlarmAPI.pending, state => {
        state.loading = true;
      })
      .addCase(updateAlarmAPI.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateAlarmAPI.rejected, state => {
        state.loading = false;
      });
  },
});
export const {setAlarm, resetAlarmMsg} = alarmSlice.actions;

export default alarmSlice.reducer;
