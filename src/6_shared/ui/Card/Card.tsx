import { classNames } from "6_shared/lib/classNames/classNames";
import { HTMLAttributes, memo, ReactNode } from "react";
import cls from "./Card.module.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}

const Card = memo((props: CardProps) => {
  const { className, children, ...otherProps } = props;

  return (
    <div
      className={classNames(cls.Card, {}, [className])}
      {...otherProps}
    >
      {children}
    </div>
  );
});

export default Card;
