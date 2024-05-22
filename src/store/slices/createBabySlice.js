import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loadingEnd, loadingStart} from './commonSlice';
import Services from '../../services/services';
import {showAPIErrorAlert} from '../../utils/native';
import {updateProfileSucess} from './userSlice';

const initialState = {
  isLoading: false,
  babyDetails: [],
  loadingError: null,
  babyEdit: {},
};

export const createProfile = createAsyncThunk(
  'createBaby/createProfile',
  async (data, {dispatch, getState}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.CreateProfiles(data);
      const babyUser = getState().user.babyDetails;
      const updateData = [...babyUser, response.data.result.profiles];
      dispatch(updateProfileSucess(updateData));
      dispatch(loadingEnd());
      return response.data;
    } catch (error) {
      showAPIErrorAlert(error);
      dispatch(loadingEnd());
      throw error;
    }
  },
);

const createBabySlice = createSlice({
  name: 'createBaby',
  initialState,
  reducers: {},
  extras: builder => {
    builder
      .addCase(createProfile.pending, state => {
        state.isLoading = true;
        state.loadingError = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.babyDetails.push(action.payload.result.profiles);
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.loadingError = action.error.message;
      });
  },
});

export default createBabySlice.reducer;
