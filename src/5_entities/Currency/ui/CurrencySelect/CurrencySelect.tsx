import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ToggleFeatures } from "@/6_shared/lib/features";
import { ListBox as ListBoxDeprecated } from "@/6_shared/ui/deprecated/Popups";
import { ListBox } from "@/6_shared/ui/redesigned/Popups";

import { Currency } from "../../model/consts/currencyConsts";

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

const CurrencySelect = memo(
  ({ className, value, onChange, readonly }: CurrencySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency);
      },
      [onChange],
    );

    const props = {
      className,
      value,
      defaultValue: t("Укажите валюту"),
      label: t("Укажите валюту"),
      items: options,
      onChange: onChangeHandler,
      readonly,
      direction: "top right" as const,
    };

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<ListBox {...props} />}
        off={<ListBoxDeprecated {...props} />}
      />
    );
  },
);

export default CurrencySelect;
