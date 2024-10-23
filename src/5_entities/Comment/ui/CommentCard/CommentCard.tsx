import { memo } from "react";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import Avatar from "@/6_shared/ui/Avatar/Avatar";
import { Text } from "@/6_shared/ui/Text";
import { Skeleton } from "@/6_shared/ui/Skeleton";
import { AppLink } from "@/6_shared/ui/AppLink";
import { VStack } from "@/6_shared/ui/Stack";
import cls from "./CommentCard.module.scss";
import { Comment } from "../../model/types/comment";
import { RoutePath } from "@/1_app/config/routeConfig/routeConfig";

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
      <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cls.header}>
        {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} /> }
        <Text className={cls.username} title={comment.user.username} />
      </AppLink>
      <Text className={cls.text} text={comment.text} />
    </VStack>
  );
});
