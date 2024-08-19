import * as yup from "yup";

export const RegisterSchema = yup
  .object({
    username: yup
      .string()
      .required("userName is required!")
      .min(3, "Username must be at least 3 characters long.")
      .max(20, "Username cannot exceed 20 characters.")
      .matches(
        /^[a-zA-Z0-9_-]{3,20}$/,
        "Username can only contain letters, numbers, underscores, and hyphens."
      ),
    email: yup
      .string()
      .required("email is required!")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    password: yup
      .string()
      .required("password is required!")
      .min(6, "Password should be at least 6 characters."),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    // ),
  })
  .required();

export const LogInSchema = yup
  .object({
    identifier: yup
      .string()
      .required("email is required!")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    password: yup.string().required("Password is required!"),
  })
  .required();

export const EditTodoSchema = yup.object({
  title: yup.string().required("Todo title is required!"),
  description: yup.string().optional(),
  category: yup.string().optional(),
});

export const CreateTodoSchema = yup.object({
  title: yup.string().required("Todo title is required!"),
  description: yup.string().optional(),
  category: yup.string().optional(),
});
