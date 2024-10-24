import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getRouteArticleCreate } from "@/1_app/config/routeConfig/routeConfig";

import { LoginModal } from "@/4_features/AuthByUserName";
import { AvatarDropdown } from "@/4_features/avatarDropdown";
import { NotificationButton } from "@/4_features/notificationButton";

import { getUserAuthData } from "@/5_entities/User";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "@/6_shared/ui/AppLink";
import { Button, ThemeButton } from "@/6_shared/ui/Button";
import { HStack } from "@/6_shared/ui/Stack";
import { Text, TextTheme } from "@/6_shared/ui/Text";

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
        <AppLink to={getRouteArticleCreate()} theme={AppLinkTheme.SECONDARY}>
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
