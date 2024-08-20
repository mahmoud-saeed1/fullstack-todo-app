import { motion } from "framer-motion";
import { ITodoItem } from "../interfaces";
import Button from "./ui/Button";
import { VTodoVariants } from "../animations";
import CheckTodo from "./CheckTodo";
import TodoActions from "./TodoActions ";
import "../index.css";

const TodoItem = ({
  isLoading,
  todo,
  userData,
  OpenTodoHandler,
  openUpdateModalHandler,
  OpenDeleteModalHandler,
  refetch,
  className,
}: ITodoItem) => {
  return (
    <motion.div
      variants={VTodoVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, type: "spring" }}
      className={`${className} todo-item ${
        todo.completed ? "bg-gray-200" : "bg-white"
      }`}
    >
      <CheckTodo refetch={refetch} todo={todo} userData={userData} />

      {/*~~~~~~~~$ Todo Title $~~~~~~~~*/}
      <Button
        className={`todo-title text-lg font-semibold ${
          todo.completed ? "line-through text-gray-500" : "text-black"
        }`}
        onClick={() => OpenTodoHandler(todo)}
        disabled={todo.completed}
      >
        {todo.title}
      </Button>

      <TodoActions
        isLoading={isLoading}
        todo={todo}
        openUpdateModalHandler={() => openUpdateModalHandler(todo)}
        OpenDeleteModalHandler={() => OpenDeleteModalHandler(todo)}
      />
    </motion.div>
  );
};

export default TodoItem;
