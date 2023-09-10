import React from "react";
import HeartLineIcon from "remixicon-react/HeartLineIcon";
import StarFillIcon from "remixicon-react/StarFillIcon";
import TimeLineIcon from "remixicon-react/TimeLineIcon";
import AddLineIcon from "remixicon-react/AddLineIcon";
import Heart3LineIcon from "remixicon-react/Heart3LineIcon";
import Heart3FillIcon from "remixicon-react/Heart3FillIcon";
import getImg from "../../utils/getImg";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { addToSaved, removeFromSaved } from "../../redux/slices/savedProduct";
import { useDispatch, useSelector } from "react-redux";
import { addToViewed } from "../../redux/slices/viewed-product";
import { getPrice } from "../../utils/getPrice";
const HorizontalCard = ({ product }) => {
  const { t: tl } = useTranslation();
  const dispatch = useDispatch();
  const likedProducts = useSelector(
    (state) => state.savedProduct.savedProductList
  );
  const isLiked = likedProducts.find((lp) => lp.id === product?.id);
  const handleClick = () => {
    dispatch(addToViewed(product));
  };
  return (
    <div className="product-horizontal">
      <div className="product-img">
        <Link href={`/products/${product?.uuid}`}>
          {product?.img ? (
            <img src={getImg(product.img)} alt="product" />
          ) : (
            <div className="no-image">{tl("No image")}</div>
          )}
        </Link>
        <div className="liked">
          {isLiked ? (
            <Heart3FillIcon
              size={24}
              color="#000"
              onClick={() => dispatch(removeFromSaved(product))}
            />
          ) : (
            <Heart3LineIcon
              size={24}
              onClick={() => dispatch(addToSaved(product))}
            />
          )}
        </div>
      </div>
      <div className="data">
        <Link href={`/products/${product?.uuid}`}>
          <a onClick={handleClick} className="name">
            {product?.translation?.title}
          </a>
        </Link>
        <div className="rate">
          <StarFillIcon size={20} color="#FFA826" />
          <span>
            {product?.rating_avg ? product?.rating_avg.toFixed(1) : "0.0"}
          </span>
        </div>
        <div className="price-box">
          {product?.stocks[0]?.discount ? (
            <>
              <div className="old-price">
                {getPrice(product?.stocks[0].price)}
              </div>
              <span>
                {getPrice(
                  product?.stocks[0].price - product.stocks[0]?.discount
                )}
              </span>
            </>
          ) : (
            <span>{getPrice(product?.stocks[0].price)}</span>
          )}
        </div>
        <div className="action-btn">
          {product?.stocks[0]?.discount_expired && (
            <div className="discount-expire">
              <TimeLineIcon color="#fff" size={24} />
              <span>{product.stocks[0]?.discount_expired}</span>
            </div>
          )}
          {/* <div className="add-to-card">
            <AddLineIcon color="#fff" size={20} />
            <span>$20.00</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
