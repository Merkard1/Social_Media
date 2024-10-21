import { StateSchema } from "@/1_app/providers/StoreProvider";

export const getLoginUsername = (state: StateSchema) => state?.loginForm?.username || "";
