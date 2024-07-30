import { StateSchema } from "1_app/providers/StoreProvider";

export const getLoginError = (state: StateSchema) => {
  return state?.loginForm?.error;
};
