import { classNames } from "6_shared/lib/classNames/classNames";
import { memo, useState } from "react";

import { Button, ButtonSize, ThemeButton } from "6_shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { ThemeSwitcher } from "4_features/ThemeSwitcher";
import { LangSwitcher } from "4_features/LangSwitcher/LangSwitcher";
import cls from "./Sidebar.module.scss";
import { getSidebarItems } from "../../model/selectors/getSidebarItems/getSidebarItems";
import SidebarItem from "../SidebarItem/SidebarItem";

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const SidebarItemsList = useSelector(getSidebarItems);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <div className={cls.items}>
        <div className={cls.item} />
        {SidebarItemsList.map((elem) => (
          <SidebarItem
            key={elem.path}
            item={elem}
            collapsed={collapsed}
          />
        ))}

      </div>
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
    </div>
  );
});
