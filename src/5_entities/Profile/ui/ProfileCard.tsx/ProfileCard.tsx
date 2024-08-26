import { useTranslation } from "react-i18next";
import { classNames } from "6_shared/lib/classNames/classNames";
import { useSelector } from "react-redux";
import { getProfileData } from "5_entities/Profile/model/selectors/getProfileData/getProfileData";
import { getProfileError } from "5_entities/Profile/model/selectors/getProfileError/getProfileError";
import { Button, ThemeButton } from "6_shared/ui/Button/Button";

import Text from "6_shared/ui/Text/Text";
import Input from "6_shared/ui/Input/Input";
import cls from "./ProfileCard.module.scss";

interface ProfileCardProps {
 className?: string
}

const ProfileCard = ({ className } : ProfileCardProps) => {
  const { t } = useTranslation("profile");
  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileError);
  const error = useSelector(getProfileError);

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t("Профиль")} />
        <Button
          className={cls.editBtn}
          theme={ThemeButton.OUTLINE}
        >
          {t("Редактировать")}
        </Button>
      </div>
      <div className={cls.data}>
        <Input
          value={data?.name}
          placeholder={t("Ваше имя")}
          className={cls.input}
        />
        <Input
          value={data?.lastname}
          placeholder={t("Ваша фамилия")}
          className={cls.input}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
