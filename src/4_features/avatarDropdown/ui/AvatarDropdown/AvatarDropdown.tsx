import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from "@/5_entities/User";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { RoutePath } from "@/6_shared/config/routeConfig/routeConfig";
import Avatar from "@/6_shared/ui/Avatar/Avatar";
import { Dropdown, DropdownDirection } from "@/6_shared/ui/Popups";

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

  return (
    <Dropdown
      direction={DropdownDirection.BL}
      className={classNames("", {}, [className])}
      items={[
        ...(isAdminPanelAvailable ? [{
          content: t("Admin Panel"),
          href: RoutePath.admin_panel,
        }] : []),
        {
          content: t("Profile"),
          href: RoutePath.profile + authData.id,
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
