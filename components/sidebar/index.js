import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon";
import FileListLineIcon from "remixicon-react/FileListLineIcon";
import PercentLineIcon from "remixicon-react/PercentLineIcon";
import EyeLineIcon from "remixicon-react/EyeLineIcon";
import WalletLineIcon from "remixicon-react/WalletLineIcon";
import CollageLineIcon from "remixicon-react/CollageLineIcon";
import Settings2LineIcon from "remixicon-react/Settings2LineIcon";
import HeadphoneLineIcon from "remixicon-react/HeadphoneLineIcon";
import AppleLineIcon from "remixicon-react/AppleLineIcon";
import GooglePlayLineIcon from "remixicon-react/GooglePlayLineIcon";
import LogoutBoxLineIcon from "remixicon-react/LogoutBoxLineIcon";
import LoginBoxLineIcon from "remixicon-react/LoginBoxLineIcon";
import { parseCookies } from "nookies";
import { batch, useDispatch, useSelector } from "react-redux";
import { imgBaseUrl } from "../../constants";
import moment from "moment/moment";
import { clearUser } from "../../redux/slices/user";
import { clearCart, clearOrderShops } from "../../redux/slices/cart";
import { clearOrder } from "../../redux/slices/order";
import { clearSavedStore } from "../../redux/slices/savedStore";
import { clearAddress } from "../../redux/slices/savedAddress";
import { clearList } from "../../redux/slices/savedProduct";
import { clearViewedList } from "../../redux/slices/viewed-product";
import { clearNotification } from "../../redux/slices/notification";

const Sidebar = ({ setOpen }) => {
  let config = null;
  if (parseCookies()?.settings) {
    config = JSON.parse(parseCookies()?.settings);
  }
  const { t: tl } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const cookie = parseCookies();
  const handleClick = () => {
    setOpen(false);
  };
  const logOut = () => {
    batch(() => {
      dispatch(clearUser());
      dispatch(clearCart());
      dispatch(clearOrderShops());
      dispatch(clearOrder());
      dispatch(clearSavedStore());
      dispatch(clearAddress());
      dispatch(clearList());
      dispatch(clearViewedList());
      dispatch(clearNotification());
    });
    document.cookie =
      "access_token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie =
      "userLocation" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setOpen(false);
  };
  const findHTTPS = user?.img?.includes("https");
  return (
    <div className="sidebar">
      {Boolean(Object.keys(user).length) && (
        <div className="header user">
          {findHTTPS ? (
            <img src={user.img} alt="Avatar" />
          ) : user.img ? (
            <img src={imgBaseUrl + user.img} alt="Avatar" />
          ) : (
            <div className="square avatar">{user.firstname?.slice(0, 1)}</div>
          )}
          <div className="left">
            <span>{`${user.firstname || ""} ${
              user.lastname?.slice(0, 1) || ""
            }`}</span>
            <div className="since">
              {`Goshops customer since ${moment(user?.registered_at).format(
                "MMM Do YY"
              )}`}
            </div>
          </div>
        </div>
      )}
      <div className="sidebar-item">
        <div className="sider-links">
          {cookie?.access_token && (
            <Link href="/order-history">
              <a onClick={handleClick} className="link">
                <FileListLineIcon />
                <span>{tl("Order history")}</span>
                <ArrowRightSLineIcon />
              </a>
            </Link>
          )}
          <Link href="/stores/discount-product">
            <a onClick={handleClick} className="link">
              <PercentLineIcon />
              <span>{tl("Discount")}</span>
              <ArrowRightSLineIcon />
            </a>
          </Link>
          <Link href="/stores/viewed-product">
            <a onClick={handleClick} className="link">
              <EyeLineIcon />
              <span>{tl("Viwed Products")}</span>
              <ArrowRightSLineIcon />
            </a>
          </Link>
          {cookie?.access_token && (
            <Link href="/wallet-history">
              <a onClick={handleClick} className="link">
                <WalletLineIcon />
                <span>{tl("Wallet history")}</span>
                <ArrowRightSLineIcon />
              </a>
            </Link>
          )}
          <Link href="/blog">
            <a onClick={handleClick} className="link">
              <CollageLineIcon />
              <span>{tl("Blog")}</span>
              <ArrowRightSLineIcon />
            </a>
          </Link>
          <Link href="/settings">
            <a onClick={handleClick} className="link">
              <Settings2LineIcon />
              <span>{tl("Settings")}</span>
              <ArrowRightSLineIcon />
            </a>
          </Link>
        </div>
      </div>
      {/* <div className="sidebar-item">
        <div className="label">Support</div>
        <div className="sider-links">
          <Link href="/order-history">
            <a onClick={handleClick} className="link">
              <HeadphoneLineIcon />
              <span>{tl("Help center")}</span>
              <ArrowRightSLineIcon />
            </a>
          </Link>
        </div>
      </div> */}
      <div className="sidebar-item">
        <div className="label">Our apps</div>
        <div className="sider-links">
          <a
            href={config?.app_store_url}
            onClick={handleClick}
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            <AppleLineIcon />
            <span>{tl("App store")}</span>
            <ArrowRightSLineIcon />
          </a>
          <a
            href={config?.google_play_url}
            onClick={handleClick}
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            <GooglePlayLineIcon />
            <span>{tl("Google play")}</span>
            <ArrowRightSLineIcon />
          </a>
        </div>
      </div>
      <div className="sidebar-item">
        <div className="sider-links">
          {cookie?.access_token ? (
            <Link href="/">
              <a onClick={logOut} className="link">
                <LogoutBoxLineIcon />
                <span>{tl("Log out")}</span>
                <ArrowRightSLineIcon />
              </a>
            </Link>
          ) : (
            <Link href="/auth/sign-in">
              <a onClick={handleClick} className="link">
                <LoginBoxLineIcon />
                <span>{tl("Sign up")}</span>
                <ArrowRightSLineIcon />
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
