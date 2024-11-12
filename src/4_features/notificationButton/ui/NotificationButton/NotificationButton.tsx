import React, { memo, useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import { NotificationList } from "@/5_entities/Notification";

import NotificationIconDeprecated from "@/6_shared/assets/icons/notification-20-20.svg";
import NotificationIcon from "@/6_shared/assets/icons/notification.svg";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures } from "@/6_shared/lib/features";
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from "@/6_shared/ui/deprecated/Button";
import { Icon as IconDeprecated } from "@/6_shared/ui/deprecated/Icon";
import { Popover as PopoverDeprecated } from "@/6_shared/ui/deprecated/Popups";
import { Drawer } from "@/6_shared/ui/redesigned/Drawer/Drawer";
import { Icon } from "@/6_shared/ui/redesigned/Icon/Icon";
import { Popover } from "@/6_shared/ui/redesigned/Popups";

import cls from "./NotificationButton.module.scss";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = (
    <Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />
  );

  return (
    <div>
      <BrowserView>
        <Popover
                            className={classNames(cls.NotificationButton, {}, [
                              className,
                            ])}
                            direction="bottom left"
                            trigger={trigger}
                          >
                            <NotificationList className={cls.notifications} />
                          </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  );
});
