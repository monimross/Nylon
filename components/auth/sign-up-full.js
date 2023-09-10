import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomSelect from "../form/custom-select";
import InputDate from "../form/input-date";
import InputPassword from "../form/input-password";
import InputText from "../form/input-text";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";

const SignUpFormFull = ({ userData, setUserData, onSubmit, loader }) => {
  const [validate, setValidate] = useState(null);
  const { t: tl } = useTranslation();
  const gender = [
    { id: "male", value: "Male" },
    { id: "female", value: "Female" },
  ];
  const handleChange = (event) => {
    const { target } = event;
    const value = target.type === "radio" ? target.checked : target.value;
    const { name } = target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleGender = (value) => {
    setUserData({
      ...userData,
      gender: value.id,
    });
  };
  const checkPassword = () => {
    if (userData.password === userData.password_confirmation) {
      setValidate("check");
    } else {
      setValidate("checked");
    }
  };

  return (
    <div className="sign-up-form">
      <form onSubmit={onSubmit}>
        <InputText
          onChange={handleChange}
          label="First name"
          placeholder="John"
          name="firstname"
          value={userData.firstname}
          required={true}
        />
        <InputText
          name="lastname"
          value={userData.lastname}
          onChange={handleChange}
          label="Last name"
          placeholder="Doe"
          required={true}
        />
        <CustomSelect
          onChange={handleGender}
          options={gender}
          label="Geder"
          placeholder="Male"
          value={userData.gender}
        />
        <InputDate
          onChange={handleChange}
          name="birthday"
          value={userData.birthday}
          label="Year of birth"
          required={true}
        />
        <InputPassword
          name="password"
          label="Password"
          placeholder="********"
          onChange={handleChange}
        />
        <InputPassword
          name="password_confirmation"
          label="Confirm password"
          placeholder="*********"
          onChange={handleChange}
          onBlur={checkPassword}
          className={
            validate === "check"
              ? "success"
              : validate === "checked"
              ? "error"
              : ""
          }
        />
        <button
          type="submit"
          disabled={
            validate === "check" ? false : validate === "checked" ? true : true
          }
          className="btn-success"
          data-loader={loader}
        >
          <Loader4LineIcon />
          {tl("Sign up")}
        </button>
      </form>
    </div>
  );
};

export default SignUpFormFull;
