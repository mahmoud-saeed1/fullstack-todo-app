import { useForm, SubmitHandler } from "react-hook-form";
import { IErrorResponse, ILogInFormValues } from "../interfaces";
import Button from "../components/ui/Button";
import { LOGIN_FORM } from "../data";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { LogInSchema } from "../validations";
import axiosInstance from "../config/axios.config";
import { Bounce, toast } from "react-toastify";
import { AxiosError } from "axios";
import { useState } from "react";

const LogIn = () => {
  /*~~~~~~~~$ States $~~~~~~~~*/
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogInFormValues>({
    resolver: yupResolver(LogInSchema),
  });

  /*~~~~~~~~$ Handlers $~~~~~~~~*/
  const Handler: SubmitHandler<ILogInFormValues> = async (data) => {
    // ** Loading case handling
    setIsLoading(true);
    try {
      // ** fulfilled case handling
      const { status, data: resData } = await axiosInstance.post(
        "auth/local",
        data
      );
      if (status === 200) {
        toast.success(`welcome ${data.identifier.split("@")[0]}`, {
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

        localStorage.setItem("loggedInUser", JSON.stringify(resData));
        setTimeout(() => {
          //! It do nivagate to home then do reloading to ensures that home page can read new values at local storage
          location.replace("/");
        }, 2000);
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

  /*~~~~~~~~$ Renders $~~~~~~~~*/
  const renderFormInputs = LOGIN_FORM.map(
    ({ name, placeholder, type }, index) => (
      <div key={index}>
        <Input type={type} placeholder={placeholder} {...register(name)} />
        {errors[name] && <InputErrorMessage msg={errors[name].message} />}
      </div>
    )
  );

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!
      </h2>

      <form onSubmit={handleSubmit(Handler)} className="space-y-4">
        {renderFormInputs}
        <Button className="w-full" isLoading={isLoading}>
          {!isLoading ? "LogIn" : "Loading..."}
        </Button>
      </form>
    </div>
  );
};

export default LogIn;
