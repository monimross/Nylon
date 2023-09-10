import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import AddLineIcon from "remixicon-react/AddLineIcon";
import Heart3FillIcon from "remixicon-react/Heart3FillIcon";
import Heart3LineIcon from "remixicon-react/Heart3LineIcon";
import SubtractLineIcon from "remixicon-react/SubtractLineIcon";
import { imgBaseUrl } from "../../constants";
import { addToCart, getTotals, removeFromCart } from "../../redux/slices/cart";
import { addToSaved, removeFromSaved } from "../../redux/slices/savedProduct";
import { getGroupByExtraGroupId } from "../../utils/getGroupById";
import { getPrice } from "../../utils/getPrice";
import { getUnique } from "../../utils/removeDuplicate";

const ProductLook = ({ product, setOrderProduct, orderProduct, index }) => {
  const dispatch = useDispatch();
  const { t: tl } = useTranslation();
  const [selectExtras, setSelectExtras] = useState();
  const currentStock = product.stocks.filter(
    (element) => element?.extras[0]?.id === selectExtras?.id
  )[0];
  const cartItems = useSelector((state) => state.cart.cartItems);
  const findFromCart = cartItems.find((item) => item.id === currentStock?.id);
  const likedProducts = useSelector(
    (state) => state.savedProduct.savedProductList
  );
  const isLiked = likedProducts.find((lp) => lp.id === product?.id);
  const flattenExtras = product.stocks.flatMap((stock) => stock.extras);
  const result = getUnique(
    getGroupByExtraGroupId(flattenExtras).filter((item) => item.length > 0)[0]
  );

  const handelAddToCart = () => {
    dispatch(
      addToCart({
        product_id: product.id,
        id: currentStock?.id,
        translation: product.translation,
        extras: [selectExtras],
        img: product.img,
        stockId: currentStock,
        min_qty: product.min_qty,
        max_qty: product.max_qty,
        tax: product.tax,
        price: currentStock?.price,
        shop_tax: product.shop.tax,
        discount: currentStock?.discount ? currentStock?.discount : 0,
        stocks: product.stocks,
        shop: {
          id: product.shop.id,
          translation: product.shop.translation,
          logo: product.shop.logo_img,
          tax: product.shop.tax,
          close_time: product.shop.close_time,
          open_time: product.shop.open_time,
          location: product.shop.location,
        },
      })
    );
    dispatch(getTotals());
  };
  const removeCart = () => {
    dispatch(removeFromCart(findFromCart));
    dispatch(getTotals());
  };
  useEffect(() => {
    if (result) {
      setSelectExtras(result[0]);
    }
  }, []);

  useEffect(() => {
    if (currentStock) {
      const list = orderProduct;
      list[index] = { currentStock, ...product, selectExtras };
      setOrderProduct(list);
    }
  }, [currentStock]);

  return (
    <div className="product-look-wrapper">
      <div className="product-look-img">
        <img src={imgBaseUrl + product?.img} />
      </div>
      <div className="data-wrapper">
        <div className="product-look-data">
          <div className="product-name">{product?.translation?.title}</div>
          <div className="product-extras">
            {result?.map((item, key) => {
              return (
                <div
                  key={key}
                  className={
                    selectExtras?.id === item.id ? "item active" : "item"
                  }
                  onClick={() => setSelectExtras(item)}
                >
                  {item?.value}
                </div>
              );
            })}
          </div>
          <div className="action-btns">
            {lookPrice(currentStock, product)}
            <div className="btn saved">
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
              <label>{tl("Saved")}</label>
            </div>
            {findFromCart?.id === currentStock?.id ? (
              <button className="btn add-to-cart" onClick={removeCart}>
                <SubtractLineIcon size={20} />
                <label>{tl("Remove from cart")}</label>
              </button>
            ) : (
              <button
                disabled={currentStock?.quantity > 0 ? false : true}
                className="btn add-to-cart"
                onClick={handelAddToCart}
              >
                {currentStock?.quantity > 0 ? (
                  <>
                    <AddLineIcon size={20} />
                    <label>{tl("Add to cart")}</label>
                  </>
                ) : (
                  <label>{tl("out of stock")}</label>
                )}
              </button>
            )}
          </div>
        </div>
        {lookPrice(currentStock, product)}
      </div>
    </div>
  );
};
const lookPrice = (currentStock, product) => {
  return (
    <div className="product-look-price">
      {currentStock?.discount ? (
        <>
          <div className="old-price">{getPrice(currentStock?.price)}</div>
          <span>
            {getPrice(currentStock?.price - product.stocks[0]?.discount)}
          </span>
        </>
      ) : (
        <span>{getPrice(currentStock?.price)}</span>
      )}
    </div>
  );
};
export default ProductLook;
