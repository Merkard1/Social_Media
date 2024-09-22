import { Age } from "5_entities/Age";
import { Country } from "5_entities/Country/model/types/Country";
import { Currency } from "5_entities/Currency";

export interface Profile {
  id?: string
  name?: string;
  lastname?: string;
  age?: Age;
  currency?: Currency | string;
  country?: Country | string;
  city?: string;
  username?: string;
  avatar?: string;
}

export enum ValidateErrors {
  PROFILE_NAME = "Incorrect first name",
  PROFILE_LASTNAME = "Incorrect lastname",
  PROFILE_AGE = "Incorrect age",
  PROFILE_USERNAME = "Incorrect username",
  PROFILE_CITY = "Incorrect city",
  NO_DATA = "No data",
  SERVER_ERROR = "Something went wrong"
}

export interface ProfileSchema {
  data?: Profile,
  form?: Profile
  isLoading: boolean,
  error?: string | undefined,
  readOnly: boolean,
  validateErrors?: ValidateErrors[]
}
