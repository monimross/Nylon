import React from "react";
import { useTranslation } from "react-i18next";
import { imgBaseUrl } from "../../constants";
import { getPrice } from "../../utils/getPrice";

const Supplier = ({ shop, item: showData }) => {
  const { t: tl } = useTranslation();
  const getFinnalyCheck = () => {
    let totalDiscount = showData?.order_stocks.reduce(
      (total, item) => (total += item.discount),
      0
    );
    let total_price = showData?.price;
    let productTax = showData?.order_stocks.reduce(
      (total, item) => (total += item.tax),
      0
    );
    let shopTax = showData?.tax;
    let totalTax = productTax;
    return { totalDiscount, total_price, totalTax, shopTax };
  };
  const { totalDiscount, total_price, totalTax, shopTax } = getFinnalyCheck();

  return (
    <div className="supplier supplier-history">
      <div className="store">
        <div className="logo">
          <img src={imgBaseUrl + shop.logo_img} alt="logo" />
        </div>
        <div className="data">
          <div className="name">{shop?.translation?.title}</div>
          <div className="type">{tl("Seller")}</div>
        </div>
      </div>
      <div className="prices">
        <div className="item">
          <div className="label">{tl("Total product price")}</div>
          <div className="value">{getPrice(total_price + totalDiscount)}</div>
        </div>
        <div className="item">
          <div className="label">{tl("Discount")}</div>
          <div className="value">{getPrice(totalDiscount)}</div>
        </div>
        <div className="item">
          <div className="label">{tl("VAT Tax")}</div>
          <div className="value">{getPrice(totalTax)}</div>
        </div>
        <div className="item">
          <div className="label">{tl("Shop Tax")}</div>
          <div className="value">{getPrice(shopTax)}</div>
        </div>
        <div className="item">
          <div className="label">{tl("Total amount")}</div>
          <div className="value">
            {getPrice(total_price + totalTax + shopTax)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supplier;
