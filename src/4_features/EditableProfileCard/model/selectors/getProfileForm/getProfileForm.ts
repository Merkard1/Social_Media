import { StateSchema } from "1_app/providers/StoreProvider";

export const getProfileForm = (state: StateSchema) => state.profile?.form;
