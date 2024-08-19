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