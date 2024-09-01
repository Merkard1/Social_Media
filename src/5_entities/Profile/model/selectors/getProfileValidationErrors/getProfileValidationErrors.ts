import { StateSchema } from "1_app/providers/StoreProvider";

export const getProfileValidationErrors = (state: StateSchema) => state.profile?.validateErrors;
