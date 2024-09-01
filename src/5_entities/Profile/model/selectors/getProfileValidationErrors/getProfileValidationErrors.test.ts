import { StateSchema } from "1_app/providers/StoreProvider";
import { getProfileValidationErrors } from "./getProfileValidationErrors";
import { ValidateErrors } from "../../types/profile";

describe("getProfileValidationErrors.test", () => {
  test("should return error", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [
          ValidateErrors.NO_DATA,
        ],
      },
    };
    expect(getProfileValidationErrors(state as StateSchema)).toEqual([ValidateErrors.NO_DATA]);
  });

  test("should return _", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [
        ],
      },
    };
    expect(getProfileValidationErrors(state as StateSchema)).toEqual([]);
  });

  test("should return undefiened", () => {
    const state: DeepPartial<StateSchema> = {
    };
    expect(getProfileValidationErrors(state as StateSchema)).toEqual(undefined);
  });
});
