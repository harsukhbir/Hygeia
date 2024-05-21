import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loadingEnd, loadingStart} from './commonSlice';
import Services from '../../services/services';
import {showAPIErrorAlert} from '../../utils/native';

const initialState = {
  AddpumpSuccessful: false,
  pumpListing: {},
  PumpListingSuccessful: false,
  PumpDeleteSuccessful: false,
  EditPumpSuccessful: false,
  pumpEdit: {},
  msg: null,
};

export const handlePumpCreate = createAsyncThunk(
  'pump/handlePumpCreate',
  async (data, {dispatch, getState}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.handlePumpCreate(data);
      const state = getState();
      let plisting = {...state.pump.pumpListing};
      plisting.result.push(response.data.result);
      dispatch(loadingEnd());
      dispatch({
        type: 'SET_REFRESH_DATA',
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

export const handlePumpListing = createAsyncThunk(
  'pump/handlePumpListing',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.handlePumpListing(data);
      dispatch(loadingEnd());
      return response.data;
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      throw error;
    }
  },
);

export const handlePumpDelete = createAsyncThunk(
  'pump/handlePumpDelete',
  async (data, {dispatch, getState}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.handlePumpDelete(data);
      const state = getState();
      let plisting = {...state.pump.pumpListing};
      const dataFilter = plisting.result.filter(el => el.id !== data.pump_id);
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

export const handlePumpEdit = createAsyncThunk(
  'pump/handlePumpEdit',
  async (data, {dispatch, getState}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.handlePumpEdit(data);
      const state = getState();
      let plisting = {...state.pump.pumpListing};
      const dataFilter = plisting.result.map(el => {
        if (el.id === data.pump_id) {
          el = data;
          el.id = data.pump_id;
        }
        return el;
      });
      plisting.result = dataFilter;
      dispatch(loadingEnd());
      dispatch({
        type: 'SET_REFRESH_DATA',
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

const pumpSlice = createSlice({
  name: 'pump',
  initialState,
  reducers: {
    CLEAR_MSG: state => {
      state.msg = null;
    },
    EDIT_GET_DATA_PUMP: (state, action) => {
      state.pumpEdit = action.payload;
    },
    EDIT_PUMP_START: state => {
      state.EditPumpSuccessful = false;
    },
    EDIT_PUMP_SUCCESS: (state, action) => {
      state.EditPumpSuccessful = true;
      state.pumpListing = action.payload;
      state.msg = 'EDIT_PUMP_SUCCESS';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handlePumpCreate.pending, state => {
        state.AddpumpSuccessful = false;
      })
      .addCase(handlePumpCreate.fulfilled, (state, action) => {
        state.AddpumpSuccessful = true;
        state.pumpListing = action.payload;
      })
      .addCase(handlePumpCreate.rejected, state => {
        state.AddpumpSuccessful = false;
      })
      .addCase(handlePumpListing.pending, state => {
        state.PumpListingSuccessful = true;
      })
      .addCase(handlePumpListing.fulfilled, (state, action) => {
        state.PumpListingSuccessful = false;
        state.pumpListing = action.payload;
      })
      .addCase(handlePumpListing.rejected, state => {
        state.PumpListingSuccessful = false;
        state.pumpListing = {};
      })
      .addCase(handlePumpDelete.pending, state => {
        state.PumpDeleteSuccessful = false;
      })
      .addCase(handlePumpDelete.fulfilled, (state, action) => {
        state.PumpDeleteSuccessful = true;
        state.pumpListing = action.payload;
      })
      .addCase(handlePumpDelete.rejected, state => {
        state.PumpDeleteSuccessful = false;
      })
      .addCase(handlePumpEdit.pending, state => {
        state.EditPumpSuccessful = false;
      })
      .addCase(handlePumpEdit.fulfilled, (state, action) => {
        state.EditPumpSuccessful = true;
        state.pumpListing = action.payload;
      })
      .addCase(handlePumpEdit.rejected, state => {
        state.EditPumpSuccessful = false;
      });
  },
});

export const {
  CLEAR_MSG,
  EDIT_GET_DATA_PUMP,
  EDIT_PUMP_START,
  EDIT_PUMP_SUCCESS,
} = pumpSlice.actions;

export default pumpSlice.reducer;
