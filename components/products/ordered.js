import React from "react";
import { imgBaseUrl } from "../../constants";
import { GetColorName } from "hex-color-to-color-name";
import { getPrice } from "../../utils/getPrice";
import { useTranslation } from "react-i18next";
const Ordered = ({ orderedProduct }) => {
  const { t: tl } = useTranslation();
  return (
    <div className="order-product">
      <div className="product-data">
        <div className="left">
          <img src={imgBaseUrl + orderedProduct?.img} alt="Product" />
        </div>
        <div className="center">
          <div className="name">{orderedProduct?.translation?.title}</div>
          {orderedProduct?.extras?.length > 0 && (
            <div className="size-color">
              {orderedProduct.extras?.map((item, key) => {
                return (
                  <div key={key}>
                    {item.group.type === "text" && (
                      <div className="size">{`${item.group.translation?.title} ${item.value}`}</div>
                    )}
                  </div>
                );
              })}
              {orderedProduct.extras?.map((item, key) => {
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
          {orderedProduct?.stockId.discount ? (
            <div className="price">
              <div className="current">
                {`${getPrice(
                  orderedProduct.stockId.price - orderedProduct.stockId.discount
                )} x ${orderedProduct?.qty}`}
              </div>
              <div className="old">
                <span>{getPrice(orderedProduct.stockId.price)}</span>
                <div className="discount">{`${(
                  (orderedProduct.stockId.discount /
                    orderedProduct.stockId.price) *
                  100
                ).toFixed(2)} %`}</div>
              </div>
            </div>
          ) : (
            <div className="current">
              {`${getPrice(orderedProduct?.stockId.price)} x ${
                orderedProduct?.qty
              }`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ordered;
