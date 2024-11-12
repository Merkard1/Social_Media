import { memo, useState } from "react";

import StarIcon from "@/6_shared/assets/icons/star.svg";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { toggleFeatures, ToggleFeatures } from "@/6_shared/lib/features";

import { Icon } from "../../redesigned/Icon/Icon";
import IconDeprecated from "../Icon/Icon";

import cls from "./StarRating.module.scss";

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * Outdated, use new components from folder redesigned
 * @deprecated
 */

const StarRating = memo((props: StarRatingProps) => {
  const { className, size = 30, selectedStars = 0, onSelect } = props;
  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setIsSelected(true);
    }
  };

  return (
    <div
      className={classNames(
        cls.StarRatingRedesigned,
        {},
        [className],
      )}
    >
      {stars.map((starNumber) => {
        const commonProps = {
          className: classNames(
            cls.starIcon,
            { [cls.selected]: isSelected },
            [
              currentStarsCount >= starNumber
                ? cls.hovered
                : cls.normal,
            ],
          ),
          Svg: StarIcon,
          key: starNumber,
          width: size,
          height: size,
          onMouseLeave: onLeave,
          onMouseEnter: onHover(starNumber),
          onClick: onClick(starNumber),
          "data-testid": `StarRating.${starNumber}`,
          "data-selected": currentStarsCount >= starNumber,
        };
        return (
          <Icon clickable={!isSelected} {...commonProps} />
        );
      })}
    </div>
  );
});

export default StarRating;
