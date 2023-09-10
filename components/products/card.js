import React from "react";
import Link from "next/link";
import { DiscountIcon } from "../../constants/images";
import Heart3LineIcon from "remixicon-react/Heart3LineIcon";
import Heart3FillIcon from "remixicon-react/Heart3FillIcon";
import StarFillIcon from "remixicon-react/StarFillIcon";
import TimeLineIcon from "remixicon-react/TimeLineIcon";
import getImg from "../../utils/getImg";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addToSaved, removeFromSaved } from "../../redux/slices/savedProduct";
import { addToViewed } from "../../redux/slices/viewed-product";
import { getPrice } from "../../utils/getPrice";

const ProductCard = ({ product, setIsOpen = () => {} }) => {
  const { t: tl } = useTranslation();
  const dispatch = useDispatch();
  const likedProducts = useSelector(
    (state) => state.savedProduct.savedProductList
  );
  const isLiked = likedProducts.find((lp) => lp.id === product?.id);
  const handleClick = () => {
    dispatch(addToViewed(product));
    setIsOpen(false);
  };

  return (
    <div className="product-card-wrapper">
      <div className="product-card">
        <Link href={`/products/${product?.uuid}`}>
          {product?.img ? (
            <img
              onClick={handleClick}
              src={getImg(product.img)}
              alt="product"
            />
          ) : (
            <div onClick={handleClick} className="no-image">
              {tl("No image")}
            </div>
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
        <div className="btn-group dis-add-btn">
          {Boolean(product?.stocks?.[0]?.discount_expired) && (
            <div className="discount-expire">
              <TimeLineIcon color="#fff" size={24} />
              <span>{product.stocks[0]?.discount_expired}</span>
            </div>
          )}
          {/* <div className="add-to-card">
            <AddLineIcon color="#fff" size={24} />
            <span>{`$ 99.9`}</span>
          </div> */}
        </div>
        {Boolean(product.stocks?.[0]?.discount) && (
          <div className="discount">
            <DiscountIcon />
          </div>
        )}
      </div>
      <div className="card-footer">
        <Link href={`/products/${product?.uuid}`}>
          <div onClick={handleClick} className="product-name">
            {product?.translation?.title}
          </div>
        </Link>
        <div className="rate">
          <StarFillIcon size={20} color="#FFA826" />
          <span>
            {product?.rating_avg ? product?.rating_avg.toFixed(1) : "0.0"}
          </span>
        </div>
      </div>
      <div className="price-box">
        {Boolean(product?.stocks?.[0]?.discount) ? (
          <>
            <div className="old-price">
              {getPrice(product?.stocks[0]?.price)}
            </div>
            <span>
              {getPrice(
                product?.stocks[0]?.price - product.stocks[0]?.discount
              )}
            </span>
          </>
        ) : (
          <span>{getPrice(product?.stocks?.[0]?.price)}</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
