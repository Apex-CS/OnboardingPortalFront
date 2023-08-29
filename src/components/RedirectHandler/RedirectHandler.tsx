import React from "react";
import { Navigate } from "react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

type RedirectHandlerProp = {
  children: React.ReactNode;
};

export const RedirectHandler: React.FC<RedirectHandlerProp> = ({
  children,
}) => {
  const { redirect } = useRedirect();

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return <>{children}</>;
};
