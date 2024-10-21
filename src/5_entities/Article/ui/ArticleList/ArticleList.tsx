import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import Text, { TextSize } from "@/6_shared/ui/Text/Text";
import { classNames } from "@/6_shared/lib/classNames/classNames";
// TODO virtuoso for articles list, not forget to impliment in messages!!!
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import cls from "./ArticleList.module.scss";
import { Article } from "../../model/types/article";
import { ArticleView } from "../../model/consts/articleConsts";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 12 : 4)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, view = ArticleView.SMALL, isLoading } = props;
  const { t } = useTranslation();

  const renderArticle = (article: Article) => (
    <ArticleListItem
      article={article}
      view={view}
      className={cls.card}
      key={article.id}
    />
  );

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t("No articles")} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
});
