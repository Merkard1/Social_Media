import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getUserAuthData } from "@/5_entities/User";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures } from "@/6_shared/lib/features";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from "@/6_shared/ui/deprecated/Button";
import TextDeprecated from "@/6_shared/ui/deprecated/Text/Text";
import { Button } from "@/6_shared/ui/redesigned/Button/Button";
import { Card } from "@/6_shared/ui/redesigned/Card/Card";
import { HStack } from "@/6_shared/ui/redesigned/Stack";
import { Text } from "@/6_shared/ui/redesigned/Text/Text";

import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { getProfileReadOnly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { profileActions } from "../../model/slice/profileSlice";

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
  (props: EditableProfileCardHeaderProps) => {
    const { className } = props;

    const { t } = useTranslation("profile");
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const readonly = useSelector(getProfileReadOnly);
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
      <Card padding="24" max border="partial">
                    <HStack
                      max
                      justify="between"
                      className={classNames("", {}, [className])}
                    >
                      <Text title={t("Profile")} />
                      {canEdit && (
                        <div>
                          {readonly ? (
                            <Button
                              onClick={onEdit}
                              data-testid="EditableProfileCardHeader.EditButton"
                            >
                              {t("Редактировать")}
                            </Button>
                          ) : (
                            <HStack gap="8">
                              <Button
                                onClick={onCancelEdit}
                                data-testid="EditableProfileCardHeader.CancelButton"
                                color="error"
                              >
                                {t("Отменить")}
                              </Button>
                              <Button
                                onClick={onSave}
                                data-testid="EditableProfileCardHeader.SaveButton"
                                color="success"
                              >
                                {t("Сохранить")}
                              </Button>
                            </HStack>
                          )}
                        </div>
                      )}
                    </HStack>
                  </Card>
    );
  },
);
