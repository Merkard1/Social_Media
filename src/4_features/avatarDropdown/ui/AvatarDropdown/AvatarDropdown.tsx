import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getRouteAdminPanel, getRouteProfile } from "@/1_app/config/routeConfig/routeConfig";

import {
  useUserAuthData, isUserAdmin, isUserManager, userActions,
} from "@/5_entities/User";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import Avatar from "@/6_shared/ui/Avatar/Avatar";
import { Dropdown, DropdownDirection } from "@/6_shared/ui/Popups";

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const authData = useUserAuthData();

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) {
    return null;
  }

  return (
    <Dropdown
      direction={DropdownDirection.BL}
      className={classNames("", {}, [className])}
      items={[
        ...(isAdminPanelAvailable ? [{
          content: t("Admin Panel"),
          href: getRouteAdminPanel(),
        }] : []),
        {
          content: t("Profile"),
          href: getRouteProfile(authData.id),
        },
        {
          content: t("Exit"),
          onClick: onLogout,
        },
      ]}
      trigger={<Avatar size={30} src={authData.avatar} />}
    />
  );
});
