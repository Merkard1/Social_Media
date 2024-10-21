import { classNames } from "6_shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "6_shared/ui/AppLink/AppLink";
import { useTranslation } from "react-i18next";
import { Button, ThemeButton } from "6_shared/ui/Button/Button";
import { useCallback, useState } from "react";
import { LoginModal } from "4_features/AuthByUserName";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData } from "5_entities/User";
import Text, { TextTheme } from "6_shared/ui/Text/Text";
import { RoutePath } from "6_shared/config/routeConfig/routeConfig";
import { NotificationButton } from "4_features/notificationButton";
import { HStack } from "6_shared/ui/Stack";
import { AvatarDropdown } from "4_features/avatarDropdown";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text className={cls.appName} title={t("Social media")} theme={TextTheme.INVERTED} />
        <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY}>
          {t("Create Article ?")}
        </AppLink>
        <HStack gap="16" className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button
        theme={ThemeButton.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t("Войти")}
      </Button>
      {isAuthModal && (
        <LoginModal
          isOpen={isAuthModal}
          onClose={onCloseModal}
        />
      )}
    </header>
  );
};
