import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import { IErrorResponse, ITodoModal } from "../interfaces";
import { Bounce, toast } from "react-toastify";
import { AxiosError } from "axios";
import axiosInstance from "../config/axios.config";
import FormComponent from "./FormComponent";

const TodoModal = ({
  type,
  isOpen,
  todo,
  closeHandler,
  refetch,
  isLoading,
  onCancel,
  setIsLoading,
  userData,
}: ITodoModal) => {
  const handleDelete = async () => {
    if (!userData?.jwt) return; // Handle case where userData might be undefined

    try {
      await axiosInstance.delete(`/todos/${todo?.id}`, {
        headers: { Authorization: `Bearer ${userData.jwt}` },
      });
      refetch?.();
      toast.success("Todo deleted successfully!", {
        position: "top-right",
        autoClose: 1000,
        transition: Bounce,
      });
      closeHandler();
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(
        errorObj.response?.data?.error.message || "Failed to delete",
        {
          position: "top-right",
          autoClose: 2000,
          transition: Bounce,
        }
      );
    } finally {
      setIsLoading?.(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeHandler}
      title={type === "view" ? todo?.title : "Todo"}
    >
      {type === "view" && (
        <>
          <p>{todo?.description}</p>
          <Button onClick={closeHandler} fullWidth>
            Close
          </Button>
        </>
      )}
      {(type === "create" || type === "edit") && (
        <FormComponent
          type={type}
          todo={todo}
          isLoading={isLoading}
          onCancel={onCancel}
          refetch={refetch}
          setIsLoading={setIsLoading}
          userData={userData}
          closeHandler={closeHandler}
        />
      )}
      {type === "delete" && (
        <div className="space-y-3">
          <p>Are you sure you want to delete the todo titled "{todo?.title}"?</p>
          <Button type="button" variant="danger" onClick={handleDelete} fullWidth>
            {!isLoading ? "Delete" : "Deleting..."}
          </Button>
          <Button type="button" onClick={onCancel} variant="cancel" fullWidth>
            Cancel
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default TodoModal;
