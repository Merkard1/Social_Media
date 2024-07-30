import { StateSchema } from "1_app/providers/StoreProvider";

export const getCounter = (state: StateSchema) => state.counter;
