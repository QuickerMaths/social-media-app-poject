import * as yup from "yup";

const loginSchema = yup.object().shape({
  username: yup.string().min(4).max(20).required("This field is required"),
  password: yup.string().min(6).max(24).required("This field is required"),
});

export default loginSchema;
