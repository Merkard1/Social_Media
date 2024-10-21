import { memo, useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { classNames } from "6_shared/lib/classNames/classNames";
import { Button, ThemeButton } from "6_shared/ui/Button/Button";
import { Icon } from "6_shared/ui/Icon/Icon";
import NotificationIcon from "6_shared/assets/icons/notification-20-20.svg";
import { DropdownDirection, Popover } from "6_shared/ui/Popups";

import { Drawer } from "6_shared/ui/Drawer/Drawer";
import { NotificationList } from "5_entities/Notification";
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
    <Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
      <Icon Svg={NotificationIcon} inverted />
    </Button>
  );

  return (
    <div>
      <BrowserView>
        <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          direction={DropdownDirection.BL}
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
