import { classNames } from "6_shared/lib/classNames/classNames";
import { Button, ThemeButton } from "6_shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Text from "6_shared/ui/Text/Text";
import { useSelector } from "react-redux";
import { getProfileData, getProfileReadOnly, profileActions, updateProfileData } from "5_entities/Profile";
import { useCallback } from "react";
import { useAppDispatch } from "6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData } from "5_entities/User";
import cls from "./ProfilePageHeader.module.scss";

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
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t("Profile")} />
      {canEdit && (
        <div className={cls.btnsWrapper}>
          {readOnly ? (
            <Button
              className={cls.editBtn}
              theme={ThemeButton.OUTLINE}
              onClick={onEdit}
            >
              {t("Edit")}
            </Button>
          ) : (
            <>
              <Button
                className={cls.editBtn}
                theme={ThemeButton.OUTLINE}
                onClick={onSave}
              >
                {t("Save")}
              </Button>
              <Button
                className={cls.editBtn}
                theme={ThemeButton.OUTLINE_RED}
                onClick={onCancelEdit}
              >
                {t("Cancel")}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePageHeader;
