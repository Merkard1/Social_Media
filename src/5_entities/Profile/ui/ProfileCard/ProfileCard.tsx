import { ToggleFeatures } from "@/6_shared/lib/features";

import { Profile } from "../../model/types/profile";

import { ProfileCardDeprecated,
  ProfileCardDeprecatedError,
  ProfileCardDeprecatedLoader } from "./ProfileCardDeprecated/ProfileCardDeprecated";
import { ProfileCardRedesigned,
  ProfileCardRedesignedError,
  ProfileCardRedesignedSkeleton } from "./ProfileCardRedesigned/ProfileCardRedesigned";

export interface ProfileCardProps {
  className?: string;
  data?: Profile | undefined | null;
  error?: string | undefined | null;
  isLoading?: boolean;
  readOnly?: boolean;
  onChangeFormField: any;
}

const ProfileCard = (props : ProfileCardProps) => {
  const { error, isLoading } = props;

  if (isLoading) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<ProfileCardRedesignedSkeleton />}
        off={<ProfileCardDeprecatedLoader />}
      />);
  }

  if (error) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<ProfileCardRedesignedError />}
        off={<ProfileCardDeprecatedError />}
      />);
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<ProfileCardRedesigned {...props} />}
      off={<ProfileCardDeprecated {...props} />}
    />
  );
};

export default ProfileCard;
