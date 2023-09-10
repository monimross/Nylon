import React from "react";
import ProductLook from "../products/look";
import { Swiper, SwiperSlide } from "swiper/react";
import { imgBaseUrl } from "../../constants";
import { useState } from "react";
import { useContext } from "react";
import { MainContext } from "../../utils/contexts/MainContext";
import { BannerApi } from "../../api/main/banner";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addToCart, getTotals } from "../../redux/slices/cart";
import DiscordLoader from "../loader/discord-loader";
import ImageLoader from "../loader/image";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const LookDetail = () => {
  const { t: tl } = useTranslation();
  const dispatch = useDispatch();
  const [lookProduct, setLookProduct] = useState(null);
  const [productList, setProductList] = useState(null);
  const { lookId } = useContext(MainContext);
  const [orderProduct, setOrderProduct] = useState([]);

  const getLook = () => {
    BannerApi.getId(lookId)
      .then((res) => {
        setLookProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getLookProducts = () => {
    BannerApi.getProduct(lookId)
      .then((res) => {
        setProductList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setLookProduct(null);
    setProductList(null);
    setOrderProduct([]);
    if (lookId) {
      getLook();
      getLookProducts();
    }
  }, [lookId]);

  const buyAll = () => {
    const condition = (element) =>
      element.currentStock.quantity < 1 || !element.currentStock.quantity;
    const notEnough = orderProduct.some((element) => condition(element));
    const notEnoughProduct = orderProduct.filter((element) =>
      condition(element)
    );
    if (notEnough) {
      notEnoughProduct.map((data) => {
        toast.error(`${data.translation.title} out of stock`);
      });
    } else {
      orderProduct.forEach((product) => {
        dispatch(
          addToCart({
            product_id: product.id,
            id: product.currentStock?.id,
            translation: product.translation,
            extras: product.selectExtras ? [product.selectExtras] : [],
            img: product.img,
            stockId: product.currentStock,
            min_qty: product.min_qty,
            max_qty: product.max_qty,
            tax: product.tax,
            price: product.currentStock?.price,
            shop_tax: product.shop.tax,
            discount: product.currentStock?.discount
              ? product.currentStock?.discount
              : 0,
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
      });
    }
  };

  return (
    <div className="look-detail-wrapper">
      <div className="look-detail-img">
        <Swiper slidesPerView={1} pagination={true} modules={[Pagination]}>
          {lookProduct ? (
            lookProduct?.galleries?.map((img, key) => (
              <SwiperSlide key={key}>
                <img src={imgBaseUrl + img.path} />
              </SwiperSlide>
            ))
          ) : (
            <ImageLoader />
          )}
        </Swiper>
      </div>
      {productList ? (
        <div className="look-detail-product-list">
          {productList?.map((product, key) => {
            return (
              <ProductLook
                index={key}
                orderProduct={orderProduct}
                setOrderProduct={setOrderProduct}
                key={key}
                product={product}
              />
            );
          })}
          <div className="description">
            <div className="title">{tl("Description")}</div>
            <div className="content">
              {lookProduct?.translation.description}
            </div>
          </div>
          <button className="btn-success" onClick={buyAll}>
            {tl("Buy all products")}
          </button>
        </div>
      ) : (
        <DiscordLoader />
      )}
      {productList?.length === 0 && "Not product"}
    </div>
  );
};

export default LookDetail;
