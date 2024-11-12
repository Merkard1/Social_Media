import { CSSProperties, memo } from "react";

import { classNames } from "@/6_shared/lib/classNames/classNames";

import cls from "./Skeleton.module.scss";

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
}

/**
 * Outdated, use new components from folder redesigned
 * @deprecated
 */

const Skeleton = memo((props: SkeletonProps) => {
  const {
    className,
    height,
    width,
    border,
  } = props;

  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return (
    <div
      className={classNames(cls.Skeleton, {}, [className])}
      style={styles}
    />
  );
});

export default Skeleton;