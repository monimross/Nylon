import React from "react";
import { useTranslation } from "react-i18next";

const InputText = ({
  label = "",
  placeholder = "",
  className = "",
  onChange = () => {},
  onBlur = () => {},
  name = "",
  value,
  suffix,
  required,
  type = "text",
  disabled = false,
}) => {
  const { t: tl } = useTranslation();
  return (
    <div disabled={disabled} className={`form-item ${className}`}>
      <div className="label">
        {`${tl(label)} `} {required && <span>*</span>}
      </div>
      <input
        type={type}
        required={required}
        onBlur={(e) => onBlur(e)}
        value={value}
        name={name}
        onChange={(e) => onChange(e)}
        placeholder={tl(placeholder)}
        autoComplete="off"
        disabled={disabled}
      />
      <div className="suffix">{suffix}</div>
    </div>
  );
};

export default InputText;
