/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginSchema } from "../types/loginSchema";
import loginByUsername from "../services/loginByUsername/loginByUserName";

const initialState: LoginSchema = {
  isLoading: false,
  username: "",
  password: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: {
    [loginByUsername.pending.type]: (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    },
    [loginByUsername.fulfilled.type]: (state, action) => {
      state.error = undefined;
      state.isLoading = false;
    },
    [loginByUsername.rejected.type]: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
