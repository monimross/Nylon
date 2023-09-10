import React, { useEffect, useState } from "react";
import RecordCircleLineIcon from "remixicon-react/RecordCircleLineIcon";
import CheckboxBlankCircleLineIcon from "remixicon-react/CheckboxBlankCircleLineIcon";
import { PaymentApi } from "../../api/main/payment";
import { images } from "../../constants/images";
import CustomDrawer from "../drawer";
import DiscordLoader from "../loader/discord-loader";
import AddNewCard from "./add-new-card";
import CustomSelect from "../form/custom-select";
import { useDispatch, useSelector } from "react-redux";
import { addToOrderAddress } from "../../redux/slices/order";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { getPrice } from "../../utils/getPrice";
import { useContext } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";
const PaymentMethod = ({
  setCheckoutContent,
  setStepKey,
  address,
  setPayment,
  deliveryType,
}) => {
  const { t: tl } = useTranslation();
  const dispatch = useDispatch();
  const { userLocation } = useContext(AuthContext);
  const [open, setOpen] = useState(null);
  const [error, setError] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const order = useSelector((state) => state.order);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.data);
  const currentAddress = order?.shops[0]?.delivery_address_id;
  const targetLocation = userLocation?.split(",");
  const addressList = [];
  address?.forEach((item) => {
    addressList.push({
      id: item.id,
      value: item.address,
      location: item.location,
    });
  });
  const getPayment = () => {
    PaymentApi.get()
      .then((res) => {
        setPaymentType(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const selectedAddress = addressList.find(
    (item) => item.location.latitude === targetLocation[0]
  );

  useEffect(() => {
    if (!paymentType) getPayment();
    if (paymentType) {
      setPaymentId(paymentType[0]);
      setPayment(paymentType[0]);
    }
    setStepKey("payment");
  }, [paymentType]);

  useEffect(() => {
    if (selectedAddress) handleSelectAddress(selectedAddress);
  }, []);

  const handleClick = (type) => {
    setPaymentId(type);
    setPayment(type);
  };

  const handleSelectAddress = (e) => {
    setError(false);
    dispatch(
      addToOrderAddress({
        delivery_address_id: e.id,
      })
    );
  };
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
  const getFinnalyCheck = () => {
    let totalDiscount = 0;
    let total_price = 0;
    let totalTax = 0;
    let shopTax = 0;
    let deliveryFee = order.shops.reduce(
      (old, newd) => old + newd.delivery_fee,
      0
    );

    showProduct.forEach((item) => {
      item.forEach((data) => {
        if (data.stockId.discount) {
          totalDiscount += data.stockId.discount * data.qty;
        }
        total_price += data.total_price - data.productTax;
        totalTax += data.productTax;
        shopTax += data.shop_tax;
      });
    });
    return { totalDiscount, total_price, totalTax, shopTax, deliveryFee };
  };
  const { total_price, totalTax, shopTax, deliveryFee } = getFinnalyCheck();
  const getCouponPrice = () => {
    const { coupon } = order || {};
    if (coupon.type) {
      if (coupon.type === "percent") {
        const total =
          ((total_price + totalTax + shopTax + deliveryFee) * coupon.price) /
          100;
        return total;
      } else return coupon.price;
    } else return 0;
  };

  const totalAmount =
    total_price + totalTax + shopTax + deliveryFee - getCouponPrice();
  const handleContinue = () => {
    if (paymentId.tag === "wallet") {
      if (user?.wallet?.price < totalAmount) {
        toast.error("You don't have enough funds in your wallet");
      } else {
        if (currentAddress) {
          setCheckoutContent("verify");
        } else {
          toast.error("Please select address");
          setError(true);
        }
      }
    } else {
      if (currentAddress) {
        setCheckoutContent("verify");
      } else {
        toast.error("Please select address");
        setError(true);
      }
    }
  };
  return (
    <div className="payment-method">
      <div className="tab-pane">
        <div className="shipping-info">
          <div className="info-wrapper">
            <div className="general-info">
              <div className="title">{tl("Delivery Address")}</div>
              <CustomSelect
                options={addressList}
                label="Address"
                placeholder="Address"
                onChange={(e) => handleSelectAddress(e)}
                value={currentAddress}
                name="delivery_address_id"
                required={true}
                error={error}
                type="address"
              />
            </div>
            <div className="general-info">
              <div className="title">{tl("Payment type")}</div>
              {paymentType ? (
                paymentType.map((type, key) => {
                  return (
                    <div
                      key={key}
                      className="method-item"
                      onClick={() => handleClick(type)}
                    >
                      <div className="shipping-type">
                        <div className="type">
                          {paymentId?.id === type.id ? (
                            <RecordCircleLineIcon color="#61DC00" size={20} />
                          ) : (
                            <CheckboxBlankCircleLineIcon size={20} />
                          )}
                          <span>{type.tag}</span>
                        </div>
                        {type.tag === "wallet" ? (
                          <div className="price">
                            {getPrice(user?.wallet?.price)}
                          </div>
                        ) : (
                          <img
                            className="method-icon"
                            src={images[type.tag]}
                            alt={type.tag}
                          />
                        )}
                      </div>
                      <div className="delivery-time">
                        {type?.translation?.title}
                      </div>
                    </div>
                  );
                })
              ) : (
                <DiscordLoader />
              )}
            </div>
          </div>
        </div>
        <div className="btn-group">
          <button
            className="btn-dark"
            onClick={() => setCheckoutContent("delivery-type")}
          >
            {tl("Back")}
          </button>
          <button className="btn-success" onClick={handleContinue}>
            {tl("Continue")}
          </button>
        </div>
      </div>
      <CustomDrawer title="Add new card" open={open} setOpen={setOpen}>
        <AddNewCard />
      </CustomDrawer>
    </div>
  );
};

export default PaymentMethod;
