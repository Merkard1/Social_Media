import { StateSchema } from "@/1_app/providers/StoreProvider";

export const getArticleDetailsData = (state: StateSchema) => state.articleDetails?.data;
export const getArticleDetailsIsLoading = (state: StateSchema) => state.articleDetails?.isLoading || false;
export const getArticleDetailsError = (state: StateSchema) => state.articleDetails?.error;
