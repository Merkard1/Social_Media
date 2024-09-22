import { classNames } from "6_shared/lib/classNames/classNames";
import { memo, useState } from "react";
import { ThemeSwitcher } from "6_shared/ui/ThemeSwitcher";
import { LangSwitcher } from "6_shared/ui/LangSwitcher/LangSwitcher";
import { Button, ButtonSize, ThemeButton } from "6_shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import cls from "./Sidebar.module.scss";
import { getSidebarItems } from "../../model/selectors/getSidebarItems/getSidebarItems";
import SidebarItem from "../SidebarItem/SidebarItem";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

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
};
