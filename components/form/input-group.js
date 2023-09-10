import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import useDidUpdate from "../../utils/hooks/useDidUpdate";

const InputGroup = ({
  label = "",
  placeholder = "",
  onChange = () => {},
  onBlur = () => {},
  name = "",
  value = "",
  suffix,
  required,
  type = "text",
  disabled,
}) => {
  const { t: tl } = useTranslation();
  const [pasportType, setType] = useState("AA");
  const [text, setText] = useState("");
  const handleChange = () => {
    onChange({ target: { name: name, value: `${pasportType}${text}` } });
  };
  useDidUpdate(() => {
    handleChange();
  }, [pasportType, text]);

  useEffect(() => {
    if (Boolean(value)) {
      if (value.includes("AZE")) {
        setType(value?.slice(0, 3));
        setText(value?.slice(3, 30));
      } else if (value.includes("AA")) {
        setType(value?.slice(0, 2));
        setText(value?.slice(2, 30));
      }
    }
  }, [value]);

  return (
    <div disabled={disabled} className={`form-item group-input`}>
      <div className="selector">
        <select
          disabled={disabled}
          onChange={(e) => setType(e.target.value)}
          value={pasportType}
        >
          <option value="AA">AA</option>
          <option value="AZ">AZE</option>
        </select>
        <span>
          <ArrowDownSLineIcon />
        </span>
      </div>
      <div className="input-text">
        <div className="label">
          {`${tl(label)} `} {required && <span>*</span>}
        </div>
        <input
          type={type}
          required={required}
          onBlur={(e) => onBlur(e)}
          value={text}
          name={name}
          onChange={(e) => setText(e.target.value)}
          placeholder={tl(placeholder)}
          autoComplete="off"
          disabled={disabled}
        />
      </div>
      <div className="suffix">{suffix}</div>
    </div>
  );
};

export default InputGroup;
