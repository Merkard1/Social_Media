import React, { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { getRouteAdminPanel, getRouteProfile, getRouteSettings } from "@/1_app/config/routeConfig/routeConfig";

import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "@/5_entities/User";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures } from "@/6_shared/lib/features";
import { Avatar as AvatarDeprecated } from "@/6_shared/ui/deprecated/Avatar";
import { Dropdown as DropdownDeprecated } from "@/6_shared/ui/deprecated/Popups";
import { Avatar } from "@/6_shared/ui/redesigned/Avatar/Avatar";
import { Dropdown } from "@/6_shared/ui/redesigned/Popups";

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const authData = useSelector(getUserAuthData);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) {
    return null;
  }

  const items = [
    ...(isAdminPanelAvailable
      ? [
        {
          content: t("Admin"),
          href: getRouteAdminPanel(),
        },
      ]
      : []),
    {
      content: t("Profile"),
      href: getRouteProfile(authData.id),
    },
    {
      content: t("Settings"),
      href: getRouteSettings(),
    },
    {
      content: t("Exit"),
      onClick: onLogout,
    },
  ];

  return (
    <Dropdown
                direction="bottom left"
                className={classNames("", {}, [className])}
                items={items}
                trigger={<Avatar size={40} src={authData.avatar} />}
              />
  );
});
