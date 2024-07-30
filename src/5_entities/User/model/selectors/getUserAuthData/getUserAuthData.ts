import { StateSchema } from "1_app/providers/StoreProvider";

export const getUserAuthData = (state: StateSchema) => {
  return state.user.authData;
};
