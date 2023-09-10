import axios from "axios";
import React from "react";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import { OrderApi } from "../../../api/main/order";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, clearOrderShops } from "../../../redux/slices/cart";
import { clearOrder } from "../../../redux/slices/order";
import { TransactionsApi } from "../../../api/main/transactions";
const MyRazorpay = ({ order, setCheckoutContent, payment, setOrderId }) => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const address = user.addresses?.find(
    (item) => item.id == order.shops[0]?.delivery_address_id
  );
  const Razorpay = useRazorpay();
  const createOrder = () => {
    OrderApi.create({
      ...order.data,
      shops: order.shops,
    })
      .then((res) => {
        handlePayment(res.data);
        setOrderId(res.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePayment = useCallback(async (order) => {
    const { data } = await axios.post("/api/create-razorpay-session", {
      amount: order?.price,
    });

    const options = {
      key: payment?.client_id,
      amount: order?.price,
      currency: "INR",
      name: `${user?.firstname} ${user?.lastname}`,
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.order.id,
      handler: (res) => {
        console.log(res);
        TransactionsApi.create(order.id, {
          payment_sys_id: payment.id,
        })
          .then(() => {
            dispatch(clearOrderShops());
            dispatch(clearCart());
            dispatch(clearOrder());
            setCheckoutContent("status");
          })
          .catch((error) => {
            console.log(error);
          });
      },
      prefill: {
        name: `${user?.firstname} ${user?.lastname}`,
        email: user.email,
        // contact: user.phone,
        contact: "9999999999",
      },
      notes: {
        address: address.address,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  });
  return (
    <button className="btn-dark" onClick={createOrder}>
      Razorpay
    </button>
  );
};

export default MyRazorpay;
