import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import Text from "@/6_shared/ui/Text/Text";
import { VStack } from "@/6_shared/ui/Stack";
import { CommentCard } from "../CommentCard/CommentCard";
import { Comment } from "../../model/types/comment";

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, isLoading, comments } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <VStack gap="16">
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack gap="16" max>
      {comments?.length
        ? comments.map((comment) => (
          <CommentCard
            key={comment.id}
            isLoading={isLoading}
            comment={comment}
          />
        ))
        : <Text text={t("Комментарии отсутствуют")} />}
    </VStack>
  );
});
