import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import CheckDoubleLineIcon from "remixicon-react/CheckDoubleLineIcon";
const Status = ({ orderId }) => {
  const { t: tl } = useTranslation();
  return (
    <div className="tab-pane">
      <div className="be-seller-status">
        <div className="icon approved">
          <CheckDoubleLineIcon color="#61DC00" size={70} />
        </div>
        <div className="title">{tl("Order accepted")}</div>
        <Link href={`/order-history/${orderId}`}>
          <button className="btn-dark">{tl("Go to order history")}</button>
        </Link>
      </div>
    </div>
  );
};

export default Status;
