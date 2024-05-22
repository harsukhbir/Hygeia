import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loadingEnd, loadingStart} from './commonSlice';
import Services from '../../services/services';
import {showAPIErrorAlert} from '../../utils/native';

const initialState = {
  isFetching: false,
  statistics: null,
  msg: null,
};

export const getStatisticsList = createAsyncThunk(
  'statistics/getStatisticsList',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.getStatisticsListing(data);
      dispatch(loadingEnd());
      if (!response.data.error) {
        return response.data.result;
      } else {
        throw new Error('Failed to fetch statistics list.');
      }
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      throw error;
    }
  },
);

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    STATISTICS_RESET: () => initialState,
  },
  extras: builder => {
    builder
      .addCase(getStatisticsList.pending, state => {
        state.isFetching = true;
        state.statistics = null;
      })
      .addCase(getStatisticsList.fulfilled, (state, action) => {
        state.isFetching = false;
        state.statistics = action.payload;
      })
      .addCase(getStatisticsList.rejected, state => {
        state.isFetching = false;
        state.statistics = null;
      });
  },
});

export const {STATISTICS_RESET} = statisticsSlice.actions;

export default statisticsSlice.reducer;
