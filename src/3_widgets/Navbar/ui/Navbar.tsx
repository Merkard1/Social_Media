import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { getRouteArticleCreate } from "@/1_app/config/routeConfig/routeConfig";

import { LoginModal } from "@/4_features/AuthByUserName";
import { AvatarDropdown } from "@/4_features/avatarDropdown";
import { NotificationButton } from "@/4_features/notificationButton";

import { useUserAuthData } from "@/5_entities/User";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures, toggleFeatures } from "@/6_shared/lib/features";
import { AppLink as AppLinkDeprecated, AppLinkTheme } from "@/6_shared/ui/deprecated/AppLink";
import { Button as ButtonDeprecated, ThemeButton } from "@/6_shared/ui/deprecated/Button";
import TextDeprecated, { TextTheme } from "@/6_shared/ui/deprecated/Text/Text";
import { Button } from "@/6_shared/ui/redesigned/Button/Button";
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

  const mainClass = cls.NavbarRedesigned;

  if (authData) {
    return (
      <header className={classNames(mainClass, {}, [className])}>
                    <HStack gap="16" className={cls.actions}>
                      <NotificationButton />
                      <AvatarDropdown />
                    </HStack>
                  </header>
    );
  }

  return (
    <header className={classNames(mainClass, {}, [className])}>
      <Button
                      className={cls.links}
                      onClick={onShowModal}
                    >
                      {t("Login")}
                    </Button>

      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
};
