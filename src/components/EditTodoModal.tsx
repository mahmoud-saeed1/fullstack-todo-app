import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import {
  IEditTodoFormValues,
  IUpdateTodoModal,
  IErrorResponse,
  ITodoCategory,
} from "../interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import axiosInstance from "../config/axios.config";
import { Bounce, toast } from "react-toastify";
import { AxiosError } from "axios";
import Textarea from "./ui/Textarea";
import Select from "./ui/Select";
import { TODOS_CATEGORIES } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateTodoSchema } from "../validations";

const EditTodoModal = ({
  isOpen,
  isLoading,
  todoToEdit,
  closeUpdateModalHandler,
  onCancelHandler,
  refetch,
  userData,
  setIsLoading,
}: IUpdateTodoModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditTodoFormValues>({
    resolver: yupResolver(UpdateTodoSchema),
  });

  /*~~~~~~~~$ Handle Todo Completion Toggle $~~~~~~~~*/
  const updateTodoHandler: SubmitHandler<IEditTodoFormValues> = async (
    data
  ) => {
    setIsLoading(true);
    try {
      const { status } = await axiosInstance.put(
        `todos/${todoToEdit.id}`,
        { data },
        { headers: { Authorization: `Bearer ${userData.jwt}` } }
      );

      refetch();
      closeUpdateModalHandler();

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
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeUpdateModalHandler}
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
  );
};

export default EditTodoModal;
