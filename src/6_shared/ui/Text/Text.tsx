import cls from "./Text.module.scss";
import { classNames } from "6_shared/lib/classNames/classNames";

export enum TextTheme {
  PRIMARY = "primary",
  ERROR = "error",
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
}

const Text = (props: TextProps) => {
  const { className, title, text, theme = TextTheme.PRIMARY } = props;
  const mods = {
    [cls[theme]]: true,
  };
  return (
    <div className={classNames(cls.Text, mods, [className])}>
      {title && <div className={cls.title}>{title}</div>}
      {text && <div className={cls.text}>{text}</div>}
    </div>
  );
};

export default Text;
