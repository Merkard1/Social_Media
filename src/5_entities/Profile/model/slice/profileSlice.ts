/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile, ProfileSchema } from "../types/profile";
import fetchProfileData from "../services/fetchProfileData/fetchProfileData";

const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  error: null,
  data: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchProfileData.pending.type]: (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    },
    [fetchProfileData.fulfilled.type]: (state, action: PayloadAction<Profile>) => {
      state.error = undefined;
      state.data = action.payload;
      state.isLoading = false;
    },
    [fetchProfileData.rejected.type]: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
