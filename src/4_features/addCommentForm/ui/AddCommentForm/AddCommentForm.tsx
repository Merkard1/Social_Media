import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { DynamicModuleLoader, ReducersList } from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Button, ThemeButton } from "@/6_shared/ui/Button";
import { Input } from "@/6_shared/ui/Input";
import { HStack } from "@/6_shared/ui/Stack";

import { useAddCommentFormText } from "../../model/selectors/addCommentFormSelectors";
import { addCommentFormReducer, useCommentFormActions } from "../../model/slices/addCommentFormSlice";

import cls from "./AddCommentForm.module.scss";

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const text = useAddCommentFormText();
  const { setText } = useCommentFormActions();

  const onCommentTextChange = useCallback((value: string) => {
    setText(value);
  }, [setText]);

  const onSendHandler = useCallback(() => {
    onSendComment(text || "");
    onCommentTextChange("");
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <HStack justify="between" max className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input
          className={cls.input}
          placeholder={t("Введите текст комментария")}
          value={text}
          onChange={onCommentTextChange}
        />
        <Button
          theme={ThemeButton.OUTLINE}
          onClick={onSendHandler}
        >
          {t("Send")}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
