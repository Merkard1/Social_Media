import { EntityState } from "@reduxjs/toolkit";
import { Article, ArticleView } from "5_entities/Article";

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;

    view: ArticleView;
    // pagination
    page: number;
    limit?: number;
    hasMore: boolean;

    _inited: boolean;
}
