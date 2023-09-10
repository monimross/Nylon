import React from "react";
import CheckDoubleLineIcon from "remixicon-react/CheckDoubleLineIcon";
import Link from "next/link";
import SEO from "../../components/seo";

const PaymentResult = () => {
  return (
    <>
      <SEO />
      <div className="tab-pane">
        <div className="be-seller-status">
          <div className="icon approved">
            <CheckDoubleLineIcon color="#61DC00" size={70} />
          </div>
          <div className="title">Order accepted</div>
          <Link href={`/order-history/`}>
            <button className="btn-dark">Go to order history</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentResult;
