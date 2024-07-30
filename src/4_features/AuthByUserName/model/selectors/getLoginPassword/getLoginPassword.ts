import { StateSchema } from "1_app/providers/StoreProvider";

export const getLoginPassword = (state: StateSchema) => {
  return state?.loginForm?.password || "";
};
