import { Button, ThemeButton } from "6_shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Text from "6_shared/ui/Text/Text";
import { useSelector } from "react-redux";
import { getProfileData, getProfileReadOnly, profileActions, updateProfileData } from "5_entities/Profile";
import { useCallback } from "react";
import { useAppDispatch } from "6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData } from "5_entities/User";
import { HStack } from "6_shared/ui/Stack";

interface ProfilePageHeaderProps {
 className?: string
}

const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const readOnly = useSelector(getProfileReadOnly);
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);

  const canEdit = authData?.id === profileData?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadOnly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <HStack justify="between" max>
      <Text title={t("Profile")} />
      {canEdit && (
        <div>
          {readOnly ? (
            <Button
              theme={ThemeButton.OUTLINE}
              onClick={onEdit}
            >
              {t("Edit")}
            </Button>
          ) : (
            <HStack gap="8">
              <Button
                theme={ThemeButton.OUTLINE}
                onClick={onSave}
              >
                {t("Save")}
              </Button>
              <Button
                theme={ThemeButton.OUTLINE_RED}
                onClick={onCancelEdit}
              >
                {t("Cancel")}
              </Button>
            </HStack>
          )}
        </div>
      )}
    </HStack>
  );
};

export default ProfilePageHeader;
