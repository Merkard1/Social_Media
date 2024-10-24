import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ArticleType } from "@/5_entities/Article";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { TabItem, Tabs } from "@/6_shared/ui/Tabs";

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;
  const { t } = useTranslation();

  const typeTabs = useMemo<TabItem<ArticleType>[]>(() => [
    {
      value: ArticleType.ALL,
      content: t(ArticleType.ALL),
    },
    {
      value: ArticleType.IT,
      content: t(ArticleType.IT),
    },
    {
      value: ArticleType.ECONOMICS,
      content: t(ArticleType.ECONOMICS),
    },
    {
      value: ArticleType.SCIENCE,
      content: t(ArticleType.SCIENCE),
    },
  ], [t]);

  const onTabClick = useCallback((tab: ArticleType) => {
    onChangeType(tab);
  }, [onChangeType]);

  return (
    <Tabs
      tabs={typeTabs}
      value={value}
      onTabClick={onTabClick}
      className={classNames("", {}, [className])}
    />
  );
});
