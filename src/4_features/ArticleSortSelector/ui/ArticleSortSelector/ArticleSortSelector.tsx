import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ArticleOrder, ArticleSortField } from "@/5_entities/Article";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Select, SelectOption } from "@/6_shared/ui/Select";

import cls from "./ArticleSortSelector.module.scss";

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: ArticleOrder;
    onChangeOrder: (newOrder: ArticleOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const {
    className, onChangeOrder, onChangeSort, order, sort,
  } = props;
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<ArticleOrder>[]>(() => [
    {
      value: ArticleOrder.ASC,
      content: t("ascending"),
    },
    {
      value: ArticleOrder.DESC,
      content: t("descending"),
    },
  ], [t]);

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
    {
      value: ArticleSortField.CREATED,
      content: t("date"),
    },
    {
      value: ArticleSortField.TITLE,
      content: t("name"),
    },
    {
      value: ArticleSortField.VIEWS,
      content: t("views"),
    },
  ], [t]);

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select<ArticleSortField>
        options={sortFieldOptions}
        label={t("Sort by")}
        value={sort}
        onChange={onChangeSort}
      />
      <Select
        options={orderOptions}
        label={t("in")}
        value={order}
        onChange={onChangeOrder}
        className={cls.order}
      />
    </div>
  );
});
