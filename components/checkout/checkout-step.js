import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import ArrowLeftSLineIcon from "remixicon-react/ArrowLeftSLineIcon";
import { clearOrder } from "../../redux/slices/order";
import UserAvatar from "../navbar/avatar";
import { useTranslation } from "react-i18next";

const CheckoutStep = ({ stepKey, checkoutContent }) => {
  const { t: tl } = useTranslation();
  const dispatch = useDispatch();
  const clear = () => {
    dispatch(clearOrder());
  };
  return (
    <div className="checkout-steps">
      <Link href="/">
        <a className="back-btn" onClick={clear}>
          <ArrowLeftSLineIcon />
          <span>{tl("Cancel order")}</span>
        </a>
      </Link>
      <div className="shipping-steps-wrapper">
        {checkoutContent !== "status" && (
          <div className="shipping-steps">
            <div className="label">{tl(stepKey)}</div>
            <div
              className={
                stepKey === "address" ? "step address" : "step address full"
              }
            />
            <div
              className={
                stepKey === "payment"
                  ? "step payment"
                  : stepKey === "address"
                  ? "step"
                  : "step payment full"
              }
            />
            <div
              className={
                stepKey === "verify-order" ? "step verify-order" : "step"
              }
            />
          </div>
        )}

        <UserAvatar />
      </div>
    </div>
  );
};

export default CheckoutStep;
