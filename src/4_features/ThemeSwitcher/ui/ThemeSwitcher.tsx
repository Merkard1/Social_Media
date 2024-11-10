import { memo, useCallback } from "react";

import { useTheme } from "@/1_app/providers/ThemeProvider";

import { saveJsonSettings } from "@/5_entities/User";

import ThemeIconDeprecated from "@/6_shared/assets/icons/theme-light.svg";
import ThemeIcon from "@/6_shared/assets/icons/theme.svg";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures } from "@/6_shared/lib/features";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ThemeButton } from "@/6_shared/ui/deprecated/Button";
import { Icon as IconDeprecated } from "@/6_shared/ui/deprecated/Icon";
import { Icon } from "@/6_shared/ui/redesigned/Icon/Icon";

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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />}
      off={
        <Button
          theme={ThemeButton.CLEAR}
          className={classNames("", {}, [className])}
          onClick={onToggleHandler}
        >
          <IconDeprecated
            Svg={ThemeIconDeprecated}
            width={40}
            height={40}
            inverted
          />
        </Button>
      }
    />
  );
});
