import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Page } from "@/3_widgets/Page";

import { ArticleRating } from "@/4_features/articleRating";
import { ArticleRecommendationsList } from "@/4_features/articleRecommendationsList";

import { ArticleDetails } from "@/5_entities/Article";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { DynamicModuleLoader, ReducersList } from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { VStack } from "@/6_shared/ui/Stack";

import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";
import ArticleDetailsPageHeader from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";

import cls from "./ArticleDetailsPage.module.scss";

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { t } = useTranslation("article-details");
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t("Статья не найдена")}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <ArticleRating articleId={id} />
          <ArticleRecommendationsList />
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
