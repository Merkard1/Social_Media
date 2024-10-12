import { TestAsyncThunk } from "6_shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Country } from "5_entities/Country";
import { Currency } from "5_entities/Currency";
import { fetchProfileData } from "./fetchProfileData";

const data = {
  username: "admin",
  age: 19,
  country: Country.AF,
  lastname: "ulbi tv",
  name: "asd",
  city: "asf",
  currency: Currency.USD,
};

describe("fetchProfileData.test", () => {
  test("success", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk("1");

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("error login", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk("1");

    expect(result.meta.requestStatus).toBe("rejected");
  });
});
