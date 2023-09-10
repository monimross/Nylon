import Link from "next/link";
import React from "react";
import { images } from "../../../constants/images";
import SignInForm from "../../../components/auth/sign-in-form";
import SocialAuth from "../../../components/auth/social";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useState } from "react";
import Recaptcha from "../../../components/recaptcha";

const SignIn = () => {
  const { t: tl } = useTranslation();
  const settings = useSelector((state) => state.settings.data);
  const [authType, setAuthType] = useState("phone");
  const [recaptcha, setRecaptcha] = useState(null);

  const handleRecaptchaChange = (value) => {
    setRecaptcha(value);
  };
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
          <div className="title">{tl("Sign In")}</div>
          <SignInForm
            setAuthType={setAuthType}
            authType={authType}
            recaptcha={recaptcha}
          />
          <SocialAuth setAuthType={setAuthType} authType={authType} />
          <Recaptcha onChange={handleRecaptchaChange} />
        </div>
        <div className="auth-banner">
          <img src={images.AuthBanner} alt="Auth banner" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
