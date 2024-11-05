import { memo, useCallback } from "react";

import { useTheme } from "@/1_app/providers/ThemeProvider";

import { saveJsonSettings } from "@/5_entities/User";

import DarkIcon from "@/6_shared/assets/icons/theme-dark.svg";
import LightIcon from "@/6_shared/assets/icons/theme-light.svg";
import { Theme } from "@/6_shared/const/theme";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ThemeButton } from "@/6_shared/ui/Button";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onToggleHandler = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [dispatch, toggleTheme]);

  return (
    <Button
      theme={ThemeButton.CLEAR}
      className={classNames("", {}, [className])}
      onClick={onToggleHandler}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
});
