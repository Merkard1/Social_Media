import { createSelector } from "@reduxjs/toolkit";

import { getArticleDetailsData } from "@/5_entities/Article";
import { getUserAuthData } from "@/5_entities/User";

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
