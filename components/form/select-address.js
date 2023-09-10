import React, { useContext, useEffect, useState } from "react";
import SendPlaneLineIcon from "remixicon-react/SendPlaneLineIcon";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CheckDoubleLineIcon from "remixicon-react/CheckDoubleLineIcon";
import { MainContext } from "../../utils/contexts/MainContext";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { getLocationObj } from "../../utils/getLocation";
import { parseCookies } from "nookies";

const SelectAddress = ({ setOpen = () => {} }) => {
  const { t: tl } = useTranslation();
  const cookies = parseCookies();
  const { isOpen, setIsOpen, handleDrawer, address, getUser, setDrawerTitle } =
    useContext(MainContext);
  const { setUserDefaultLocation, userLocation } = useContext(AuthContext);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const newUserLocation = userLocation?.split(",");
  const cuurentAddress = address?.find(
    (item) =>
      item.location.latitude === newUserLocation[0] ||
      item.location.longitude === newUserLocation[1]
  );
  useEffect(() => {
    if (address.length === 0 && cookies.access_token) {
      getUser();
    }
  }, []);

  useEffect(() => {
    if (cuurentAddress) {
      setUserDefaultLocation({ ...address[0].location, id: address[0].id });
    } else if (Boolean(userLocation)) {
      getLocationObj({
        location: { lat: newUserLocation[0], lng: newUserLocation[1] },
        setAddress: setDefaultAddress,
      });
    } else {
      getAddressObj();
    }
  }, [address, userLocation]);

  const click = () => {
    setDrawerTitle("Enter a delivery address");
    setIsOpen("enter-address");
  };
  const handleAddress = (e, item) => {
    e.stopPropagation();
    setUserDefaultLocation({ ...item.location, id: item.id });
    setOpen(false);
    setIsOpen(null);
  };
  const getAddressObj = () => {
    const loc = process.env.DEFAULT_LOCATION.split(",");
    if (!defaultAddress && loc[0]) {
      getLocationObj({
        location: { lat: loc[0], lng: loc[1] },
        setAddress: setDefaultAddress,
      });
    }

    return defaultAddress;
  };

  return (
    <div
      className={
        isOpen === "enter-address" ? "select-address active" : "select-address"
      }
      onClick={click}
    >
      <SendPlaneLineIcon size={20} className="send-plane" />
      <div className="label">
        {cuurentAddress ? cuurentAddress.address : defaultAddress?.address}
      </div>
      <ArrowDownSLineIcon size={20} className="arrow-down" />
      <div className="enter-address">
        <div
          className="add-address-btn"
          onClick={() => handleDrawer("enter-address")}
        >
          <AddLineIcon size={20} />
          <span>{tl("Add new address")}</span>
        </div>
        {address?.map((item, key) => {
          const lat_lng = `${item.location.latitude},${item.location.longitude}`;
          return (
            <div
              key={key}
              className="address-list"
              onClick={(e) => handleAddress(e, item)}
            >
              <span>{item.address}</span>
              {lat_lng === userLocation && (
                <CheckDoubleLineIcon className="suffix" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectAddress;
