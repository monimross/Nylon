import React from "react";
import { GetColorName } from "hex-color-to-color-name";
import DeleteBinLineIcon from "remixicon-react/DeleteBinLineIcon";
import Heart3LineIcon from "remixicon-react/Heart3LineIcon";
import Heart3FillIcon from "remixicon-react/Heart3FillIcon";
import AddLineIcon from "remixicon-react/AddLineIcon";
import SubtractLineIcon from "remixicon-react/SubtractLineIcon";
import { imgBaseUrl } from "../../constants";
import {
  removeFromCart,
  decreaseCart,
  addToCart,
  getTotals,
} from "../../redux/slices/cart";
import { useDispatch, useSelector } from "react-redux";
import { addToSaved, removeFromSaved } from "../../redux/slices/savedProduct";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { getPrice } from "../../utils/getPrice";
const OrderProduct = ({ orderedProduct }) => {
  const { t: tl } = useTranslation();
  const dispatch = useDispatch();
  const likedProducts = useSelector(
    (state) => state.savedProduct.savedProductList
  );
  const isLiked = likedProducts.find((lp) => lp.id === orderedProduct?.id);

  const remove = () => {
    dispatch(removeFromCart(orderedProduct));
    dispatch(getTotals());
  };
  const handleDec = () => {
    dispatch(decreaseCart(orderedProduct));
    dispatch(getTotals());
  };
  const handleInc = () => {
    if (orderedProduct.qty >= orderedProduct.max_qty) {
      toast.warn(
        `${tl("You can buy only")} ${orderedProduct.max_qty} ${tl("products")}`
      );
    } else if (orderedProduct.qty >= orderedProduct.stockId.quantity) {
      toast.warn(
        `${tl("You can buy only")} ${orderedProduct.stockId.quantity} ${tl(
          "products"
        )}`
      );
    } else {
      dispatch(addToCart(orderedProduct));
      dispatch(getTotals());
    }
  };
  return (
    <div className="order-product">
      <div className="product-data">
        <div className="left">
          <img src={imgBaseUrl + orderedProduct?.img} alt="Product" />
          <div className="liked">
            <Heart3LineIcon size={22} />
          </div>
        </div>
        <div className="center-right">
          <div className="center">
            <div className="name">{orderedProduct?.translation?.title}</div>
            <div className="size-color">
              {orderedProduct.extras?.map((item, key) => (
                <div key={key}>
                  {item?.group.type === "text" && (
                    <div className="size">{`${item.group.translation?.title}: ${item.value}`}</div>
                  )}
                </div>
              ))}
              {orderedProduct.extras?.map((item, key) => (
                <div key={key}>
                  {item?.group.type === "color" && (
                    <div className="color">
                      {`${tl("Color")}: ${GetColorName(item.value)}`}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="action-btn">
              {isLiked ? (
                <div
                  className="btn-item save"
                  onClick={() => dispatch(removeFromSaved(orderedProduct))}
                >
                  <Heart3FillIcon size={24} color="#000" />
                  <span>{tl("Saved")}</span>
                </div>
              ) : (
                <div
                  className="btn-item save"
                  onClick={() => dispatch(addToSaved(orderedProduct))}
                >
                  <Heart3LineIcon size={24} />
                  <span>{tl("Saved")}</span>
                </div>
              )}

              <div className="btn-item" onClick={remove}>
                <DeleteBinLineIcon size={20} />
                <span>{tl("Delete")}</span>
              </div>
            </div>
          </div>
          <div className="right">
            {orderedProduct.stockId?.discount ? (
              <div className="price">
                <div className="current">
                  {getPrice(
                    orderedProduct.stockId.price -
                      orderedProduct.stockId.discount
                  )}
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
                {getPrice(orderedProduct.stockId?.price)}
              </div>
            )}
            <div className="counter-btn">
              <button
                className="increment"
                onClick={handleDec}
                disabled={
                  orderedProduct.qty === orderedProduct.min_qty ? true : false
                }
              >
                <SubtractLineIcon size={14} />
              </button>
              <span>{orderedProduct?.qty}</span>
              <button className="decrement" onClick={handleInc}>
                <AddLineIcon size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;
