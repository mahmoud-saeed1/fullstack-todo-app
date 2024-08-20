import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import {
  ICreateTodoModal,
  IEditTodoFormValues,
  IErrorResponse,
  ITodoCategory,
} from "../interfaces";
import { Bounce, toast } from "react-toastify";
import { AxiosError } from "axios";
import axiosInstance from "../config/axios.config";
import Textarea from "./ui/Textarea";
import Select from "./ui/Select";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateTodoSchema } from "../validations";
import { TODOS_CATEGORIES } from "../data";

const CreateTodoModal = ({
  isOpen,
  isLoading,
  closeCreateModalHandler,
  onCancelHandler,
  refetch,
  userData,
  setIsLoading,
}: ICreateTodoModal) => {
  const {
    register: createRegister,
    handleSubmit: handleCreateSubmit,
    formState: { errors: createErrors },
  } = useForm<IEditTodoFormValues>({
    resolver: yupResolver(CreateTodoSchema),
  });

  const createTodoHandler: SubmitHandler<IEditTodoFormValues> = async (
    formData
  ) => {
    setIsLoading(true);
    try {
      const { status } = await axiosInstance.post(
        "todos",
        { data: { ...formData, user: [userData.user?.id] } },
        { headers: { Authorization: `Bearer ${userData.jwt}` } }
      );

      if (status === 200 || status === 201) {
        toast.success("Todo created successfully!", {
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

        refetch();
        closeCreateModalHandler();
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
      closeModal={closeCreateModalHandler}
      title="Create New Todo"
    >
      <form
        onSubmit={handleCreateSubmit(createTodoHandler)}
        className="flex flex-col gap-4"
      >
        <Input
          type="text"
          placeholder="Title"
          {...createRegister("title", { required: true })}
        />
        {createErrors.title && (
          <p className="text-red-500">Title is required</p>
        )}

        <Textarea
          placeholder="Description"
          {...createRegister("description", { required: true })}
        />
        {createErrors.description && (
          <p className="text-red-500">Description is required</p>
        )}

        <Select {...createRegister("category", { required: true })}>
          {TODOS_CATEGORIES.map(({ id, title }: ITodoCategory) => (
            <option key={id} value={title}>
              {title}
            </option>
          ))}
        </Select>

        <div className="space-y-3">
          <Button type="submit" variant="success" fullWidth>
            {!isLoading ? "Create Todo" : "Creating..."}
          </Button>
          <Button
            onClick={onCancelHandler}
            type="button"
            variant="cancel"
            fullWidth
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTodoModal;
