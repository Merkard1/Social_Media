import { classNames } from "6_shared/lib/classNames/classNames";
import { DynamicModuleLoader, ReducersList } from "6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { fetchProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadOnly, getProfileValidationErrors, Profile, profileActions, ProfileCard, profileReducer } from "5_entities/Profile";
import { useAppDispatch } from "6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import Text, { TextTheme } from "6_shared/ui/Text/Text";
import { useInitialEffect } from "6_shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useParams } from "react-router-dom";
import Page from "6_shared/ui/Page/Page";
import cls from "./ProfilePage.module.scss";
import ProfilePageHeader from "./ProfilePageHeader/ProfilePageHeader";

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
 className?: string
}

const ProfilePage = ({ className } : ProfilePageProps) => {
  const dispatch = useAppDispatch();

  const form = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readOnly = useSelector(getProfileReadOnly);
  const validateErrors = useSelector(getProfileValidationErrors);
  const { id } = useParams<{ id: string }>();

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
    <Page>
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div className={classNames(cls.ProfilePage, {}, [className])}>
          <ProfilePageHeader />
          {validateErrors?.length && validateErrors.map((err) => (
            <Text theme={TextTheme.ERROR} text={err} key={err} />
          ))}
          <ProfileCard
            data={form}
            isLoading={isLoading}
            error={error}
            onChangeFormField={onChangeFormField}
            readOnly={readOnly}
          />
        </div>
      </DynamicModuleLoader>
    </Page>
  );
};

export default memo(ProfilePage);
