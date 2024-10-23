import { memo } from "react";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import ListIcon from "@/6_shared/assets/icons/list-24-24.svg";
import TiledIcon from "@/6_shared/assets/icons/tiled-24-24.svg";
import { Icon } from "@/6_shared/ui/Icon";
import { Button, ThemeButton } from "@/6_shared/ui/Button";
import { ArticleView } from "../../model/consts/articleConsts";
import cls from "./ArticleViewSelector.module.scss";

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView,
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TiledIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          key={viewType.view}
          theme={ThemeButton.CLEAR}
          onClick={onClick(viewType.view)}
        >
          <Icon
            Svg={viewType.icon}
            className={classNames("", { [cls.notSelected]: viewType.view !== view })}
          />
        </Button>
      ))}
    </div>
  );
});
