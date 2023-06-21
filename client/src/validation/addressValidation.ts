import * as yup from "yup";

const addressValidation = yup.object().shape({
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup
    .string()
    .required("Zip is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Zip code must be exactly 5 digits")
    .max(5, "Zip code must be exactly 5 digits"),
});

export default addressValidation;
