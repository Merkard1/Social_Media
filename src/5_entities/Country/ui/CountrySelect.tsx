import Select from "6_shared/ui/Select/Select";
import { useTranslation } from "react-i18next";
import { Country } from "../model/types/Country";

interface CountrySelectProps {
  onChange?: (value: string) => void,
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
    <Select
      onChange={onChange}
      value={value}
      label={t("Country")}
      options={options}
      readOnly={readOnly}
    />
  );
};

export default CountrySelect;
