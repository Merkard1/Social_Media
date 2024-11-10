import { memo } from "react";
import { useTranslation } from "react-i18next";

import { CountrySelect } from "@/5_entities/Country";
import { CurrencySelect } from "@/5_entities/Currency";

import { Avatar } from "@/6_shared/ui/redesigned/Avatar/Avatar";
import { Card } from "@/6_shared/ui/redesigned/Card/Card";
import { Input } from "@/6_shared/ui/redesigned/Input/Input";
import { Skeleton } from "@/6_shared/ui/redesigned/Skeleton";
import { HStack, VStack } from "@/6_shared/ui/redesigned/Stack";
import { Text } from "@/6_shared/ui/redesigned/Text/Text";

import { ProfileCardProps } from "../ProfileCard";

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation();

  return (
    <Card max>
      <HStack max justify="center">
        <Text
          variant="error"
          title={t("Произошла ошибка при загрузке профиля")}
          text={t("Попробуйте обновить страницу")}
          align="center"
        />
      </HStack>
    </Card>
  );
};

export const ProfileCardRedesignedSkeleton = () => (
  <Card padding="24" max>
    <VStack gap="32">
      <HStack max justify="center">
        <Skeleton border="100%" width={128} height={128} />
      </HStack>
      <HStack gap="32" max>
        <VStack gap="16" max>
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
        </VStack>

        <VStack gap="16" max>
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
        </VStack>
      </HStack>
    </VStack>
  </Card>
);

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
  const {
    className,
    data,
    readOnly,
    onChangeFormField,
  } = props;
  const { t } = useTranslation("profile");

  return (
    <Card padding="24" border="partial" max className={className}>
      <VStack gap="32">
        {data?.avatar && (
          <HStack justify="center" max>
            <Avatar size={128} src={data?.avatar} />
          </HStack>
        )}
        <HStack gap="24" max>
          <VStack gap="16" max>
            <Input
              value={data?.name}
              label={`${t("Name")}:`}
              onChange={(value: string) => onChangeFormField("name", value)}
              readonly={readOnly}
            />
            <Input
              value={data?.lastname}
              label={`${t("Lastname")}:`}
              onChange={(value: string) => onChangeFormField("lastname", value)}
              readonly={readOnly}
            />
            <Input
              value={data?.age !== undefined ? String(data.age) : ""}
              label={`${t("Age")}:`}
              onChange={(value) => {
                const numericValue = Number(value);
                if (!Number.isNaN(numericValue) && numericValue >= 1) {
                  onChangeFormField("age", numericValue);
                }
              }}
              readonly={readOnly}
            />
          </VStack>
          <VStack gap="16" max>
            <Input
              value={data?.username}
              label={`${t("Username")}:`}
              onChange={(value: string) => onChangeFormField("username", value)}
              readonly={readOnly}
            />
            {/* TODO avatar with back  */}
            <CurrencySelect
              value={data?.currency}
              onChange={(value: string) => onChangeFormField("currency", value)}
              readonly={readOnly}
            />
            <CountrySelect
              value={data?.country}
              onChange={(value: string) => onChangeFormField("country", value)}
              readonly={readOnly}
            />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
});
