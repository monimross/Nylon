import React from "react";
import Link from "next/link";
import getImg from "../../utils/getImg";
import { useTranslation } from "react-i18next";
const BrandCard = ({ brand }) => {
  const { t: tl } = useTranslation();
  return (
    <Link href={`/stores/all-brand/${brand?.id}`}>
      <a className="brand-card">
        {brand.img ? (
          <img src={getImg(brand.img)} alt="Logo" />
        ) : (
          <div className="no-image">{tl("No image")}</div>
        )}
      </a>
    </Link>
  );
};

export default BrandCard;
