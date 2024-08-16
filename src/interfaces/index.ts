import { AxiosRequestConfig } from "axios";

export interface IRegisterInputs {
  name: "email" | "username" | "password";
  placeholder: string;
  type: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface ILogInFormInputs {
  name: "identifier" | "password";
  placeholder: string;
  type: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

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

export interface ILogInFormValues {
  identifier: string;
  password: string;
}

export interface IUseReactQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}

