import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import React from "react";

const InputPhone = ({ onChange, name = "", required, value, label }) => {
  return (
    <PhoneInput
      enableSearch={true}
      country={"us"}
      value={value}
      placeholder={label}
      inputProps={{
        name,
        required,
        autoFocus: false,
      }}
      onChange={(phone, name, e) =>
        onChange({
          target: {
            value: e.target.value?.replace(/\s/g, ""),
            name: e.target.name,
          },
        })
      }
    />
  );
};

export default InputPhone;
