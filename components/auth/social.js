import React, { useContext } from "react";
import GoogleFillIcon from "remixicon-react/GoogleFillIcon";
import FacebookFillIcon from "remixicon-react/FacebookFillIcon";
import PhoneFillIcon from "remixicon-react/PhoneFillIcon";
import MailFillIcon from "remixicon-react/MailFillIcon";
import { useAuth } from "../../utils/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import serviceWithOutToken from "../../services/auth";
import { setCookie } from "nookies";
import { MainContext } from "../../utils/contexts/MainContext";
import { toast } from "react-toastify";
const SocialAuth = ({ setAuthType, authType }) => {
  const router = useRouter();
  const { googleSignIn, facebookSignIn } = useAuth();
  const { getUser } = useContext(MainContext);
  const { t: tl } = useTranslation();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn().then((res) => {
        serviceWithOutToken
          .post("/api/v1/auth/google/callback", {
            name: res.user.displayName,
            email: res.user.email,
            id: res.user.uid,
            avatar: res.user.photoURL,
          })
          .then((response) => {
            setCookie(null, "access_token", response.data.data.access_token, {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });
            getUser();
            if (router.query.invite) {
              router.push(`/invite/${router.query.invite}`);
            } else router.push("/");
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response?.data?.message);
          });
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleFacebookSignIn = async (e) => {
    e.preventDefault();
    try {
      await facebookSignIn().then((res) => {
        serviceWithOutToken
          .post("/api/v1/auth/google/callback", {
            name: res.user.displayName,
            email: res.user.email,
            id: res.user.uid,
            avatar: res.user.photoURL,
          })
          .then((response) => {
            setCookie(null, "access_token", response.data.data.access_token, {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });
            getUser();
            if (router.query.invite) {
              router.push(`/invite/${router.query.invite}`);
            } else router.push("/");
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response?.data?.message);
          });
      });
    } catch (error) {
      console.log("Hello");
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-social">
      <div className="social-item google" onClick={handleGoogleSignIn}>
        <GoogleFillIcon size={22} />
        <span>{tl("Continue with Google")}</span>
      </div>
      <div className="social-item facebook" onClick={handleFacebookSignIn}>
        <FacebookFillIcon size={22} />
      </div>
      {/* {authType === "phone" ? (
        <div className="social-item apple" onClick={() => setAuthType("gmail")}>
          <MailFillIcon size={22} />
        </div>
      ) : (
        <div className="social-item apple" onClick={() => setAuthType("phone")}>
          <PhoneFillIcon size={22} />
        </div>
      )} */}
    </div>
  );
};

export default SocialAuth;
