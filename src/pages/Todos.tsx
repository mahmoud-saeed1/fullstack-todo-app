// !~~~~~~~~$ Dynamic Way to Do CRUD Operation $~~~~~~~~!
import { useState } from "react";
import useReactQuery from "../hooks/useReactQuery";
import { ITodo } from "../interfaces";
import { DEFAULT_TODO_OBJ } from "../data";
import TodoList from "../components/TodoList";
import useModal from "../hooks/useModal";
import TodoModals from "../components/TodoModals";
import TodoSkeleton from "../components/TodoSkeleton";
import ErrorHandler from "../components/errors/ErrorHandler";
import NoTodos from "../components/NoTodo";

const Todos = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    openCreateModal,
    openUpdateModal,
    openDeleteModal,
    openTodoModal,
    selectedTodo,
    handleModalOpen,
    handleModalClose,
    resetTodo,
  } = useModal<ITodo>(DEFAULT_TODO_OBJ);

  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString
    ? JSON.parse(userDataString)
    : DEFAULT_TODO_OBJ;

  const { isPending, error, data, refetch } = useReactQuery({
    queryKey: ["todos"],
    url: "users/me?populate=todos",
    config: { headers: { Authorization: `Bearer ${userData.jwt}` } },
  });

  if (isPending) return <TodoSkeleton />;
  if (error) return <ErrorHandler title={error.message} />;

  return (
    <div className="flex flex-col items-center justify-center p-6">

      {data?.todos?.length ? (
        <TodoList
          todos={data.todos}
          isLoading={isLoading}
          userData={userData}
          OpenTodoHandler={(todo: ITodo) => handleModalOpen("view", todo)}
          OpenDeleteModalHandler={(todo: ITodo) =>
            handleModalOpen("delete", todo)
          }
          openUpdateModalHandler={(todo: ITodo) =>
            handleModalOpen("update", todo)
          }
          refetch={refetch}
        />
      ) : (
        <NoTodos onAddTodo={() => handleModalOpen("create")} />
      )}

      <TodoModals
        openCreateModal={openCreateModal}
        openUpdateModal={openUpdateModal}
        openDeleteModal={openDeleteModal}
        openTodoModal={openTodoModal}
        selectedTodo={selectedTodo}
        isLoading={isLoading}
        refetch={refetch}
        userData={userData}
        setIsLoading={setIsLoading}
        handleModalClose={handleModalClose}
        resetTodo={resetTodo}
      />
    </div>
  );
};

export default Todos;


// !~~~~~~~~$ Static Way to Do CRUD Operation $~~~~~~~~!

// import { useState } from "react";
// import useReactQuery from "../hooks/useReactQuery";
// import Button from "../components/ui/Button";
// import Modal from "../components/ui/Modal";
// import { ITodo } from "../interfaces";
// import { DEFAULT_TODO_OBJ } from "../data";
// import CreateTodoModal from "../components/CreateTodoModal";
// import EditTodoModal from "../components/EditTodoModal";
// import DeleteTodoModal from "../components/DeleteTodoModal";
// import TodoList from "../components/TodoList";

// const Todos = () => {
//   const [openTodo, setOpenTodo] = useState(false);
//   const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [openEditModal, setOpenEditModal] = useState<boolean>(false);
//   const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
//   const [SelectedTodo, setSelectedTodo] = useState<ITodo>(DEFAULT_TODO_OBJ);

//   const openCreateModalHandler = () => {
//     setOpenCreateModal(true);
//   };

//   const closeCreateModalHandler = () => {
//     setOpenCreateModal(false);
//   };

//   const openTodoHandler = (todo: ITodo) => {
//     setSelectedTodo(todo);
//     setOpenTodo(true);
//   };

//   const closeTodoHandler = () => {
//     setOpenTodo(false);
//     setSelectedTodo(DEFAULT_TODO_OBJ);
//   };

//   const openEditModalHandler = (todo: ITodo) => {
//     setSelectedTodo(todo);
//     setOpenEditModal(true);
//   };

//   const closeEditModalHandler = () => {
//     setOpenEditModal(false);
//     setSelectedTodo(DEFAULT_TODO_OBJ);
//   };

//   const openDeleteModalHandler = (todo: ITodo) => {
//     setSelectedTodo(todo);
//     setOpenDeleteModal(true);
//   };

//   const closeDeleteModalHandler = () => {
//     setOpenDeleteModal(false);
//     setSelectedTodo(DEFAULT_TODO_OBJ);
//   };

//   const onCancelHandler = () => {
//     setOpenTodo(false);
//     setOpenEditModal(false);
//     setOpenDeleteModal(false);
//     setSelectedTodo(DEFAULT_TODO_OBJ);
//   };

//   const storageKey = "loggedInUser";
//   const userDataString = localStorage.getItem(storageKey);
//   const userData = userDataString
//     ? JSON.parse(userDataString)
//     : DEFAULT_TODO_OBJ;

//   const { isPending, error, data, refetch } = useReactQuery({
//     queryKey: ["todos"],
//     url: "users/me?populate=todos",
//     config: { headers: { Authorization: `Bearer ${userData.jwt}` } },
//   });

//   if (isPending) return "Loading...";
//   if (error) return "An error has occurred: " + error.message;

//   return (
//     <div className="flex flex-col items-center justify-center p-6">
//       <Button onClick={openCreateModalHandler} className="mb-4">
//         Add New Todo
//       </Button>

//       {data?.todos?.length ? (
//         <TodoList
//           todos={data.todos}
//           isLoading={isLoading}
//           userData={userData}
//           OpenTodoHandler={openTodoHandler}
//           OpenDeleteModalHandler={openDeleteModalHandler}
//           openUpdateModalHandler={openEditModalHandler}
//           refetch={refetch}
//         />
//       ) : (
//         <h1 className="text-xl font-bold text-gray-500">No todos added</h1>
//       )}

//       <Modal
//         isOpen={openTodo}
//         closeModal={closeTodoHandler}
//         title={SelectedTodo?.title}
//         description={SelectedTodo?.description}
//       >
//         <Button onClick={closeTodoHandler} className="mt-3" fullWidth>
//           Close
//         </Button>
//       </Modal>

//       <CreateTodoModal
//         closeCreateModalHandler={closeCreateModalHandler}
//         isLoading={isLoading}
//         isOpen={openCreateModal}
//         refetch={refetch}
//         onCancelHandler={onCancelHandler}
//         setIsLoading={setIsLoading}
//         userData={userData}
//       />

//       <EditTodoModal
//         closeUpdateModalHandler={closeEditModalHandler}
//         isLoading={isLoading}
//         isOpen={openEditModal}
//         refetch={refetch}
//         onCancelHandler={onCancelHandler}
//         setIsLoading={setIsLoading}
//         todoToEdit={SelectedTodo}
//         userData={userData}
//       />

//       <DeleteTodoModal
//         isLoading={isLoading}
//         closeDeleteModalHandler={closeDeleteModalHandler}
//         isOpen={openDeleteModal}
//         onCancelHandler={onCancelHandler}
//         refetch={refetch}
//         setIsLoading={setIsLoading}
//         todoToEdit={SelectedTodo}
//         userData={userData}
//       />
//     </div>
//   );
// };

// export default Todos;
