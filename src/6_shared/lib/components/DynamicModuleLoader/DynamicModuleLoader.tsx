import { Reducer } from "@reduxjs/toolkit";
import { FC, ReactNode, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { StateSchemaKey } from "@/1_app/providers/StoreProvider/config/StateSchema";
import { ReduxStoreWithManager } from "@/1_app/providers/StoreProvider";

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  children: ReactNode;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const { children, reducers, removeAfterUnmount = true } = props;
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();
    (Object.entries(reducers) as [StateSchemaKey, Reducer][]).forEach(
      ([name, reducer]) => {
        if (reducer) {
          const mounted = mountedReducers[name as StateSchemaKey];
          if (!mounted) {
            store.reducerManager.add(name, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
          }
        }
      },
    );

    return () => {
      if (removeAfterUnmount) {
        (Object.entries(reducers) as [StateSchemaKey, Reducer][]).forEach(
          ([name, reducer]) => {
            store.reducerManager.remove(name);
            dispatch({ type: `@DESTROY ${name} reducer` });
          },
        );
      }
    };
  }, [reducers, removeAfterUnmount, store, dispatch]);

  return <>{children}</>;
};
