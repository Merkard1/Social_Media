import { memo } from "react";

import { Theme, useTheme } from "@/1_app/providers/ThemeProvider";

import DarkIcon from "@/6_shared/assets/icons/theme-dark.svg";
import LightIcon from "@/6_shared/assets/icons/theme-light.svg";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Button, ThemeButton } from "@/6_shared/ui/Button";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      theme={ThemeButton.CLEAR}
      className={classNames("", {}, [className])}
      onClick={toggleTheme}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
});
