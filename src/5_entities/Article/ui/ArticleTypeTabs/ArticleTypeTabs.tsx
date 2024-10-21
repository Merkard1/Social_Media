import { classNames } from "6_shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useMemo } from "react";
import Tabs, { TabItem } from "6_shared/ui/Tabs/Tabs";
import { ArticleType } from "../../model/consts/articleConsts";

interface ArticleTypeTabsProps{
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
      value: ArticleType.ECONOMICS,
      content: t(ArticleType.ECONOMICS),
    },
    {
      value: ArticleType.IT,
      content: t(ArticleType.IT),
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
