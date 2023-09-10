import React from "react";
import { useTranslation } from "react-i18next";
import CheckboxBlankCircleLineIcon from "remixicon-react/CheckboxBlankCircleLineIcon";
import RecordCircleLineIcon from "remixicon-react/RecordCircleLineIcon";
import { getPrice } from "../../../utils/getPrice";
import DiscordLoader from "../../loader/discord-loader";

const AdminDelivery = ({
  deliveryTypes,
  handleShippingMethod,
  currentShippingMethod,
}) => {
  const { t: tl } = useTranslation();
  return (
    <div className="general-info">
      <div className="title">{tl("method")}</div>
      {deliveryTypes ? (
        deliveryTypes?.map((item) => {
          return (
            <div
              key={item.id}
              className="method-item"
              onClick={() => handleShippingMethod(item)}
            >
              <div className="shipping-type">
                <div className="type">
                  <input
                    onChange={() => {}}
                    style={{ display: "none" }}
                    type="radio"
                    id="option"
                    checked={currentShippingMethod?.id === item.id}
                    required
                  />
                  {currentShippingMethod?.id === item.id ? (
                    <RecordCircleLineIcon color="#61DC00" size={20} />
                  ) : (
                    <CheckboxBlankCircleLineIcon size={20} />
                  )}
                  <label htmlFor="#option">{item?.translation?.title}</label>
                </div>
                <div className="price">{getPrice(item?.price)}</div>
              </div>
              <div className="delivery-time">
                {`${item.times?.[0]} - ${item.times?.[1]} ${tl("days")}`}
              </div>
            </div>
          );
        })
      ) : (
        <DiscordLoader />
      )}
    </div>
  );
};

export default AdminDelivery;
