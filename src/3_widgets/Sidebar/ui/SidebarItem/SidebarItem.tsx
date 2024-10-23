import { memo } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "@/6_shared/ui/AppLink";

import { SidebarItemType } from "@/3_widgets/Sidebar/model/types/sidebar";

import cls from "./SidebarItem.module.scss";

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  const { path, text, Icon } = item;

  return (
    <div className={cls.item}>
      <AppLink
        theme={AppLinkTheme.SECONDARY}
        to={path}
        className={classNames(cls.link, { [cls.collapsed]: collapsed })}
      >
        <Icon className={cls.icon} />
        {!collapsed && <span>{t(text)}</span>}
      </AppLink>
    </div>
  );
});

export default SidebarItem;
