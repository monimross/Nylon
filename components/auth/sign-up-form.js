import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
import InputPhone from "../form/phone";
const SignUpForm = ({ getVerifyCode, setPhone, loader, phone, error }) => {
  const [privacy, setPrivacy] = useState(true);
  const { t: tl } = useTranslation();
  const onFinish = (e) => {
    e.preventDefault();
    getVerifyCode();
  };
  return (
    <div className="sign-up-form">
      <form onSubmit={onFinish}>
        <InputPhone
          onChange={(e) => setPhone(e.target.value)}
          label="Phone number"
          placeholder="1 202 340 1032"
        />
        <span className="error-text">{error}</span>
        <div className="privacy">
          <input type="checkbox" onChange={() => setPrivacy(!privacy)} />
          {tl("i agree")}
          <Link href="/privacy-policy">
            <span>{tl("Privacy and Policy")}</span>
          </Link>
        </div>
        <button
          data-loader={loader}
          disabled={!(!privacy && phone)}
          type="submit"
          className="btn-success"
          id="sign-in-button"
        >
          <Loader4LineIcon />
          {tl("Send sms code")}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
