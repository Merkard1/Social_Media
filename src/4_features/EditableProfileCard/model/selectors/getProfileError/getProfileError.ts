import { StateSchema } from "1_app/providers/StoreProvider";

export const getProfileError = (state: StateSchema) => state.profile?.error;
