import { createSelector } from "@reduxjs/toolkit";

import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from "@/1_app/config/routeConfig/routeConfig";

import { getUserAuthData } from "@/5_entities/User";

import AboutIcon from "@/6_shared/assets/icons/about-20-20.svg";
import ArticleIcon from "@/6_shared/assets/icons/article-20-20.svg";
import MainIcon from "@/6_shared/assets/icons/main-20-20.svg";
import ProfileIcon from "@/6_shared/assets/icons/profile-20-20.svg";

import { SidebarItemType } from "../../types/sidebar";

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemsList : SidebarItemType[] = [
      {
        path: getRouteMain(),
        text: "Main Page",
        Icon: MainIcon,
      },
      {
        path: getRouteAbout(),
        text: "About Page",
        Icon: AboutIcon,
      },
    ];

    if (userData) {
      sidebarItemsList.push(
        {
          path: getRouteProfile(userData.id),
          text: "Profile Page",
          Icon: ProfileIcon,
          authOnly: true,
        },
        {
          path: getRouteArticles(),
          text: "Articles Page",
          Icon: ArticleIcon,
          authOnly: true,
        },
      );
    }

    return sidebarItemsList;
  },
);
