import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loadingEnd, loadingStart} from './commonSlice';
import Services from '../../services/services';

const initialState = {
  dashboardListing: {},
  DashboardListingSuccessful: false,
};

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.handleDashboard(data);
      dispatch(loadingEnd());
      return response.data;
    } catch (error) {
      dispatch(loadingEnd());
      throw error;
    }
  },
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    DashboardListingStart: state => {
      state.DashboardListingSuccessful = false;
    },
    DashboardListingFailure: state => {
      state.DashboardListingSuccessful = false;
      state.dashboardListing = {};
    },
    DashboardReset: state => {
      state = initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDashboardData.pending, state => {
        state.DashboardListingSuccessful = false;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.DashboardListingSuccessful = true;
        state.dashboardListing = action.payload;
      })
      .addCase(fetchDashboardData.rejected, state => {
        state.DashboardListingSuccessful = false;
        state.dashboardListing = {};
      });
  },
});

export default dashboardSlice.reducer;

export const {DashboardListingStart, DashboardListingFailure, DashboardReset} =
  dashboardSlice.actions;
