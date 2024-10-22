import React, { memo } from "react";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import cls from "./Icon.module.scss";

interface IconProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
    width?:number;
    height?:number;
    onMouseLeave?:() => void;
    onMouseEnter?:() => void;
    onClick?: () => void
}

export const Icon = memo((props: IconProps) => {
  const { className, Svg, inverted, ...otherProps } = props;

  return (
    <Svg
      className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])}
      {...otherProps}
    />
  );
});
