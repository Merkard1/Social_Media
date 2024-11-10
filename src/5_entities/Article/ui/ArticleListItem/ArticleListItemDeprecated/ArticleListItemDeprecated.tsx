import { memo } from "react";
import { useTranslation } from "react-i18next";

import { getRouteArticleDetails } from "@/1_app/config/routeConfig/routeConfig";

import EyeIcon from "@/6_shared/assets/icons/eye-20-20.svg";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { AppLink } from "@/6_shared/ui/deprecated/AppLink";
import { Avatar } from "@/6_shared/ui/deprecated/Avatar";
import { Button, ThemeButton } from "@/6_shared/ui/deprecated/Button";
import { Card } from "@/6_shared/ui/deprecated/Card";
import { Icon } from "@/6_shared/ui/deprecated/Icon";
import Skeleton from "@/6_shared/ui/deprecated/Skeleton/Skeleton";
import Text from "@/6_shared/ui/deprecated/Text/Text";
import { AppImage } from "@/6_shared/ui/redesigned/AppImage/AppImage";

import {
  ArticleView,
  ArticleBlockType,
} from "../../../model/consts/articleConsts";
import { ArticleTextBlock } from "../../../model/types/article";
import { ArticleTextBlockComponent } from "../../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { ArticleListItemProps } from "../ArticleListItem";
import cls from "../ArticleListItem.module.scss";

export const ArticleListItemDeprecated = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();

  const types = <Text text={article.type.join(", ")} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <div
        data-testid="ArticleListItem"
        className={classNames(cls.ArticleListItem, {}, [
          className,
          cls[view],
        ])}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text
              text={article.user.username}
              className={cls.username}
            />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <AppImage
            fallback={<Skeleton width="100%" height={250} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <AppLink
              target={target}
              to={getRouteArticleDetails(article.id)}
            >
              <Button theme={ThemeButton.OUTLINE}>
                {t("Read more...")}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      data-testid="ArticleListItem"
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.ArticleListItem, {}, [
        className,
        cls[view],
      ])}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <AppImage
            fallback={<Skeleton width={200} height={200} />}
            alt={article.title}
            src={article.img}
            className={cls.img}
          />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  );
});
