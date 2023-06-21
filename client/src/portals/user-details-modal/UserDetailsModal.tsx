import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import ReactDOM from "react-dom";
import InputField from "../../components/inputField/InputField";
import addressValidation from "../../validation/addressValidation";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  setRerenderAddress: React.Dispatch<React.SetStateAction<boolean>>;
  reRenderAddress: boolean;
}

const UserDetailsModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  userId,
  reRenderAddress,
  setRerenderAddress,
}) => {
  //TODO: refactor to rtkQuery and formik components
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
          await axios.put(
            "http://localhost:5000/api/users",
            {
              userId,
              street: values.street,
              city: values.city,
              state: values.state,
              zip: values.zip,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setRerenderAddress(!reRenderAddress);
          setIsOpen(false);
        } catch (err: any) {
          console.log(err);
        }
      },
    });

  if (!isOpen) return null;
  //TODO: swap X with icon
  return ReactDOM.createPortal(
    <div className="user-details-modal">
      <div className="user-details-modal__overlay"></div>
      <div className="user-details-modal__content">
        <button
          className="user-details-modal__close"
          onClick={() => setIsOpen(false)}
        >
          X
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
            Edit
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default UserDetailsModal;
