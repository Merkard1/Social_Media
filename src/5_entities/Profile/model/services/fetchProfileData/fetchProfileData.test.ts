import { TestAsyncThunk } from "6_shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Country } from "5_entities/Country";
import { Currency } from "5_entities/Currency";
import fetchProfileData from "./fetchProfileData";

describe("fetchProfileData.test", () => {
  const data = {
    username: "username",
    age: 11,
    country: Country.US,
    lastname: "lastname",
    name: "firstname",
    city: "random city",
    currency: Currency.EUR,
  };

  test("success fetch profile data", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("error fetch with server error", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);

    thunk.api.get.mockReturnValue(
      Promise.resolve({
        response: {
          data: {
            message: "Server responded with an error",
          },
        },
      }),
    );

    const result = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("rejected");
  });

  test("error fetch with no response from server", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);

    thunk.api.get.mockReturnValue(
      Promise.resolve({
        request: {},
      }),
    );

    const result = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("rejected");
  });

  test("error fetch with request setup failure", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);

    thunk.api.get.mockReturnValue(
      Promise.resolve({
        message: "Request failed",
      }),
    );

    const result = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("rejected");
  });

  test("error fetch with empty response data", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);

    thunk.api.get.mockReturnValue(Promise.resolve({ data: null }));

    const result = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("rejected");
  });
});
