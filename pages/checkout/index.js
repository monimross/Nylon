import React, { useContext, useState } from "react";
import Status from "../../components/be-seller/status";
import CheckoutStep from "../../components/checkout/checkout-step";
import PaymentMethod from "../../components/checkout/payment-method";
import Verify from "../../components/checkout/verify";
import CreatePayment from "../../components/payment";
import { MainContext } from "../../utils/contexts/MainContext";
import axios from "axios";
import { batch, useDispatch } from "react-redux";
import { clearCart, clearOrderShops } from "../../redux/slices/cart";
import { clearOrder } from "../../redux/slices/order";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import SEO from "../../components/seo";
import { useEffect } from "react";
import EnterAddress from "../../components/address/enter-delivery-address";
import CustomDrawer from "../../components/drawer";
import { useTranslation } from "react-i18next";
import DeliveryTypeTest from "../../components/checkout/common-delivery-type";
import ReactModal from "react-modal";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import CheckDoubleLineIcon from "remixicon-react/CheckDoubleLineIcon";
import { t } from "i18next";
import { TransactionsApi } from "../../api/main/transactions";
const Checkout = () => {
  const { t: tl } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [checkoutContent, setCheckoutContent] = useState("delivery-type");
  const { address, getUser, setIsOpen, checkoutAddress, setCheckoutAddress } =
    useContext(MainContext);
  const [stepKey, setStepKey] = useState("address");
  const [orderId, setOrderId] = useState(null);
  const [createdOrderData, setCreatedOrderData] = useState({});
  const [payment, setPayment] = useState(null);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [deliveryType, setDeliveryType] = useState(null);

  const handleDrawer = (e) => {
    setOpen(e);
    dispatch(clearOrderShops());
    dispatch(clearCart());
    dispatch(clearOrder());
    router.push("/order-history");
    toast.success(tl("created.successfully"));
  };
  const pay = ({ createdOrderData }) => {
    setCreatedOrderData(createdOrderData);
    setOpen(true);
    if (payment.tag === "stripe" && Object.keys(createdOrderData)?.length) {
      axios
        .post("/api/create-stripe-session", {
          amount: createdOrderData.price,
          order_id: createdOrderData.id,
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setOpen(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (!address?.length) getUser();
  }, []);

  const payByAtb = () => {
    TransactionsApi.update(modal)
      .then(({ data }) => {
        window.location.assign(data);
        batch(() => {
          dispatch(clearOrderShops());
          dispatch(clearCart());
          dispatch(clearOrder());
          setModal(null);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Redirect = () => {
    batch(() => {
      dispatch(clearOrderShops());
      dispatch(clearCart());
      dispatch(clearOrder());
    });
    router.push(`/order-history/${orderId || ""}`);
  };
  const toggle = () => {
    setModal(false);
    Redirect();
  };

  return (
    <>
      <SEO />
      <div className="container checkout">
        <CheckoutStep stepKey={stepKey} checkoutContent={checkoutContent} />
        {checkoutContent === "delivery-type" && (
          <DeliveryTypeTest
            setCheckoutContent={setCheckoutContent}
            setStepKey={setStepKey}
            setDeliveryType={setDeliveryType}
          />
        )}
        {checkoutContent === "payment-method" && (
          <PaymentMethod
            address={address}
            setCheckoutContent={setCheckoutContent}
            setStepKey={setStepKey}
            setPayment={setPayment}
            deliveryType={deliveryType}
          />
        )}
        {checkoutContent === "verify" && (
          <Verify
            setCheckoutContent={setCheckoutContent}
            setStepKey={setStepKey}
            setOrderId={setOrderId}
            payment={payment}
            pay={pay}
            setModal={setModal}
          />
        )}
        {checkoutContent === "status" && <Status orderId={orderId} />}
        <CreatePayment
          setOpen={handleDrawer}
          closeDrawer={setOpen}
          open={open}
          data={data}
          paymentId={payment?.id}
          payment={payment}
          createdOrderData={createdOrderData}
          setCheckoutContent={setCheckoutContent}
        />
      </div>
      <CustomDrawer open={checkoutAddress} setOpen={setCheckoutAddress}>
        <EnterAddress setIsOpen={setIsOpen} setOpen={setCheckoutAddress} />
      </CustomDrawer>
      <ReactModal
        isOpen={Boolean(modal)}
        centered={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={toggle}
        ariaHideApp={false}
        className="submit-modal"
      >
        <CloseLineIcon onClick={toggle} size={24} className="close-modal" />
        <div className="submit-modal-content">
          <div className="be-seller-status">
            <div className="icon approved">
              <CheckDoubleLineIcon color="#61DC00" size={70} />
            </div>
            <div className="title">{tl("order.submit.text")}</div>
            <div className="submit-btn-group">
              <button className="btn btn-dark" onClick={toggle}>
                {t("Pay later")}
              </button>
              <button className="btn btn-success" onClick={payByAtb}>
                {t("Pay")}
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default Checkout;
