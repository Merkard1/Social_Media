import { classNames } from "6_shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import cls from "./Avatar.module.scss";

interface AvatarProps {
 className?: string,
 src?: string,
 size?: number,
 alt?: string
}

const Avatar = (props : AvatarProps) => {
  const { t } = useTranslation();
  const { className, src, size = 100, alt = "Avatar" } = props;
  const styles = useMemo(() => ({
    width: size,
    height: size,
  }), [size]);

  return (
    <img
      className={classNames(cls.Avatar, {}, [className])}
      src={src}
      alt={t(alt)}
      style={styles}
    />
  );
};

export default Avatar;
