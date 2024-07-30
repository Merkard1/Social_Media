import { User, userActions } from "5_entities/User";
import { USER_LOCALSTORAGE_KEY } from "6_shared/const/localstorage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginByUserName {
  username: string;
  password: string;
}

const loginByUsername = createAsyncThunk<
  User,
  LoginByUserName,
  { rejectValue: { message: string } }
>("login/loginByUsername", async (authData, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:8000/login", authData);
    if (!response.data) {
      throw new Error("No response data");
    }
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
    thunkAPI.dispatch(userActions.setAuthData(response.data));

    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage =
          error.response.data.message || "Server responded with an error";
      } else if (error.request) {
        errorMessage = "No response received from server";
      } else {
        errorMessage = error.message;
      }
    }

    console.error(errorMessage);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export default loginByUsername;
