import { AxiosRequestConfig } from "axios";
import {
  TLogInFormNameInput,
  TRegisterFormNameInput,
  TTodoCategories,
} from "../types";
import { ReactNode } from "react";

// ** Shared validation interface
interface IValidationRules {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
}

// ** Generic form input interface
interface IFormInput<T> {
  name: T;
  placeholder: string;
  type: string;
  validation?: IValidationRules;
}

// ** Specific form inputs
export type IRegisterInputs = IFormInput<TRegisterFormNameInput>;
export type ILogInFormInputs = IFormInput<TLogInFormNameInput>;
export type IEditeFormInputs = IFormInput<string>;

export interface IErrorResponse {
  error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  };
}

export interface IRegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export interface IEditTodoFormValues {
  title: string;
  description?: string;
  category?: string;
}

export interface ILogInFormValues {
  identifier: string;
  password: string;
}

export interface IUseReactQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}

export interface ITodo {
  id: number;
  category?: string;
  title: string;
  description?: string;
  completed?: boolean;
}

export interface IDynamicFrom {
  category?: string;
  title: string;
  description?: string;
}

export interface ITodoCategory {
  id: number;
  title: TTodoCategories;
}

interface IUser {
  blocked?: boolean;
  confirmed?: boolean;
  createdAt?: string; // ISO 8601 format
  email?: string;
  id?: number;
  provider?: string;
  updatedAt?: string; // ISO 8601 format
  username?: string;
}

export interface IAuthResponse {
  jwt?: string;
  user?: IUser;
}

export interface ITodoActionsProps {
  todo: ITodo;
  isLoading: boolean;
  openUpdateModalHandler: () => void;
  OpenDeleteModalHandler: () => void;
}

export interface ITodoItem {
  className?: string;
  todo: ITodo;
  isLoading: boolean;
  userData: IAuthResponse;
  openUpdateModalHandler: (todo: ITodo) => void;
  OpenDeleteModalHandler: (todo: ITodo) => void;
  OpenTodoHandler: (todo: ITodo) => void;
  refetch: () => void;
}

export interface ITodoList {
  todos: ITodo[];
  isLoading: boolean;
  userData: IAuthResponse;
  openUpdateModalHandler: (todo: ITodo) => void;
  OpenDeleteModalHandler: (todo: ITodo) => void;
  OpenTodoHandler: (todo: ITodo) => void;
  refetch: () => void;
}

export interface ICheckTodo {
  className?: string;
  todo: ITodo;
  userData: IAuthResponse;
  refetch: () => void;
}

export interface ICreateTodoModal {
  isOpen: boolean;
  isLoading: boolean;
  userData: IAuthResponse;
  refetch: () => void;
  setIsLoading: (loading: boolean) => void;
  closeCreateModalHandler: () => void;
  onCancelHandler: () => void;
}
export interface IUpdateTodoModal {
  isOpen: boolean;
  isLoading: boolean;
  todoToEdit: ITodo;
  userData: IAuthResponse;
  refetch: () => void;
  setIsLoading: (loading: boolean) => void;
  closeUpdateModalHandler: () => void;
  onCancelHandler: () => void;
}

export interface IDeleteTodoModal {
  isOpen: boolean;
  isLoading: boolean;
  userData: IAuthResponse;
  todoToEdit: ITodo;
  refetch: () => void;
  setIsLoading: (loading: boolean) => void;
  closeDeleteModalHandler: () => void;
  onCancelHandler: () => void;
}

export interface IFormComponent {
  type: "create" | "edit";
  todo?: ITodo;
  isLoading?: boolean;
  refetch?: () => void;
  setIsLoading?: (loading: boolean) => void;
  userData?: IAuthResponse;
  closeHandler: () => void;
  onCancel?: () => void;
}

export interface ITodoModal {
  type: "view" | "create" | "edit" | "delete";
  isOpen: boolean;
  todo?: ITodo;
  closeHandler: () => void;
  refetch?: () => void;
  isLoading?: boolean;
  onCancel?: () => void;
  setIsLoading?: (loading: boolean) => void;
  userData?: IAuthResponse;
}

export interface ITodoModals {
  openCreateModal: boolean;
  openUpdateModal: boolean;
  openDeleteModal: boolean;
  openTodoModal: boolean;
  selectedTodo: ITodo | null;
  isLoading: boolean;
  refetch: () => void;
  userData?: IAuthResponse;
  setIsLoading: (isLoading: boolean) => void;
  handleModalClose: (type: "create" | "update" | "delete" | "view") => void; // Updated type
  resetTodo: () => void;
}

export interface IErrorHandler {
  statusCode?: number;
  title?: string;
}

export interface IIconsContainer {
  className?: string;
  children?: ReactNode;
}

export interface IIcon extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export interface IUserData {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}
