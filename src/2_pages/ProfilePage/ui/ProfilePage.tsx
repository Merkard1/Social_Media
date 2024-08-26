import { useTranslation } from "react-i18next";
import { classNames } from "6_shared/lib/classNames/classNames";
import { DynamicModuleLoader, ReducersList } from "6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { fetchProfileData, ProfileCard, profileReducer } from "5_entities/Profile";
import { useAppDispatch } from "6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useEffect } from "react";
import cls from "./ProfilePage.module.scss";

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
 className?: string
}

const ProfilePage = ({ className } : ProfilePageProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ProfilePage, {}, [className])}>
        <ProfileCard />
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
