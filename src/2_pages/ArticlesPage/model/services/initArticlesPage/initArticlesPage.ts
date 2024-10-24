import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { ArticleOrder, ArticleSortField } from "@/5_entities/Article";

import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/ArticlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
    >(
      "articlesPage/initArticlesPage",
      async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const inited = getArticlesPageInited(getState());

        if (!inited) {
          const orderFromUrl = searchParams.get("order") as ArticleOrder;
          const sortFromUrl = searchParams.get("sort") as ArticleSortField;
          const searchFromUrl = searchParams.get("search");

          if (orderFromUrl) {
            dispatch(articlesPageActions.setOrder(orderFromUrl));
          }

          if (sortFromUrl) {
            dispatch(articlesPageActions.setSort(sortFromUrl));
          }

          if (searchFromUrl) {
            dispatch(articlesPageActions.setSearch(searchFromUrl));
          }

          dispatch(articlesPageActions.initState());
          dispatch(fetchArticlesList({}));
        }
      },
    );
