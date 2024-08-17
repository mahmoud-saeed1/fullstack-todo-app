import { motion } from "framer-motion";
import useReactQuery from "../hooks/useReactQuery";
import { ITodo } from "../interfaces";
import Input from "../components/ui/Input";
import "../index.css";
import Button from "../components/ui/Button";
import { VTodoVariants } from "../animations";
import { useState } from "react";
import Modal from "../components/ui/Modal";

const Todos = () => {
  /*~~~~~~~~$ States $~~~~~~~~*/
  const [openTodo, setOpenTodo] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // const [todoToEdit, setTodoToEdit] = useState<ITodo>({
  //   id: 0,
  //   title: "",
  //   description: "",
  // });

  /*~~~~~~~~$ Handlers $~~~~~~~~*/
  // const OpenEditModalHandler = (todo: ITodo) => {
  //   setOpenEditModal(true);
  //   setTodoToEdit(todo);
  // };

  const openTodoHandler = () => setOpenTodo(true);
  const closeTodoHandler = () => setOpenTodo(false);
  const OPenEditModalHandler = () => setOpenEditModal(true);
  const CloseEditModalHandler = () => setOpenEditModal(false);
  const OpenDeleteModalHandler = () => setOpenDeleteModal(true);
  const CloseDeleteModalHandler = () => setOpenDeleteModal(false);

  const onCancelHandler = () => {
    setOpenTodo(false);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    // setTodoToEdit({
    //   id: 0,
    //   title: "",
    //   description: "",
    // });
  };

  /*~~~~~~~~$ Get JWT Key From Local Storage $~~~~~~~~*/
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  /*~~~~~~~~$ React Query $~~~~~~~~*/
  const { isPending, error, data } = useReactQuery({
    queryKey: ["todos"],
    url: "users/me?populate=todos",
    config: { headers: { Authorization: `Bearer ${userData.jwt}` } },
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {data.todos.length ? (
        data.todos.map(({ id, title, description }: ITodo) => (
          <motion.div
            key={id}
            variants={VTodoVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, type: "spring" }}
            className="todo-container"
          >
            {/*~~~~~~~~$ Customized Checkbox $~~~~~~~~*/}
            <Input type="checkbox" className="todo-checkbox" />

            {/*~~~~~~~~$ Todo Title $~~~~~~~~*/}
            <Button className="todo-title" onClick={openTodoHandler}>
              {title}
            </Button>

            {/*~~~~~~~~$ Action Buttons $~~~~~~~~*/}
            <div className="todo-actions">
              <Button
                className="todo-update-button todo-btn"
                onClick={OPenEditModalHandler}
              >
                Update
              </Button>

              <Button
                className="todo-delete-button todo-btn"
                onClick={OpenDeleteModalHandler}
              >
                Delete
              </Button>
            </div>

            {/*~~~~~~~~$ Todo Modal $~~~~~~~~*/}
            <Modal
              isOpen={openTodo}
              closeModal={closeTodoHandler}
              title={title}
              description={description}
            >
              <Button
                onClick={closeTodoHandler}
                className="mt-3 w-full capitalize tracking-wider"
              >
                close
              </Button>
            </Modal>
          </motion.div>
        ))
      ) : (
        <h1 className="text-xl font-bold text-gray-500">No todos added</h1>
      )}
      {/*~~~~~~~~$ Edit Modal $~~~~~~~~*/}
      <Modal
        isOpen={openEditModal}
        closeModal={CloseEditModalHandler}
        title="edit modal"
      >
        <div className="todo-actions">
          <Button className="todo-update-button todo-btn">Update</Button>

          <Button className="todo-cancel-btn todo-btn" onClick={onCancelHandler}>Cancel</Button>
        </div>
      </Modal>

      {/*~~~~~~~~$ Delete Modal $~~~~~~~~*/}
      <Modal
        isOpen={openDeleteModal}
        closeModal={CloseDeleteModalHandler}
        title="delete modal"
      >
        <div className="todo-actions">
          <Button className="todo-delete-button todo-btn">Delete</Button>
          <Button className="todo-cancel-btn todo-btn" onClick={onCancelHandler}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Todos;

//? this is the old way to fetch data using useEffect

// import { useEffect, useState } from "react";
// import axiosInstance from "../config/axios.config";

// const Todos = () => {
//   /*~~~~~~~~$ States $~~~~~~~~*/
//   const [todos, setTodos] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   //? Get user data from local storage when component mounts and update it when user data changes
//   const storageKey = "loggedInUser";
//   const userDataString = localStorage.getItem(storageKey);
//   const userData = userDataString ? JSON.parse(userDataString) : null;

//   useEffect(() => {
//     try {
//       axiosInstance
//         .get("users/me?populate=todos", {
//           headers: { Authorization: `Bearer ${userData.jwt}` },
//         })
//         .then((res) => setTodos(res.data.todos))
//         .catch((err) => console.log(err));
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [userData]);

//   if (isLoading) {
//     return <h1>Loading...</h1>;
//   }

//   return (
//     <div>
//       {todos.length ? (
//         todos.map((todo) => <h2 key={todo.id}>{todo.title}</h2>)
//       ) : (
//         <h1>no todos exist</h1>
//       )}
//     </div>
//   );
// };

// export default Todos;
