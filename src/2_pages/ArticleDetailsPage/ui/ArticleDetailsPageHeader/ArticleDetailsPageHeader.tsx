import { useTranslation } from "react-i18next";
import { classNames } from "6_shared/lib/classNames/classNames";
import { Button, ThemeButton } from "6_shared/ui/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { RoutePath } from "6_shared/config/routeConfig/routeConfig";
import { useSelector } from "react-redux";
import { getUserAuthData } from "5_entities/User";
import { getArticleDetailsData } from "5_entities/Article";
import cls from "./ArticleDetailsPageHeader.module.scss";
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
    <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
      <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
        {t("Back")}
      </Button>
      {canEdit && (
        <Button theme={ThemeButton.OUTLINE} onClick={onEdit} className={cls.editBtn}>
          {t("Edit")}
        </Button>
      )}
    </div>
  );
};

export default ArticleDetailsPageHeader;
