import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useConvertToBase64 } from "../../hooks/useConvertToBase64";
import profileImageValidation from "../../validation/profileImageValidation";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { setProfileImage } from "../../features/authSlice/authSlice";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  userId: string;
}

const UserProfileImgModal: React.FC<Props> = ({
  setIsOpen,
  isOpen,
  userId,
}) => {
  const dispatch = useAppDispatch();
  const { handleSubmit, setFieldValue, errors, touched } = useFormik({
    initialValues: {
      profilePicture: "",
    },
    // validationSchema: profileImageValidation,
    onSubmit: async (values) => {
      await axios.put(
        `http://localhost:5000/api/users/uploads/${userId}`,
        {
          path: await useConvertToBase64(values.profilePicture),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(
        setProfileImage(
          (await useConvertToBase64(values.profilePicture)) as string
        )
      );
      setIsOpen(false);
    },
  });

  const handleImgDelete = async () => {
    await axios.put(
      `http://localhost:5000/api/users/uploads/${userId}`,
      {
        path: null,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(setProfileImage(null));
    setIsOpen(false);
  };

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="user-profile-img-modal">
      <div
        className="user-profile-img-modal__overlay"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="user-profile-img-modal__content">
        <ul className="user-profile-img-modal__list">
          <li className="user-profile-img-modal__item">
            <form className="user-profile__form">
              <label htmlFor="profilePicture" className="user-profile__label">
                Upload new image
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
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </li>
        </ul>
      </div>
    </div>,
    document.body
  );
};

export default UserProfileImgModal;
