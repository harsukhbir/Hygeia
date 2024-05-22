import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loadingEnd, loadingStart} from './commonSlice';
import Services from '../../services/services';
import {showAPIErrorAlert} from '../../utils/native';

const initialState = {
  AddBreastfeedSuccessful: false,
  breastfeedCreate: null,
  breastfeedListing: [],
  breastfeedEdit: {},
  BreastfeedListingSuccessful: false,
  BreastfeedDeleteSuccessful: false,
  EditBreastfeedSuccessful: false,
  msg: null,
  loading: false,
};

export const handleBreastfeedCreate = createAsyncThunk(
  'breastfeed/handleBreastfeedCreate',
  async (data, {dispatch, getState}) => {
    dispatch(loadingStart());
    try {
      const state = getState();
      let listing = {};
      listing.result = [...state.breastfeed.breastfeedListing.result];
      const response = await Services.handleBreastfeedCreate(data);
      listing.result.push(response.data.result);
      dispatch({
        type: 'SET_REFRESH_DATA',
        payload: true,
      });
      return listing;
    } catch (error) {
      showAPIErrorAlert(error);
      throw error;
    } finally {
      dispatch(loadingEnd());
    }
  },
);

export const handleBreastfeedListing = createAsyncThunk(
  'breastfeed/handleBreastfeedListing',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.handleBreastfeedListing(data);
      return response.data;
    } catch (error) {
      showAPIErrorAlert(error);
      throw error;
    } finally {
      dispatch(loadingEnd());
    }
  },
);

export const handleBreastfeedDelete = createAsyncThunk(
  'breastfeed/handleBreastfeedDelete',
  async (data, {dispatch, getState}) => {
    dispatch(loadingStart());
    try {
      const state = getState();
      let listing = {};
      listing.result = [...state.breastfeed.breastfeedListing.result];
      await Services.handleBreastfeedDelete(data);
      const dataFilter = listing.result.filter(
        el => el.id !== data.breastfeed_id,
      );
      listing.result = dataFilter;
      return listing;
    } catch (error) {
      showAPIErrorAlert(error);
      throw error;
    } finally {
      dispatch(loadingEnd());
    }
  },
);

export const handleBreastfeedEdit = createAsyncThunk(
  'breastfeed/handleBreastfeedEdit',
  async (data, {dispatch, getState}) => {
    dispatch(loadingStart());
    try {
      const state = getState();
      let listing = {};
      listing.result = [...state.breastfeed.breastfeedListing.result];
      const response = await Services.handleBreastfeedEdit(data);
      const dataFilter = [];
      listing.result.forEach(el => {
        if (el.id === data.breastfeed_id) {
          el = data;
          el.id = data.breastfeed_id;
        }
        dataFilter.push(el);
      });
      listing.result = dataFilter;
      dispatch({
        type: 'SET_REFRESH_DATA',
        payload: true,
      });
      return listing;
    } catch (error) {
      showAPIErrorAlert(error);
      throw error;
    } finally {
      dispatch(loadingEnd());
    }
  },
);

const breastfeedSlice = createSlice({
  name: 'breastfeed',
  initialState,
  reducers: {
    clearMsg(state) {
      state.msg = null;
    },
    editGetDataBreastfeed(state, action) {
      state.breastfeedEdit = action.payload;
    },
    resetBreastfeed(state) {
      Object.assign(state, initialState);
    },
  },
  extras: builder => {
    builder
      .addCase(handleBreastfeedCreate.fulfilled, (state, action) => {
        state.AddBreastfeedSuccessful = true;
        state.breastfeedListing = action.payload;
        state.msg = 'ADD_BREASTFEED_SUCCESS';
      })
      .addCase(handleBreastfeedListing.fulfilled, (state, action) => {
        state.BreastfeedListingSuccessful = true;
        state.breastfeedListing = action.payload;
      })
      .addCase(handleBreastfeedDelete.fulfilled, (state, action) => {
        state.BreastfeedDeleteSuccessful = true;
        state.breastfeedListing = action.payload;
      })
      .addCase(handleBreastfeedEdit.fulfilled, (state, action) => {
        state.EditBreastfeedSuccessful = true;
        state.breastfeedListing = action.payload;
        state.msg = 'EDIT_BREASTFEED_SUCCESS';
      })
      .addMatcher(
        action =>
          action.type.startsWith('breastfeed/handleBreastfeedListing') &&
          action.type.endsWith('/rejected'),
        state => {
          state.BreastfeedListingSuccessful = false;
          state.loading = false;
        },
      )
      .addMatcher(
        action =>
          action.type.startsWith('breastfeed/handleBreastfeedDelete') &&
          action.type.endsWith('/rejected'),
        state => {
          state.loading = false;
        },
      )
      .addMatcher(
        action =>
          action.type.startsWith('breastfeed/handleBreastfeedEdit') &&
          action.type.endsWith('/rejected'),
        state => {
          state.loading = false;
        },
      )
      .addMatcher(
        action =>
          action.type.startsWith('breastfeed/handleBreastfeedCreate') &&
          action.type.endsWith('/rejected'),
        state => {
          state.loading = false;
        },
      );
  },
});

export const {clearMsg, editGetDataBreastfeed, resetBreastfeed} =
  breastfeedSlice.actions;

export default breastfeedSlice.reducer;
