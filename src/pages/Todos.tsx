import { useState } from "react";
import useReactQuery from "../hooks/useReactQuery";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { ITodo } from "../interfaces";
import { DEFAULT_TODO_OBJ } from "../data";
import CreateTodoModal from "../components/CreateTodoModal";
import EditTodoModal from "../components/EditTodoModal";
import DeleteTodoModal from "../components/DeleteTodoModal";
import TodoList from "../components/TodoList";

const Todos = () => {
  /*~~~~~~~~$ States $~~~~~~~~*/
  const [openTodo, setOpenTodo] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [SelectedTodo, setSelectedTodo] = useState<ITodo>(DEFAULT_TODO_OBJ);

  /*~~~~~~~~$ Handlers $~~~~~~~~*/
  const openCreateModalHandler = () => {
    setOpenCreateModal(true);
  };

  const closeCreateModalHandler = () => {
    setOpenCreateModal(false);
  };

  const openTodoHandler = (todo: ITodo) => {
    setSelectedTodo(todo);
    setOpenTodo(true);
  };

  const closeTodoHandler = () => {
    setOpenTodo(false);
    setSelectedTodo(DEFAULT_TODO_OBJ);
  };

  const openEditModalHandler = (todo: ITodo) => {
    setSelectedTodo(todo);
    setOpenEditModal(true);
  };

  const closeEditModalHandler = () => {
    setOpenEditModal(false);
    setSelectedTodo(DEFAULT_TODO_OBJ);
  };

  const openDeleteModalHandler = (todo: ITodo) => {
    setSelectedTodo(todo);
    setOpenDeleteModal(true);
  };

  const closeDeleteModalHandler = () => {
    setOpenDeleteModal(false);
    setSelectedTodo(DEFAULT_TODO_OBJ);
  };

  const onCancelHandler = () => {
    setOpenTodo(false);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setSelectedTodo(DEFAULT_TODO_OBJ);
  };

  /*~~~~~~~~$ Get JWT Key From Local Storage $~~~~~~~~*/
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString
    ? JSON.parse(userDataString)
    : DEFAULT_TODO_OBJ;

  /*~~~~~~~~$ React Query $~~~~~~~~*/
  const { isPending, error, data, refetch } = useReactQuery({
    queryKey: ["todos"],
    url: "users/me?populate=todos",
    config: { headers: { Authorization: `Bearer ${userData.jwt}` } },
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/*~~~~~~~~$ Create Todo Button $~~~~~~~~*/}
      <Button onClick={openCreateModalHandler} className="mb-4">
        Add New Todo
      </Button>

      {data?.todos?.length ? (
        <TodoList
          todos={data.todos}
          isLoading={isLoading}
          userData={userData}
          OpenTodoHandler={openTodoHandler}
          OpenDeleteModalHandler={openDeleteModalHandler}
          openUpdateModalHandler={openEditModalHandler}
          refetch={refetch}
        />
      ) : (
        <h1 className="text-xl font-bold text-gray-500">No todos added</h1>
      )}

      {/*~~~~~~~~$ Show Todo Modal $~~~~~~~~*/}
      <Modal
        isOpen={openTodo}
        closeModal={closeTodoHandler}
        title={SelectedTodo?.title}
        description={SelectedTodo?.description}
      >
        <Button onClick={closeTodoHandler} className="mt-3" fullWidth>
          Close
        </Button>
      </Modal>

      {/*~~~~~~~~$ Create Todo Modal $~~~~~~~~*/}
      <CreateTodoModal
        closeCreateModalHandler={closeCreateModalHandler}
        isLoading={isLoading}
        isOpen={openCreateModal}
        refetch={refetch}
        onCancelHandler={onCancelHandler}
        setIsLoading={setIsLoading}
        userData={userData}
      />

      {/*~~~~~~~~$ Edit Todo Modal $~~~~~~~~*/}
      <EditTodoModal
        closeUpdateModalHandler={closeEditModalHandler}
        isLoading={isLoading}
        isOpen={openEditModal}
        refetch={refetch}
        onCancelHandler={onCancelHandler}
        setIsLoading={setIsLoading}
        todoToEdit={SelectedTodo}
        userData={userData}
      />

      {/*~~~~~~~~$ Delete Confirmation Modal $~~~~~~~~*/}
      <DeleteTodoModal
        isLoading={isLoading}
        closeDeleteModalHandler={closeDeleteModalHandler}
        isOpen={openDeleteModal}
        onCancelHandler={onCancelHandler}
        refetch={refetch}
        setIsLoading={setIsLoading}
        todoToEdit={SelectedTodo}
        userData={userData}
      />
    </div>
  );
};

export default Todos;
