import { useTranslation } from "react-i18next";
import { classNames } from "6_shared/lib/classNames/classNames";
import { Button, ThemeButton } from "6_shared/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { RoutePath } from "6_shared/config/routeConfig/routeConfig";
import { useSelector } from "react-redux";
import { getArticleDetailsData } from "5_entities/Article";
import { HStack } from "6_shared/ui/Stack";
import { getCanEditArticle } from "../../model/selectors/article";

interface ArticleDetailsPageHeaderProps {
 className?: string
}

const ArticleDetailsPageHeader = ({ className } : ArticleDetailsPageHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const canEdit = useSelector(getCanEditArticle);
  const article = useSelector(getArticleDetailsData);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const onEdit = useCallback(() => {
    navigate(`${RoutePath.article_edit.replace(":id", String(article?.id))}`);
  }, [navigate, article]);

  return (
    <HStack justify="between" max>
      <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
        {t("Back")}
      </Button>
      {canEdit && (
        <Button theme={ThemeButton.OUTLINE} onClick={onEdit}>
          {t("Edit")}
        </Button>
      )}
    </HStack>
  );
};

export default ArticleDetailsPageHeader;
