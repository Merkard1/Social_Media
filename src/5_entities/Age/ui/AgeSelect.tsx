import Select from "6_shared/ui/Select/Select";
import { useTranslation } from "react-i18next";
import { ListBox } from "6_shared/ui/ListBox/ListBox";
import { Age } from "../model/types/Age";

interface CountrySelectProps {
  onChange: (value: string) => void,
  value?: Age,
  lavel?: string,
  readOnly?: boolean
}

const options = [
  { value: Age.Underaged, content: "18 < " },
  { value: Age.Age18, content: "18" },
  { value: Age.Age19, content: "19" },
  { value: Age.Age20, content: "20" },
  { value: Age.Age21, content: "21" },
  { value: Age.Age22, content: "22" },
  { value: Age.Age23, content: "23" },
  { value: Age.Age24, content: "24" },
  { value: Age.Age25, content: "25" },
  { value: Age.Age26, content: "26" },
  { value: Age.Age27, content: "27" },
  { value: Age.Age28, content: "28" },
  { value: Age.Age29, content: "29" },
  { value: Age.Age30, content: "30" },
  { value: Age.Age31, content: "31" },
  { value: Age.Age32, content: "32" },
  { value: Age.Age33, content: "33" },
  { value: Age.Age34, content: "34" },
  { value: Age.Age35, content: "35" },
  { value: Age.Age36, content: "36" },
  { value: Age.Age37, content: "37" },
  { value: Age.Age38, content: "38" },
  { value: Age.Age39, content: "39" },
  { value: Age.Age40, content: "40" },
  { value: Age.Age41, content: "41" },
  { value: Age.Age42, content: "42" },
  { value: Age.Age43, content: "43" },
  { value: Age.Age44, content: "44" },
  { value: Age.Age45, content: "45" },
  { value: Age.Age46, content: "46" },
  { value: Age.Age47, content: "47" },
  { value: Age.Age48, content: "48" },
  { value: Age.Age49, content: "49" },
  { value: Age.Age50, content: "50" },
  { value: Age.Age51, content: "51" },
  { value: Age.Age52, content: "52" },
  { value: Age.Age53, content: "53" },
  { value: Age.Age54, content: "54" },
  { value: Age.Age55, content: "55" },
  { value: Age.Age56, content: "56" },
  { value: Age.Age57, content: "57" },
  { value: Age.Age58, content: "58" },
  { value: Age.Age59, content: "59" },
  { value: Age.Age60, content: "60" },
  { value: Age.Elder, content: " > 60" },
];

const CountrySelect = (props : CountrySelectProps) => {
  const { t } = useTranslation();
  const { onChange, lavel, readOnly, value } = props;
  return (
    <ListBox
      label={t("Age")}
      value={value as string}
      items={options}
      onChange={onChange}
      defaultValue={t("Currency")}
      readonly={readOnly}
    />
  );
};

export default CountrySelect;
