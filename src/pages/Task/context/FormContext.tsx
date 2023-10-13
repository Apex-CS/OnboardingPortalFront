import React from "react";

export type ParamsType = {
  user?: {};
  taskId: number;
  name: string;
  description: string;
  isRequired: boolean;
  completed: boolean;
  creationDate: Date;
  completionDate: Date;
  comments?: string;
  categoryId: number;
};

interface ParamsContextProps {
  params: ParamsType;
  setParams: (params: ParamsType) => void;
}

export const ParamsContext = React.createContext<ParamsContextProps>({
  params: {} as ParamsType,
  setParams: () => {},
});
