import axios from "axios";
import { useFormik } from "formik";
import defaultImg from "../../../assets/images/default_img.png";
import { setProfileImage } from "../../../features/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useConvertToBase64 } from "../../../hooks/useConvertToBase64";
import { RootState } from "../../../redux/store";
import profileImageValidation from "../../../validation/profileImageValidation";

interface Props {
  userId: string;
}

const ProfileImage: React.FC<Props> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const { userImg } = useAppSelector((state: RootState) => state.auth);
  const { setFieldValue, handleSubmit, errors, touched } = useFormik({
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
