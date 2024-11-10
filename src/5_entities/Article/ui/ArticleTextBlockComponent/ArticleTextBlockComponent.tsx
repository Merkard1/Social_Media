import { memo } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures } from "@/6_shared/lib/features";
import TextDeprecated from "@/6_shared/ui/deprecated/Text/Text";
import { Text } from "@/6_shared/ui/redesigned/Text/Text";

import { ArticleTextBlock } from "../../model/types/article";

import cls from "./ArticleTextBlockComponent.module.scss";

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [
          className,
        ])}
      >
        {block.title && (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={<Text title={block.title} className={cls.title} />}
            off={
              <TextDeprecated
                title={block.title}
                className={cls.title}
              />
            }
          />
        )}
        {block.paragraphs.map((paragraph, index) => (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={
              <Text
                key={paragraph}
                text={paragraph}
                className={cls.paragraph}
              />
            }
            off={
              <TextDeprecated
                key={paragraph}
                text={paragraph}
                className={cls.paragraph}
              />
            }
          />
        ))}
      </div>
    );
  },
);
