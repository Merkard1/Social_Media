import { StateSchema } from "1_app/providers/StoreProvider";
import { Country } from "5_entities/Country";
import { Currency } from "5_entities/Currency";
import { getProfileError } from "./getProfileError";

describe("getProfileError.test", () => {
  test("should return error", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        error: "123",
      },
    };
    expect(getProfileError(state as StateSchema)).toEqual("123");
  });
  test("should return undefiened", () => {
    const state: DeepPartial<StateSchema> = {
    };
    expect(getProfileError(state as StateSchema)).toEqual(undefined);
  });
});
