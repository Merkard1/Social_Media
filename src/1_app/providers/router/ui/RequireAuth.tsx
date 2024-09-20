import { getUserAuthData } from "5_entities/User";
import { RoutePath } from "6_shared/config/routeConfig/routeConfig";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }:{children: JSX.Element}) {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ form: location }} replace />;
  }

  return children;
}

export default RequireAuth;
