import axios from "axios";
import { StateSchema } from "1_app/providers/StoreProvider";
import { Dispatch } from "@reduxjs/toolkit";
import { userActions } from "5_entities/User";
import { TestAsyncThunk } from "6_shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import loginByUsername from "./loginByUserName";

jest.mock("axios");

const mockedAxios = jest.mocked(axios, true);

describe("loginByUsername.test", () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  // test("success", async () => {
  //   const userValue = {
  //     username: "123",
  //     id: "1",
  //   };
  //   mockedAxios.post.mockReturnValue(Promise.resolve({
  //     data: userValue,
  //   }));
  //   const action = loginByUsername({ username: "123", password: "123" });
  //   const result = await action(dispatch, getState, undefined);
  //   console.log(result);
  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   expect(result.meta.requestStatus).toBe("fulfilled");
  //   expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
  //   expect(result.payload).toEqual(userValue);
  // });

  // test("error", async () => {
  //   mockedAxios.post.mockReturnValue(Promise.resolve({
  //     status: 403,
  //   }));
  //   const action = loginByUsername({ username: "123", password: "123" });
  //   const result = await action(dispatch, getState, undefined);
  //   console.log(result);
  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   expect(result.meta.requestStatus).toBe("rejected");
  // });

  test("success", async () => {
    const userValue = {
      username: "123",
      id: "1",
    };
    mockedAxios.post.mockReturnValue(Promise.resolve({
      data: userValue,
    }));

    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ username: "123", password: "123" });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    expect(result.payload).toEqual(userValue);
  });

  test("error", async () => {
    mockedAxios.post.mockReturnValue(Promise.resolve({
      status: 403,
    }));
    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ username: "123", password: "123" });
    console.log(result);
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("rejected");
  });
});
