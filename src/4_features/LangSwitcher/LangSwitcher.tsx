import { memo } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Button, ThemeButton } from "@/6_shared/ui/Button";

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggle = async () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <Button
      className={classNames("", {}, [className])}
      theme={ThemeButton.CLEAR}
      onClick={toggle}
    >
      {t(short ? "lan" : "Язык")}
    </Button>
  );
});
