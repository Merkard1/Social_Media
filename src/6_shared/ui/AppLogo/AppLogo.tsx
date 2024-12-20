import React, { memo } from "react";

import AppSvg from "@/6_shared/assets/icons/app-image.svg";
import { classNames } from "@/6_shared/lib/classNames/classNames";

import { HStack } from "../Stack";

import cls from "./AppLogo.module.scss";

interface AppLogoProps {
    className?: string;
    size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => (
  <HStack
    max
    justify="center"
    className={classNames(cls.appLogoWrapper, {}, [className])}
  >
    <AppSvg
      width={size}
      height={size}
      // color="#74a2b2"
      className={cls.appLogo}
    />
    <div className={cls.gradientBig} />
    <div className={cls.gradientSmall} />
  </HStack>
));
