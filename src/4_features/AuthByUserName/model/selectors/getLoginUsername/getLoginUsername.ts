import { StateSchema } from "1_app/providers/StoreProvider";

export const getLoginUsername = (state: StateSchema) => {
  return state?.loginForm?.username || "";
};
