import { classNames } from "6_shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { HStack } from "6_shared/ui/Stack";
import Text from "6_shared/ui/Text/Text";
import { Button, ThemeButton } from "6_shared/ui/Button/Button";
import { getUserAuthData } from "5_entities/User";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { profileActions } from "../../model/slice/profileSlice";
import { getProfileReadOnly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";

import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
  const {
    className,
  } = props;

  const { t } = useTranslation("profile");
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;
  const readOnly = useSelector(getProfileReadOnly);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <HStack max justify="between" className={classNames("", {}, [className])}>
      <Text title={t("Профиль")} />
      {canEdit && (
        <div>
          {readOnly
            ? (
              <Button
                theme={ThemeButton.OUTLINE}
                onClick={onEdit}
                data-testid="EditableProfileCardHeader.EditButton"
              >
                {t("Edit")}
              </Button>
            )
            : (
              <HStack gap="8">
                <Button
                  theme={ThemeButton.OUTLINE_RED}
                  onClick={onCancelEdit}
                  data-testid="EditableProfileCardHeader.CancelButton"
                >
                  {t("Cancel")}
                </Button>
                <Button
                  theme={ThemeButton.OUTLINE}
                  onClick={onSave}
                  data-testid="EditableProfileCardHeader.SaveButton"
                >
                  {t("Save")}
                </Button>
              </HStack>
            )}
        </div>
      )}
    </HStack>
  );
});
