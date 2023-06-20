import * as yup from "yup";

const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const registerSchema = yup.object().shape({
  username: yup.string().min(4).max(20).required("This field is required"),
  email: yup
    .string()
    .email("Enter valid email")
    .required("This field is required"),
  password: yup
    .string()
    .min(6)
    .matches(
      pwdRegex,
      "Password must contain at least one uppercase, one lowercase, and one number"
    )
    .max(24)
    .required("This field is required"),
  firstName: yup.string().min(2).max(20).required("This field is required"),
  lastName: yup.string().min(2).max(20).required("This field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required(),
});

export default registerSchema;
