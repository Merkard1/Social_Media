import { StateSchema } from "@/1_app/providers/StoreProvider";

export const getArticleCommentsIsLoading = (state: StateSchema) => state.articleDetailsPage?.comments?.isLoading;

export const getArticleCommentsError = (state: StateSchema) => state.articleDetailsPage?.comments?.error;
