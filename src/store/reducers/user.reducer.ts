import { createSlice } from '@reduxjs/toolkit';
import { UserStore } from '../../interfaces';

const initialState: UserStore = {
  isAuth: false,
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserData(state, action) {
      state.isAuth = true;
    },
  },
});

export const { setUserData } = UserSlice.actions;

export const UserReducer = UserSlice.reducer;
