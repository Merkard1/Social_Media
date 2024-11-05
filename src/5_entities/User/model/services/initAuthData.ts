import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { USER_LOCALSTORAGE_KEY } from "@/6_shared/const/localstorage";

import { getUserDataByIdQuery } from "../../api/userApi";
import { User } from "../types/user";

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  "user/initAuthData",
  async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    if (!userId) {
      return rejectWithValue("");
    }

    try {
      const response = await dispatch(
        getUserDataByIdQuery(userId),
      ).unwrap();

      return response;
    } catch (e) {
      console.log(e);
      return rejectWithValue("");
    }
  },
);
