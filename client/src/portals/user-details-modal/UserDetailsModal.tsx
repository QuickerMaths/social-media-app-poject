// External dependencies

import ReactDOM from "react-dom";
import { useFormik } from "formik";
import { AiOutlineClose } from "react-icons/ai";

// Internal dependencies

import InputField from "../../components/inputField/InputField";
import addressValidation from "../../validation/addressValidation";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { closeModal } from "../../features/modalSlice/modalSlice";
import { useUpdateUserAddressMutation } from "../../features/apiSlice/userApiSlice/userApiSlice";

const UserDetailsModal = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { modals } = useAppSelector((state: RootState) => state.modal);

  const [updateUserAddress, { isLoading: isUpdating }] =
    useUpdateUserAddressMutation();

  const { handleChange, handleBlur, errors, touched, values, handleSubmit } =
    useFormik({
      initialValues: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      validationSchema: addressValidation,
      onSubmit: async (values) => {
        try {
          await updateUserAddress({
            userId: userId as string,
            addressToUpdate: values,
          });
          // TODO: error handling

          dispatch(closeModal("userDetailsModal"));
        } catch (err: any) {
          console.log(err);
        }
      },
    });

  if (!modals["userDetailsModal"]) return null;
  return ReactDOM.createPortal(
    <div className="user-details-modal">
      <div
        className="user-details-modal__overlay"
        onClick={() => dispatch(closeModal("userDetailsModal"))}
      ></div>
      <div className="user-details-modal__content">
        <button
          className="user-details-modal__close"
          onClick={() => dispatch(closeModal("userDetailsModal"))}
        >
          <AiOutlineClose className="user-details-modal__close-icon" />
        </button>
        <h2 className="user-details-modal__title">Edit details</h2>
        <form className="user-details-modal__form" onSubmit={handleSubmit}>
          <InputField
            type="street"
            label="Street"
            name="street"
            className="user-details-modal"
            touched={touched.street}
            error={errors.street}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.street}
          />
          <InputField
            type="city"
            label="City"
            name="city"
            className="user-details-modal"
            touched={touched.city}
            error={errors.city}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
          />
          <InputField
            type="state"
            label="State"
            name="state"
            className="user-details-modal"
            touched={touched.state}
            error={errors.state}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.state}
          />
          <InputField
            type="zip"
            label="Zip code"
            name="zip"
            className="user-details-modal"
            touched={touched.zip}
            error={errors.zip}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.zip}
          />
          <button type="submit" className="user-details-modal__button">
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default UserDetailsModal;
