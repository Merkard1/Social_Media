import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RoutePath } from "@/6_shared/config/routeConfig/routeConfig";
import { getUserAuthData, getUserRoles, UserRole } from "@/5_entities/User";

interface RequireAuthProps {
  children: JSX.Element,
  roles?: UserRole[]
}

function RequireAuth(props: RequireAuthProps) {
  const { children, roles } = props;
  const auth = useSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true;
    }

    if (!userRoles) {
      return false;
    }

    return roles.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ form: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
