import { RouteProps } from "react-router-dom";
import { Role } from "../types/users";
import {
  PATH_TASK_PAGE,
  PATH_EDIT_TASK_PAGE,
  PATH_VIEW_TASK_PAGE,
  PATH_TASKS_PAGE,
  PATH_CATEGORY,
  PATH_HOME,
  PATH_DASHBOARD,
  PATH_ERROR_PAGE,
  PATH_LOGIN,
  PATH_ADMIN_DASHBOARD,
  PATH_MANAGER_DASHBOARD,
  PATH_USER_VIEW,
} from "../resources/data/RootPath";
interface IRedirectRules {
  route: RouteProps;
  only?: Role[];
}

export const RedirectRules: IRedirectRules[] = [
  { route: { path: PATH_LOGIN }, only: [Role.LOGGED_OUT] },
  {
    route: { path: PATH_HOME },
    only: [Role.USER, Role.ADMIN, Role.MANAGER],
  },
  {
    route: { path: PATH_USER_VIEW },
    only: [Role.ADMIN, Role.MANAGER],
  },
  { route: { path: PATH_ADMIN_DASHBOARD }, only: [Role.MANAGER] },
  { route: { path: PATH_TASKS_PAGE }, only: [Role.ADMIN] },

  {
    route: { path: PATH_EDIT_TASK_PAGE },
    only: [Role.MANAGER, Role.ADMIN, Role.USER],
  },
  {
    route: { path: PATH_VIEW_TASK_PAGE },
    only: [Role.USER, Role.MANAGER, Role.ADMIN],
  },
  {
    route: { path: PATH_TASK_PAGE },
    only: [Role.MANAGER, Role.ADMIN],
  },
  {
    route: { path: PATH_MANAGER_DASHBOARD },
    only: [Role.MANAGER],
  },
  {
    route: { path: PATH_TASKS_PAGE },
    only: [Role.MANAGER, Role.ADMIN, Role.USER],
  },
  {
    route: { path: PATH_DASHBOARD },
    only: [Role.MANAGER, Role.ADMIN, Role.USER],
  },
  { route: { path: PATH_CATEGORY }, only: [Role.MANAGER, Role.ADMIN] },
  {
    route: { path: PATH_ERROR_PAGE },
    only: [Role.USER, Role.ADMIN, Role.MANAGER],
  },
];
