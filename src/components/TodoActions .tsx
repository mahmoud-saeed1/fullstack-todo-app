import { ITodoActionsProps } from "../interfaces";
import Button from "../components/ui/Button";
import "../index.css";

const TodoActions = ({
  todo,
  isLoading,
  openUpdateModalHandler,
  OpenDeleteModalHandler,
}: ITodoActionsProps) => {
  return (
    <div className="todo-item__actions">
      <Button
        className={`todo-item__update-btn todo-btn ${
          todo.completed ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={openUpdateModalHandler}
        isLoading={isLoading}
        disabled={todo.completed}
        variant={"success"}
      >
        Update
      </Button>

      <Button
        className={`todo-item__delete-btn todo-btn ${
          todo.completed ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={OpenDeleteModalHandler}
        isLoading={isLoading}
        disabled={todo.completed}
        variant={"danger"}
      >
        Delete
      </Button>
    </div>
  );
};

export default TodoActions;
