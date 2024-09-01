import { Country } from "5_entities/Country";
import { Currency } from "5_entities/Currency";
import { Age } from "5_entities/Age";
import { validateProfile } from "./validateProfile";
import { ValidateErrors } from "../../types/profile";

describe("validateProfile.test", () => {
  const data = {
    username: "username",
    age: Age.Age21, // Ensure this aligns with the enum type
    country: Country.US,
    lastname: "lastname",
    name: "firstname",
    city: "random city",
    currency: Currency.EUR,
  };

  test("error validation name, lastname", async () => {
    const result = validateProfile({ ...data, name: "", lastname: "" });
    expect(result).toEqual([
      ValidateErrors.PROFILE_NAME,
      ValidateErrors.PROFILE_LASTNAME,
    ]);
  });

  test("error validation city", async () => {
    const result = validateProfile({ ...data, city: "" });
    expect(result).toEqual([
      ValidateErrors.PROFILE_CITY,
    ]);
  });

  test("no errors for valid profile", async () => {
    const result = validateProfile(data);
    expect(result).toEqual([]);
  });

  test("error validation for missing name", async () => {
    const result = validateProfile({ ...data, name: "" });
    expect(result).toEqual([ValidateErrors.PROFILE_NAME]);
  });

  test("error validation for missing lastname", async () => {
    const result = validateProfile({ ...data, lastname: "" });
    expect(result).toEqual([ValidateErrors.PROFILE_LASTNAME]);
  });

  test("error validation for missing age", async () => {
    const result = validateProfile({ ...data, age: undefined });
    expect(result).toEqual([ValidateErrors.PROFILE_AGE]);
  });

  test("error validation for missing profile object", async () => {
    const result = validateProfile(undefined);
    expect(result).toEqual([ValidateErrors.NO_DATA]);
  });
});
