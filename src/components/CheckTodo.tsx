import Input from "./ui/Input";
import {
  ICheckTodo,
  IErrorResponse,
  ITodo,
} from "../interfaces";
import axiosInstance from "../config/axios.config";
import { Bounce, toast } from "react-toastify";
import { AxiosError } from "axios";
import "../index.css";

const CheckTodo = ({ className, userData, refetch, todo }: ICheckTodo) => {
  const checkTodoHandler = async (todo: ITodo) => {
    try {
      const { status } = await axiosInstance.put(
        `/todos/${todo.id}`,
        { data: { completed: !todo.completed } },
        { headers: { Authorization: `Bearer ${userData.jwt}` } }
      );

      if (status === 200) {
        toast.success(
          `Todo ${!todo.completed ? "completed" : "unmarked"} successfully!`,
          {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
        refetch();
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;

      toast.error(`${errorObj.response?.data.error.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <Input
      type="checkbox"
      className={`${className} todo-checkbox`}
      checked={todo.completed}
      onChange={() => checkTodoHandler(todo)}
    />
  );
};

export default CheckTodo;
