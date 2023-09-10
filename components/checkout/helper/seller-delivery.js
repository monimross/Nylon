import React from "react";
import { useTranslation } from "react-i18next";
import CheckboxBlankCircleLineIcon from "remixicon-react/CheckboxBlankCircleLineIcon";
import RecordCircleLineIcon from "remixicon-react/RecordCircleLineIcon";
import { getPrice } from "../../../utils/getPrice";
import DiscordLoader from "../../loader/discord-loader";

const SellerDelivery = ({
  deliveryTypes,
  handleShippingMethod,
  currentShippingMethod,
  currentShop,
}) => {
  const { t: tl } = useTranslation();
  return (
    <div className="general-info">
      <div className="title">{tl("method")}</div>
      {deliveryTypes ? (
        deliveryTypes?.map((item) => {
          return item.deliveries
            ?.filter((i) => i.type !== "pickup")
            .filter((j) => j.shop_id === currentShop.id || j.shop_id === null)
            .map((delivery, key) => {
              return (
                <div
                  key={key}
                  className="method-item"
                  onClick={() => handleShippingMethod(delivery)}
                >
                  <div className="shipping-type">
                    <div className="type">
                      <input
                        onChange={() => {}}
                        style={{ display: "none" }}
                        type="radio"
                        id="option"
                        checked={currentShippingMethod?.id === delivery.id}
                        required
                      />
                      {currentShippingMethod?.id === delivery.id ? (
                        <RecordCircleLineIcon color="#61DC00" size={20} />
                      ) : (
                        <CheckboxBlankCircleLineIcon size={20} />
                      )}
                      <label htmlFor="#option">
                        {delivery?.translation?.title}
                      </label>
                    </div>
                    <div className="price">{getPrice(delivery?.price)}</div>
                  </div>
                  <div className="delivery-time">
                    {`${delivery.times[0]} - ${delivery.times[1]} ${tl(
                      "days"
                    )}`}
                  </div>
                </div>
              );
            });
        })
      ) : (
        <DiscordLoader />
      )}
    </div>
  );
};

export default SellerDelivery;
