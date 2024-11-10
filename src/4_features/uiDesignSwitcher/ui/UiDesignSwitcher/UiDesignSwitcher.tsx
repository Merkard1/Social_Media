import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getUserAuthData } from "@/5_entities/User";

import { updateFeatureFlag, getFeatureFlag } from "@/6_shared/lib/features";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useForceUpdate } from "@/6_shared/lib/render/forceUpdate";
import { ListBox } from "@/6_shared/ui/redesigned/Popups";
import { Skeleton } from "@/6_shared/ui/redesigned/Skeleton";
import { HStack } from "@/6_shared/ui/redesigned/Stack";
import { Text } from "@/6_shared/ui/redesigned/Text/Text";

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const isAppRedesigned = getFeatureFlag("isAppRedesigned");
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState(false);
  const forceUpdate = useForceUpdate();

  const items = [
    {
      content: t("Новый"),
      value: "new",
    },
    {
      content: t("Старый"),
      value: "old",
    },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);
      await dispatch(
        updateFeatureFlag({
          userId: authData.id,
          newFeatures: {
            isAppRedesigned: value === "new",
          },
        }),
      ).unwrap();
      setIsLoading(false);
      forceUpdate();
    }
  };

  return (
    <HStack>
      <Text text={t("Вариант интерфейса")} />
      {isLoading ? (
        <Skeleton width={100} height={40} />
      ) : (
        <ListBox
          onChange={onChange}
          items={items}
          value={isAppRedesigned ? "new" : "old"}
          className={className}
        />
      )}
    </HStack>
  );
});
