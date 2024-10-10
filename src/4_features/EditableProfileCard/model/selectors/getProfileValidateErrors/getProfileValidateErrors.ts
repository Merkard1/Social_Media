import { StateSchema } from "1_app/providers/StoreProvider";

export const getProfileValidateErrors = (state: StateSchema) => state.profile?.validateErrors;
