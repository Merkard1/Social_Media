import { HTMLAttributeAnchorTarget, memo } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures } from "@/6_shared/lib/features";
import Text, { TextSize } from "@/6_shared/ui/deprecated/Text/Text";
import { HStack } from "@/6_shared/ui/redesigned/Stack";

import { ArticleView } from "../../model/consts/articleConsts";
import { Article } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";

import cls from "./ArticleList.module.scss";

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 12 : 4)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton
        className={cls.card}
        key={index}
        view={view}
      />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleView.SMALL,
    isLoading,
    target,
  } = props;
  const { t } = useTranslation();

  if (!isLoading && !articles.length) {
    return (
      <div
        className={classNames(cls.ArticleList, {}, [
          className,
          cls[view],
        ])}
      >
        <Text size={TextSize.L} title={t("Статьи не найдены")} />
      </div>
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <HStack
          wrap="wrap"
          gap="16"
          className={classNames(cls.ArticleListRedesigned, {}, [])}
          data-testid="ArticleList"
        >
          {articles.map((item) => (
            <ArticleListItem
              article={item}
              view={view}
              target={target}
              key={item.id}
              className={cls.card}
            />
          ))}
          {isLoading && getSkeletons(view)}
        </HStack>
      }
      off={
        <div
          className={classNames(cls.ArticleList, {}, [
            className,
            cls[view],
          ])}
          data-testid="ArticleList"
        >
          {articles.map((item) => (
            <ArticleListItem
              article={item}
              view={view}
              target={target}
              key={item.id}
              className={cls.card}
            />
          ))}
          {isLoading && getSkeletons(view)}
        </div>
      }
    />
  );
});
