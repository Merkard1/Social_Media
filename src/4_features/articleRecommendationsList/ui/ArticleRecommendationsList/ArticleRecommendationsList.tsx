import { useTranslation } from "react-i18next";
import { memo } from "react";
import Text, { TextSize } from "@/6_shared/ui/Text/Text";
import { ArticleList } from "@/5_entities/Article";
import { VStack } from "@/6_shared/ui/Stack";
import { useArticlesRecommendationList } from "../../api/articleRecommendationsApi";

export const ArticleRecommendationsList = memo(() => {
  const { t } = useTranslation();
  const { isLoading, data } = useArticlesRecommendationList(3);

  if (isLoading) {
    return null;
  }

  return (
    <VStack gap="8">
      <Text title={t("Recomendations")} size={TextSize.L} />
      <ArticleList
        articles={data}
        isLoading={isLoading}
      />
    </VStack>
  );
});

// TODO story
