import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { REGISTER_FORM } from "../data/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../validations";
import axiosInstance from "../config/axios.config";
import { toast, Bounce } from "react-toastify";
import { useState } from "react";
import Button from "../components/ui/Button";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";
import { IErrorResponse, IFormInput } from "../interfaces";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(RegisterSchema),
  });
  /*~~~~~~~~$ States $~~~~~~~~*/
  const [isLoading, setIsLoading] = useState(false);

  /*~~~~~~~~$ Handlers $~~~~~~~~*/
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // ** Loading state
    setIsLoading(true);
    try {
      // ** fullfilled state
      const response = await axiosInstance.post("auth/local/register", data);
      if (response.status === 200) {
        toast.success("Registration successful!", {
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
    } catch (error) {
      // ** rejected state
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

  const renderRegisterForm = REGISTER_FORM.map(
    ({ name, placeholder, type, validation }, idx) => {
      return (
        <div key={idx}>
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name, validation)}
          />
          {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
        </div>
      );
    }
  );

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterForm}
        <Button isLoading={isLoading} className="w-full">
          {!isLoading ? "Register" : "Loading..."}
        </Button>
      </form>
    </div>
  );
};

export default Register;
