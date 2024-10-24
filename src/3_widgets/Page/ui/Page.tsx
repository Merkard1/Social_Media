import {
  memo, MutableRefObject, ReactNode, UIEvent, useRef,
} from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { StateSchema } from "@/1_app/providers/StoreProvider";

import { getScrollByPath, scrollRestorationActions } from "@/4_features/ScrollRestoration";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInfiniteScroll } from "@/6_shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useInitialEffect } from "@/6_shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useThrottle } from "@/6_shared/lib/hooks/useThrottle/useThrottle";

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
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) => getScrollByPath(state, pathname));

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = useThrottle((e: UIEvent<HTMLElement>) => {
    dispatch(scrollRestorationActions.setScrollPosition({
      position: e.currentTarget.scrollTop,
      path: pathname,
    }));
  }, 500);

  return (
    <main
      ref={wrapperRef}
      className={classNames(cls.Page, {}, [className])}
      onScroll={(e) => onScroll(e)}
    >
      {children}
      {onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
    </main>
  );
});

export default Page;
