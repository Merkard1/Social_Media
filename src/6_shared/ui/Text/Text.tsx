import { classNames, Mods } from "6_shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./Text.module.scss";

export enum TextTheme {
  PRIMARY = "primary",
  ERROR = "error",
}

export enum TextSize {
  M = "size_m",
  L = "size_l",
}

export enum TextAlign {
  LEFT ="left",
  CENTER ="center",
  RIGHT ="right",
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
}

const Text = memo((props: TextProps) => {
  const { className, title, text, theme = TextTheme.PRIMARY, align = TextAlign.CENTER, size = TextSize.M } = props;

  const mods: Mods = {};

  const additionalClasses = [className, cls[align], cls[theme]];

  return (
    <div className={classNames(cls.Text, mods, [...additionalClasses])}>
      {title && <div className={cls.title}>{title}</div>}
      {text && <div className={cls.text}>{text}</div>}
    </div>
  );
});
export default Text;
