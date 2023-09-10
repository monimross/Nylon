import React from "react";
import { images } from "../../constants/images";
import getImg from "../../utils/getImg";

const BrandBanner = ({ brand }) => {
  return (
    <div className="brand-banner">
      <div className="logo">
        <img src={getImg(brand.data.img)} alt="logo" />
      </div>
      <div className="banner-img">
        <img src={images.Banner} alt="logo" />
      </div>
    </div>
  );
};

export default BrandBanner;
