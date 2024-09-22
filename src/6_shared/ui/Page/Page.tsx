import { classNames } from "6_shared/lib/classNames/classNames";
import {
  memo, MutableRefObject, ReactNode, useRef,
} from "react";
import { useInfiniteScroll } from "6_shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import cls from "./Page.module.scss";

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  return (
    <section
      ref={wrapperRef}
      className={classNames(cls.Page, {}, [className])}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  );
});

export default Page;
