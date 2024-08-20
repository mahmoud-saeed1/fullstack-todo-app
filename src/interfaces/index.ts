import { AxiosRequestConfig } from "axios";
import {
  TLogInFormNameInput,
  TRegisterFormNameInput,
  TTodoCategories,
} from "../types";

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
  category?: TTodoCategories;
  title: string;
  description?: string;
  completed?: boolean;
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
