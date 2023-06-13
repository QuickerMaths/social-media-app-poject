import React from "react";

interface Props {
  label: string;
  type: string;
  className: string;
}

const InputField: React.FC<Props> = ({ label, type, className }) => {
  return (
    <div className={`${className}__form-element`}>
      <label htmlFor={type} className={`${className}__label`}>
        {label}
      </label>
      <input
        type={type}
        name={type}
        id={type}
        className={`${className}__input`}
      />
    </div>
  );
};

export default InputField;
