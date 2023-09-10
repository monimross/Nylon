import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Confirm from "../../components/forget-password/confirm-otp";
import EnterPhone from "../../components/forget-password/enter-phone";
import NewPassword from "../../components/forget-password/new-password";
import { images } from "../../constants/images";
import { useContext } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";

const ForgetPassword = () => {
  const { t: tl } = useTranslation();
  const settings = useSelector((state) => state.settings.data);
  const [formStep, setFormStep] = useState("enter-phone");
  const [phone, setPhone] = useState(true);
  const [loader, setLoader] = useState(false);
  const [verify, setVerify] = useState(false);
  const [callback, setCallback] = useState(undefined);
  const [error, setError] = useState(null);
  const { phoneNumberSignIn } = useContext(AuthContext);

  const sumbimtEnterPhone = (e) => {
    e && e.preventDefault();

    phoneNumberSignIn(phone)
      .then((res) => {
        setCallback(res);
        setLoader(false);
        setFormStep("confirm");
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        setError(error?.message);
      });

    // serviceWithOutToken
    //   .post("/api/v1/auth/forgot/password", { phone })
    //   .then((res) => {
    //     setVerify(res.data.data);
    //     setFormStep("confirm");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error(error.response.data.message);
    //   })
    //   .finally(() => {
    //     setLoader(false);
    //   });
  };

  const handleConfirm = (otp) => {
    callback
      .confirm(otp || "")
      .then(() => setFormStep("new-password"))
      .catch(() => setError("verify.error"));
  };

  useEffect(() => {
    return () => {
      setError("");
    };
  }, []);
  return (
    <div className="container">
      <div className="auth-header">
        <Link href="/">
          <a className="logo">{settings?.title}</a>
        </Link>
        <div className="auth-btn-side">
          <div className="label">{tl("Do not have an account?")}</div>
          <Link href="/auth/sign-up">
            <a className="btn-auth">{tl("Sign Up")}</a>
          </Link>
        </div>
      </div>
      <div className="authentication">
        <div className="auth-form">
          <div className="title">{tl("Forget password")}</div>
          {formStep === "enter-phone" && (
            <EnterPhone
              loader={loader}
              setPhone={setPhone}
              sumbimtEnterPhone={sumbimtEnterPhone}
              error={error}
            />
          )}
          {formStep === "confirm" && (
            <Confirm
              setFormStep={setFormStep}
              verify={verify}
              sumbimtEnterPhone={sumbimtEnterPhone}
              handleConfirm={handleConfirm}
              error={error}
              phone={phone}
            />
          )}
          {formStep === "new-password" && <NewPassword phone={phone} />}
        </div>
        <div className="auth-banner">
          <img src={images.AuthBanner} alt="Auth banner" />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
