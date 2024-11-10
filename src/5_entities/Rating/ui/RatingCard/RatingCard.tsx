import { memo, useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { useTranslation } from "react-i18next";

import { ToggleFeatures } from "@/6_shared/lib/features";
import {
  Button as ButtonDeprecated,
  ButtonSize,
  ThemeButton,
} from "@/6_shared/ui/deprecated/Button";
import { Card as CardDeprecated } from "@/6_shared/ui/deprecated/Card";
import { Input as InputDeprecated } from "@/6_shared/ui/deprecated/Input";
import { StarRating } from "@/6_shared/ui/deprecated/StarRating";
import TextDepreacetd from "@/6_shared/ui/deprecated/Text/Text";
import { Button } from "@/6_shared/ui/redesigned/Button/Button";
import { Card } from "@/6_shared/ui/redesigned/Card/Card";
import { Drawer } from "@/6_shared/ui/redesigned/Drawer/Drawer";
import { Input } from "@/6_shared/ui/redesigned/Input/Input";
import { Modal } from "@/6_shared/ui/redesigned/Modal/Modal";
import { HStack, VStack } from "@/6_shared/ui/redesigned/Stack";
import { Text } from "@/6_shared/ui/redesigned/Text/Text";

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    onAccept,
    feedbackTitle,
    hasFeedback,
    onCancel,
    title,
    rate = 0,
  } = props;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState("");

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept],
  );

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <>
          <Text title={feedbackTitle} />
          <Input
            data-testid="RatingCard.Input"
            value={feedback}
            onChange={setFeedback}
            placeholder={t("Ваш отзыв")}
          />
        </>
      }
      off={
        <>
          <TextDepreacetd title={feedbackTitle} />
          <InputDeprecated
            data-testid="RatingCard.Input"
            value={feedback}
            onChange={setFeedback}
            placeholder={t("Ваш отзыв")}
          />
        </>
      }
    />
  );

  const content = (
    <>
      <VStack align="center" gap="8" max>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Text
              title={starsCount ? t("Thanks for your rating!") : title}
            />
          }
          off={
            <TextDepreacetd
              title={starsCount ? t("Thanks for your rating!") : title}
            />
          }
        />
        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectStars}
        />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack max gap="32">
            {modalContent}
            <ToggleFeatures
              feature="isAppRedesigned"
              on={
                <HStack max gap="16" justify="end">
                  <Button
                    data-testid="RatingCard.Close"
                    onClick={cancelHandle}
                  >
                    {t("Закрыть")}
                  </Button>
                  <Button
                    data-testid="RatingCard.Send"
                    onClick={acceptHandle}
                  >
                    {t("Отправить")}
                  </Button>
                </HStack>
              }
              off={
                <HStack max gap="16" justify="end">
                  <ButtonDeprecated
                    data-testid="RatingCard.Close"
                    onClick={cancelHandle}
                    theme={ThemeButton.OUTLINE_RED}
                  >
                    {t("Закрыть")}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    data-testid="RatingCard.Send"
                    onClick={acceptHandle}
                  >
                    {t("Отправить")}
                  </ButtonDeprecated>
                </HStack>
              }
            />
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
          <VStack gap="32">
            {modalContent}
            <ToggleFeatures
              feature="isAppRedesigned"
              on={
                <Button
                  fullWidth
                  onClick={acceptHandle}
                  size="l"
                >
                  {t("Отправить")}
                </Button>
              }
              off={
                <ButtonDeprecated
                  fullWidth
                  onClick={acceptHandle}
                  size={ButtonSize.L}
                >
                  {t("Отправить")}
                </ButtonDeprecated>
              }
            />
          </VStack>
        </Drawer>
      </MobileView>
    </>
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card max border="partial" padding="24">
          {content}
        </Card>
      }
      off={
        <CardDeprecated
          className={className}
          max
          data-testid="RatingCard"
        >
          {content}
        </CardDeprecated>
      }
    />
  );
});
