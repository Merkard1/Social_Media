import { useTranslation } from "react-i18next";
import { ListBox } from "6_shared/ui/ListBox/ListBox";
import { DropdownDirection } from "6_shared/ui/Dropdown/Dropdown";
import { Country } from "../model/types/Country";

interface CountrySelectProps {
  onChange: (value: string) => void,
  value?: Country,
  lavel?: string,
  readOnly?: boolean
}

const options = [
  { value: Country.ES, content: Country.ES },
  { value: Country.US, content: Country.US },
];

const CountrySelect = (props : CountrySelectProps) => {
  const { t } = useTranslation();
  const { onChange, lavel, readOnly, value } = props;
  return (
    <ListBox
      label={t("Country")}
      value={value}
      items={options}
      onChange={onChange}
      defaultValue={t("Currency")}
      readonly={readOnly}
      direction={DropdownDirection.TR}
    />
  );
};

export default CountrySelect;
