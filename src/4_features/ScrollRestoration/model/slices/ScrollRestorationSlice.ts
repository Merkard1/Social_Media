/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScrollRestoration } from "../types/ScrollRestoration";

const initialState: ScrollRestoration = {
  scroll: {},
};

const scrollRestorationSlice = createSlice({
  name: "scrollRestoration",
  initialState,
  reducers: {
    setScrollPosition(state, { payload }: PayloadAction<{path: string, position: number}>) {
      state.scroll[payload.path] = payload.position;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loginByUsername.pending, (state) => {
  //       state.error = undefined;
  //       state.isLoading = true;
  //     })
  //     .addCase(loginByUsername.fulfilled, (state) => {
  //       state.error = undefined;
  //       state.isLoading = false;
  //     })
  //     .addCase(loginByUsername.rejected, (state, action) => {
  //       state.error = typeof action.payload === "object" && action.payload?.message
  //         ? action.payload.message
  //         : "Unknown Error";
  //       state.isLoading = false;
  //     });
  // },
});

export const { actions: scrollRestorationActions } = scrollRestorationSlice;
export const { reducer: scrollRestorationReducer } = scrollRestorationSlice;
