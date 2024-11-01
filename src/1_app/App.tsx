import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppRouter } from "@/1_app/providers/router";
import { useTheme } from "@/1_app/providers/ThemeProvider";

import { Navbar } from "@/3_widgets/Navbar";
import { Sidebar } from "@/3_widgets/Sidebar";

import { userActions, useUserInited } from "@/5_entities/User";

import { classNames } from "@/6_shared/lib/classNames/classNames";

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const inited = useUserInited();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

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
