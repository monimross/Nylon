import React from "react";
import { useTranslation } from "react-i18next";

const InputTime = ({
  label,
  value,
  name,
  onChange = () => {},
  disabled,
  required = false,
}) => {
  const { t: tl } = useTranslation();
  return (
    <div className="form-item" disabled={disabled}>
      <div className="label">{tl(label)}</div>
      <input
        onChange={(e) => onChange(e)}
        name={name}
        value={value}
        type="time"
        required={required}
      />
    </div>
  );
};

export default InputTime;
