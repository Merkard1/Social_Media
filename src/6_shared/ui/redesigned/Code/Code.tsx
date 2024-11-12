import { memo, useCallback } from "react";

import CopyIcon from "@/6_shared/assets/icons/copy-20-20.svg";
import CopyIconNew from "@/6_shared/assets/icons/copy.svg";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures } from "@/6_shared/lib/features";

import { Button, ThemeButton } from "../../deprecated/Button";
import { Icon } from "../Icon/Icon";

import cls from "./Code.module.scss";

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre
                className={classNames(cls.CodeRedesigned, {}, [className])}
              >
                <Icon
                  clickable
                  onClick={onCopy}
                  className={cls.copyBtn}
                  Svg={CopyIconNew}
                />
                <code>{text}</code>
              </pre>
  );
});
