import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputPassword from "../form/input-password";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
import { UserApi } from "../../api/main/user";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const NewPassword = ({ phone }) => {
  const { t: tl } = useTranslation();
  const [validate, setValidate] = useState(null);
  const [userData, setUserData] = useState({});
  const [loader, setLoader] = useState(false);
  const route = useRouter();
  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    setUserData({
      ...userData,
      [name]: target.value,
    });
  };

  const checkPassword = () => {
    if (userData.password === userData.password_confirmation) {
      setValidate("check");
    } else {
      setValidate("checked");
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    UserApi.passwordUpdate({ ...userData, phone })
      .then(() => {
        route.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return (
    <div className="sign-up-form">
      <form onSubmit={onSubmit}>
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

export default NewPassword;
