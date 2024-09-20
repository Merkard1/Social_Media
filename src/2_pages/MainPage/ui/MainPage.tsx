import Input from "6_shared/ui/Input/Input";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState("");

  const onChange = (val: string) => {
    setValue(val);
  };

  return (
    <div>
      {t("Главная страница")}
      <Input
        value={value}
        onChange={onChange}
        type="text"
        placeholder={t("Enter")}
      />
    </div>
  );
};

export default memo(MainPage);
