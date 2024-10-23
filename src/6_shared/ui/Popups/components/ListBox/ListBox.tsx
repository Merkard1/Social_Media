import { Listbox as HListBox } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { HStack } from "@/6_shared/ui/Stack";

import { DropdownDirection } from "../../styles/consts";

import cls from "./ListBox.module.scss";

// TODO MB add floating UI

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readOnly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  [DropdownDirection.BL]: cls.optionsBottomLeft,
  [DropdownDirection.BR]: cls.optionsBottomRight,
  [DropdownDirection.TR]: cls.optionsTopRight,
  [DropdownDirection.TL]: cls.optionsTopLeft,
};

export function ListBox(props: ListBoxProps) {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readOnly,
    direction = DropdownDirection.BL,
    label,
  } = props;

  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        disabled={readOnly}
        as="div"
        className={classNames(cls.ListBox, {}, [className])}
        value={value}
        onChange={onChange}
      >
        {/* TODO mb error? */}
        <HListBox.Button className={cls.trigger}>
          {value ?? defaultValue}
        </HListBox.Button>
        <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    cls.item,
                    {
                      [cls.active]: active,
                      [cls.disabled]: item.disabled,
                    },
                  )}
                >
                  {selected && "TODO icon / css color"}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
}
