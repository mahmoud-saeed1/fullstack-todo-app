import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import { IDeleteTodoModal, IErrorResponse } from "../interfaces";
import { Bounce, toast } from "react-toastify";
import { AxiosError } from "axios";
import axiosInstance from "../config/axios.config";

const DeleteTodoModal = ({
  isLoading,
  onCancelHandler,
  closeDeleteModalHandler,
  todoToEdit,
  isOpen,
  refetch,
  userData,
  setIsLoading,
}: IDeleteTodoModal) => {
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

  return (
    <Modal isOpen={isOpen} closeModal={closeDeleteModalHandler}>
      <h2 className="text-xl font-bold mb-4">Delete Todo</h2>
      <p className="mb-4">
        Are you sure you want to delete the todo titled{" "}
        <span className="font-semibold">{todoToEdit.title}</span>?
      </p>
      <div className="space-y-3">
        <Button onClick={deleteTodoHandler} variant="danger" fullWidth>
          {!isLoading ? "Delete Todo" : "Deleting..."}
        </Button>
        <Button onClick={onCancelHandler} variant="cancel" fullWidth>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteTodoModal;
