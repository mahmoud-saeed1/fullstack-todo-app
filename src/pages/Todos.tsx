import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { AxiosError } from "axios";
import axiosInstance from "../config/axios.config";
import useReactQuery from "../hooks/useReactQuery";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Select from "../components/ui/Select";
import { ITodo, IErrorResponse, ITodoCategory } from "../interfaces";
import { VTodoVariants } from "../animations";
import { DEFAULT_TODO_OBJ, TODOS_CATEGORIES } from "../data";
import Textarea from "../components/ui/Textarea";

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

  /*~~~~~~~~$ Handle Todo Completion Toggle $~~~~~~~~*/
  const updateTodoHandler: SubmitHandler<ITodo> = async (data) => {
    setIsLoading(true);
    try {
      const { status } = await axiosInstance.put(
        `/todos/${todoToEdit.id}`,
        { data },
        { headers: { Authorization: `Bearer ${userData.jwt}` } }
      );

      refetch();
      closeEditModalHandler();

      if (status === 200 && todoToEdit) {
        toast.success("Todo Updated successfully!", {
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

  // handle delete todo
  const deleteTodoHandler = async () => {
    try {
      await axiosInstance.delete(`/todos/${todoToEdit.id}`, {
        headers: { Authorization: `Bearer ${userData.jwt}` },
      });
      refetch();
      closeDeleteModalHandler();

      toast.success("Todo deleted successfully!", {
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
    } finally {
      setIsLoading(false);
    }
  };

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {data?.todos?.length ? (
        data.todos.map((todo: ITodo) => (
          <motion.div
            key={todo.id}
            variants={VTodoVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, type: "spring" }}
            className={`todo-container mb-4 p-4 rounded-lg shadow-lg transition-all ${
              todo.completed ? "bg-gray-200" : "bg-white"
            }`}
          >
            {/*~~~~~~~~$ Customized Checkbox $~~~~~~~~*/}
            <Input
              type="checkbox"
              className="todo-checkbox mr-4"
              checked={todo.completed}
              onChange={() => checkTodoHandler(todo)}
            />

            {/*~~~~~~~~$ Todo Title with Strikethrough $~~~~~~~~*/}
            <Button
              className={`todo-title text-lg font-semibold ${
                todo.completed ? "line-through text-gray-500" : "text-black"
              }`}
              onClick={() => openTodoHandler(todo)}
              disabled={todo.completed}
            >
              {todo.title}
            </Button>

            {/*~~~~~~~~$ Action Buttons $~~~~~~~~*/}
            <div className="todo-actions flex ml-auto">
              <Button
                className={`todo-update-button todo-btn mr-2 ${
                  todo.completed ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => openEditModalHandler(todo)}
                isLoading={isLoading}
                disabled={todo.completed}
              >
                Update
              </Button>

              <Button
                className={`todo-delete-button todo-btn ${
                  todo.completed ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => openDeleteModalHandler(todo)}
                disabled={todo.completed}
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
        <Button onClick={closeTodoHandler} className="mt-3" fullWidth>
          Close
        </Button>
      </Modal>

      {/*~~~~~~~~$ Edit Todo Modal $~~~~~~~~*/}
      <Modal
        isOpen={openEditModal}
        closeModal={closeEditModalHandler}
        title="Edit Todo"
      >
        <form
          onSubmit={handleSubmit(updateTodoHandler)}
          className="flex flex-col gap-4"
        >
          <Input
            type="text"
            placeholder="Title"
            defaultValue={todoToEdit?.title}
            {...register("title", { required: true })}
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
          <Textarea
            placeholder="Description"
            defaultValue={todoToEdit?.description}
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}

          <Select
            defaultValue={todoToEdit?.category}
            {...register("category", { required: true })}
          >
            {TODOS_CATEGORIES.map(({ id, title }: ITodoCategory) => (
              <option key={id} value={title}>
                {title}
              </option>
            ))}
          </Select>

          <div className="space-y-3">
            <Button type="submit" variant={"success"} fullWidth>
              {!isLoading ? "Save Changes" : "Saving..."}
            </Button>

            <Button
              onClick={onCancelHandler}
              type="button"
              variant={"cancel"}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/*~~~~~~~~$ Delete Confirmation Modal $~~~~~~~~*/}
      <Modal
        isOpen={openDeleteModal}
        closeModal={closeDeleteModalHandler}
        title="Delete Todo"
        description={`Are you sure you want to delete "${todoToEdit?.title}"?`}
      >
        <div className="space-y-3 mt-3">
          <Button
            onClick={deleteTodoHandler}
            variant={"danger"}
            size={"default"}
            fullWidth
          >
            Delete
          </Button>
          <Button
            onClick={onCancelHandler}
            type="button"
            variant={"cancel"}
            fullWidth
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
