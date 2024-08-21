import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import IconContainer from "./IconConatainer";
import { TodosIcon } from "../icons";

interface NoTodosProps {
  onAddTodo: () => void;
}

const NoTodos = ({ onAddTodo }: NoTodosProps) => {
  return (
    <motion.div
      className="no-todos__container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <IconContainer className="my-4">
        <TodosIcon />
      </IconContainer>
      <h2 className="no-todos__title">No Todos Yet</h2>
      <p className="no-todos__message">
        It looks like you haven't added any todos yet. Let's get started!
      </p>
      <Button onClick={onAddTodo} className="no-todos__button">
        Add Your First Todo
      </Button>
    </motion.div>
  );
};

export default NoTodos;
