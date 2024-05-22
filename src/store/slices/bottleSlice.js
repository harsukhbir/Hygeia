import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loadingEnd, loadingStart} from './commonSlice';
import Services from '../../services/services';
import {showAPIErrorAlert} from '../../utils/native';

const initialState = {
  AddbottleSuccessful: false,
  bottleListing: {},
  BottleListingSuccessful: false,
  BottleDeleteSuccessful: false,
  EditBottleSuccessful: false,
  bottleEdit: {},
  msg: null,
  loading: false,
};

export const handleBottleCreate = createAsyncThunk(
  'bottle/handleBottleCreate',
  async (data, {dispatch, getState}) => {
    dispatch(loadingStart());
    try {
      const state = getState();
      let plisting = {};
      plisting.result = [...state.bottle.bottleListing.result];
      const response = await Services.handleBottleCreate(data);
      plisting.result.push(response.data.result);
      dispatch({
        type: 'SET_REFRESH_DATA',
        payload: true,
      });
      return plisting;
    } catch (error) {
      showAPIErrorAlert(error);
      throw error;
    } finally {
      dispatch(loadingEnd());
    }
  },
);

export const handleBottleListing = createAsyncThunk(
  'bottle/handleBottleListing',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.handleBottleListing(data);
      return response.data;
    } catch (error) {
      showAPIErrorAlert(error);
      throw error;
    } finally {
      dispatch(loadingEnd());
    }
  },
);

export const handleBottleDelete = createAsyncThunk(
  'bottle/handleBottleDelete',
  async (data, {dispatch, getState}) => {
    dispatch(loadingStart());
    try {
      const state = getState();
      let plisting = {};
      plisting.result = [...state.bottle.bottleListing.result];
      await Services.handleBottleDelete(data);
      const dataFilter = plisting.result.filter(el => el.id !== data.bottle_id);
      plisting.result = dataFilter;
      return plisting;
    } catch (error) {
      showAPIErrorAlert(error);
      throw error;
    } finally {
      dispatch(loadingEnd());
    }
  },
);

export const handleBottleEdit = createAsyncThunk(
  'bottle/handleBottleEdit',
  async (data, {dispatch, getState}) => {
    dispatch(loadingStart());
    try {
      const state = getState();
      let plisting = {};
      plisting.result = [...state.bottle.bottleListing.result];
      const response = await Services.handleBottleEdit(data);
      const dataFilter = [];
      plisting.result.forEach(el => {
        if (el.id === data.bottle_id) {
          el = data;
          el.id = data.bottle_id;
        }
        dataFilter.push(el);
      });
      plisting.result = dataFilter;
      dispatch({
        type: 'SET_REFRESH_DATA',
        payload: true,
      });
      return plisting;
    } catch (error) {
      showAPIErrorAlert(error);
      throw error;
    } finally {
      dispatch(loadingEnd());
    }
  },
);

const bottleSlice = createSlice({
  name: 'bottle',
  initialState,
  reducers: {
    clearMsg(state) {
      state.msg = null;
    },
    editGetDataBottle(state, action) {
      state.bottleEdit = action.payload;
    },
  },
  extras: builder => {
    builder
      .addCase(handleBottleCreate.fulfilled, (state, action) => {
        state.AddbottleSuccessful = true;
        state.bottleListing = action.payload;
        state.msg = 'ADD_BOTTLE_SUCCESS';
      })
      .addCase(handleBottleListing.fulfilled, (state, action) => {
        state.BottleListingSuccessful = true;
        state.bottleListing = action.payload;
      })
      .addCase(handleBottleListing.rejected, (state, action) => {
        state.BottleListingSuccessful = false;
        state.loading = false; // Reset loading state on rejection
      })
      .addCase(handleBottleDelete.fulfilled, (state, action) => {
        state.BottleDeleteSuccessful = true;
        state.bottleListing = action.payload;
      })
      .addCase(handleBottleEdit.fulfilled, (state, action) => {
        state.EditBottleSuccessful = true;
        state.bottleListing = action.payload;
        state.msg = 'EDIT_BOTTLE_SUCCESS';
      })
      .addCase(handleBottleCreate.pending, state => {
        state.loading = true;
      })
      .addCase(handleBottleCreate.rejected, state => {
        state.loading = false;
      })
      .addCase(handleBottleListing.pending, state => {
        state.loading = true;
      })
      .addCase(handleBottleDelete.pending, state => {
        state.loading = true;
      })
      .addCase(handleBottleDelete.rejected, state => {
        state.loading = false;
      })
      .addCase(handleBottleEdit.pending, state => {
        state.loading = true;
      })
      .addCase(handleBottleEdit.rejected, state => {
        state.loading = false;
      });
  },
});

export const {clearMsg, editGetDataBottle} = bottleSlice.actions;

export default bottleSlice.reducer;
