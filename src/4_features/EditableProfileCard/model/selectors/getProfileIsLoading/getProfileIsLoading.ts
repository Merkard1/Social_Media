import { StateSchema } from "@/1_app/providers/StoreProvider";

export const getProfileIsLoading = (state: StateSchema) => state.profile?.isLoading;
