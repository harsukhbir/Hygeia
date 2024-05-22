import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loadingEnd, loadingStart} from './commonSlice';
import Services from '../../services/services';
import {showAPIErrorAlert} from '../../utils/native';

const initialState = {
  AddgrowthSuccessful: false,
  growthListing: [],
  GrowthListingSuccessful: false,
  msg: null,
};

export const handleGrowthCreate = createAsyncThunk(
  'growth/handleGrowthCreate',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.handleGrowthCreate(data);
      if (response.data.result.error) {
        showAPIErrorAlert(response.data.result.error);
        dispatch(loadingEnd());
        return;
      }
      dispatch(loadingEnd());
      return response.data.result;
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      throw error;
    }
  },
);

export const handleGrowthListing = createAsyncThunk(
  'growth/handleGrowthListing',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.handleGrowthListing(data);
      if (response.data.result.error) {
        dispatch(loadingEnd());
        return;
      }
      dispatch(loadingEnd());
      return response.data;
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      throw error;
    }
  },
);

const growthSlice = createSlice({
  name: 'growth',
  initialState,
  reducers: {
    CLEAR_MSG: state => {
      state.msg = null;
    },
    UPDATE_USER_LISTED_BABY_DETAIL: (state, action) => {
      state.growthListing.push(action.payload);
    },
  },
  extras: builder => {
    builder
      .addCase(handleGrowthCreate.pending, state => {
        state.AddgrowthSuccessful = false;
      })
      .addCase(handleGrowthCreate.fulfilled, (state, action) => {
        state.AddgrowthSuccessful = true;
        state.growthListing.push(action.payload);
      })
      .addCase(handleGrowthCreate.rejected, state => {
        state.AddgrowthSuccessful = false;
      })
      .addCase(handleGrowthListing.pending, state => {
        state.GrowthListingSuccessful = true;
      })
      .addCase(handleGrowthListing.fulfilled, (state, action) => {
        state.GrowthListingSuccessful = false;
        state.growthListing = action.payload;
      })
      .addCase(handleGrowthListing.rejected, state => {
        state.GrowthListingSuccessful = false;
        state.growthListing = [];
      });
  },
});

export const {CLEAR_MSG, UPDATE_USER_LISTED_BABY_DETAIL} = growthSlice.actions;

export default growthSlice.reducer;
