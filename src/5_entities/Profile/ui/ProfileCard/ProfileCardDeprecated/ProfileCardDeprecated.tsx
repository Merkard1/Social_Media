import { memo } from "react";
import { useTranslation } from "react-i18next";

import { CountrySelect } from "@/5_entities/Country";
import { CurrencySelect } from "@/5_entities/Currency";

import { classNames, Mods } from "@/6_shared/lib/classNames/classNames";
import { Avatar as AvatarDeprecated } from "@/6_shared/ui/deprecated/Avatar";
import { Input as InputDeprecated } from "@/6_shared/ui/deprecated/Input";
import { Loader } from "@/6_shared/ui/deprecated/Loader";
import TextDeprecated, { TextAlign, TextTheme } from "@/6_shared/ui/deprecated/Text/Text";
import { HStack, VStack } from "@/6_shared/ui/redesigned/Stack";

import { ProfileCardProps } from "../ProfileCard";

import cls from "./ProfileCardDeprecated.module.scss";

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation();

  return (
    <HStack
      justify="center"
      max
      className={classNames(cls.ProfileCard, {}, [cls.error])}
    >
      <TextDeprecated
        theme={TextTheme.ERROR}
        title={t("Произошла ошибка при загрузке профиля")}
        text={t("Попробуйте обновить страницу")}
        align={TextAlign.CENTER}
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedLoader = () => (
  <HStack
    justify="center"
    max
    className={classNames(cls.ProfileCard, { [cls.loading]: true })}
  >
    <Loader />
  </HStack>
);

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
  const {
    className,
    data,
    readOnly,
    onChangeFormField,
  } = props;
  const { t } = useTranslation("profile");

  const mods: Mods = {
    [cls.editing]: !readOnly,
  };

  return (
    <VStack
      gap="8"
      max
      className={classNames(cls.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack justify="center" max className={cls.avatarWrapper}>
          <AvatarDeprecated src={data?.avatar} />
        </HStack>
      )}
      <InputDeprecated
        value={data?.username}
        placeholder={t("Your username")}
        className={cls.input}
        onChange={(value: string) => onChangeFormField("username", value)}
        readOnly={readOnly}
      />
      <InputDeprecated
        value={data?.name}
        placeholder={t("Your Firstname")}
        className={cls.input}
        onChange={(value: string) => onChangeFormField("name", value)}
        readOnly={readOnly}
        data-testid="ProfileCard.name"
      />
      <InputDeprecated
        value={data?.lastname}
        placeholder={t("Your Lastname")}
        className={cls.input}
        onChange={(value: string) => onChangeFormField("lastname", value)}
        readOnly={readOnly}
        data-testid="ProfileCard.lastname"
      />
      <InputDeprecated
        value={data?.age !== undefined ? String(data.age) : ""}
        placeholder={t("Your Age")}
        className={cls.input}
        onChange={(value) => {
          const numericValue = Number(value);
          if (!Number.isNaN(numericValue) && numericValue >= 1) {
            onChangeFormField("age", numericValue);
          }
        }}
        readOnly={readOnly}
      />
      <InputDeprecated
        value={data?.city}
        placeholder={t("Your city")}
        className={cls.input}
        onChange={(value: string) => onChangeFormField("city", value)}
        readOnly={readOnly}
      />
      {/* TODO avatar with back  */}
      <CurrencySelect
        className={cls.input}
        value={data?.currency}
        onChange={onChangeFormField}
        readonly={readOnly}
      />
      <CountrySelect
        className={cls.input}
        value={data?.country}
        onChange={onChangeFormField}
        readonly={readOnly}
      />
    </VStack>
  );
});
