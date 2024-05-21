import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'Dashboard',
  trackActiveTab: 'Breastfeed',
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setTrackActiveTab: (state, action) => {
      state.trackActiveTab = action.payload;
    },
  },
});

export const {setActiveTab, setTrackActiveTab} = tabSlice.actions;

export default tabSlice.reducer;
