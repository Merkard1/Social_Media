import { StateSchema } from "1_app/providers/StoreProvider";
import { Country } from "5_entities/Country";
import { Currency } from "5_entities/Currency";
import { getProfileIsLoading } from "./getProfileIsLoading";

describe("getProfileIsLoading.test", () => {
  test("should return true", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: true,
      },
    };
    expect(getProfileIsLoading(state as StateSchema)).toEqual(true);
  });
  test("should return undefiened", () => {
    const state: DeepPartial<StateSchema> = {
    };
    expect(getProfileIsLoading(state as StateSchema)).toEqual(undefined);
  });
});
