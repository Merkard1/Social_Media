import { StateSchema } from "1_app/providers/StoreProvider";

export const getLoginPassword = (state: StateSchema) => state?.loginForm?.password || "";
