import { StateSchema } from "1_app/providers/StoreProvider";
import { Country } from "5_entities/Country";
import { Currency } from "5_entities/Currency";
import { getProfileReadOnly } from "./getProfileReadOnly";

describe("getProfileReadOnly.test", () => {
  test("should return readonly", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readOnly: true,
      },
    };
    expect(getProfileReadOnly(state as StateSchema)).toEqual(true);
  });
  test("should return undefiened", () => {
    const state: DeepPartial<StateSchema> = {
    };
    expect(getProfileReadOnly(state as StateSchema)).toEqual(undefined);
  });
});
