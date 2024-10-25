/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/6_shared/lib/store/buildSlice";

import { ScrollRestoration } from "../types/ScrollRestoration";

const initialState: ScrollRestoration = {
  scroll: {},
};

const scrollRestorationSlice = buildSlice({
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

export const {
  actions: scrollRestorationActions,
  reducer: scrollRestorationReducer,
  useActions: useScrollRestoration } = scrollRestorationSlice;
