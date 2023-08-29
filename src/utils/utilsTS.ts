import {
  PATH_HOME,
  PATH_LOGIN,
  PATH_MANAGER_DASHBOARD,
  PATH_TASKS_PAGE,
} from "../resources/data/RootPath";
import { Role } from "../types/users";

const redirectDefaultPage = (role: Role) => {
  switch (role) {
    case Role.MANAGER: {
      return PATH_MANAGER_DASHBOARD;
    }
    case Role.ADMIN: {
      return PATH_TASKS_PAGE;
    }
    case Role.USER: {
      return PATH_HOME;
    }
    default: {
      return PATH_LOGIN;
    }
  }
};

export { redirectDefaultPage };
