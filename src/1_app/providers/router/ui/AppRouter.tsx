import { Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";

import { PageLoader } from "@/4_features/PageLoader/PageLoader";

import RequireAuth from "./RequireAuth";

import { routeConfig } from "@/1_app/config/routeConfig/routeConfig";
import { AppRoutesProps } from "@/1_app/config/routeConfig/routeType";

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>
        {route.element}
      </Suspense>);

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return (
    <Routes>
      {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>
  );
};

export default AppRouter;
