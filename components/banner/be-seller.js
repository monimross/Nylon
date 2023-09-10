import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { images } from "../../constants/images";

const BeSeller = () => {
  const { t: tl } = useTranslation();
  return (
    <div className="be-seller-banner">
      <div className="banner-img">
        <img src={images.InfiniteLine} />
        <div className="text-content">
          <div className="title">{tl("One click get become seller")}</div>
          <div className="short-description">
            {tl(
              "We sell more than 100 million products with discounts and promo codes."
            )}
          </div>
          <Link href="/be-seller">
            <div className="be-seller-link">{tl("Become seller")}</div>
          </Link>
        </div>
      </div>
      <div className="banner-img">
        <img src={images.BeSeller1} />
      </div>
    </div>
  );
};

export default BeSeller;
