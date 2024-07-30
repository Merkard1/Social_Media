import { Counter } from "5_entities/Counter";
import Input from "6_shared/ui/Input/Input";
import { useState } from "react";
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
      <Counter />
      <Input
        value={value}
        onChange={onChange}
        type="text"
        placeholder={"Enter"}
      />
    </div>
  );
};

export default MainPage;
