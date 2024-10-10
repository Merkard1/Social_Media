import { classNames } from "6_shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, useCallback, Suspense } from "react";
import Text, { TextSize } from "6_shared/ui/Text/Text";
import { AddCommentForm } from "4_features/addCommentForm";
import { CommentList } from "5_entities/Comment";
import { useDispatch, useSelector } from "react-redux";
import { useInitialEffect } from "6_shared/lib/hooks/useInitialEffect/useInitialEffect";
import { VStack } from "6_shared/ui/Stack";
import { Loader } from "6_shared/ui/Loader/Loader";
import {
  fetchCommentsByArticleId,
} from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";

interface ArticleDetailsCommentsProps {
    className?: string;
    id?: string;
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const dispatch = useDispatch();

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  return (
    <VStack gap="16" max className={classNames("", {}, [className])}>
      <Text
        size={TextSize.L}
        title={t("Комментарии")}
      />
      <Suspense fallback={<Loader />}>
        <AddCommentForm onSendComment={onSendComment} />
      </Suspense>
      <CommentList
        isLoading={commentsIsLoading}
        comments={comments}
      />
    </VStack>
  );
});
