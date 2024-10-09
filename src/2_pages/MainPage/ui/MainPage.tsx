import Page from "3_widgets/Page/Page";
import Input from "6_shared/ui/Input/Input";
import { ListBox } from "6_shared/ui/ListBox/ListBox";
import { HStack } from "6_shared/ui/Stack";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

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
