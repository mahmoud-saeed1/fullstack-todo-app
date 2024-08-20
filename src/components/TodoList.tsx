import TodoItem from "./TodoItem";
import { ITodo, ITodoList } from "../interfaces";
import "../index.css";

const TodoList = ({
  isLoading,
  todos,
  userData,
  OpenTodoHandler,
  OpenDeleteModalHandler,
  openUpdateModalHandler,
  refetch,
}: ITodoList) => {
  return (
    <div className="todo-list">
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo.id}
          userData={userData}
          todo={todo}
          OpenDeleteModalHandler={OpenDeleteModalHandler}
          openUpdateModalHandler={openUpdateModalHandler}
          OpenTodoHandler={OpenTodoHandler}
          isLoading={isLoading}
          refetch={refetch}
        />
      ))}
    </div>
  );
};

export default TodoList;
