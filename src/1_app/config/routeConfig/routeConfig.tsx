import { UserRole } from "@/5_entities/User";

import { AppRoutes, AppRoutesProps } from "./routeType";

import { AboutPage } from "@/2_pages/AboutPage";
import { AdminPanelPage } from "@/2_pages/AdminPanelPage";
import { ArticleCreatePage } from "@/2_pages/ArticleCreatePage";
import { ArticleDetailsPage } from "@/2_pages/ArticleDetailsPage";
import { ArticleEditPage } from "@/2_pages/ArticleEditPage";
import { ArticlesPage } from "@/2_pages/ArticlesPage";
import { ForbiddenPage } from "@/2_pages/ForbiddenPage";
import { MainPage } from "@/2_pages/MainPage";
import { NotFoundPage } from "@/2_pages/NotFoundPage";
import { ProfilePage } from "@/2_pages/ProfilePage";

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.PROFILE]: "/profile/", // + :id
  [AppRoutes.ARTICLES]: "/articles",
  [AppRoutes.ARTICLE_DETAILS]: "/articles/", // + :id
  [AppRoutes.ARTICLE_CREATE]: "/article/new",
  [AppRoutes.ARTICLE_EDIT]: "/article/:id/edit",

  // Admin only
  [AppRoutes.ADMIN_PANEL]: "/admin",

  [AppRoutes.FORBIDDEN]: "/forbidden",
  // последний
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />,
  },
  [AppRoutes.PROFILE]: {
    path: `${RoutePath.profile}:id`,
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLES]: {
    path: RoutePath.articles,
    element: <ArticlesPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    path: `${RoutePath.article_details}:id`,
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: `${RoutePath.article_create}`,
    element: <ArticleCreatePage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: `${RoutePath.article_edit}`,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  // Admin only
  [AppRoutes.ADMIN_PANEL]: {
    path: `${RoutePath.admin_panel}`,
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },

  [AppRoutes.FORBIDDEN]: {
    path: `${RoutePath.forbidden}`,
    element: <ForbiddenPage />,
    authOnly: true,
  },
  // last
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
