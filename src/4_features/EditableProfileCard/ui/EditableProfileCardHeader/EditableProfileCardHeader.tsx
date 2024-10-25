import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useUserAuthData } from "@/5_entities/User";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ThemeButton } from "@/6_shared/ui/Button";
import { HStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text";

import { useProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { useProfileReadOnly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { useProfile } from "../../model/slice/profileSlice";

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
  const {
    className,
  } = props;

  const { t } = useTranslation("profile");
  const authData = useUserAuthData();
  const profileData = useProfileData();
  const canEdit = authData?.id === profileData?.id;
  const readOnly = useProfileReadOnly();
  const dispatch = useAppDispatch();
  const { setReadonly, cancelEdit } = useProfile();

  const onEdit = useCallback(() => {
    setReadonly(false);
  }, [setReadonly]);

  const onCancelEdit = useCallback(() => {
    cancelEdit();
  }, [cancelEdit]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <HStack max justify="between" className={classNames("", {}, [className])}>
      <Text title={t("Profile")} />
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
