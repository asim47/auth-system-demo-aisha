import { createSlice } from '@reduxjs/toolkit';
import { UserStore } from '../../interfaces';

const initialState: UserStore = {
  isAuth: false,
  userData: null,
  token: null,
  adminsUsers: [],
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserDataAndToken(state, action) {
      state.isAuth = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;

      localStorage.setItem('@Token', action.payload.token);
    },
    logoutUser(state) {
      state.isAuth = false;
      state.userData = null;
      state.token = null;
      localStorage.removeItem('@Token');
    },
    setAdminUsers(state, action) {
      state.adminsUsers = action.payload;
    },
  },
});

export const { setUserDataAndToken, logoutUser, setAdminUsers } = UserSlice.actions;

export const UserReducer = UserSlice.reducer;
