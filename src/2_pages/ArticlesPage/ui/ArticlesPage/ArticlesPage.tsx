import { useTranslation } from "react-i18next";
import { classNames } from "6_shared/lib/classNames/classNames";
import { memo, useCallback } from "react";
import { ArticleList, ArticleViewSelector } from "5_entities/Article";
import { ArticleView } from "5_entities/Article/model/types/article";
import { DynamicModuleLoader, ReducersList } from "6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useInitialEffect } from "6_shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { fetchNextArticlesPage } from "2_pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import Page from "6_shared/ui/Page/Page";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import { getArticlesPageError, getArticlesPageInited, getArticlesPageIsLoading, getArticlesPageView } from "../../model/selectors/articlesPageSelectors";
import { articlesPageActions, articlesPageReducer, getArticles } from "../../model/slices/ArticlesPageSlice";
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
  // const error = useSelector(getArticlesPageError);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch],
  );

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage());
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList isLoading={isLoading} view={view} articles={articles} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
