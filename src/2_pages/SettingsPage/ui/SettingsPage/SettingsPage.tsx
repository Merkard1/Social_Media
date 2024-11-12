import { memo } from "react";
import { useTranslation } from "react-i18next";

import { Page } from "@/3_widgets/Page";

import { UiDesignSwitcher } from "@/4_features/uiDesignSwitcher";

import { Card } from "@/6_shared/ui/redesigned/Card/Card";
import { VStack } from "@/6_shared/ui/redesigned/Stack";
import { Text } from "@/6_shared/ui/redesigned/Text/Text";

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page>
      <Card>
        <VStack gap="16">
          <Text title={t("Settings")} />
          <UiDesignSwitcher />
        </VStack>
      </Card>
    </Page>
  );
});

export default SettingsPage;
