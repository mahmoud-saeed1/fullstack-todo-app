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
import { AxiosError } from "axios";
import { IErrorResponse, IRegisterFormValues } from "../interfaces";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  /*~~~~~~~~$ States $~~~~~~~~*/
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register, //? to take inputs values
    handleSubmit,
    formState: { errors }, //? for show error messages
  } = useForm<IRegisterFormValues>({
    resolver: yupResolver(RegisterSchema),
  });

  /*~~~~~~~~$ Handlers $~~~~~~~~*/
  const onSubmitHandler: SubmitHandler<IRegisterFormValues> = async (data) => {
    // ** Loading case handling
    setIsLoading(true);
    try {
      // ** fullfilled case handling
      const { status } = await axiosInstance.post("auth/local/register", data);
      if (status === 200) {
        toast.success("Registration successful!", {
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

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      // ** rejected case handling
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
    ({ name, placeholder, type }, idx) => {
      return (
        <div key={idx}>
          <Input type={type} placeholder={placeholder} {...register(name)} />
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
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        {renderRegisterForm}
        <Button isLoading={isLoading} className="w-full">
          {!isLoading ? "Register" : "Loading..."}
        </Button>
      </form>
    </div>
  );
};

export default Register;
