import { classNames } from "@/6_shared/lib/classNames/classNames";
import "./Loader.scss";

interface LoaderProps {
  className?: string;
}

/**
 * Outdated, use new components from folder redesigned
 * @deprecated
 */

const Loader = ({ className }: LoaderProps) => (
  <div className={classNames("lds-ellipsis", {}, [className])}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Loader;
