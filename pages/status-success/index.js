import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import CheckDoubleLineIcon from "remixicon-react/CheckDoubleLineIcon";
import { TransactionsApi } from "../../api/main/transactions";
import Breadcrumb from "../../components/breadcrumb";
const Status = () => {
  const { t: tl } = useTranslation();
  const { query } = useRouter();
  const { orderId } = query;

  useEffect(() => {
    if (orderId) {
      TransactionsApi.status(orderId, { status: "paid" })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [orderId]);

  return (
    <div className="container">
      <Breadcrumb />
      <div className="tab-pane" style={{ height: "85dvh" }}>
        <div className="be-seller-status">
          <div className="icon approved">
            <CheckDoubleLineIcon color="#61DC00" size={70} />
          </div>
          <div className="title">{tl("Order accepted")}</div>
          <Link href={`/order-history/${query.id || ""}`}>
            <button className="btn-dark">{tl("Go to order history")}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Status;
