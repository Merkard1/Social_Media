import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "5_entities/User";
import { getArticleDetailsData } from "5_entities/Article";

export const getCanEditArticle = createSelector(
  getArticleDetailsData,
  getUserAuthData,
  (article, user) => {
    if (!article || !user) {
      return false;
    }

    return article.user.id === user.id;
  },
);
