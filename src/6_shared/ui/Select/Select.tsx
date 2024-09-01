import { classNames, Mods } from "6_shared/lib/classNames/classNames";
import { ChangeEvent, memo, useCallback, useMemo } from "react";
import cls from "./Select.module.scss";

export interface SelectOption {
  value: string | number,
  content: string | number
}

interface SelectProps {
 className?: string,
 label?: string | number,
 options?: SelectOption[];
 value?: string ;
 onChange?: (value: string) => void,
 readOnly?: boolean
}

const Select = memo((props : SelectProps) => {
  const { className, label, options, value, onChange, readOnly } = props;

  const optionsList = useMemo(() => options?.map((opt) => (
    <option className={cls.option} value={opt.value} key={opt.value}>{opt.content}</option>
  )), [options]);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  }, [onChange]);

  return (
    <div className={classNames(cls.Select, {}, [className])}>
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <select className={cls.select} value={value} onChange={onChangeHandler} disabled={readOnly}>
        {optionsList}
      </select>
    </div>
  );
});

export default Select;
