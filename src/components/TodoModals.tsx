import TodoModal from "./TodoModal";
import { ITodoModals } from "../interfaces";

const TodoModals = ({
  openCreateModal,
  openUpdateModal,
  openDeleteModal,
  openTodoModal,
  selectedTodo,
  isLoading,
  refetch,
  userData,
  setIsLoading,
  handleModalClose,
  resetTodo,
}: ITodoModals) => {
  return (
    <>
      {/* View Todo Modal */}
      <TodoModal
        type="view"
        isOpen={openTodoModal}
        todo={selectedTodo ?? undefined}
        closeHandler={() => handleModalClose("view")}
      />

      {/* Create Todo Modal */}
      <TodoModal
        type="create"
        isOpen={openCreateModal}
        isLoading={isLoading}
        closeHandler={() => handleModalClose("create")}
        refetch={refetch}
        onCancel={resetTodo}
        setIsLoading={setIsLoading}
        userData={userData}
      />

      {/* Edit Todo Modal */}
      <TodoModal
        type="edit"
        isOpen={openUpdateModal}
        isLoading={isLoading}
        closeHandler={() => handleModalClose("update")}
        refetch={refetch}
        todo={selectedTodo ?? undefined}
        onCancel={resetTodo}
        setIsLoading={setIsLoading}
        userData={userData}
      />

      {/* Delete Todo Modal */}
      <TodoModal
        type="delete"
        isOpen={openDeleteModal}
        isLoading={isLoading}
        closeHandler={() => handleModalClose("delete")}
        refetch={refetch}
        todo={selectedTodo ?? undefined}
        onCancel={resetTodo}
        setIsLoading={setIsLoading}
        userData={userData}
      />
    </>
  );
};

export default TodoModals;
