import React from "react";
import { imgBaseUrl } from "../../constants";
import { GetColorName } from "hex-color-to-color-name";
import { getPrice } from "../../utils/getPrice";
import { useTranslation } from "react-i18next";
const OrderHistoryProduct = ({ orderedProduct, extras, stock }) => {
  const { t: tl } = useTranslation();
  return (
    <div className="order-product">
      <div className="product-data">
        <div className="left">
          <img src={imgBaseUrl + orderedProduct?.img} alt="Product" />
        </div>
        <div className="center">
          <div className="name">{orderedProduct?.translation?.title}</div>
          {extras?.length > 0 && (
            <div className="size-color">
              {extras?.map((item, key) => {
                return (
                  <div key={key}>
                    {item.group.type === "text" && (
                      <div className="size">{`${item.group.translation?.title}: ${item.value}`}</div>
                    )}
                  </div>
                );
              })}
              {extras?.map((item, key) => {
                return (
                  <div key={key}>
                    {item.group.type === "color" && (
                      <div className="color">
                        {`${tl("Color")}: ${GetColorName(item.value)}`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {stock.discount ? (
            <div className="price">
              <div className="current">{`${getPrice(
                stock.origin_price - stock.discount
              )} x ${stock?.quantity}`}</div>
              <div className="old">
                <span>{getPrice(stock.origin_price)}</span>
                <div className="discount">{`${(
                  (stock.discount / stock.origin_price) *
                  100
                ).toFixed(2)} %`}</div>
              </div>
            </div>
          ) : (
            <div className="current">{`${getPrice(stock.origin_price)} x ${
              stock?.quantity
            }`}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryProduct;
