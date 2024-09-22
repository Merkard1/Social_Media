import { getUserAuthData } from "5_entities/User";
import { createSelector } from "@reduxjs/toolkit";
import { RoutePath } from "6_shared/config/routeConfig/routeConfig";

import AboutIcon from "6_shared/assets/icons/AboutIcon.svg";
import MainIcon from "6_shared/assets/icons/MainIcon.svg";
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
          Icon: MainIcon,
          authOnly: true,
        },
        {
          path: RoutePath.articles,
          text: "Articles Page",
          Icon: MainIcon,
          authOnly: true,
        },
      );
    }

    return sidebarItemsList;
  },
);
