import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { ArticleDetails } from "@/5_entities/Article";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { DynamicModuleLoader, ReducersList } from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import Page from "@/3_widgets/Page/Page";
import { VStack } from "@/6_shared/ui/Stack";
import { ArticleRecommendationsList } from "@/4_features/articleRecommendationsList";
import cls from "./ArticleDetailsPage.module.scss";
import { articleDetailsPageReducer } from "../../model/slices";
import ArticleDetailsPageHeader from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";

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
          <ArticleRecommendationsList />
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
