import Link from "next/link";
import React from "react";
import OrderProduct from "../products/order-product";
import DeleteBin3LineIcon from "remixicon-react/DeleteBin3LineIcon";
import Supplier from "./supplier";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  clearCart,
  getTotals,
  replaceStock,
  removeFromCart,
  replacePrice,
} from "../../redux/slices/cart";
import Empty from "../empty-data";
import { images } from "../../constants/images";
import { getPrice } from "../../utils/getPrice";
import { ProductApi } from "../../api/main/product";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";

const OrderList = ({ setOpen }) => {
  const { t: tl } = useTranslation();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  const cart = useSelector((state) => state.cart, shallowEqual);

  const getGroupById = (flattenExtras = []) => {
    let result = [];
    flattenExtras.forEach((r) => {
      if (!result[r.shop?.id]) {
        result[r.shop?.id] = [];
      }
      result[r.shop?.id].push(r);
    });
    return result;
  };

  const getFinnalyCheck = () => {
    let totalDiscount = 0;
    let total_price = 0;
    let totalTax = 0;
    let vatTax = 0;
    let shopTax = 0;
    showProduct?.forEach((item) => {
      item.forEach((data) => {
        if (data.stockId?.discount) {
          totalDiscount += data.stockId.discount * data.qty;
        }
        vatTax += data.tax;
        shopTax += data.shop_tax;
        total_price += data.total_price - data.tax;
        totalTax += data.productTax + (data.total_price * data.shop.tax) / 100;
      });
    });
    return { totalDiscount, total_price, totalTax, vatTax, shopTax };
  };
  const showProduct = getGroupById(cart.cartItems).filter(
    (item) => item.length > 0
  );
  const cratProductIds = [
    ...new Set(cart?.cartItems.map((item) => item.product_id)),
  ];
  const checkProduct = () => {
    ProductApi.checkIds({ products: cratProductIds })
      .then(({ data }) => {
        let quantities = [];
        let price = [];
        showProduct.flat().forEach((item) => {
          const product = data.find((el) => el.id === item.product_id);
          const stock = product?.stocks.find((el) => el.id === item.id);
          if (!stock) {
            dispatch(removeFromCart(item));
            dispatch(getTotals());
            setCounter((prev) => prev + 1);
            toast.warn(`${item.translation.title} ${tl("out of stock")}`);
            return;
          }
          if (stock.quantity < item.qty) {
            quantities.push({
              id: stock.id,
              quantity: stock.quantity,
            });
          }
          if (stock.discount !== item.discount) {
            price.push({
              id: stock.id,
              discount: stock.discount,
            });
          }
        });
        if (quantities.length) {
          dispatch(replaceStock(quantities));
          dispatch(getTotals());
        }
        if (price.length) {
          dispatch(replacePrice(price));
          dispatch(getTotals());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (cratProductIds?.length > 0) checkProduct();
  }, []);

  const { totalDiscount, total_price, vatTax, shopTax } = getFinnalyCheck();
  return (
    <div className="order-list">
      <div className="order-list-header">
        <div className="product-count">{`${cart?.cartTotalQuantity} ${tl(
          "products"
        )}`}</div>
        {counter > 0 && (
          <div className="product-count">{`${counter} ${tl(
            "out.of.stock.message"
          )}`}</div>
        )}
        {cart?.cartTotalQuantity > 0 && (
          <button
            className="btn-secondary"
            onClick={() => dispatch(clearCart())}
          >
            <DeleteBin3LineIcon />
            <span>{tl("Delete all")}</span>
          </button>
        )}
      </div>
      {cart?.cartTotalQuantity === 0 ? (
        <Empty
          setOpen={setOpen}
          btn={true}
          image={images.CartEmpty}
          text1="There are no items in the my order"
          text2="To select items, go to the stores"
        />
      ) : (
        <div className="content">
          <div className="products-lists">
            {showProduct?.map((product, key) => {
              return (
                <div key={key} className="product-list-item">
                  {product.map((orderedProduct, key) => {
                    return (
                      <OrderProduct key={key} orderedProduct={orderedProduct} />
                    );
                  })}
                  <Supplier shop={product[0].shop} products={product} />
                </div>
              );
            })}
          </div>
          <div className="total-amoun-wrapper">
            <div className="total-amount">
              <div className="amount-item">
                <div className="key">{tl("Total product price")}</div>
                <div className="value">
                  {getPrice(total_price + totalDiscount)}
                </div>
              </div>
              <div className="amount-item">
                <div className="key">{tl("Discount")}</div>
                <div className="value">{getPrice(totalDiscount)}</div>
              </div>
              <div className="amount-item">
                <div className="key">{tl("VAT Tax")}</div>
                <div className="value">{getPrice(vatTax)}</div>
              </div>
              <div className="amount-item">
                <div className="key">{tl("Shop tax")}</div>
                <div className="value">{getPrice(shopTax)}</div>
              </div>
              <span />
              <div className="amount-item">
                <div className="key">{tl("Total amount")}</div>
                <div className="value">
                  {getPrice(total_price + vatTax + shopTax)}
                </div>
              </div>
            </div>
            <Link href="/checkout">
              <button className="btn-success">{tl("Go to checkuot")}</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
