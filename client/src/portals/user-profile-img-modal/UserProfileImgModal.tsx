// External dependencies
import ReactDOM from "react-dom";
import { useFormik } from "formik";

// Internal dependencies

import profileImageValidation from "../../validation/profileImageValidation";
import useToastCreator from "../../hooks/useToastCreator";
import Spinner from "../../utilities/spinner/Spinner";
import { useConvertToBase64 } from "../../hooks/useConvertToBase64";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { setProfileImage } from "../../features/authSlice/authSlice";
import { closeModal } from "../../features/modalSlice/modalSlice";
import { useUploadUserImageMutation } from "../../features/apiSlice/userApiSlice/userApiSlice";

const UserProfileImgModal = () => {
  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state: RootState) => state.modal);
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const [
    uploadUserImage,
    { isLoading: isUploading, isError, error, isSuccess },
  ] = useUploadUserImageMutation();

  if (isError) useToastCreator(error as string, "error");

  const { handleSubmit, setFieldValue, errors, touched } = useFormik({
    initialValues: {
      profilePicture: "",
    },
    validationSchema: profileImageValidation,
    onSubmit: async (values) => {
      await uploadUserImage({
        userId: userId as string,
        path: (await useConvertToBase64(values.profilePicture)) as string,
      });

      if (isSuccess) {
        dispatch(
          setProfileImage(
            (await useConvertToBase64(values.profilePicture)) as string
          )
        );
        dispatch(closeModal("profileImgModal"));
      }
    },
  });

  const handleImgDelete = async () => {
    await uploadUserImage({
      userId: userId as string,
      path: null,
    });

    if (isSuccess) {
      dispatch(setProfileImage(null));
      dispatch(closeModal("profileImgModal"));
    }
  };

  let content;

  if (isUploading) {
    content = <Spinner size={125} />;
  } else {
    content = (
      <div className="user-profile-img-modal__content">
        <ul className="user-profile-img-modal__list">
          <li className="user-profile-img-modal__item">
            <form className="user-profile__form">
              <label htmlFor="profilePicture" className="user-profile__label">
                {isUploading ? "Uploading..." : "Upload new image"}
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
          </li>
          <li className="user-profile-img-modal__item">
            <button
              style={{ color: "red" }}
              className="user-profile-img-modal__button"
              onClick={handleImgDelete}
            >
              Remove current image
            </button>
          </li>
          <li className="user-profile-img-modal__item">
            <button
              className="user-profile-img-modal__button"
              onClick={() => dispatch(closeModal("profileImgModal"))}
            >
              Cancel
            </button>
          </li>
        </ul>
      </div>
    );
  }

  if (!modals["profileImgModal"]) return null;
  return ReactDOM.createPortal(
    <div className="user-profile-img-modal">
      <div
        className="user-profile-img-modal__overlay"
        onClick={() => dispatch(closeModal("profileImgModal"))}
      ></div>
      {content}
    </div>,
    document.body
  );
};

export default UserProfileImgModal;
