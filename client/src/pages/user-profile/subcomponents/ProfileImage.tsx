// External dependencies

import { useFormik } from "formik";

// Internal dependencies
import profileImageValidation from "../../../validation/profileImageValidation";
import { useUpdateUserMutation } from "../../../features/apiSlice/userApiSlice/userApiSlice";
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

  const [updateUser, { isLoading: isUploading, isError, error, isSuccess }] =
    useUpdateUserMutation();

  if (isError) useToastCreator(error as string, "error");

  const { setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      avatar_url: "",
    },
    // validationSchema: profileImageValidation,
    onSubmit: async (values) => {
      await updateUser({
        userId: userId as number,
        userUpdateData: values,
      });
      if (isSuccess) {
        dispatch(
          setProfileImage(
            (await useConvertToBase64(values.avatar_url)) as string
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
        <label htmlFor="avatar_url" className="user-profile__label">
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
          name="avatar_url"
          id="avatar_url"
          accept=".jpeg, .png, .jpg"
          className="user-profile__input"
          onChange={(e) => {
            setFieldValue("avatar_url", e.target.files![0]);

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
