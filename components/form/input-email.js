import React from "react";
import { useTranslation } from "react-i18next";

const InputEmail = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  required = false,
  disabled,
}) => {
  const { t: tl } = useTranslation();
  return (
    <div className="form-item" disabled={disabled}>
      <div className="label">
        {`${tl(label)} `} {required && <span>*</span>}
      </div>
      <input
        disabled={disabled}
        onChange={(e) => onChange(e)}
        name={name}
        value={value}
        type="email"
        placeholder={tl(placeholder)}
        autoComplete="off"
        id="email"
        required={required}
      />
    </div>
  );
};

export default InputEmail;
