import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { useInitialEffect } from "@/6_shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Text, TextTheme } from "@/6_shared/ui/Text";
import { ProfileCard } from "@/5_entities/Profile";
import { DynamicModuleLoader, ReducersList } from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { VStack } from "@/6_shared/ui/Stack";
import { ValidateProfileError } from "../../model/consts/consts";
import { getProfileForm } from "../../model/selectors/getProfileForm/getProfileForm";
import { getProfileIsLoading } from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import { getProfileError } from "../../model/selectors/getProfileError/getProfileError";
import { getProfileReadOnly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";
import { getProfileValidateErrors } from "../../model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import { fetchProfileData } from "../../model/services/fetchProfileData/fetchProfileData";
import { profileActions, profileReducer } from "../../model/slice/profileSlice";
import { EditableProfileCardHeader } from "../EditableProfileCardHeader/EditableProfileCardHeader";

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
  profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { className, id } = props;
  const { t } = useTranslation("profile");

  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readOnly = useSelector(getProfileReadOnly);
  const validateErrors = useSelector(getProfileValidateErrors);

  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t("Server Error"),
    [ValidateProfileError.INCORRECT_COUNTRY]: t("Incorrect country"),
    [ValidateProfileError.NO_DATA]: t("No Data"),
    [ValidateProfileError.INCORRECT_USER_DATA]: t("Incorrect user data"),
    [ValidateProfileError.INCORRECT_AGE]: t("Incrorrect age"),
  };

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  const onChangeFormField = useCallback(
    (field: string, value: string | number) => {
      dispatch(profileActions.updateProfile({ [field]: value }));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VStack
        gap="8"
        max
        className={classNames("", {}, [className])}
      >
        <EditableProfileCardHeader />
        {validateErrors?.length && validateErrors.map((err: ValidateProfileError) => (
          <Text
            key={err}
            theme={TextTheme.ERROR}
            text={validateErrorTranslates[err]}
            data-testid="EditableProfileCard.Error"
          />
        ))}
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          readOnly={readOnly}
          onChangeFormField={onChangeFormField}
        />
      </VStack>
    </DynamicModuleLoader>
  );
});
