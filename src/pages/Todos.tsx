import { motion } from "framer-motion";
import useReactQuery from "../hooks/useReactQuery";
import { IErrorResponse, ITodo } from "../interfaces";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { VTodoVariants } from "../animations";
import { useState } from "react";
import Modal from "../components/ui/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import Select from "../components/ui/Select";
import { DEFAULT_TODO_OBJ, TODOS_CATEGORIES } from "../data";
import { Bounce, toast } from "react-toastify";
import { AxiosError } from "axios";
import axiosInstance from "../config/axios.config";

const Todos = () => {
  /*~~~~~~~~$ States $~~~~~~~~*/
  const [openTodo, setOpenTodo] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<ITodo>(DEFAULT_TODO_OBJ);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /*~~~~~~~~$ Handlers $~~~~~~~~*/
  const openTodoHandler = (todo: ITodo) => {
    setTodoToEdit(todo);
    setOpenTodo(true);
  };

  const closeTodoHandler = () => {
    setOpenTodo(false);
    setTodoToEdit(DEFAULT_TODO_OBJ);
  };

  const openEditModalHandler = (todo: ITodo) => {
    setTodoToEdit(todo);
    setOpenEditModal(true);
  };

  const closeEditModalHandler = () => {
    setOpenEditModal(false);
    setTodoToEdit(DEFAULT_TODO_OBJ);
  };

  const openDeleteModalHandler = (todo: ITodo) => {
    setTodoToEdit(todo);
    setOpenDeleteModal(true);
  };

  const closeDeleteModalHandler = () => {
    setOpenDeleteModal(false);
    setTodoToEdit(DEFAULT_TODO_OBJ);
  };

  const onCancelHandler = () => {
    setOpenTodo(false);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setTodoToEdit(DEFAULT_TODO_OBJ);
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

  /*~~~~~~~~$ React Hook Form $~~~~~~~~*/
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITodo>();

  const onSubmit: SubmitHandler<ITodo> = async (data) => {
    // ** Loading case handling
    setIsLoading(true);
    try {
      // ** fullfilled case handling
      const { status } = await axiosInstance.put(
        `/todos/${todoToEdit.id}`,
        { data },
        { headers: { Authorization: `Bearer ${userData.jwt}` } }
      );

      refetch();
      closeEditModalHandler();

      if (status === 200 && todoToEdit) {
        toast.success("Todo Updated successful!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      // ** rejected case handling
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
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteHandler = async () => {
    if (todoToEdit) {
      await fetch(`/todos/${todoToEdit.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });
      closeDeleteModalHandler();
      refetch();
    }
  };

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {data.todos.length ? (
        data.todos.map((todo: ITodo) => (
          <motion.div
            key={todo.id}
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
            <Button
              className="todo-title"
              onClick={() => openTodoHandler(todo)}
            >
              {todo.title}
            </Button>

            {/*~~~~~~~~$ Action Buttons $~~~~~~~~*/}
            <div className="todo-actions">
              <Button
                className="todo-update-button todo-btn"
                onClick={() => openEditModalHandler(todo)}
                isLoading={isLoading}
              >
                {!isLoading ? "Update" : "Loading..."}
              </Button>

              <Button
                className="todo-delete-button todo-btn"
                onClick={() => openDeleteModalHandler(todo)}
              >
                Delete
              </Button>
            </div>
          </motion.div>
        ))
      ) : (
        <h1 className="text-xl font-bold text-gray-500">No todos added</h1>
      )}

      {/*~~~~~~~~$ Show Todo Modal $~~~~~~~~*/}
      <Modal
        isOpen={openTodo}
        closeModal={closeTodoHandler}
        title={todoToEdit?.title}
        description={todoToEdit?.description}
      >
        <Button
          onClick={closeTodoHandler}
          className="mt-3 w-full capitalize tracking-wider"
        >
          Close
        </Button>
      </Modal>

      {/*~~~~~~~~$ Edit Todo Modal $~~~~~~~~*/}
      <Modal
        isOpen={openEditModal}
        closeModal={closeEditModalHandler}
        title="Edit Todo"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Title"
            defaultValue={todoToEdit?.title}
            {...register("title")}
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
          <Input
            type="text"
            placeholder="Description"
            defaultValue={todoToEdit?.description}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}

          <Select
            className="mb-4"
            defaultValue={todoToEdit.category}
            {...register("category")}
          >
            {TODOS_CATEGORIES.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </Select>
          <div className="todo-actions">
            <Button
              type="submit"
              className="todo-update-button todo-btn"
              isLoading={isLoading}
            >
              {!isLoading ? "Update" : "Loading..."}
            </Button>

            <Button
              className="todo-cancel-btn todo-btn"
              onClick={onCancelHandler}
              type="button"
              variant={"cancel"}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/*~~~~~~~~$ Delete Todo Modal $~~~~~~~~*/}
      <Modal
        isOpen={openDeleteModal}
        closeModal={closeDeleteModalHandler}
        title="Delete Todo"
      >
        <div className="todo-actions">
          <Button
            className="todo-delete-button todo-btn"
            onClick={onDeleteHandler}
          >
            Delete
          </Button>
          <Button
            className="todo-cancel-btn todo-btn"
            onClick={onCancelHandler}
            type="button"
            variant={"cancel"}
          >
            Cancel
          </Button>
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
//   const userData = userDataString ? JSON.parse(userDataString) : DEFAULT_TODO_OBJ;

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
