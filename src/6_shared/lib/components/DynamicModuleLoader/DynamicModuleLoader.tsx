import { ReduxStoreWithManager } from "1_app/providers/StoreProvider";
import { StateSchemaKey } from "1_app/providers/StoreProvider/config/StateSchema";
import { Reducer } from "@reduxjs/toolkit";
import { FC, ReactNode, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

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
    // Cast the entries to the correct type
    (Object.entries(reducers) as [StateSchemaKey, Reducer][]).forEach(
      ([name, reducer]) => {
        if (reducer) {
          store.reducerManager.add(name, reducer);
          dispatch({ type: `@INIT ${name} reducer` });
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
