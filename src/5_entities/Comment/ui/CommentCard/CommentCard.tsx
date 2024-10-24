import { memo } from "react";

import { getRouteProfile } from "@/1_app/config/routeConfig/routeConfig";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { AppLink } from "@/6_shared/ui/AppLink";
import Avatar from "@/6_shared/ui/Avatar/Avatar";
import { Skeleton } from "@/6_shared/ui/Skeleton";
import { VStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text";

import { Comment } from "../../model/types/comment";

import cls from "./CommentCard.module.scss";

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <VStack gap="8" max className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton height={16} width={100} className={cls.username} />
        </div>
        <Skeleton className={cls.text} width="100%" height={50} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <VStack max gap="8" className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink to={getRouteProfile(comment.user.id)} className={cls.header}>
        {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} /> }
        <Text className={cls.username} title={comment.user.username} />
      </AppLink>
      <Text className={cls.text} text={comment.text} />
    </VStack>
  );
});
