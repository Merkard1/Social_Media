import { useTranslation } from "react-i18next";
import Select from "6_shared/ui/Select/Select";
import { memo, useCallback } from "react";
import { Currency } from "../../model/types/currency";

interface CurrencySelectProps {
  value?: Currency;
  onChange?: (value: string) => void,
  readOnly?: boolean,
}

const options = [
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

const CurrencySelect = memo(({ value, onChange, readOnly } : CurrencySelectProps) => {
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  return (
    <Select
      onChange={onChange}
      value={value}
      label={t("Currency")}
      options={options}
      readOnly={readOnly}
    />
  );
});

export default CurrencySelect;
