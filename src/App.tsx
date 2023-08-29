import { Routes, Route } from "react-router-dom";
import {
  AdminDashboard,
  Dashboard,
  Example,
  User,
  Login,
  ManagerDashboard,
  PageNotFound,
} from "./pages";
import { Navbar, Footer } from "./components";
import {
  PATH_HOME,
  PATH_ERROR_PAGE,
  PATH_DASHBOARD,
  PATH_TASK_PAGE,
  PATH_EDIT_TASK_PAGE,
  PATH_VIEW_TASK_PAGE,
  PATH_TASKS_PAGE,
  PATH_ADMIN_DASHBOARD,
  PATH_MANAGER_DASHBOARD,
  PATH_CATEGORY,
  PATH_USER_VIEW,
} from "./resources/data/RootPath";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { StyledEngineProvider } from "@mui/material";
import { Task, Tasks, Category } from "./pages";
import { RoleProvider } from "./context/RoleContext";
import { RedirectHandler } from "./components/RedirectHandler/RedirectHandler";
import { PATH_LOGIN } from "./resources/data/RootPath";

const AppProvider = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <div className="background-color-main">
          <div className="header-container">
            <Navbar />
          </div>
          <div className="flex flex-col min-h-screen text-base font-sans items-start justify-start my-5 children-container">
            <div className="flex w-full items-center justify-center">
              <div className="flex w-9/12 flex-col justify-center items-center ">
                <RedirectHandler>
                  <Routes>
                    <Route path={PATH_LOGIN} element={<Login />} />
                    <Route path={PATH_HOME} element={<User />} />
                    <Route path={PATH_USER_VIEW} element={<User />} />
                    <Route path={PATH_DASHBOARD} element={<Dashboard />} />
                    <Route path={PATH_ERROR_PAGE} element={<PageNotFound />} />
                    <Route path={PATH_TASK_PAGE} element={<Task />} />
                    <Route path={PATH_EDIT_TASK_PAGE} element={<Task />} />
                    <Route path={PATH_VIEW_TASK_PAGE} element={<Task />} />
                    <Route path={PATH_TASKS_PAGE} element={<Tasks />} />
                    <Route path={PATH_CATEGORY} element={<Category />} />
                    <Route
                      path={PATH_ADMIN_DASHBOARD}
                      element={<AdminDashboard />}
                    />
                    <Route
                      path={PATH_MANAGER_DASHBOARD}
                      element={<ManagerDashboard />}
                    />
                    <Route path={"example"} element={<Example />} />
                  </Routes>
                </RedirectHandler>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Provider>
    </StyledEngineProvider>
  );
};

function App() {
  return (
    <>
      <RoleProvider>
        <AppProvider />
      </RoleProvider>
    </>
  );
}

export default App;
