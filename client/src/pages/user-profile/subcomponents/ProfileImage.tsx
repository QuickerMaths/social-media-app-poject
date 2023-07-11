// External dependencies

import { useFormik } from "formik";

// Internal dependencies
import { useUploadUserImageMutation } from "../../../features/apiSlice/userApiSlice/userApiSlice";
import { setProfileImage } from "../../../features/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useConvertToBase64 } from "../../../hooks/useConvertToBase64";
import { RootState } from "../../../redux/store";
import profileImageValidation from "../../../validation/profileImageValidation";

// Assets

import defaultImg from "../../../assets/images/default_img.png";

const ProfileImage = () => {
  const dispatch = useAppDispatch();
  const { userImg, userId } = useAppSelector((state: RootState) => state.auth);

  const [uploadUserImage] = useUploadUserImageMutation();

  const { setFieldValue, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      profilePicture: "",
    },
    // validationSchema: profileImageValidation,
    onSubmit: async (values) => {
      try {
        await uploadUserImage({
          userId: userId as string,
          path: await useConvertToBase64(values.profilePicture),
        });

        dispatch(
          setProfileImage(
            (await useConvertToBase64(values.profilePicture)) as string
          )
        );
      } catch (err: any) {
        // TODO: add error handling for this (display 413 err message 'payload too large')
        console.log(err);
      }
    },
  });

  return (
    <form className="user-profile__form">
      <label htmlFor="profilePicture" className="user-profile__label">
        <img
          src={userImg ? userImg : defaultImg}
          alt="user profile image"
          className="user-profile__img"
          width={150}
          height={150}
        />
      </label>
      {errors.profilePicture && touched.profilePicture && (
        <p style={{ color: "red" }}>{errors.profilePicture}</p>
      )}
      <input
        type="file"
        name="profilePicture"
        id="profilePicture"
        accept=".jpeg, .png, .jpg"
        className="user-profile__input"
        onChange={(e) => {
          setFieldValue("profilePicture", e.target.files![0]);

          setTimeout(() => {
            handleSubmit();
          }, 0);
        }}
      />
    </form>
  );
};

export default ProfileImage;
