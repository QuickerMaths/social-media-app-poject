import React from "react";

interface Props {
  label: string;
  type: string;
  className: string;
  onChange: any;
  value: any;
}

const InputField: React.FC<Props> = ({
  label,
  type,
  className,
  onChange,
  value,
}) => {
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
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputField;
