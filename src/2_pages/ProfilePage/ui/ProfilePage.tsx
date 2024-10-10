import { classNames } from "6_shared/lib/classNames/classNames";
import Page from "3_widgets/Page/Page";
import { VStack } from "6_shared/ui/Stack/VStack/VStack";
import { EditableProfileCard } from "4_features/EditableProfileCard";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
