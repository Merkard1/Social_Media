import {
  configureStore,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { userReducer } from "5_entities/User";
import { $api } from "6_shared/api/api";
import { NavigateOptions, To } from "react-router-dom";
import { StateSchema, ThunkExtraArg } from "./StateSchema";
import { createReducerManager } from "./reducerManager";

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    api: $api,
  };

  const store = configureStore({
    // @ts-ignore
    reducer: reducerManager.reduce as ReducersMapObject<StateSchema>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
    }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type RootState = ReturnType<typeof createReduxStore>;

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
