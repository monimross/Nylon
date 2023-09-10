import React from "react";
import { DeliveryIcon } from "../../constants/images";
import StarFillIcon from "remixicon-react/StarFillIcon";
import MapPinAddLineIcon from "remixicon-react/MapPinAddLineIcon";
import VipCrown2FillIcon from "remixicon-react/VipCrown2FillIcon";
import MedalFillIcon from "remixicon-react/MedalFillIcon";
import Link from "next/link";
import { imgBaseUrl } from "../../constants";
import { useTranslation } from "react-i18next";
import { addToCurrentStore } from "../../redux/slices/savedStore";
import { useDispatch } from "react-redux";

const StoresCard = ({ store, noLink = false, handleClick, id }) => {
  const { t: tl } = useTranslation();
  const dispatch = useDispatch();
  const getRating = () => {
    if (store.rating_avg && store?.reviews_count) {
      return `${store.rating_avg} (${store?.reviews_count} ${tl("reviews")})`;
    } else {
      return `0.0 (0 ${tl("reviews")})`;
    }
  };
  const setToCurrent = () => {
    dispatch(addToCurrentStore(store));
  };
  return (
    <>
      <Link href={`/stores/${store?.uuid}`}>
        <div className="stores-card" onClick={setToCurrent}>
          <div className="top">
            <div className="logo-wrapper">
              <div className="logo">
                <img src={imgBaseUrl + store?.logo_img} alt="Store" />
              </div>
            </div>
            <div className="body">
              <div className="title">{store?.translation.title}</div>
              <div className="wort_time-rating">
                <div className="rating">
                  <StarFillIcon color="#FFA826" size={18} />
                  <span>{getRating()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="delivery item">
              <div className="icon">
                <DeliveryIcon />
              </div>
            </div>
            <div className="pickup item">
              <div className="icon">
                <MapPinAddLineIcon color="#FFA826" size={16} />
              </div>
            </div>
            {parseInt(store.rating_avg) >= 5 && id > 5 && (
              <div className="item tag best">
                <MedalFillIcon size={16} />
                <span>{tl("Best rated")}</span>
              </div>
            )}
            {id < 5 && (
              <div className="item tag top">
                <VipCrown2FillIcon size={16} />
                <span>{tl("Top seller")}</span>
              </div>
            )}
            {store?.mark === "recommended" && (
              <div className="item tag">
                <VipCrown2FillIcon size={16} />
                <span>{tl("Recommended")}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default StoresCard;
