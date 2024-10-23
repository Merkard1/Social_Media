import { createSelector } from "@reduxjs/toolkit";

import AboutIcon from "@/6_shared/assets/icons/about-20-20.svg";
import ArticleIcon from "@/6_shared/assets/icons/article-20-20.svg";
import MainIcon from "@/6_shared/assets/icons/main-20-20.svg";
import ProfileIcon from "@/6_shared/assets/icons/profile-20-20.svg";

import { getUserAuthData } from "@/5_entities/User";

import { RoutePath } from "@/1_app/config/routeConfig/routeConfig";

import { SidebarItemType } from "../../types/sidebar";

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemsList : SidebarItemType[] = [
      {
        path: RoutePath.main,
        text: "Main Page",
        Icon: MainIcon,
      },
      {
        path: RoutePath.about,
        text: "About Page",
        Icon: AboutIcon,
      },
    ];

    if (userData) {
      sidebarItemsList.push(
        {
          path: RoutePath.profile + userData.id,
          text: "Profile Page",
          Icon: ProfileIcon,
          authOnly: true,
        },
        {
          path: RoutePath.articles,
          text: "Articles Page",
          Icon: ArticleIcon,
          authOnly: true,
        },
      );
    }

    return sidebarItemsList;
  },
);
