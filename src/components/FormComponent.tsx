import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IErrorResponse,
  IFormComponent,
  IDynamicFrom,
  ITodoCategory,
} from "../interfaces";
import Button from "../components/ui/Button";
import axiosInstance from "../config/axios.config";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { CreateTodoSchema, UpdateTodoSchema } from "../validations";
import Textarea from "./ui/Textarea";
import Input from "./ui/Input";
import Label from "./ui/Label";
import Select from "./ui/Select";
import { TODOS_CATEGORIES } from "../data";
import InputErrorMessage from "./ui/InputErrorMessage";

const FormComponent = ({
  type,
  todo,
  isLoading,
  refetch,
  setIsLoading,
  userData,
  closeHandler,
  onCancel,
}: IFormComponent) => {
  const validationSchema =
    type === "create" ? CreateTodoSchema : UpdateTodoSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDynamicFrom>({
    resolver: yupResolver(validationSchema),
    defaultValues: todo || {},
  });

  const onSubmit: SubmitHandler<IDynamicFrom> = async (data: IDynamicFrom) => {
    if (!userData?.jwt) return;

    setIsLoading?.(true);
    try {
      if (type === "create") {
        await axiosInstance.post(
          "todos",
          { data: { ...data, user: [userData.user?.id] } },
          {
            headers: { Authorization: `Bearer ${userData.jwt}` },
          }
        );
        toast.success("Todo created successfully!", { autoClose: 1000 });
      } else {
        await axiosInstance.put(
          `todos/${todo?.id}`,
          { data },
          {
            headers: { Authorization: `Bearer ${userData.jwt}` },
          }
        );
        toast.success("Todo updated successfully!", { autoClose: 1000 });
      }
      refetch?.();
      closeHandler();
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(
        errorObj.response?.data?.error.message || "Operation failed",
        {
          autoClose: 2000,
        }
      );
    } finally {
      setIsLoading?.(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input {...register("title")} id="title" />
        {errors.title && <InputErrorMessage msg={errors.title.message} />}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea {...register("description")} id="description" />
        {errors.description && (
          <InputErrorMessage msg={errors.description.message} />
        )}
      </div>

      <Select {...register("category", { required: true })}>
        {TODOS_CATEGORIES.map(({ id, title }: ITodoCategory) => (
          <option key={id} value={title}>
            {title}
          </option>
        ))}
      </Select>

      {errors.category && <InputErrorMessage msg={errors.category.message} />}

      <div className="space-y-3">
        <Button type="submit" disabled={isLoading} fullWidth>
          {type === "create"
            ? !isLoading
              ? "Create Todo"
              : "Creating..."
            : !isLoading
            ? "Update Todo"
            : "Updating..."}
        </Button>
        <Button type="button" onClick={onCancel} variant="cancel" fullWidth>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default FormComponent;
