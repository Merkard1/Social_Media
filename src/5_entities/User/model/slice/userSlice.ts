/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { USER_LOCALSTORAGE_KEY } from "@/6_shared/const/localstorage";
import { setFeatureFlags } from "@/6_shared/lib/features";
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
      setFeatureFlags(action.payload.features);
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (user) {
        const json = JSON.parse(user) as User;
        state.authData = json;
        setFeatureFlags(json.features);
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
