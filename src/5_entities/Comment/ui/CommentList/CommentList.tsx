import { memo } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures } from "@/6_shared/lib/features";
import TextDeprecated from "@/6_shared/ui/deprecated/Text/Text";
import { Card } from "@/6_shared/ui/redesigned/Card/Card";
import { VStack } from "@/6_shared/ui/redesigned/Stack";
import { Text } from "@/6_shared/ui/redesigned/Text/Text";

import { Comment } from "../../model/types/comment";
import { CommentCard } from "../CommentCard/CommentCard";

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, isLoading, comments } = props;
  const { t } = useTranslation("article-details");

  if (isLoading) {
    return (
      <VStack gap="16" max className={classNames("", {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack gap="16" max className={classNames("", {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            isLoading={isLoading}
            comment={comment}
            key={comment.id}
          />
        ))
      ) : (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Card max>
              <VStack align="center">
                <Text text={t("No comments")} />
              </VStack>
            </Card>
          }
          off={<TextDeprecated text={t("No comments")} />}
        />
      )}
    </VStack>
  );
});
