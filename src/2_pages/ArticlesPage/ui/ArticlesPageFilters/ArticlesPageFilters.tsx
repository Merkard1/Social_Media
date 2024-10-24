import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { fetchArticlesList } from "@/2_pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";

import { ArticleOrder, ArticleSortField, ArticleSortSelector, ArticleTypeTabs, ArticleView, ArticleViewSelector } from "@/5_entities/Article";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useDebounce } from "@/6_shared/lib/hooks/useDebounce/useDebounce";
import { Card } from "@/6_shared/ui/Card";
import { Input } from "@/6_shared/ui/Input";

import { getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort, getArticlesPageType, getArticlesPageView } from "../../model/selectors/articlesPageSelectors";
import { articlesPageActions } from "../../model/slices/ArticlesPageSlice";

import cls from "./ArticlesPageFilters.module.scss";

interface ArticlesPageFiltersProps {
 className?: string
}

const ArticlesPageFilters = ({ className } : ArticlesPageFiltersProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const view = useSelector(getArticlesPageView);
  const order = useSelector(getArticlesPageOrder);
  const sort = useSelector(getArticlesPageSort);
  const search = useSelector(getArticlesPageSearch);
  const type = useSelector(getArticlesPageType);

  const fetchData = useCallback(
    () => {
      dispatch(fetchArticlesList({ replace: true }));
    },
    [dispatch],
  );

  const setToFirstPage = useCallback(
    () => {
      dispatch(articlesPageActions.setPage(1));
    },
    [dispatch],
  );

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
      setToFirstPage();
      fetchData();
    },
    [dispatch, setToFirstPage, fetchData],
  );

  const onChangeOrder = useCallback(
    (order: ArticleOrder) => {
      dispatch(articlesPageActions.setOrder(order));
      setToFirstPage();
      fetchData();
    },
    [dispatch, setToFirstPage, fetchData],
  );

  const onChangeSort = useCallback(
    (sort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(sort));
      setToFirstPage();
      fetchData();
    },
    [dispatch, setToFirstPage, fetchData],
  );

  // To Fix
  const onChangeType = useCallback(
    (tab: any) => {
      dispatch(articlesPageActions.setType(tab));
      setToFirstPage();
      fetchData();
    },
    [dispatch, setToFirstPage, fetchData],
  );

  const debounceFetchData = useDebounce(fetchData, 500);
  const onChangeSearch = useCallback((search: string) => {
    dispatch(articlesPageActions.setSearch(search));
    setToFirstPage();
    debounceFetchData();
  }, [dispatch, setToFirstPage, debounceFetchData]);

  return (
    <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector order={order} sort={sort} onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card>
        <Input onChange={onChangeSearch} value={search} className={cls.search} placeholder={t("Search")} />
      </Card>
      <ArticleTypeTabs
        value={type}
        onChangeType={onChangeType}
        className={cls.tabs}
      />
    </div>
  );
};

export default ArticlesPageFilters;
