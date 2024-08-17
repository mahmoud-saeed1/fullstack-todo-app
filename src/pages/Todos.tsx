import { motion } from "framer-motion";
import useReactQuery from "../hooks/useReactQuery";
import { ITodo } from "../interfaces";
import Input from "../components/ui/Input";
import "../index.css";
import Button from "../components/ui/Button";
import { VTodoVariants } from "../animations";

const Todos = () => {
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
        data.todos.map(({ id, title }: ITodo) => (
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
            <h1 className="todo-title">{title}</h1>

            {/*~~~~~~~~$ Action Buttons $~~~~~~~~*/}
            <div className="todo-actions">
              <Button className="todo-update-button todo-btn">Update</Button>

              <Button className="todo-delete-button todo-btn">Delete</Button>
            </div>
          </motion.div>
        ))
      ) : (
        <h1 className="text-xl font-bold text-gray-500">No todos added</h1>
      )}
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
