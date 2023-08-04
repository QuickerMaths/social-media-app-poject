// External dependencies

import { useFormik } from "formik";

// Internal dependencies
import profileImageValidation from "../../../validation/profileImageValidation";
import { useUploadUserImageMutation } from "../../../features/apiSlice/userApiSlice/userApiSlice";
import { setProfileImage } from "../../../features/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useConvertToBase64 } from "../../../hooks/useConvertToBase64";
import { RootState } from "../../../redux/store";

// Assets

import defaultImg from "../../../assets/images/default_img.png";
import Spinner from "../../../utilities/spinner/Spinner";
import useToastCreator from "../../../hooks/useToastCreator";

const ProfileImage = () => {
  const dispatch = useAppDispatch();
  const { userImg, userId } = useAppSelector((state: RootState) => state.auth);

  const [
    uploadUserImage,
    { isLoading: isUploading, isError, error, isSuccess },
  ] = useUploadUserImageMutation();

  if (isError) useToastCreator(error as string, "error");

  const { setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      profilePicture: "",
    },
    // validationSchema: profileImageValidation,
    onSubmit: async (values) => {
      await uploadUserImage({
        userId: userId as string,
        path: await useConvertToBase64(values.profilePicture),
      });
      if (isSuccess) {
        dispatch(
          setProfileImage(
            (await useConvertToBase64(values.profilePicture)) as string
          )
        );
      }
    },
  });

  let content;

  if (isUploading) {
    content = <Spinner size={125} />;
  } else {
    content = (
      <>
        <label htmlFor="profilePicture" className="user-profile__label">
          <img
            src={userImg ? userImg : defaultImg}
            alt="user profile image"
            className="user-profile__img"
            width={150}
            height={150}
          />
        </label>

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
      </>
    );
  }

  return <form className="user-profile__form">{content}</form>;
};

export default ProfileImage;
