import { memo } from "react";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures } from "@/6_shared/lib/features";
import { Card as CardDeprecated, CardTheme } from "@/6_shared/ui/deprecated/Card";
import TextDeprecated from "@/6_shared/ui/deprecated/Text/Text";
import { Card } from "@/6_shared/ui/redesigned/Card/Card";
import { Text } from "@/6_shared/ui/redesigned/Text/Text";

import { Notification } from "../../model/types/notification";

import cls from "./NotificationItem.module.scss";

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, item } = props;

  const content = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card
          className={classNames(cls.NotificationItem, {}, [
            className,
          ])}
        >
          <Text title={item.title} text={item.description} />
        </Card>
      }
      off={
        <CardDeprecated
          theme={CardTheme.OUTLINED}
          className={classNames(cls.NotificationItem, {}, [
            className,
          ])}
        >
          <TextDeprecated
            title={item.title}
            text={item.description}
          />
        </CardDeprecated>
      }
    />
  );

  if (item.href) {
    return (
      <a
        className={cls.link}
        target="_blank"
        href={item.href}
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
});
