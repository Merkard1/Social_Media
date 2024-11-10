import { memo } from "react";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { toggleFeatures } from "@/6_shared/lib/features";
import { Skeleton as SkeletonDeprecated } from "@/6_shared/ui/deprecated/Skeleton";
import { Skeleton as SkeletonRedesigned } from "@/6_shared/ui/redesigned/Skeleton";
import { VStack } from "@/6_shared/ui/redesigned/Stack";

import { useNotifications } from "../../api/notificationApi";
import { NotificationItem } from "../NotificationItem/NotificationItem";

import cls from "./NotificationList.module.scss";

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className } = props;
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 10000,
  });

  const Skeleton = toggleFeatures({
    name: "isAppRedesigned",
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.NotificationList, {}, [className])}
      >
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
      </VStack>
    );
  }

  return (
    <VStack
      gap="16"
      max
      className={classNames(cls.NotificationList, {}, [className])}
    >
      {data?.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </VStack>
  );
});
