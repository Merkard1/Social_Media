import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { classNames } from "@/6_shared/lib/classNames/classNames";

import { getUserInited, userActions } from "@/5_entities/User";

import { Navbar } from "@/3_widgets/Navbar";
import { Sidebar } from "@/3_widgets/Sidebar";

import { AppRouter } from "@/1_app/providers/router";
import { useTheme } from "@/1_app/providers/ThemeProvider";

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const inited = useSelector(getUserInited);

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
