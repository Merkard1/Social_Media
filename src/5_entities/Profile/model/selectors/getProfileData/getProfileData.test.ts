import { StateSchema } from "1_app/providers/StoreProvider";
import { Country } from "5_entities/Country";
import { Currency } from "5_entities/Currency";
import { Age } from "5_entities/Age";
import { getProfileData } from "./getProfileData";

describe("getProfileData.test", () => {
  test("should return error", () => {
    const data = {
      username: "username",
      age: Age.Age20,
      country: Country.US,
      lastname: "lastname",
      name: "firstname",
      city: "random city",
      currency: Currency.EUR,
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
  test("should return undefiened", () => {
    const state: DeepPartial<StateSchema> = {
    };
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
