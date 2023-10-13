import apexLogo from "../../resources/img/Apex_logo_horizontal_white.png";
import { useEffect, useState } from "react";
import Button from "../Inputs/Button/Button";
import { Link } from "react-router-dom";
import { getRandomNumber } from "../../utils/utils";
import Modal from "../Modal/Modal";
import InputSelect from "../Inputs/InputSelect/InputSelect";
import { LOCAL_STORAGE_USER_INFO } from "../../utils/Constants";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useRoleContext } from "../../context/RoleContext";
import { Role } from "../../types/users";
import { redirectDefaultPage } from "../../utils/utilsTS";
import {
  PATH_ADMIN_DASHBOARD,
  PATH_USER_TASK_LIST,
  PATH_LOGIN,
  PATH_MANAGER_DASHBOARD,
} from "../../resources/data/RootPath";

function Navbar() {
  const RANDOM_KEY_NUMBER = 9999999999;
  const [openModal, setOpenModal] = useState(false);
  const { role, setRole } = useRoleContext();
  const [
    userProfileLocalStorage,
    setUserProfileLocalStorage,
    cleanUserLocalStorage,
  ] = useLocalStorage(LOCAL_STORAGE_USER_INFO, "");

  const [dashboardURL, setDashboardURL] = useState("");
  const [dataHeader, setDataHeader] = useState([
    {
      title: "Dashboard",
      href: dashboardURL,
      key: getRandomNumber(RANDOM_KEY_NUMBER),
    },
  ]);

  useEffect(() => {
    switch (role) {
      case Role.ADMIN:
        setDashboardURL(PATH_ADMIN_DASHBOARD);
        setDataHeader((prev) => {
          const newArray = [
            {
              title: "Dashboard",
              href: dashboardURL,
              key: getRandomNumber(RANDOM_KEY_NUMBER),
            },
          ];
          return newArray;
        });
        break;
      case Role.MANAGER:
        setDashboardURL(PATH_MANAGER_DASHBOARD);
        setDataHeader((prev) => {
          const newArray = [
            {
              title: "Dashboard",
              href: dashboardURL,
              key: getRandomNumber(RANDOM_KEY_NUMBER),
            },
          ];
          return newArray;
        });
        break;
      case Role.USER:
        setDashboardURL(PATH_USER_TASK_LIST);
        setDataHeader((prev) => {
          const newArray = [
            {
              title: "Home",
              href: redirectDefaultPage(role),
              key: getRandomNumber(RANDOM_KEY_NUMBER),
            },
            {
              title: "Task List",
              href: dashboardURL,
              key: getRandomNumber(RANDOM_KEY_NUMBER),
            },
          ];
          return newArray;
        });
        break;
      case Role.LOGGED_OUT:
        setDashboardURL(PATH_LOGIN);
        setDataHeader((prev) => {
          return [];
        });
        break;
    }
  }, [dashboardURL, role]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userRole, setUserRole] = useState("");
  const profiles = Object.values(Role);

  const headerLogoButon = {
    title: "Apex Systems",
    href: redirectDefaultPage(role),
    logo: apexLogo,
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handlerSessionUser = (itemValue: string) => {
    setUserProfileLocalStorage(itemValue);
    setRole(itemValue as Role);
  };

  const handlerSessionUserLabel = () => {
    if (userProfileLocalStorage === "") {
      return "Sign In";
    } else {
      return userProfileLocalStorage;
    }
  };

  const onChangeEventSelectCategory = (newValue: string) => {
    handlerSessionUser(newValue);
    handleCloseModal();
  };

  /**
   * Funcion que envia informacion al servidor
   * para validar el usuario y constraseña y establecer informacion
   * del usaurio en el sistema
   */
  const signIn = () => {
    handleOpenModal();
  };
  const onSignOffEvent = () => {
    cleanUserLocalStorage();
    setRole(Role.LOGGED_OUT);
    setUserProfileLocalStorage("");
  };

  return (
    <nav
      id="navbar-container"
      className="bg-sky-400 pt-4 px-2 py-2.5 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-50 
					sm:px-4
					md:
					lg:
					xl:
					"
    >
      <div className="container flex flex-wrap items-center justify-around mx-auto w-9/12">
        <Link to={headerLogoButon.href} className="flex items-center">
          <img
            src={headerLogoButon.logo}
            className="h-6 mr-3 sm:h-9"
            alt={headerLogoButon.title}
          />
        </Link>
        <div
          className="items-start justify-between hidden w-full md:flex md:w-auto grow"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 border ml-10 border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:border-gray-700">
            {dataHeader.map((data) => (
              <li key={data.key}>
                <Link
                  key={getRandomNumber(RANDOM_KEY_NUMBER)}
                  to={data.href}
                  className="block py-2 pl-3 pr-4 text-white bg-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
                >
                  {data.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center">
          <Button
            label={role ? role : handlerSessionUserLabel()}
            onClickHandler={signIn}
            customClass={`bg-yellow-600 w-40 px-2 py-1.5 mb-2 mx-2`}
          />
          {role !== Role.LOGGED_OUT && (
            <Button
              label="Sign Off"
              onClickHandler={onSignOffEvent}
              customClass={`bg-yellow-600 w-40 px-2 py-1.5 mb-2 mx-2`}
            />
          )}
        </div>
      </div>
      <Modal handleCloseModal={handleCloseModal} openModal={openModal}>
        <div>
          <InputSelect
            value={role}
            setValue={setUserRole}
            onChangeEvent={onChangeEventSelectCategory}
            data={profiles}
          />
        </div>
      </Modal>
    </nav>
  );
}

export default Navbar;
