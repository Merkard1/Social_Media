import { StateSchema } from "1_app/providers/StoreProvider";

export const getProfileData = (state: StateSchema) => state.profile?.data;
