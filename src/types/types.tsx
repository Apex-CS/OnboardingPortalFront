import { RouteProps } from "react-router-dom";
import { Role } from "./users";

export type listDataElement = {
  titleTask: string;
  status: boolean;
  description: string;
};

export interface ListTaskProps {
  title: string;
  listData: listDataElement[];
}

export interface TaskListElementProps {
  title: string;
  url?: string;
  counter: number;
  limit: number;
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
  name: string;
  body: string;
  reviewedDate: Date;
  rating?: number;
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
  id: number;
  name: string;
  description: string;
  categori: string;
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
}
