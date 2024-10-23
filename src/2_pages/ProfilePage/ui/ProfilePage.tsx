import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { classNames } from "@/6_shared/lib/classNames/classNames";

import { VStack } from "@/6_shared/ui/Stack/VStack/VStack";
import { EditableProfileCard } from "@/4_features/EditableProfileCard";
import { Page } from "@/3_widgets/Page";

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Page className={classNames("", {}, [className])}>
      <VStack gap="16" max>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
