import React from "react";
import { useTranslation } from "react-i18next";

const InputDate = ({
  label,
  value,
  name,
  onChange = () => {},
  error,
  required,
  disabled,
}) => {
  const { t: tl } = useTranslation();
  return (
    <div
      disabled={disabled}
      className={error ? "form-item invalid" : "form-item"}
    >
      <div className="label">
        {`${tl(label)} `} {required && <span>*</span>}
      </div>
      <input
        required={required}
        onChange={(e) => onChange(e)}
        name={name}
        value={value}
        type="date"
        disabled={disabled}
      />
    </div>
  );
};

export default InputDate;
