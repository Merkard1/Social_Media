import { StateSchema } from "@/1_app/providers/StoreProvider";

export const getLoginError = (state: StateSchema) => state?.loginForm?.error;
