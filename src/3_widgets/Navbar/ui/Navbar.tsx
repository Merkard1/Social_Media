import { classNames } from '6_shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '6_shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';
import { Button, ThemeButton } from '6_shared/ui/Button/Button';
import { useCallback, useState } from 'react';
import Modal from '6_shared/ui/Modal/Modal';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        <Button
          theme={ThemeButton.CLEAR_INVERTED}
          className={cls.links}
          onClick={onToggleModal}
        >
          {t('войти')}
        </Button>
        <Modal isOpen={isAuthModal} onClose={onToggleModal}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium
          eius quasi, sequi sit maiores vitae voluptates totam ratione amet, sed
          tempore hic sunt dignissimos vero consequuntur? Non consequatur
          sapiente voluptatum?
        </Modal>
        <AppLink theme={AppLinkTheme.SECONDARY} to="/" className={cls.mainLink}>
          {t('Главная')}
        </AppLink>
        <AppLink theme={AppLinkTheme.RED} to="/about">
          {t('О сайте')}
        </AppLink>
      </div>
    </div>
  );
};
