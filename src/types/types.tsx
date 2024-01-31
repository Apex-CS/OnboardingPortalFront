import { RouteProps } from "react-router-dom";
import { Role } from "./users";

export type listDataElement = {
  taskID: number;
  titleTask: string;
  status: boolean;
  description: string;
  categoryID?: number;
};

export interface ListTaskProps {
  title: string;
  listData: listDataElement[];
}

export interface TaskListElementProps {
  category: string;
  completed: number;
  pending: number;
  total: number;
}

export interface TaskElementProps {
  item: TaskListElementProps;
}

export interface Notification {
  title: string;
  description: string;
  releaseDate: Date;
  url: string;
}

export interface NotificationsState {
  notifications: Notification[];
}

export interface Comment {
  id: number;
  userId: number;
  taskId: number;
  message: string;
  creationDate: Date | string;
  updatedDate: Date | string;
}

export interface CommentsState {
  comments: Comment[];
}

export interface FormTaskData {
  user?: {};
  taskId: number;
  name: string;
  description: string;
  isRequired: boolean;
  completed: boolean;
  creationDate: Date;
  completionDate: Date;
  comments: string;
  categoryId: {
    id: 0;
    name: string;
    description: string;
  };
}

export interface Task {
  taskId: number;
  name: string;
  description: string;
  categoryId: number;
  creationDate: Date;
  completionDate: Date;
  completed: boolean;
  required: boolean;
  userId: Categories;
}

export interface Categories {
  id: number;
  name: string;
  description: string;
}

export interface HireDetails {
  id: number;
  hireDate: Date;
  position: string;
  userId: string;
  managerId: string;
  ambassadorId: string;
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  roleId: number;
  email: string;
  password?: string;
  userName: string;
}

export type TApiResponse = {
  status: Number;
  statusText: String;
  data: any;
  error: any;
  loading: Boolean;
};

export interface IRedirectRules {
  route: RouteProps;
  exact?: boolean;
  only?: Role[];
}

export interface ReturnData {
  data: {};
  error: {};
  ok?: boolean;
}
