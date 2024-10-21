import { Story } from "@storybook/react";
import { ReducersMapObject } from "@reduxjs/toolkit";

import { StateSchema, StoreProvider } from "@/1_app/providers/StoreProvider";
import { loginReducer } from "@/4_features/AuthByUserName/model/slice/loginSlice";
import { profileReducer } from "@/4_features/EditableProfileCard/model/slice/profileSlice";
import { ReducersList } from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { addCommentFormReducer } from "@/4_features/addCommentForm/model/slices/addCommentFormSlice";
import { articleDetailsReducer } from "@/5_entities/Article/model/slice/articleDetailsSlice";

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) =>
  (StoryComponent: Story) =>
    (
      <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
      </StoreProvider>
    );
