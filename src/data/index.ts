import { ILogInFormInputs, IRegisterInputs } from "../interfaces";

export const REGISTER_FORM: IRegisterInputs[] = [
  {
    name: "username",
    placeholder: "Username",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
  },
];

export const LOGIN_FORM: ILogInFormInputs[] = [
  {
    name: "identifier",
    placeholder: "Email",
    type: "email",
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
  },
];
