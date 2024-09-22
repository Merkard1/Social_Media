import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "1_app/providers/StoreProvider";
import { Comment } from "5_entities/Comment";
import { Article } from "5_entities/Article";
import { getArticlesPageLimit } from "2_pages/ArticlesPage/model/selectors/articlesPageSelectors";

interface FetchArticlesListProps {
    page?: number;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
    >(
      "articlesPage/fetchArticlesList",
      async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const { page = 1 } = props;
        const limit = getArticlesPageLimit(getState());

        try {
          const response = await extra.api.get<Article[]>("/articles", {
            params: {
              _expand: "user",
              _limit: limit,
              _page: page,
            },
          });

          if (!response.data) {
            throw new Error();
          }

          return response.data;
        } catch (e) {
          return rejectWithValue("error");
        }
      },
    );
