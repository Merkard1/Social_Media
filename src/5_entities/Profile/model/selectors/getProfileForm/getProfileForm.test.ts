import { StateSchema } from "1_app/providers/StoreProvider";
import { Country } from "5_entities/Country";
import { Currency } from "5_entities/Currency";
import { Age } from "5_entities/Age";
import { getProfileForm } from "./getProfileForm";

describe("getProfileForm.test", () => {
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
        form: data,
      },
    };
    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });
  test("should return undefiened", () => {
    const state: DeepPartial<StateSchema> = {
    };
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
