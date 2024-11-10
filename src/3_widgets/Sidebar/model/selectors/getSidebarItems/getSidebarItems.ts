import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from "@/1_app/config/routeConfig/routeConfig";

import { getUserAuthData } from "@/5_entities/User";

import AboutIconDeprecated from "@/6_shared/assets/icons/about-20-20.svg";
import ArticleIconDeprecated from "@/6_shared/assets/icons/article-20-20.svg";
import ArticleIcon from "@/6_shared/assets/icons/article.svg";
import ProfileIcon from "@/6_shared/assets/icons/avatar.svg";
import MainIcon from "@/6_shared/assets/icons/home.svg";
import AboutIcon from "@/6_shared/assets/icons/Info.svg";
import MainIconDeprecated from "@/6_shared/assets/icons/main-20-20.svg";
import ProfileIconDeprecated from "@/6_shared/assets/icons/profile-20-20.svg";
import { toggleFeatures } from "@/6_shared/lib/features";

import { SidebarItemType } from "../../types/sidebar";

export const useSidebarItems = () => {
  const { t } = useTranslation();
  const userData = useSelector(getUserAuthData);
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: toggleFeatures({
        name: "isAppRedesigned",
        off: () => MainIconDeprecated,
        on: () => MainIcon,
      }),
      text: t("Main"),
    },
    {
      path: getRouteAbout(),
      Icon: toggleFeatures({
        name: "isAppRedesigned",
        off: () => AboutIconDeprecated,
        on: () => AboutIcon,
      }),
      text: t("About"),
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        Icon: toggleFeatures({
          name: "isAppRedesigned",
          off: () => ProfileIconDeprecated,
          on: () => ProfileIcon,
        }),
        text: t("Profile"),
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        Icon: toggleFeatures({
          name: "isAppRedesigned",
          off: () => ArticleIconDeprecated,
          on: () => ArticleIcon,
        }),
        text: t("Articles"),
        authOnly: true,
      },
    );
  }

  return sidebarItemsList;
};
