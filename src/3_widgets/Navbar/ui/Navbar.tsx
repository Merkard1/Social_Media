import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { getRouteArticleCreate } from "@/1_app/config/routeConfig/routeConfig";

import { LoginModal } from "@/4_features/AuthByUserName";
import { AvatarDropdown } from "@/4_features/avatarDropdown";
import { NotificationButton } from "@/4_features/notificationButton";

import { useUserAuthData } from "@/5_entities/User";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures, toggleFeatures } from "@/6_shared/lib/features";
import { AppLink, AppLinkTheme } from "@/6_shared/ui/deprecated/AppLink";
import { Button, ThemeButton } from "@/6_shared/ui/deprecated/Button";
import Text, { TextTheme } from "@/6_shared/ui/deprecated/Text/Text";
import { HStack } from "@/6_shared/ui/redesigned/Stack";

import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useUserAuthData();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const mainClass = toggleFeatures({
    name: "isAppRedesigned",
    on: () => cls.NavbarRedesigned,
    off: () => cls.Navbar,
  });

  if (authData) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <header className={classNames(mainClass, {}, [className])}>
            <HStack gap="16" className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={classNames(mainClass, {}, [className])}>
            <Text
              className={cls.appName}
              title={t("Social media")}
              theme={TextTheme.INVERTED}
            />
            <AppLink
              to={getRouteArticleCreate()}
              theme={AppLinkTheme.SECONDARY}
              className={cls.createBtn}
            >
              {t("Создать статью")}
            </AppLink>
            <HStack gap="16" className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
    );
  }

  return (
    <header className={classNames(mainClass, {}, [className])}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Button
            className={cls.links}
            onClick={onShowModal}
          >
            {t("Войти")}
          </Button>
        }
        off={
          <Button
            theme={ThemeButton.CLEAR_INVERTED}
            className={cls.links}
            onClick={onShowModal}
          >
            {t("Войти")}
          </Button>
        }
      />

      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
};

// TODO
