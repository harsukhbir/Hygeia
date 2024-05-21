import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loadingEnd, loadingStart} from './commonSlice';
import Services from '../../services/services';
import {showAPIErrorAlert} from '../../utils/native';

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

export const getBadyProfile = createAsyncThunk(
  'user/getBadyProfile',
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

export const deleteBadyProfile = createAsyncThunk(
  'user/deleteBadyProfile',
  async (data, {dispatch}) => {
    dispatch(loadingStart());
    try {
      const response = await Services.BabyProfileDelete(data);
      dispatch(deleteBabySucess(response));
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
      dispatch(updateProfileSucess(updateData));
      navigation.goBack();
      dispatch(loadingEnd());
    } catch (error) {
      dispatch(loadingEnd());
      showAPIErrorAlert(error);
      dispatch(updateProfileFailed(error));
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
    deleteBabySucess(state) {
      state.babyDelete = false;
    },
    deleteBabyFailed(state) {
      state.babyDelete = false;
    },
    updateProfileSucess(state, action) {
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
    EditGetDataBaby(state, action) {
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

export const {
  babyListingSuccess,
  babyListingFailed,
  deleteBabySucess,
  deleteBabyFailed,
  updateProfileSucess,
  updateProfileFailed,
  EditGetDataBaby,
  updateUserNotification,
  updateUserListedBabyDetail,
  resetBabyData,
} = userSlice.actions;

export default userSlice.reducer;
