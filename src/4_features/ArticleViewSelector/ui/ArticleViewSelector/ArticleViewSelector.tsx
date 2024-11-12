import { memo } from "react";

import { ArticleView } from "@/5_entities/Article";

import ListIcon from "@/6_shared/assets/icons/burger.svg";
import ListIconDeprecated from "@/6_shared/assets/icons/list-24-24.svg";
import TiledIcon from "@/6_shared/assets/icons/tile.svg";
import TiledIconDeprecated from "@/6_shared/assets/icons/tiled-24-24.svg";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures, toggleFeatures } from "@/6_shared/lib/features";
import Button, { ThemeButton } from "@/6_shared/ui/deprecated/Button/Button";
import { Icon as IconDeprecated } from "@/6_shared/ui/deprecated/Icon";
import { Card } from "@/6_shared/ui/redesigned/Card/Card";
import { Icon } from "@/6_shared/ui/redesigned/Icon/Icon";
import { HStack } from "@/6_shared/ui/redesigned/Stack";

import cls from "./ArticleViewSelector.module.scss";

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
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
    <Card
                className={classNames(
                  cls.ArticleViewSelectorRedesigned,
                  {},
                  [className],
                )}
                border="round"
              >
                <HStack gap="8">
                  {viewTypes.map((viewType) => (
                    <Icon
                      clickable
                      key={viewType.view}
                      onClick={onClick(viewType.view)}
                      Svg={viewType.icon}
                      className={classNames("", {
                        [cls.notSelected]: viewType.view !== view,
                      })}
                    />
                  ))}
                </HStack>
              </Card>
  );
});
