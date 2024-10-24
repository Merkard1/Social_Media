import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { fetchNextArticlesPage } from "@/2_pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage";

import { Page } from "@/3_widgets/Page";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { DynamicModuleLoader, ReducersList } from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/6_shared/lib/hooks/useInitialEffect/useInitialEffect";

import { getArticlesPageIsLoading, getArticlesPageView } from "../../model/selectors/articlesPageSelectors";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import { articlesPageReducer, getArticles } from "../../model/slices/ArticlesPageSlice";
import { ArticleInfiniteList } from "../ArticleInfiniteList/ArticleInfiniteList";
import ArticlesPageFilters from "../ArticlesPageFilters/ArticlesPageFilters";

import cls from "./ArticlesPage.module.scss";

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const [searchParams] = useSearchParams();

  // const error = useSelector(getArticlesPageError);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticlesPageFilters />
        <ArticleInfiniteList className={cls.list} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
