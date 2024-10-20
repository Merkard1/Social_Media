import { useTranslation } from "react-i18next";
import { ListBox } from "6_shared/ui/ListBox/ListBox";

import { DropdownDirection } from "6_shared/ui/Popups";
import { Country } from "../model/consts/countryConsts";

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
      readOnly={readOnly}
      direction={DropdownDirection.TR}
    />
  );
};

export default CountrySelect;
