import React, { memo, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";

import { Navbar } from "@/3_widgets/Navbar";
import { PageLoader } from "@/3_widgets/PageLoader";
import { Sidebar } from "@/3_widgets/Sidebar";

import { getUserInited, initAuthData } from "@/5_entities/User";

import { MainLayout, AppLoaderLayout } from "@/6_shared/layouts";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures } from "@/6_shared/lib/features";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";

import { useAppToolbar } from "./lib/useAppToolbar";
import { AppRouter } from "./providers/router";
import { useTheme } from "./providers/ThemeProvider";
import { withTheme } from "./providers/ThemeProvider/ui/withTheme";

const App = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);
  const toolbar = useAppToolbar();

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData());
    }
  }, [dispatch, inited]);

  if (!inited) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <div
            id="app"
            className={classNames("app_redesigned", {}, [theme])}
          >
            <AppLoaderLayout />
            {" "}
          </div>
        }
        off={<PageLoader />}
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <div id="app" className={classNames("app", {}, [theme])}>
          <Suspense fallback="">
            <Navbar />
            <div className="content-page">
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
      on={
        <div
          id="app"
          className={classNames("app_redesigned", {}, [theme])}
        >
          <Suspense fallback="">
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={<Sidebar />}
              toolbar={toolbar}
            />
          </Suspense>
        </div>
      }
    />
  );
});

export default withTheme(App);
