import React from "react";
import OtpInput from "react-otp-input";
import RefreshLineIcon from "remixicon-react/RefreshLineIcon";
import Countdown from "../../utils/countDown";
import { useTranslation } from "react-i18next";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
import { useState } from "react";

const Confirm = ({
  verify,
  sumbimtEnterPhone,
  handleConfirm,
  error,
  phone,
}) => {
  const { t: tl } = useTranslation();
  const [otp, setOtp] = useState();
  const [loader, setLoader] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(null);
  const handleChange = (otp) => setOtp(otp);
  const handleResend = () => {
    setIsTimeOver(null);
    sumbimtEnterPhone();
  };

  // const handleConfirm = () => {
  //   setLoader(true);
  //   serviceWithOutToken
  //     .post("/api/v1/auth/forgot/password/confirm", {
  //       verifyId: verify.verifyId,
  //       verifyCode: otp,
  //     })
  //     .then((res) => {
  //       setCookie(null, "access_token", res.data.data.token, {
  //         maxAge: 30 * 24 * 60 * 60,
  //         path: "/",
  //       });
  //       getUser();
  //       setFormStep("new-password");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error(error.response.data.message);
  //     })
  //     .finally(() => {
  //       setLoader(false);
  //     });
  // };

  return (
    <div className="confirm">
      <div className="sent-gmail">{`${tl("sent-sms")} ${phone}`}</div>
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={6}
        separator={""}
        className="otp-input"
      />
      <span className="error-text">{error}</span>
      <div className="btn-group">
        <button
          data-loader={loader}
          className="btn-success confirm-btn"
          onClick={() => handleConfirm(otp)}
        >
          <Loader4LineIcon />
          {tl("Confirm")}
        </button>
        {isTimeOver ? (
          <button
            className="btn-dark"
            onClick={handleResend}
            id="sign-in-button"
          >
            <RefreshLineIcon size={28} />
          </button>
        ) : (
          <button className="btn-dark">
            <Countdown isTimeOver={isTimeOver} setIsTimeOver={setIsTimeOver} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Confirm;
