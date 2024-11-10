import { Suspense, useEffect } from "react";

import { AppRouter } from "@/1_app/providers/router";
import { useTheme } from "@/1_app/providers/ThemeProvider";

import { Navbar } from "@/3_widgets/Navbar";
import { Sidebar } from "@/3_widgets/Sidebar";

import { PageLoader } from "@/4_features/PageLoader/PageLoader";

import { initAuthData, useUserInited } from "@/5_entities/User";

import { MainLayout } from "@/6_shared/layouts";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { ToggleFeatures } from "@/6_shared/lib/features";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useUserInited();

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!inited) {
    return <PageLoader />;
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <div className={classNames("app", {}, [theme])}>
          <Suspense fallback="">
            <Navbar />
            <div className="content-page">
              <Sidebar />
              {inited && <AppRouter />}
            </div>
          </Suspense>
        </div>
      }
      on={
        <div className={classNames("app_redesigned", {}, [theme])}>
          <Suspense fallback="">
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={<Sidebar />}
            />
          </Suspense>
        </div>
      }
    />
  );
}

export default App;
