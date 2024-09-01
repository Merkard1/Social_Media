import { Age } from "5_entities/Age";
import { Profile, ValidateErrors } from "../../types/profile";

export const validateProfile = (profile?: Profile) => {
  if (!profile) {
    return [ValidateErrors.NO_DATA];
  }

  const { name, lastname, age, city } = profile;

  const errors: ValidateErrors[] = [];

  if (!name) {
    errors.push(ValidateErrors.PROFILE_NAME);
  }

  if (!lastname) {
    errors.push(ValidateErrors.PROFILE_LASTNAME);
  }

  if (age === undefined || !(Object.values(Age).includes(age as Age))) {
    errors.push(ValidateErrors.PROFILE_AGE);
  }

  if (!city) {
    errors.push(ValidateErrors.PROFILE_CITY);
  }

  return errors;
};
