import { getProfileReadOnly } from "./getProfileReadOnly";

import { StateSchema } from "@/1_app/providers/StoreProvider";

describe("getProfileReadOnly.test", () => {
  test("should work with filled state", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readOnly: true,
      },
    };
    expect(getProfileReadOnly(state as StateSchema)).toEqual(true);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileReadOnly(state as StateSchema)).toEqual(undefined);
  });
});
