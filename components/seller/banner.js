import React from "react";
import { useTranslation } from "react-i18next";
import { imgBaseUrl } from "../../constants";

const Banner = ({ storeDetail }) => {
  const { t: tl } = useTranslation();
  return (
    <div className="seller-banner">
      <div className="store">
        <div className="logo">
          <img src={imgBaseUrl + storeDetail.logo_img} />
        </div>
        <div className="name">{storeDetail?.translation?.title}</div>
        <div className="type">{tl("Seller")}</div>
      </div>
      <div className="banner-img">
        <img src={imgBaseUrl + storeDetail?.background_img} />
      </div>
    </div>
  );
};

export default Banner;
