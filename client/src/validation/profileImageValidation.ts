import * as yup from "yup";

const MAX_FILE_SIZE = 1024 * 1024;

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const profileImageValidation = yup.object({
  profileImage: yup
    .mixed()
    .nullable()
    .test("FILE_SIZE", "File too large", (value: any) => {
      !value || (value && value.size <= MAX_FILE_SIZE);
    })
    .test("FILE_FORMAT", "Unsupported Format", (value: any) => {
      !value || (value && SUPPORTED_FORMATS.includes(value.type));
    }),
});

export default profileImageValidation;
