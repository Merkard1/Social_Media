import { StateSchema } from "@/1_app/providers/StoreProvider";

import { ArticleOrder, ArticleSortField, ArticleType, ArticleView } from "@/5_entities/Article";

export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading || false;
export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error;
export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view || ArticleView.SMALL;
export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page || 1;
export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit || 9;
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
export const getArticlesPageInited = (state: StateSchema) => state.articlesPage?._inited;
export const getArticlesPageSort = (state: StateSchema) => state.articlesPage?.sort ?? ArticleSortField.CREATED;
export const getArticlesPageOrder = (state: StateSchema) => state.articlesPage?.order ?? ArticleOrder.ASC;
export const getArticlesPageSearch = (state: StateSchema) => state.articlesPage?.search ?? "";
export const getArticlesPageType = (state: StateSchema) => state.articlesPage?.type ?? ArticleType.ALL;
