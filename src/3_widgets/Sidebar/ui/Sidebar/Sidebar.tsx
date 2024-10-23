import { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Button, ButtonSize, ThemeButton } from "@/6_shared/ui/Button";
import { VStack } from "@/6_shared/ui/Stack";

import { LangSwitcher } from "@/4_features/LangSwitcher/LangSwitcher";
import { ThemeSwitcher } from "@/4_features/ThemeSwitcher";

import { getSidebarItems } from "../../model/selectors/getSidebarItems/getSidebarItems";
import SidebarItem from "../SidebarItem/SidebarItem";

import cls from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItemsList = useSelector(getSidebarItems);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(() => sidebarItemsList.map((item) => (
    <SidebarItem
      item={item}
      collapsed={collapsed}
      key={item.path}
    />
  )), [collapsed, sidebarItemsList]);

  return (
    <aside
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <VStack role="navigation" gap="8" className={cls.items}>
        {itemsList}
      </VStack>
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        theme={ThemeButton.BACKGROUND_INVERTED}
        square
        size={ButtonSize.XL}
      >
        {collapsed ? ">" : "<"}
      </Button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.lang} />
      </div>
    </aside>
  );
});
