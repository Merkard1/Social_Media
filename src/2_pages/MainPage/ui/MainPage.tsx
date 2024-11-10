import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Page } from "@/3_widgets/Page";

import { ListBox } from "@/6_shared/ui/deprecated/Popups";
import { HStack } from "@/6_shared/ui/redesigned/Stack";

const MainPage = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState("");

  const onChange = (val: string) => {
    setValue(val);
  };

  return (
    <Page data-testid="MainPage">
      {t("Main")}
      <HStack>
        <ListBox onChange={onChange} />
      </HStack>
    </Page>
  );
};

export default memo(MainPage);
