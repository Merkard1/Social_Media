import { RoutePath } from "6_shared/config/routeConfig/routeConfig";
import { SVGProps, VFC } from "react";

import AboutIcon from "6_shared/assets/icons/AboutIcon.svg";
import MainIcon from "6_shared/assets/icons/MainIcon.svg";
import ProfileIcon from "6_shared/assets/icons/Profile.png";

export interface SidebarItemType {
  path: string,
  text: string,
  Icon: VFC<SVGProps<SVGSVGElement>>
}

export const SidebarItemsList : SidebarItemType[] = [
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
  {
    path: RoutePath.profile,
    text: "Profile Page",
    Icon: MainIcon,
  },
];
