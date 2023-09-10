import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserApi } from "../../api/main/user";
import EnterAddress from "../../components/address/enter-delivery-address";
import Breadcrumb from "../../components/breadcrumb";
import CustomDrawer from "../../components/drawer";
import Coupon from "../../components/settings/coupon";
import Profile from "../../components/settings/profile";
import SavedLocation from "../../components/settings/saved-location";
import System from "../../components/settings/system";
import { savedUser } from "../../redux/slices/user";
import { useTranslation } from "react-i18next";
import SEO from "../../components/seo";
import { parseCookies } from "nookies";

const Settings = ({ setLoader }) => {
  const { t: tl } = useTranslation();
  const cookies = parseCookies();
  const dispatch = useDispatch();
  const [tabKey, setTabKey] = useState("system");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("Profile settings");
  const [editAddress, setEditAddress] = useState(false);
  const handleTab = (key) => {
    setTabKey(key);
    setTitle(key);
  };
  const getUser = () => {
    if (cookies?.access_token)
      UserApi.get()
        .then((res) => {
          setUser(res);
          dispatch(savedUser(res.data));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoader(false);
        });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <SEO />
      <div className="container settings">
        <Breadcrumb />
        <div className="tabs">
          <div
            className={tabKey === "system" ? "tab active" : "tab"}
            onClick={() => handleTab("system")}
          >
            {tl("System settings")}
          </div>
          {user.data && (
            <div
              className={tabKey === "profile" ? "tab active" : "tab"}
              onClick={() => handleTab("profile")}
            >
              {tl("Profile settings")}
            </div>
          )}
          {user.data && (
            <div
              className={tabKey === "saved" ? "tab active" : "tab"}
              onClick={() => handleTab("saved")}
            >
              {tl("Saved location")}
            </div>
          )}
          {/* <div
            className={tabKey === "coupon" ? "tab active" : "tab"}
            onClick={() => handleTab("coupon")}
          >
            {tl("Coupon")}
          </div> */}
        </div>
        <div className="tab-pane">
          <div className="title">{tl(title)}</div>
          {tabKey === "profile" && user.data && (
            <Profile userData={user.data} getUser={getUser} />
          )}
          {tabKey === "system" && <System setLoader={setLoader} />}
          {tabKey === "saved" && user.data && (
            <SavedLocation
              setEditAddress={setEditAddress}
              setOpen={setOpen}
              setLoader={setLoader}
            />
          )}
          {/* {tabKey === "coupon" && <Coupon />} */}
        </div>
        <CustomDrawer
          title="Enter a delivery address"
          open={open}
          setOpen={setOpen}
        >
          <EnterAddress
            getUser={getUser}
            setOpen={setOpen}
            editAddress={editAddress}
            setEditAddress={setEditAddress}
          />
        </CustomDrawer>
      </div>
    </>
  );
};

export default Settings;
