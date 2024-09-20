import { useTranslation } from "react-i18next";
import { classNames } from "6_shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./ArticlesPage.module.scss";

interface ArticlesPageProps {
 className?: string
}

const ArticlesPage = ({ className } : ArticlesPageProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      {t(" ArticlesPage")}
    </div>
  );
};

export default memo(ArticlesPage);
