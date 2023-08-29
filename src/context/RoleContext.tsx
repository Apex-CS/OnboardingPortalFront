/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import { Role } from "../types/users";
import { LOCAL_STORAGE_USER_INFO } from "../utils/Constants";
import useLocalStorage from "../hooks/useLocalStorage";

interface IUserRole {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = React.createContext<IUserRole>({
  role: Role.USER,
  setRole: () => {},
});

type RoleProviderProps = {
  children: React.ReactNode;
};

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [
    userProfileLocalStorage,
    setUserProfileLocalStorage,
    cleanLocalStorage,
  ] = useLocalStorage(LOCAL_STORAGE_USER_INFO, "");

  const defaultValue =
    userProfileLocalStorage === "" ? Role.LOGGED_OUT : userProfileLocalStorage;
  const [role, setRole] = useState<Role>(defaultValue);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRoleContext = () => useContext(RoleContext);
