import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Page } from "@/3_widgets/Page";

import { ListBox } from "@/6_shared/ui/Popups";
import { HStack } from "@/6_shared/ui/Stack";

const MainPage = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState("");

  const onChange = (val: string) => {
    setValue(val);
  };

  return (
    <Page>
      {t("Главная страница")}
      <HStack>
        <ListBox onChange={onChange} />
      </HStack>
    </Page>
  );
};

export default memo(MainPage);
