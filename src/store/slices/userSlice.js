import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Services from '../../services/services';
import {showAPIErrorAlert, showAlert} from '../../utils/native';
import {getStartedSuccess} from './authSlice';
import {loadingStart, loadingEnd} from './commonSlice';

// Initial state
const initialState = {
  isLoading: false,
  babyDelete: false,
  babyDetails: [],
  loadingError: null,
  isBabyLoaded: false,
  babyEdit: {},
  notification: {
    breastfeed: true,
    pump: true,
    bottle: true,
  },
};

// Async thunks
export const getBabyProfile = createAsyncThunk(
  'user/getBabyProfile',
  async (_, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.BabyProfileGet();
      dispatch(babyListingSuccess(response.data.result));
      dispatch(loadingEnd());
    } catch (error) {
      dispatch(babyListingFailed(error));
      dispatch(loadingEnd());
    }
  },
);

export const deleteBabyProfile = createAsyncThunk(
  'user/deleteBabyProfile',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.BabyProfileDelete(data);
      dispatch(deleteBabySuccess(response));
      dispatch(loadingEnd());
    } catch (error) {
      dispatch(deleteBabyFailed(error));
      dispatch(loadingEnd());
    }
  },
);

export const updateProfileData = createAsyncThunk(
  'user/updateProfileData',
  async ({data, navigation}, {dispatch, getState}) => {
    dispatch(loadingStart());
    const state = getState();
    const babyUser = state.user.babyDetails;
    const updateData = [];
    try {
      const response = await Services.updateProfile(data);
      babyUser.filter(el => {
        if (el.id === response.data.result.id) {
          el = response.data.result;
        }
        updateData.push(el);
        return el;
      });
      dispatch(updateProfileSuccess(updateData));
      navigation.goBack();
      dispatch(loadingEnd());
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      dispatch(updateProfileFailed(error));
    }
  },
);

export const createProfiles = createAsyncThunk(
  'user/createProfiles',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      await Services.CreateProfiles(data);
      dispatch(getStartedSuccess(true));
      dispatch(loadingEnd());
    } catch (error) {
      showAPIErrorAlert(error);
      dispatch(loadingEnd());
    }
  },
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      await Services.handleChangePassword(data);
      showAlert('Success', 'Password update successfully.', '', () => {});
      dispatch(loadingEnd());
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
    }
  },
);

export const updateUserNotification = createAsyncThunk(
  'user/updateUserNotification',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      await Services.updateNotification(data);
      showAlert(
        'Success',
        'Notification change updated successfully.',
        '',
        () => {},
      );
      dispatch(loadingEnd());
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
    }
  },
);

export const getUserNotification = createAsyncThunk(
  'user/getUserNotification',
  async (_, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.getNotification();
      dispatch(loadingEnd());
      dispatch(updateUserNotification(response.data.result));
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
    }
  },
);

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    babyListingStart(state) {
      state.isLoading = true;
      state.isBabyLoaded = false;
      state.babyDetails = [];
      state.loadingError = null;
    },
    babyListingSuccess(state, action) {
      state.isLoading = false;
      state.isBabyLoaded = true;
      state.babyDetails = action.payload;
      state.loadingError = null;
    },
    babyListingFailed(state, action) {
      state.isLoading = false;
      state.isBabyLoaded = true;
      state.loadingError = action.payload;
    },
    deleteBabyStart(state) {
      state.babyDelete = true;
    },
    deleteBabySuccess(state) {
      state.babyDelete = false;
    },
    deleteBabyFailed(state) {
      state.babyDelete = false;
    },
    updateProfileStart(state) {
      state.isLoading = true;
    },
    updateProfileSuccess(state, action) {
      const {babyEdit} = state;
      const index = action.payload.findIndex(x => x.id === babyEdit.id);
      if (index > -1) {
        state.babyEdit = {...action.payload[index]};
      }
      state.babyDetails = action.payload;
      state.isLoading = false;
      state.loadingError = null;
    },
    updateProfileFailed(state) {
      state.isLoading = false;
    },
    editGetDataBaby(state, action) {
      state.babyEdit = action.payload;
    },
    updateUserNotification(state, action) {
      const obj = {
        breastfeed: true,
        pump: true,
        bottle: true,
      };
      const {data} = action.payload;
      const breastfeed = data.find(x => x.notification_type === 'breastfeed');
      if (breastfeed) {
        obj.breastfeed = breastfeed.notification === 'on' ? true : false;
      }
      const pump = data.find(x => x.notification_type === 'pump');
      if (pump) {
        obj.pump = pump.notification === 'on' ? true : false;
      }
      const bottle = data.find(x => x.notification_type === 'bottle');
      if (bottle) {
        obj.bottle = bottle.notification === 'on' ? true : false;
      }
      state.notification = obj;
    },
    updateUserListedBabyDetail(state, action) {
      const {babyEdit, babyDetails} = state;
      const {data} = action.payload;
      if (babyEdit.id === data.babyprofile_id) {
        babyEdit.height = data.height;
        babyEdit.weight_lb = data.weight_lb;
        babyEdit.weight_oz = data.weight_oz;
      }
      const index = babyDetails.findIndex(x => x.id === data.babyprofile_id);
      if (index > -1) {
        babyDetails[index].height = data.height;
        babyDetails[index].weight_lb = data.weight_lb;
        babyDetails[index].weight_oz = data.weight_oz;
      }
    },
    resetBabyData(state) {
      Object.assign(state, initialState);
    },
  },
});

// Exporting actions and reducer
export const {
  babyListingStart,
  babyListingSuccess,
  babyListingFailed,
  deleteBabyStart,
  deleteBabySuccess,
  deleteBabyFailed,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailed,
  editGetDataBaby,
  updateUserListedBabyDetail,
  resetBabyData,
} = userSlice.actions;

export default userSlice.reducer;
