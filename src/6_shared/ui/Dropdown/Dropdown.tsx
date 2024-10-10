import { Menu } from "@headlessui/react";
import { classNames } from "6_shared/lib/classNames/classNames";
import { Fragment, ReactNode } from "react";
import { AppLink } from "../AppLink/AppLink";
import cls from "./Dropdown.module.scss";

export enum DropdownDirection {
  TL = "top left",
  TR = "top right",
  BL = "bottom left",
  BR = "bottom right",
}

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  direction?: DropdownDirection;
  trigger: ReactNode;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  [DropdownDirection.BL]: cls.optionsBottomLeft,
  [DropdownDirection.BR]: cls.optionsBottomRight,
  [DropdownDirection.TR]: cls.optionsTopRight,
  [DropdownDirection.TL]: cls.optionsTopLeft,
};

export function Dropdown(props: DropdownProps) {
  const { className, trigger, items, direction = DropdownDirection.BL } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
      <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
        {items.map((item, index) => {
          const content = ({ active }: { active: boolean }) => (
            <div
              role="button"
              tabIndex={0}
              onClick={item.onClick}
              onKeyDown={(e) => e.key === "Enter" && item.onClick?.()}
              className={classNames(cls.item, { [cls.active]: active })}
            >
              {item.content}
            </div>
          );

          if (item.href) {
            return (
              <Menu.Item as={AppLink} to={item.href} disabled={item.disabled} key={item.href}>
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item as={Fragment} disabled={item.disabled} key={index}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}
