import { Suspense, useEffect } from "react";

import { AppRouter } from "@/1_app/providers/router";
import { useTheme } from "@/1_app/providers/ThemeProvider";

import { Navbar } from "@/3_widgets/Navbar";
import { Sidebar } from "@/3_widgets/Sidebar";

import { PageLoader } from "@/4_features/PageLoader/PageLoader";

import { initAuthData, useUserInited } from "@/5_entities/User";

import { classNames } from "@/6_shared/lib/classNames/classNames";
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
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          {inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
}

export default App;
