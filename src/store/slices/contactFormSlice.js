import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loadingEnd, loadingStart} from './commonSlice';
import Services from '../../services/services';
import {showAPIErrorAlert} from '../../utils/native';

const initialState = {
  isProductFormSuccessful: false,
  isTechFormSuccessful: false,
  loading: false,
};

export const handleProductForm = createAsyncThunk(
  'contactForm/handleProductForm',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.handleProductForm(data);
      dispatch(loadingEnd());
      return response.data;
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      throw error;
    }
  },
);

export const handleTechForm = createAsyncThunk(
  'contactForm/handleTechForm',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.handleTechForm(data);
      dispatch(loadingEnd());
      return response.data;
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      throw error;
    }
  },
);

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(handleProductForm.fulfilled, state => {
        state.isProductFormSuccessful = true;
        state.loading = false;
      })
      .addCase(handleTechForm.fulfilled, state => {
        state.isTechFormSuccessful = true;
        state.loading = false;
      })
      .addCase(handleProductForm.pending, state => {
        state.loading = true;
      })
      .addCase(handleProductForm.rejected, state => {
        state.loading = false;
      })
      .addCase(handleTechForm.pending, state => {
        state.loading = true;
      })
      .addCase(handleTechForm.rejected, state => {
        state.loading = false;
      });
  },
});

export default contactFormSlice.reducer;
