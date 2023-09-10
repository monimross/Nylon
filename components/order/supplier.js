import React from "react";
import { useTranslation } from "react-i18next";
import { imgBaseUrl } from "../../constants";
import { getPrice } from "../../utils/getPrice";

const Supplier = ({ shop, products }) => {
  const { t: tl } = useTranslation();
  const getTotalPrice = () => {
    let total_tax = 0,
      total_discount = 0,
      total_price = 0;
    products.forEach((item) => {
      let totalDiscount = item.stockId?.discount
        ? item.stockId.discount * item.qty
        : 0;
      total_tax += item.shop_tax + item.productTax;
      total_discount += totalDiscount;
      total_price += item.total_price + item.shop_tax;
    });
    return { total_discount, total_price, total_tax };
  };
  const { total_discount, total_price, total_tax } = getTotalPrice();

  return (
    <div className="supplier">
      <div className="store">
        <div className="logo">
          <img src={imgBaseUrl + shop.logo} alt="logo" />
        </div>
        <div className="data">
          <div className="name">{shop?.translation?.title}</div>
          <div className="type">{tl("Seller")}</div>
        </div>
      </div>
      <div className="prices">
        <div className="item">
          <div className="label">{tl("Total product price")}</div>
          <div className="value">
            {getPrice(total_price + total_discount - total_tax)}
          </div>
        </div>
        <div className="item">
          <div className="label">{tl("Discount")}</div>
          <div className="value">{getPrice(total_discount)}</div>
        </div>
        <div className="item">
          <div className="label">{tl("Tax")}</div>
          <div className="value">{getPrice(total_tax)}</div>
        </div>

        <div className="item">
          <div className="label">{tl("Total amount")}</div>
          <div className="value">{getPrice(total_price)}</div>
        </div>
      </div>
    </div>
  );
};

export default Supplier;
