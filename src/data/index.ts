import {
  Coding,
  Education,
  Fitness,
  Man,
  Shopping,
  TodosIcon,
  Vitamins,
  Wallet,
  Worship,
} from "../icons";
import {
  ILogInFormInputs,
  IRegisterInputs,
  ITodoCategory,
  ITodo,
  IUserData,
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

export const CATEGORIES_ICONS = [
  { id: 0, icon: TodosIcon, label: "all" },
  { id: 1, icon: Man, label: "personal" },
  { id: 2, icon: Coding, label: "code" },
  { id: 3, icon: Education, label: "learning" },
  { id: 5, icon: Fitness, label: "fitness" },
  { id: 6, icon: Shopping, label: "shopping" },
  { id: 7, icon: Vitamins, label: "work" },
  { id: 8, icon: Wallet, label: "general" },
  { id: 9, icon: Worship, label: "worship" },
];

const storageKey = "loggedInUser";
const userDataString = localStorage.getItem(storageKey);
export const USERDATA: IUserData = userDataString
  ? JSON.parse(userDataString)
  : null;
