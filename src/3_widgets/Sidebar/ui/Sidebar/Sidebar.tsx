import { classNames } from '6_shared/lib/classNames/classNames';
import { useState } from 'react';
import { ThemeSwitcher } from '6_shared/ui/ThemeSwitcher';
import { LangSwitcher } from '6_shared/ui/LangSwitcher/LangSwitcher';
import { Button, ButtonSize, ThemeButton } from '6_shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from '6_shared/ui/AppLink/AppLink';
import { RoutePath } from '6_shared/config/routeConfig/routeConfig';
import AboutIcon from '6_shared/assets/icons/AboutIcon.svg';
import MainIcon from '6_shared/assets/icons/MainIcon.svg';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <div className={cls.items}>
        <div className={cls.item}>
          <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={RoutePath.main}
            className={cls.link}
          >
            <MainIcon className={cls.icon} />
            <span>{t('Главная')}</span>
          </AppLink>
        </div>
        <div className={cls.item}>
          <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={RoutePath.about}
            className={cls.link}
          >
            <AboutIcon className={cls.icon} />
            <span>{t('О Сайте')}</span>
          </AppLink>
        </div>
      </div>
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        theme={ThemeButton.BACKGROUND_INVERTED}
        square
        size={ButtonSize.XL}
      >
        {collapsed ? '>' : '<'}
      </Button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.lang} />
      </div>
    </div>
  );
};
