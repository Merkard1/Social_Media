import { ThunkConfig } from "1_app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Profile, ValidateErrors } from "../../types/profile";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";

const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig <ValidateErrors[]>
  >("profile/updateProfileData", async (_, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;

    const formData = getProfileForm(getState());

    try {
      const response = await extra.api.put<Profile>("/profile", formData);

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
      return rejectWithValue([ValidateErrors.SERVER_ERROR]);
    }
  });

export default updateProfileData;
