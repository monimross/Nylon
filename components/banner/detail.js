import React from "react";
import { imgBaseUrl } from "../../constants";

const BannerDetail = ({ img }) => {
  return (
    <div className="seller-banner">
      <div className="banner-img detail-img">
        <img src={imgBaseUrl + img} />
      </div>
    </div>
  );
};

export default BannerDetail;
