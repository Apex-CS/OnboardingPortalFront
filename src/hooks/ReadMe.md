# Hooks

React Hooks are simply a set of functions that allow you to use state and other React features in functional components.

Custom React Hooks can be used to reuse logic in React applications. They allow you to package complex logic and reuse them across multiple components of your react Application.

Here are a few reasons why you might want to use custom React Hooks in your application:

- Reusability
- Better organization
- Improved performance

---

# Custom hooks used in the app

## UseFetch

The useFetch hook is used to handler the fetch calls in the same way by all the app

the hook recive 2 params

- url
- method

```
function useFetch<T>(url: string, method: string)
```

to use the hook you need to import the hook in the file needeed and used in the code for example:

```
export function ExampleCompoenent () {
  const urlAPIGet = "http://localhost:4000/tasks";
  const {
    data: dataGet,
    error: errorGet,
    isLoading: loadingGet,
    fetchData: fetchDataGet,
  } = useFetch(urlAPIGet, "GET");

  const getTaskData = async (idTask: string) => {
    try {
      await fetchDataGet();
    } catch (error) {
      console.error("This is the error:", error);
    }

  useEffect(() => {
    // Execute this code when the array item change
    console.log('dataGet', dataGet)
  }, [dataGet]);

  };
}
```

---

## UseLocalStorage

The UseLocalStorage hook is used to handler the local storage data in a simple way to be used in all the project

### the hook recive 2 params

- key (name of the identification key to save the data)
- initialValueW

```
function useLocalStorage<Type>(
  key: string,
  initialValue?: Type
)
```

there is an example:

```
import useLocalStorage from "../../hooks/useLocalStorage";

export function ExampleCompoenent () {
  const LOCAL_STORAGE_USER_INFO = 'user_info'

  const [
      userProfileLocalStorage,
      setUserProfileLocalStorage,
      cleanUserLocalStorage,
    ] = useLocalStorage(LOCAL_STORAGE_USER_INFO, "");

  const handlerSessionUser = (itemValue: string) => {
    setUserProfileLocalStorage(itemValue);
  };

  const cleanEvent = () => {
    cleanUserLocalStorage();
  };

}
```

## UseRedirect

The main idea of the hook is to fetch the user role, verify whether the current location is accessible for the user and decide if the route should be rendered or to call redirect.

```
const useRedirect = (): {
  redirect?: string;
}
```

The main logic is located in useRedirect hook and the **_RedirectRules_** file config.

Every time the **_useRedirect_** returns a value (in redirect) the RedirectHandler triggers the redirect before the path is rendered. This way unauthorised users are not able to see the content of the page even for a second.

there is an example of the redirect rules but we can add more paiges and roles to verify:

```
enum Role {
  LOGGED_OUT = "",
  USER = "User",
  MANAGER = "Manager",
  ADMIN = "Admin",
}
// redirect configuration

export const RedirectRules: IRedirectRules[] = [
  { route: { path: PATH_LOGIN },
    only: [Role.LOGGED_OUT]
  },
  {
    route: { path: PATH_HOME },
    only: [Role.USER, Role.ADMIN, Role.MANAGER],
  },
  {
    route: { path: PATH_USER_VIEW },
    only: [Role.ADMIN, Role.MANAGER],
  },
  { route: { path: PATH_ADMIN_DASHBOARD },
    only: [Role.MANAGER] }
  ]


// useRedirect hook

const useRedirect = (): {
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
```

#### Based in this article: [Handling role based redirect with React and React Router](https://bartlomiejperucki.medium.com/handling-role-based-redirect-with-react-and-react-router-35f822242bbf).
