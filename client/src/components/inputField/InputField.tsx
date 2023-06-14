import React from "react";

interface Props {
  label: string;
  type: string;
  name: string;
  className: string;
  error: string | undefined;
  touched: boolean | undefined;
  onChange: any;
  onBlur: any;
  value: any;
}

const InputField: React.FC<Props> = ({
  label,
  type,
  name,
  className,
  error,
  touched,
  onChange,
  onBlur,
  value,
}) => {
  return (
    <>
      <div className={`${className}__form-element`}>
        <label htmlFor={name} className={`${className}__label`}>
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          className={
            error && touched
              ? `${className}__input input-error`
              : `${className}__input`
          }
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
      </div>
      {error && touched && <p className="input-error-msg">{error}</p>}
    </>
  );
};

export default InputField;
