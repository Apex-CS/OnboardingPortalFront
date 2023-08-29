import { useLocation, matchPath } from "react-router-dom";
import { useRoleContext } from "../context/RoleContext";
import { RedirectRules } from "../utils/redirectRules";
import { Role } from "../types/users";
import {
  PATH_HOME,
  PATH_LOGIN,
  PATH_MANAGER_DASHBOARD,
  PATH_TASKS_PAGE,
} from "../resources/data/RootPath";

export const useRedirect = (): {
  redirect?: string;
} => {
  const { role } = useRoleContext();
  const { pathname } = useLocation();

  // Internal redirect logic
  const rule = RedirectRules.find((rule) =>
    matchPath(pathname, rule.route.path as string)
  );
  const hasMissingProps = !rule;
  const shouldRedirect = rule?.only && rule.only.indexOf(role) < 0;
  if (hasMissingProps || shouldRedirect) {
    switch (role) {
      case Role.MANAGER: {
        return { redirect: PATH_MANAGER_DASHBOARD };
      }
      case Role.ADMIN: {
        return { redirect: PATH_TASKS_PAGE };
      }
      case Role.USER: {
        return { redirect: PATH_HOME };
      }
      default: {
        return { redirect: PATH_LOGIN };
      }
    }
  }

  return {};
};
