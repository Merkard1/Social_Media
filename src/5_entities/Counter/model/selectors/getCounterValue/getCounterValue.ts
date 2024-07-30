import { StateSchema } from "1_app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";
import { getCounter } from "../getCounter/getCounter";

export const getCounterValue = createSelector(
  getCounter,
  (counter) => counter.value,
);
