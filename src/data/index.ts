import {
  ILogInFormInputs,
  IRegisterInputs,
  ITodoCategory,
  ITodo,
} from "../interfaces";

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

export const TODOS_CATEGORIES: ITodoCategory[] = [
  { id: 0, title: "all" },
  { id: 1, title: "personal" },
  { id: 2, title: "work" },
  { id: 3, title: "learning" },
  { id: 4, title: "code" },
  { id: 5, title: "fitness" },
  { id: 6, title: "health" },
  { id: 7, title: "shopping" },
  { id: 8, title: "worship" },
];

export const DEFAULT_TODO_OBJ: ITodo = {
  id: 0,
  category: "all",
  title: "",
  description: "",
  completed: false,
};
