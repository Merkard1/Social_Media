/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile, ProfileSchema } from "../types/profile";
import fetchProfileData from "../services/fetchProfileData/fetchProfileData";
import updateProfileData from "../services/updateProfileData/updateProfileData";

const initialState: ProfileSchema = {
  readOnly: true,
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setReadOnly: (state, action: PayloadAction<boolean>) => {
      state.readOnly = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    cancelEdit: (state) => {
      state.readOnly = true;
      state.form = state.data;
    },
  },
  extraReducers: {
    [fetchProfileData.pending.type]: (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    },
    [fetchProfileData.fulfilled.type]: (state, action: PayloadAction<Profile>) => {
      state.error = undefined;
      state.data = action.payload;
      state.form = action.payload;
      state.isLoading = false;
    },
    [fetchProfileData.rejected.type]: (state, action) => {
      state.validateErrors = action.payload.error;
      state.isLoading = false;
    },
    [updateProfileData.pending.type]: (state, action) => {
      state.validateErrors = undefined;
      state.isLoading = true;
      state.readOnly = true;
    },
    [updateProfileData.fulfilled.type]: (state, action: PayloadAction<Profile>) => {
      state.data = action.payload;
      state.form = action.payload;
      state.isLoading = false;
    },
    [updateProfileData.rejected.type]: (state, action) => {
      state.validateErrors = action.payload.error;
      state.isLoading = false;
    },
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
