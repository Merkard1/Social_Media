import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { ListBox } from "6_shared/ui/ListBox/ListBox";
import { Currency } from "../../model/consts/currencyConsts";

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
    <ListBox
      label={t("Currency")}
      value={value}
      items={options}
      onChange={onChangeHandler}
      defaultValue={t("Currency")}
      readonly={readOnly}
    />
  );
});

export default CurrencySelect;
