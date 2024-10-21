import { StateSchema } from "@/1_app/providers/StoreProvider";

export const getProfileReadOnly = (state: StateSchema) => state.profile?.readOnly;
