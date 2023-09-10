import React, { useEffect, useState } from "react";
import CheckboxBlankCircleLineIcon from "remixicon-react/CheckboxBlankCircleLineIcon";
import RecordCircleLineIcon from "remixicon-react/RecordCircleLineIcon";
import CheckDoubleLineIcon from "remixicon-react/CheckDoubleLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { getUnique } from "../../utils/removeDuplicate";
import { imgBaseUrl } from "../../constants";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import CustomSelect from "../form/custom-select";
import InputText from "../form/input-text";
import { CheckCoupon } from "../../api/main/check-coupon";
import { ShopApi } from "../../api/main/shops";
import {
  addCoupon,
  addDataToOrder,
  addShowData,
  addToOrder,
  removeDeliveryDate,
} from "../../redux/slices/order";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import DateRangePopover from "../form/date-range-popover";
import { useTranslation } from "react-i18next";
import AdminDelivery from "./helper/admin-delivery";

const CommonDeliveryType = ({
  setCheckoutContent,
  setStepKey,
  setDeliveryType,
}) => {
  const dispatch = useDispatch();
  const { t: tl } = useTranslation();
  const router = useRouter();
  const cookies = parseCookies();
  let count = 0;
  const [tabKey, setTabKey] = useState("delivery");
  const [error, setError] = useState(null);
  const [deliveryTypes, setDeliveryTypes] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [currentShop, setCurrentShop] = useState("");
  const [currentShippingMethod, setCurrentShippingMethod] = useState(null);

  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user.data);
  const shops = getUnique(cart.cartItems.map((item) => item.shop));
  const currentShopProduct = cart.cartItems.filter(
    (item) => item.shop.id === currentShop?.id
  );
  const currentOrderedShop = order.showData?.find(
    (item) => item.shop_id === currentShop?.id
  );

  const getGroupById = (flattenExtras = []) => {
    let result = [];
    flattenExtras.forEach((r) => {
      if (!result[r.shop.id]) {
        result[r.shop.id] = [];
      }
      result[r.shop.id].push(r);
    });
    return result;
  };
  const showProduct = getGroupById(cart.cartItems).filter(
    (item) => item.length > 0
  );
  const shopsIds = () => {
    const result = shops.map((item, index) => ({
      [`shops[${index}]`]: item.id,
    }));
    return Object.assign({}, ...result);
  };
  const getDelivery = () => {
    const params = shopsIds();
    ShopApi.getDelivery(params)
      .then((res) => {
        setDeliveryTypes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkCoupon = (value) => {
    if (value) {
      CheckCoupon.create({
        coupon: value,
        user_id: user.id,
        // shop_id: currentShop?.id,
      })
        .then((res) => {
          setPromoCode(res.data.name);
          dispatch(addCoupon(res.data));
          setError("success");
        })
        .catch((error) => {
          console.log(error);
          setError("error");
        });
    } else setError(null);
  };

  const handleCurrentShop = (shop) => {
    setCurrentShop(shop);
    setDeliveryDate("");
    setDeliveryTime("");
    setPromoCode("");
  };
  useEffect(() => {
    if (!cookies.access_token) {
      router.push("/auth/sign-in");
    }
    getDelivery();
    setCurrentShop(shops[0]);
    setStepKey("address");
    if (cart.cartTotalQuantity <= 0) {
      router.push("/");
    }
  }, []);

  const getFinnalyCheck = () => {
    let totalDiscount = 0;
    let total_price = 0;
    // let totalTax = 0;
    let totalShopTax = 0;
    let deliveryFee = order.shops.reduce(
      (old, newd) => old + newd.delivery_fee,
      0
    );

    showProduct.forEach((item) => {
      item.forEach((data) => {
        if (data.stockId.discount) {
          totalDiscount += data.stockId.discount * data.qty;
        }
        total_price += data.total_price;
        totalShopTax += data.shop_tax;
        // totalTax += totalShopTax;
      });
    });
    return { totalDiscount, total_price, totalShopTax, deliveryFee };
  };
  const { total_price, deliveryFee, totalShopTax } = getFinnalyCheck();

  const addToOrderData = () => {
    dispatch(
      addDataToOrder({
        user_id: user.id,
        total: deliveryFee
          ? total_price + totalShopTax + deliveryFee
          : total_price + totalShopTax,
        currency_id: cookies.currency_id,
        rate: cookies.currency_rate,
        shop_id: currentShop.id,
        coupon: error === "error" ? "" : promoCode,
        delivery_fee: currentShippingMethod?.price,
      })
    );
  };
  const setToRedux = () => {
    addToOrderData();
    dispatch(
      addShowData({
        shop_id: currentShop.id,
        shippingMethod: currentShippingMethod,
        deliveryDate: deliveryDate,
        deliveryTime: deliveryTime,
        delivery_type: tabKey,
      })
    );
    dispatch(
      addToOrder({
        shop_id: currentShop.id,
        tax: currentShopProduct.reduce(
          (total, item) => (total += item.shop_tax),
          0
        ),
        products: currentShopProduct,
        delivery_type_id: currentShippingMethod?.id,
        delivery_fee: currentShippingMethod?.price,
        delivery_date: deliveryDate,
        delivery_time: deliveryTime?.id,
      })
    );
  };
  const handleShopClick = (shop) => {
    setToRedux();
    handleCurrentShop(shop);
  };
  const getDeliveryTime = () => {
    const timeArray = [];
    let start = parseInt(currentShop?.open_time?.slice(0, 2));
    let end = parseInt(currentShop?.close_time?.slice(0, 2));
    if (end === 0) end = 24;
    for (start; start < end; start++) {
      timeArray.push({
        id: `${start}:00-${start + 1}:00`,
        value: `${start}:00 - ${start + 1}:00`,
      });
    }
    return timeArray;
  };

  useEffect(() => {
    const data = deliveryTypes?.find(
      (item) => item.id == order.data.delivery_id
    );
    if (currentOrderedShop) {
      setDeliveryDate(currentOrderedShop.deliveryDate);
      setDeliveryTime(currentOrderedShop.deliveryTime);
      setPromoCode(currentOrderedShop.coupon);
      setCurrentShippingMethod(data);
      if (currentOrderedShop?.delivery_type) {
        setTabKey(currentOrderedShop?.delivery_type);
        setDeliveryType(currentOrderedShop?.delivery_type);
      } else {
        setTabKey(tabKey);
        setDeliveryType(tabKey);
      }
    }
  }, [currentOrderedShop]);

  const handleDeliveryDate = (e) => {
    setDeliveryDate(e);
    dispatch(
      addToOrder({
        shop_id: currentShop.id,
        delivery_date: e,
        tax: currentShop.tax,
        products: currentShopProduct,
        coupon: error ? "" : promoCode,
        delivery_type: "pickup",
      })
    );
  };
  const handleDeliveryTime = (e) => {
    setDeliveryTime(e);
    dispatch(
      addToOrder({
        shop_id: currentShop.id,
        delivery_time: e?.id,
      })
    );
  };
  const handleShippingMethod = (delivery) => {
    setCurrentShippingMethod(delivery);
    setDeliveryDate("");
    dispatch(removeDeliveryDate(currentShop.id));
    dispatch(
      addToOrder({
        shop_id: currentShop.id,
        delivery_type_id: delivery?.id,
        delivery_fee: delivery?.price,
      })
    );
    dispatch(
      addDataToOrder({
        delivery_id: delivery.id,
      })
    );
  };
  const handleCountinue = (e) => {
    e.preventDefault();
    if (!currentShippingMethod) {
      toast.error("Please select delivery shipping method");
    } else if (!deliveryDate) {
      toast.error("Please select delivery date");
    } else if (!deliveryTime) {
      toast.error("Please select delivery time");
    } else if (order.shops?.length < shops?.length) {
      toast.error("Please select all shops data");
    } else if (order.shops?.length === shops?.length) {
      order.shops?.forEach((element) => {
        for (const property in element) {
          if (element[property] === undefined && property !== "delivery_time") {
            count++;
            toast.error(
              `Please select ${property} of ${element.products[0].shop.translation.title}`
            );
          }
        }
      });
      if (count === 0) {
        setToRedux();
        setCheckoutContent("payment-method");
      }
    }
  };

  return (
    <div className="delivery-type-wrapper">
      <div className="delivery-type">
        <div className="type-items">
          <Swiper
            slidesPerView={4}
            spaceBetween={17}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 1.5,
              },
              450: {
                slidesPerView: 1.2,
              },
              550: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              945: { slidesPerView: 5 },
            }}
          >
            {shops?.map((shop, key) => {
              return (
                <SwiperSlide key={key}>
                  <div
                    className="type-item"
                    onClick={() => handleShopClick(shop)}
                  >
                    {shop.id === currentShop?.id ? (
                      <RecordCircleLineIcon color="#61DC00" size={20} />
                    ) : (
                      <CheckboxBlankCircleLineIcon size={20} />
                    )}
                    <div className="logo">
                      <img src={imgBaseUrl + shop.logo} />
                    </div>
                    <div className="data">
                      <div className="name">{shop.translation?.title}</div>
                      <div className="type">Store</div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="tab-pane">
        <div className="shipping-info">
          <form>
            <div className="info-wrapper">
              <AdminDelivery
                deliveryTypes={deliveryTypes}
                handleShippingMethod={handleShippingMethod}
                currentShippingMethod={currentShippingMethod}
              />
              <div className="general-info">
                <div className="title">{tl("Shipping info")}</div>
                <DateRangePopover
                  disabled={currentShippingMethod ? false : true}
                  label="Date"
                  onChange={handleDeliveryDate}
                  value={deliveryDate}
                  extraDay={
                    currentShippingMethod
                      ? parseInt(currentShippingMethod?.times?.[0])
                      : 0
                  }
                />
                <CustomSelect
                  options={getDeliveryTime()}
                  label="Time"
                  placeholder="--:-- --"
                  onChange={(e) => handleDeliveryTime(e)}
                  value={deliveryTime?.id}
                  // name="delivery_time"
                  required={false}
                />
                <div className="general-info">
                  <div className="title">{tl("Promo code")}</div>
                  <InputText
                    className={
                      error === "error"
                        ? "error"
                        : error === "success"
                        ? "success"
                        : null
                    }
                    label="Promo code"
                    placeholder="Code"
                    onBlur={(e) => {
                      checkCoupon(e.target.value);
                    }}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    suffix={
                      error === "error" ? (
                        <CloseLineIcon color="red" />
                      ) : error === "success" ? (
                        <CheckDoubleLineIcon color="#61DC00" />
                      ) : (
                        ""
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <button
              onClick={(e) => handleCountinue(e)}
              type="submit"
              className="btn-success"
            >
              {tl("Continue")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommonDeliveryType;
