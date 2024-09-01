import { ThunkConfig } from "1_app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Profile } from "../../types/profile";

const fetchProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig <{message: string}>
  >("profile/fetchProfileData", async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      const response = await extra.api.get<Profile>("/profile");

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server responded with an error";
        } else if (error.request) {
          errorMessage = "No response received from server";
        } else {
          errorMessage = error.message;
        }
      }

      return rejectWithValue({ message: errorMessage });
    }
  });

export default fetchProfileData;
