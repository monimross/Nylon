import React, { useState } from "react";
import EyeOffLineIcon from "remixicon-react/EyeOffLineIcon";
import EyeLineIcon from "remixicon-react/EyeLineIcon";
import { useTranslation } from "react-i18next";

const InputPassword = ({
  label = "",
  placeholder = "",
  onChange = () => {},
  name = "",
  value,
  onBlur,
  className = "",
  disabled,
}) => {
  const [inputType, setInputType] = useState(true);
  const { t: tl } = useTranslation();
  const handleClick = () => {
    setInputType(!inputType);
  };
  return (
    <div disabled={disabled} className={`form-item ${className}`}>
      <div className="label">{tl(label)}</div>
      <input
        id="password"
        name={name}
        onChange={(e) => onChange(e)}
        type={inputType ? "password" : "text"}
        placeholder={tl(placeholder)}
        value={value}
        onBlur={onBlur}
        autoComplete="new-password"
      />
      {inputType ? (
        <EyeOffLineIcon size={20} className="suffix" onClick={handleClick} />
      ) : (
        <EyeLineIcon size={20} className="suffix" onClick={handleClick} />
      )}
    </div>
  );
};

export default InputPassword;
