import { TestAsyncThunk } from "6_shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Country } from "5_entities/Country";
import { Currency } from "5_entities/Currency";
import { Age } from "5_entities/Age";
import updateProfileData from "./updateProfileData";
import { ValidateErrors } from "../../types/profile";

describe("updateProfileData.test", () => {
  const data = {
    username: "username",
    age: Age.Age20,
    country: Country.US,
    lastname: "lastname",
    name: "firstname",
    city: "random city",
    currency: Currency.EUR,
  };

  test("update profile data", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("error updating profile data with server error", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    });

    thunk.api.put.mockReturnValue(
      Promise.resolve({
        response: {
          data: {
            message: "Server responded with an error",
          },
        },
      }),
    );

    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toEqual([ValidateErrors.SERVER_ERROR]);
  });

  test("error updating profile data with no response from server", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    });

    thunk.api.put.mockReturnValue(
      Promise.resolve({
        request: {},
      }),
    );

    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toEqual([ValidateErrors.SERVER_ERROR]);
  });

  test("error updating profile data with request setup failure", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    });

    thunk.api.put.mockReturnValue(
      Promise.resolve({
        message: "Request failed",
      }),
    );

    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toEqual([ValidateErrors.SERVER_ERROR]);
  });

  test("error updating profile data with empty response data", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    });

    thunk.api.put.mockReturnValue(Promise.resolve({ data: null }));

    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toEqual([ValidateErrors.SERVER_ERROR]);
  });
});
