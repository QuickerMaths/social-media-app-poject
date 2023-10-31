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
import { useUpdateUserMutation } from "../../features/apiSlice/userApiSlice/userApiSlice";
import useToastCreator from "../../hooks/useToastCreator";
import Spinner from "../../utilities/spinner/Spinner";

const UserDetailsModal = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { modals } = useAppSelector((state: RootState) => state.modal);

  const [updateUser, { isLoading: isUpdating, isError, error, isSuccess }] =
    useUpdateUserMutation();

  if (isError) useToastCreator(error as string, "error");

  const { handleChange, handleBlur, errors, touched, values, handleSubmit } =
    useFormik({
      initialValues: {
        street: "",
        city: "",
        state: "",
        postal_code: "",
      },
      validationSchema: addressValidation,
      onSubmit: async (values) => {
        await updateUser({
          userId: userId as number,
          userUpdateData: values,
        });

        if (isSuccess) dispatch(closeModal("userDetailsModal"));
      },
    });

  //TODO: for some reason, submiting form is not working at all
  let content;

  if (isUpdating) {
    content = <Spinner size={125} />;
  } else {
    content = (
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
            type="postal_code"
            label="Postal_code"
            name="postal_code"
            className="user-details-modal"
            touched={touched.postal_code}
            error={errors.postal_code}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.postal_code}
          />
          <button
            type="submit"
            className="user-details-modal__button"
            disabled={isUpdating}
          >
            Update
          </button>
        </form>
      </div>
    );
  }

  if (!modals["userDetailsModal"]) return null;
  return ReactDOM.createPortal(
    <div className="user-details-modal">
      <div
        className="user-details-modal__overlay"
        onClick={() => dispatch(closeModal("userDetailsModal"))}
      />
      {content}
    </div>,
    document.body
  );
};

export default UserDetailsModal;
