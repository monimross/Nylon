import React from "react";
import { useTranslation } from "react-i18next";

const ShopStatus = ({ title, text, icon, className, href = "" }) => {
  const { t: tl } = useTranslation();
  return (
    <div className="tab-pane">
      <div className="be-seller-status">
        <div className={`icon ${className}`}>{icon}</div>
        <div className="title">{tl(title)}</div>
        {text && (
          <button className="btn-dark">
            <a href={href}>{tl(text)}</a>
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopStatus;
