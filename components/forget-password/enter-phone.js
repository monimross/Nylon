import React from "react";
import { useTranslation } from "react-i18next";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
import InputPhone from "../form/phone";

const EnterPhone = ({ loader, sumbimtEnterPhone, setPhone, error }) => {
  const { t: tl } = useTranslation();
  return (
    <div className="sign-up-form">
      <form onSubmit={sumbimtEnterPhone}>
        <InputPhone
          onChange={(e) => setPhone(e.target.value)}
          label="Phone number"
          placeholder="1 202 340 1032"
        />
        <span className="error-text">{error}</span>
        <button
          data-loader={loader}
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

export default EnterPhone;
