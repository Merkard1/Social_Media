import { classNames } from "6_shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "6_shared/ui/AppLink/AppLink";
import { useTranslation } from "react-i18next";
import { Button, ThemeButton } from "6_shared/ui/Button/Button";
import { useCallback, useState } from "react";
import { LoginModal } from "4_features/AuthByUserName";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, userActions } from "5_entities/User";
import Text from "6_shared/ui/Text/Text";
import { RoutePath } from "6_shared/config/routeConfig/routeConfig";
import { Dropdown } from "6_shared/ui/Dropdown/Dropdown";
import Avatar from "6_shared/ui/Avatar/Avatar";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    setIsAuthModal(false);
    dispatch(userActions.logout());
  }, [dispatch]);

  if (authData) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
        <Text className={cls.appName} title={t("Social media")} />
        <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY}>
          {t("Create Article ?")}
        </AppLink>
        <Dropdown
          className={cls.dropdown}
          items={[{
            content: t("Profile"),
            href: RoutePath.profile + authData.id,
          }, {
            content: t("Exit"),
            onClick: onLogout,
          },
          ]}
          // TODO backend doesn't return avatar
          trigger={<Avatar size={30} src={authData.avatar} />}
        />
      </div>
    );
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        <Button
          theme={ThemeButton.CLEAR_INVERTED}
          className={cls.links}
          onClick={onShowModal}
        >
          {t("Enter")}
        </Button>
        {isAuthModal && (
          <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        )}
        <AppLink theme={AppLinkTheme.SECONDARY} to="/" className={cls.mainLink}>
          {t("Главная")}
        </AppLink>
        <AppLink theme={AppLinkTheme.RED} to="/about">
          {t("О сайте")}
        </AppLink>
      </div>
    </div>
  );
};
