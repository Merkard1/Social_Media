import { memo } from "react";

import { getRouteProfile } from "@/1_app/config/routeConfig/routeConfig";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures, toggleFeatures } from "@/6_shared/lib/features";
import { AppLink as AppLinkDeprecated } from "@/6_shared/ui/deprecated/AppLink";
import { Avatar as AvatarDeprecated } from "@/6_shared/ui/deprecated/Avatar";
import { Skeleton as SkeletonDeprecated } from "@/6_shared/ui/deprecated/Skeleton";
import TextDeprecated from "@/6_shared/ui/deprecated/Text/Text";
import { AppLink } from "@/6_shared/ui/redesigned/AppLink/AppLink";
import { Avatar } from "@/6_shared/ui/redesigned/Avatar/Avatar";
import { Card } from "@/6_shared/ui/redesigned/Card/Card";
import { Skeleton as SkeletonRedesigned } from "@/6_shared/ui/redesigned/Skeleton";
import { HStack, VStack } from "@/6_shared/ui/redesigned/Stack";
import { Text } from "@/6_shared/ui/redesigned/Text/Text";

import { Comment } from "../../model/types/comment";

import cls from "./CommentCard.module.scss";

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  const Skeleton = toggleFeatures({
    name: "isAppRedesigned",
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  if (isLoading) {
    return (
      <VStack
        data-testid="CommentCard.Loading"
        gap="8"
        max
        className={classNames(cls.CommentCard, {}, [
          className,
          cls.loading,
        ])}
      >
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton
            height={16}
            width={100}
            className={cls.username}
          />
        </div>
        <Skeleton className={cls.text} width="100%" height={50} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card padding="24" border="partial" max>
          <VStack
            data-testid="CommentCard.Content"
            gap="8"
            max
            className={classNames(cls.CommentCardRedesigned, {}, [
              className,
            ])}
          >
            <AppLink to={getRouteProfile(comment.user.id)}>
              <HStack gap="8">
                {comment.user.avatar ? (
                  <Avatar
                    size={30}
                    src={comment.user.avatar}
                  />
                ) : null}
                <Text text={comment.user.username} bold />
              </HStack>
            </AppLink>
            <Text text={comment.text} />
          </VStack>
        </Card>
      }
      off={
        <VStack
          data-testid="CommentCard.Content"
          gap="8"
          max
          className={classNames(cls.CommentCard, {}, [className])}
        >
          <AppLinkDeprecated
            to={getRouteProfile(comment.user.id)}
            className={cls.header}
          >
            {comment.user.avatar ? (
              <AvatarDeprecated
                size={30}
                src={comment.user.avatar}
              />
            ) : null}
            <TextDeprecated
              className={cls.username}
              title={comment.user.username}
            />
          </AppLinkDeprecated>
          <TextDeprecated className={cls.text} text={comment.text} />
        </VStack>
      }
    />
  );
});
