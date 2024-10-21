import { useTranslation } from "react-i18next";
import { memo } from "react";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import cls from "./AdminPanelPage.module.scss";

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.AdminPanelPage, {}, [className])}>
      {t("AdminPanelPage")}
    </div>
  );
});

export default AdminPanelPage;
