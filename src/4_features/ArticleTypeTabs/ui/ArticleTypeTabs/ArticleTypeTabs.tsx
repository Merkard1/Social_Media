import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ArticleType } from "@/5_entities/Article";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures } from "@/6_shared/lib/features";
import { TabItem, Tabs as TabsDeprecated } from "@/6_shared/ui/deprecated/Tabs";
import { Tabs } from "@/6_shared/ui/redesigned/Tabs/Tabs";

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;
  const { t } = useTranslation();

  const typeTabs = useMemo<TabItem<ArticleType>[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t("All articles"),
      },
      {
        value: ArticleType.IT,
        content: t("IT"),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t("Economic"),
      },
      {
        value: ArticleType.SCIENCE,
        content: t("Science"),
      },
    ],
    [t],
  );

  const onTabClick = useCallback((tab: ArticleType) => {
    onChangeType(tab);
  }, [onChangeType]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Tabs
          direction="column"
          tabs={typeTabs}
          value={value}
          onTabClick={onTabClick}
          className={classNames("", {}, [className])}
        />
      }
      off={
        <TabsDeprecated
          tabs={typeTabs}
          value={value}
          onTabClick={onTabClick}
          className={classNames("", {}, [className])}
        />
      }
    />
  );
});
