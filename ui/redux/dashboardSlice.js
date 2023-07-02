// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    DietBarUser: {
      userId: '',
      userInfo: []
    },
    

  },
  reducers: {
    handleUserInfo(state, action){
      state.DietBarUser.userInfo = action.payload
    },
    handleUserId(state, action){
      state.DietBarUser.userId = action.payload
    }
  },
});

export const dashboardReducer = dashboardSlice.reducer;
export const {
  handleUserInfo,
  handleUserId
} = dashboardSlice.actions;