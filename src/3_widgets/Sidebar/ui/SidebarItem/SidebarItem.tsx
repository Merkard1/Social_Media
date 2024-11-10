import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getUserAuthData } from "@/5_entities/User";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures } from "@/6_shared/lib/features";
import AppLinkDeprecated, { AppLinkTheme } from "@/6_shared/ui/deprecated/AppLink/AppLink";
import { AppLink } from "@/6_shared/ui/redesigned/AppLink/AppLink";
import { Icon } from "@/6_shared/ui/redesigned/Icon/Icon";

import { SidebarItemType } from "../../model/types/sidebar";

import cls from "./SidebarItem.module.scss";

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <AppLink
          to={item.path}
          className={classNames(cls.itemRedesigned, {
            [cls.collapsedRedesigned]: collapsed,
          })}
          activeClassName={cls.active}
        >
          <Icon Svg={item.Icon} />
          <span className={cls.link}>{t(item.text)}</span>
        </AppLink>
      }
      off={
        <AppLinkDeprecated
          theme={AppLinkTheme.SECONDARY}
          to={item.path}
          className={classNames(cls.item, {
            [cls.collapsed]: collapsed,
          })}
        >
          <item.Icon className={cls.icon} />
          <span className={cls.link}>{t(item.text)}</span>
        </AppLinkDeprecated>
      }
    />
  );
});
