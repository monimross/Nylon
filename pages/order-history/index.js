import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OrderApi } from "../../api/main/order";
import Breadcrumb from "../../components/breadcrumb";
import { imgBaseUrl } from "../../constants";
import { images } from "../../constants/images";
import { useTranslation } from "react-i18next";
import useWindowSize from "../../utils/hooks/useWindowSize";
import Pagination from "rc-pagination";
import Empty from "../../components/empty-data";
import SEO from "../../components/seo";
import { t } from "i18next";
import OrdersLoader from "../../components/loader/orders";

const allStatus = [
  { id: "new", label: "New" },
  { id: "ready", label: "Ready" },
  { id: "on_a_way", label: "On the way" },
  { id: "delivered", label: "Delivered to customer" },
  { id: "canceled", label: "Canceled" },
];
const Settings = () => {
  const { t: tl } = useTranslation();
  const [tabKey, setTabKey] = useState("new");
  const [loading, setLoader] = useState("new");
  const [orderHistory, setOrderHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector((state) => state.user.data);
  const windowSize = useWindowSize();
  const handleTab = (key) => {
    setTabKey(key);
    setCurrentPage(1);
  };
  const getOrderHistory = () => {
    if (user) {
      setLoader(true);
      OrderApi.get({
        page: currentPage,
        status: tabKey,
        perPage: 7,
        user_id: user.id,
      })
        .then((res) => {
          setOrderHistory(res);
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  };
  useEffect(() => {
    getOrderHistory();
  }, [tabKey, currentPage]);

  const updatePage = (p) => {
    setCurrentPage(p);
  };

  return (
    <>
      <SEO />
      <div className="container">
        <Breadcrumb path="/" />
        <div className="tabs order-history-tab">
          {allStatus.map((item) => (
            <div
              className={tabKey === item.id ? "tab active" : "tab"}
              onClick={() => handleTab(item.id)}
            >
              {tabKey === item.id && (
                <div className="count">{orderHistory?.data?.length}</div>
              )}
              <span>{tl(item.label)}</span>
            </div>
          ))}
        </div>
        {loading ? (
          <OrdersLoader />
        ) : (
          <>
            <div className="tab-pane">
              <div className="order-history web">
                <div className="history-header">
                  <div className="header-data">{tl("ID")}</div>
                  <div className="header-data">{tl("Shops")}</div>
                  <div className="header-data">{tl("Number of products")}</div>
                  <div className="header-data">{tl("Status")}</div>
                  <div className="header-data">{tl("Date")}</div>
                </div>
                <div className="history-body ">
                  {orderHistory?.data?.length !== 0 ? (
                    orderHistory?.data?.map((item, key) => {
                      let productQty = 0;
                      return (
                        <Link href={`/order-history/${item.id}`} key={key}>
                          <div className="history-item">
                            <div className="body-data">{`#${item.id}`}</div>
                            <div className="body-data">
                              {item.details.map((detail, key) => {
                                productQty = detail?.order_stocks?.length;
                                return (
                                  <div key={key} className="store-logo">
                                    <img
                                      src={imgBaseUrl + detail.shop.logo_img}
                                      alt="logo"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            <div className="body-data">
                              <div className="count-price">
                                <span>{`${productQty} ${tl("products")}`}</span>
                                <span>{`${item.currency.symbol} ${item.price}`}</span>
                              </div>
                            </div>
                            <div className="body-data ">
                              <div className={`tag ${item.status}`}>
                                {t(item.status)}
                              </div>
                            </div>
                            <div className="body-data">
                              {item.created_at?.slice(0, 10)}
                            </div>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <Empty
                      image={images.ViewedProduct}
                      text1={`There are no items in the ${tabKey} order`}
                    />
                  )}
                </div>
              </div>
              {windowSize.width <= 768 && (
                <div className="order-history mobile">
                  <div className="history-header">
                    <div className="left">
                      <span>{tl("ID")}</span>
                      <span>{tl("Date")}</span>
                    </div>
                    <div className="right">
                      <span>{tl("Number of products")}</span>
                      <span>{tl("Amount")}</span>
                    </div>
                  </div>
                  {orderHistory?.data?.length !== 0 ? (
                    orderHistory?.data?.map((item, key) => {
                      let productQty = 0;
                      return (
                        <Link href={`/order-history/${item.id}`} key={key}>
                          <div className="history-item">
                            <div className="store-logo-wrapper">
                              {item.details.map((detail, key) => {
                                productQty = detail?.order_stocks?.length;
                                return (
                                  <div key={key} className="store-logo">
                                    <img
                                      src={imgBaseUrl + detail.shop.logo_img}
                                      alt="logo"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            <div className="item-body">
                              <div className="left">
                                <div className="body-data">{`#${item.id}`}</div>
                                <span>{item.created_at}</span>
                              </div>
                              <div className="right">
                                <span>{`${productQty} ${tl("products")}`}</span>
                                <span>{`${item.currency.symbol} ${item.price}`}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <Empty
                      image={images.ViewedProduct}
                      text1={`There are no items in the ${tabKey} order`}
                    />
                  )}
                </div>
              )}
            </div>
            {orderHistory?.data?.length > 0 && (
              <Pagination
                pageSize={7}
                onChange={updatePage}
                current={currentPage}
                total={orderHistory.meta.total}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Settings;
