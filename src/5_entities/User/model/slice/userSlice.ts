/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { USER_LOCALSTORAGE_KEY } from "@/6_shared/const/localstorage";
import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import { User, UserSchema } from "../types/user";

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = buildSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (user) {
        state.authData = JSON.parse(user);
      }
      state._inited = true;
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
      state._inited = false;
    },
  },
});

export const {
  actions: userActions,
  reducer: userReducer,
  useActions: useUser } = userSlice;
