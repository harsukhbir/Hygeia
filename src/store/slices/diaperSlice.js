import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loadingEnd, loadingStart} from './commonSlice';
import Services from '../../services/services';
import {showAPIErrorAlert} from '../../utils/native';

const initialState = {
  AddDiaperSuccessful: false,
  EditDiaperSuccessful: false,
  diaperListing: {},
  DiaperListingSuccessful: false,
  DiaperDeleteSuccessful: false,
  diaperEdit: {},
  msg: null,
};

export const handleDiaperCreate = createAsyncThunk(
  'diaper/handleDiaperCreate',
  async (data, {dispatch, getState}) => {
    dispatch(loadingStart());
    try {
      const state = getState();
      let plisting = {};
      plisting.result = [...state.diaper.diaperListing.result];
      const response = await Services.handleDiaperCreate(data);
      plisting.result.push(response.data.result);
      dispatch(loadingEnd());
      dispatch({
        type: 'diaper/SET_REFRESH_DATA',
        payload: true,
      });
      return plisting;
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      throw error;
    }
  },
);

export const handleDiaperListing = createAsyncThunk(
  'diaper/handleDiaperListing',
  async (data, {dispatch}) => {
    // dispatch(loadingStart());
    try {
      const response = await Services.handleDiaperListing(data);
      // dispatch(loadingEnd());
      return response.data;
    } catch (error) {
      // dispatch(loadingEnd());
      showAPIErrorAlert(error);
      throw error;
    }
  },
);

export const handleDiaperDelete = createAsyncThunk(
  'diaper/handleDiaperDelete',
  async (data, {dispatch, getState}) => {
    dispatch(loadingStart());
    try {
      const state = getState();
      let plisting = {};
      plisting.result = [...state.diaper.diaperListing.result];
      const response = await Services.handleDiaperDelete(data);
      const dataFilter = plisting.result.filter(el => el.id !== data.diaper_id);
      plisting.result = dataFilter;
      dispatch(loadingEnd());
      return plisting;
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      throw error;
    }
  },
);

export const handleDiaperEdit = createAsyncThunk(
  'diaper/handleDiaperEdit',
  async (data, {dispatch, getState}) => {
    dispatch(loadingStart());
    try {
      const state = getState();
      let plisting = {};
      plisting.result = [...state.diaper.diaperListing.result];
      const response = await Services.handleDiaperEdit(data);
      const dataFilter = [];
      plisting.result.forEach(el => {
        if (el.id === data.diaper_id) {
          el = data;
          el.id = data.diaper_id;
        }
        dataFilter.push(el);
      });
      plisting.result = dataFilter;
      dispatch(loadingEnd());
      dispatch({
        type: 'diaper/SET_REFRESH_DATA',
        payload: true,
      });
      return plisting;
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      throw error;
    }
  },
);

const diaperSlice = createSlice({
  name: 'diaper',
  initialState,
  reducers: {
    CLEAR_MSG: state => {
      state.msg = null;
    },
    EDIT_GET_DATA_DIAPER: (state, action) => {
      state.diaperEdit = action.payload;
    },
    EDIT_DIAPER_START: state => {
      state.EditDiaperSuccessful = false;
    },
    EDIT_DIAPER_SUCCESS: (state, action) => {
      state.EditDiaperSuccessful = true;
      state.diaperListing = action.payload;
      state.msg = 'EDIT_DIAPER_SUCCESS';
    },
  },
  extras: builder => {
    builder
      .addCase(handleDiaperCreate.pending, state => {
        state.AddDiaperSuccessful = false;
      })
      .addCase(handleDiaperCreate.fulfilled, (state, action) => {
        state.AddDiaperSuccessful = true;
        state.diaperListing = action.payload;
      })
      .addCase(handleDiaperCreate.rejected, state => {
        state.AddDiaperSuccessful = false;
      })
      .addCase(handleDiaperListing.pending, state => {
        state.DiaperListingSuccessful = true;
      })
      .addCase(handleDiaperListing.fulfilled, (state, action) => {
        state.DiaperListingSuccessful = false;
        state.diaperListing = action.payload;
      })
      .addCase(handleDiaperListing.rejected, state => {
        state.DiaperListingSuccessful = false;
        state.diaperListing = {};
      })
      .addCase(handleDiaperDelete.pending, state => {
        state.DiaperDeleteSuccessful = false;
      })
      .addCase(handleDiaperDelete.fulfilled, (state, action) => {
        state.DiaperDeleteSuccessful = true;
        state.diaperListing = action.payload;
      })
      .addCase(handleDiaperDelete.rejected, state => {
        state.DiaperDeleteSuccessful = false;
      })
      .addCase(handleDiaperEdit.pending, state => {
        state.EditDiaperSuccessful = false;
      })
      .addCase(handleDiaperEdit.fulfilled, (state, action) => {
        state.EditDiaperSuccessful = true;
        state.diaperListing = action.payload;
      })
      .addCase(handleDiaperEdit.rejected, state => {
        state.EditDiaperSuccessful = false;
      });
  },
});

export const {
  CLEAR_MSG,
  EDIT_GET_DATA_DIAPER,
  EDIT_DIAPER_START,
  EDIT_DIAPER_SUCCESS,
} = diaperSlice.actions;

export default diaperSlice.reducer;
