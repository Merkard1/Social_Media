import { Country } from "5_entities/Country";
import { Currency } from "5_entities/Currency";
import { Age } from "5_entities/Age";
import { ProfileSchema, Profile } from "../types/profile";
import { profileActions, profileReducer } from "./profileSlice";
import updateProfileData from "../services/updateProfileData/updateProfileData";
import fetchProfileData from "../services/fetchProfileData/fetchProfileData";

describe("profileSlice.test", () => {
  const mockProfile: Profile = {
    username: "username",
    age: Age.Age20,
    country: Country.US,
    lastname: "lastname",
    name: "firstname",
    city: "random city",
    currency: Currency.EUR,
  };

  test("test setReadOnly true -> false", () => {
    const state: DeepPartial<ProfileSchema> = { readOnly: true };
    expect(profileReducer(
      state as ProfileSchema,
      profileActions.setReadOnly(false),
    )).toEqual({ readOnly: false });
  });

  test("test setReadOnly false -> true", () => {
    const state: DeepPartial<ProfileSchema> = { readOnly: false };
    expect(profileReducer(
      state as ProfileSchema,
      profileActions.setReadOnly(true),
    )).toEqual({ readOnly: true });
  });

  test("test updateProfile", () => {
    const state: DeepPartial<ProfileSchema> = { form: { name: "oldName" } };
    expect(profileReducer(
      state as ProfileSchema,
      profileActions.updateProfile({ name: "newName" }),
    )).toEqual({
      form: { name: "newName" },
    });
  });

  test("test cancelEdit", () => {
    const state: DeepPartial<ProfileSchema> = { data: mockProfile, form: { username: "differentUsername" } };
    expect(profileReducer(
      state as ProfileSchema,
      profileActions.cancelEdit(),
    )).toEqual({ readOnly: true, data: mockProfile, form: mockProfile });
  });

  test("test fetchProfileData.pending", () => {
    const state: DeepPartial<ProfileSchema> = {};
    expect(profileReducer(
      state as ProfileSchema,
      { type: fetchProfileData.pending.type },
    )).toEqual({
      isLoading: true,
      error: undefined,
    });
  });

  test("test fetchProfileData.fulfilled", () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: true };
    expect(profileReducer(
      state as ProfileSchema,
      {
        type: fetchProfileData.fulfilled.type,
        payload: mockProfile,
      },
    )).toEqual({
      isLoading: false,
      error: undefined,
      data: mockProfile,
      form: mockProfile,
    });
  });

  test("test fetchProfileData.rejected", () => {
    const error = "Some error";
    const state: DeepPartial<ProfileSchema> = { isLoading: true };
    expect(profileReducer(
      state as ProfileSchema,
      {
        type: fetchProfileData.rejected.type,
        payload: { error },
      },
    )).toEqual({
      isLoading: false,
      validateErrors: error,
    });
  });

  test("test updateProfileData.pending", () => {
    const state: DeepPartial<ProfileSchema> = { readOnly: false };
    expect(profileReducer(
      state as ProfileSchema,
      { type: updateProfileData.pending.type },
    )).toEqual({
      validateErrors: undefined,
      isLoading: true,
      readOnly: true,
    });
  });

  test("test updateProfileData.fulfilled", () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: true };
    expect(profileReducer(
      state as ProfileSchema,
      {
        type: updateProfileData.fulfilled.type,
        payload: mockProfile,
      },
    )).toEqual({
      isLoading: false,
      data: mockProfile,
      form: mockProfile,
    });
  });

  test("test updateProfileData.rejected", () => {
    const error = "Validation Error";
    const state: DeepPartial<ProfileSchema> = { isLoading: true };
    expect(profileReducer(
      state as ProfileSchema,
      {
        type: updateProfileData.rejected.type,
        payload: { error },
      },
    )).toEqual({
      isLoading: false,
      validateErrors: error,
    });
  });
});
