import { StateSchema } from "@/1_app/providers/StoreProvider";

export const getLoginIsLoading = (state: StateSchema) => state?.loginForm?.isLoading || false;
