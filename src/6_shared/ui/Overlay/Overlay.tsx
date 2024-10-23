import { memo } from "react";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import cls from "./Overlay.module.scss";

interface OverlayProps {
    className?: string;
    onClick?: () => void;
}

const Overlay = memo((props: OverlayProps) => {
  const { className, onClick } = props;

  return (
    <div onClick={onClick} className={classNames(cls.Overlay, {}, [className])} />
  );
});

export default Overlay;
