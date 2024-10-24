import { ReactNode, useCallback } from "react";

import { classNames } from "@/6_shared/lib/classNames/classNames";

import Card, { CardTheme } from "../Card/Card";

import cls from "./Tabs.module.scss";

export interface TabItem<T extends string> {
  value: T;
  content: ReactNode;
}

interface TabsProps<T extends string> {
  className?: string;
  tabs: TabItem<T>[];
  value: T;
  onTabClick: (tabValue: T) => void;
}

const Tabs = <T extends string>(props: TabsProps<T>) => {
  const {
    className, tabs, onTabClick, value,
  } = props;

  const clickHandle = useCallback((tab: TabItem<T>) => () => {
    onTabClick(tab.value as T);
  }, [onTabClick]);

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          className={cls.tab}
          key={tab.value}
          onClick={clickHandle(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
};

export default Tabs;
