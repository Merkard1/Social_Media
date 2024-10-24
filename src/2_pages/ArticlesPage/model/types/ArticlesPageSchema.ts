import { EntityState } from "@reduxjs/toolkit";

import { Article, ArticleView, ArticleOrder, ArticleSortField, ArticleType } from "@/5_entities/Article";

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit?: number;
    hasMore: boolean;

    // filters
    view: ArticleView;
    order: ArticleOrder;
    sort: ArticleSortField;
    search: string;
    type: ArticleType;

    _inited: boolean;
}
