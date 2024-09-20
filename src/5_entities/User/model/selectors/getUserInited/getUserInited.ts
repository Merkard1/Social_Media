import { StateSchema } from "1_app/providers/StoreProvider";

export const getUserInited = (state: StateSchema) => state.user._inited;
