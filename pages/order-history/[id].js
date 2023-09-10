import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../../components/breadcrumb";
import Chat1FillIcon from "remixicon-react/Chat1FillIcon";
import NavigationFillIcon from "remixicon-react/NavigationFillIcon";
import FileDownloadLineIcon from "remixicon-react/FileDownloadLineIcon";
import BankCardLineIcon from "remixicon-react/BankCardLineIcon";
import { useTranslation } from "react-i18next";
import { OrderApi } from "../../api/main/order";
import { useRouter } from "next/router";
import { imgBaseUrl } from "../../constants";
import OrderHistoryProduct from "../../components/order/product";
import DiscordLoader from "../../components/loader/discord-loader";
import CustomDrawer from "../../components/drawer";
import OrderReview from "../../components/order/add-review";
import { MainContext } from "../../utils/contexts/MainContext";
import { toast } from "react-toastify";
import SEO from "../../components/seo";
import { UserApi } from "../../api/main/user";
import PayLater from "../../components/order/pay-later";
import Supplier from "../../components/order-history/supplier";
import HashtagIcon from "remixicon-react/HashtagIcon";
import FileListLineIcon from "remixicon-react/FileListLineIcon";
import CalendarCheckLineIcon from "remixicon-react/CalendarCheckLineIcon";
import FileUserLineIcon from "remixicon-react/FileUserLineIcon";
import CarLineIcon from "remixicon-react/CarLineIcon";
import Map2LineIcon from "remixicon-react/Map2LineIcon";
import RocketLineIcon from "remixicon-react/RocketLineIcon";
import CheckLineIcon from "remixicon-react/CheckLineIcon";
import { t } from "i18next";
import { handleDeliverymanRate } from "../../redux/slices/order";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
const DeliverymanRate = dynamic(() =>
  import("../../components/order-history/deliveryman-rate")
);

const SingleOrderHistory = ({ setOpenChat }) => {
  const { setDrawerTitle } = useContext(MainContext);

  const { t: tl } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const status = [
    { id: "new", label: "New", icon: <HashtagIcon size={18} /> },
    { id: "ready", label: "Ready", icon: <FileListLineIcon size={18} /> },
    {
      id: "on_a_way",
      label: "On the way",
      icon: <FileUserLineIcon size={18} />,
    },
    { id: "delivered", label: "Delivered", icon: <CheckLineIcon size={18} /> },
  ];
  const [open, setOpen] = useState(null);
  const [data, setData] = useState(null);
  const [drawerContent, setDrawerContent] = useState(null);
  const index = status.findIndex((item) => item.id === data?.status);
  const getOrderDetail = () => {
    if (router.query.id) {
      OrderApi.getId(router.query.id)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const cancelOrder = () => {
    OrderApi.statusChange(data.id)
      .then(() => {
        toast.success("Status changed");
        getOrderDetail();
      })
      .catch((error) => {
        console.log(error);
        toast.success(error?.response?.data.message);
      });
  };

  useEffect(() => {
    getOrderDetail();
    return dispatch(handleDeliverymanRate(false));
  }, [router.query.id]);

  const getFinnalyCheck = () => {
    let totalDiscount = 0;
    let shopTax = 0;
    let totalTax = 0;

    let totalProductPrice = data?.details?.reduce(
      (total, item) => (total += item.price),
      0
    );
    data?.details?.forEach((element) => {
      const discount = 0;
      const tax = 0;
      discount += element.order_stocks.reduce(
        (total, item) => (total += item.discount),
        0
      );
      tax += element.order_stocks.reduce(
        (total, item) => (total += item.tax),
        0
      );
      totalDiscount += discount;
      shopTax += element.tax;
      totalTax += tax;
    });

    return { totalDiscount, totalTax, shopTax, totalProductPrice };
  };
  const { totalDiscount, totalTax, shopTax, totalProductPrice } =
    getFinnalyCheck();

  const click = () => {
    setOpen(true);
    setDrawerContent(null);
    setDrawerTitle("Rating and feedback");
  };
  const getInvoiceFile = (id) => {
    UserApi.export(id).then((res) => {
      const blob = new Blob([res], {
        type: "application/pdf",
      });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  const payLater = () => {
    setDrawerContent("payment");
    setOpen(true);
    setDrawerTitle("Pay");
  };

  if (!data)
    return (
      <div className="container">
        <Breadcrumb data={{}} />
        <div className="tab-pane">
          <div className="row">
            <DiscordLoader />
            <DiscordLoader />
          </div>
        </div>
      </div>
    );

  return (
    <>
      <SEO />
      <div className="container">
        <Breadcrumb data={data} path="/order-history" />
        <div className="mobile-order-data">
          <div className="id">{`Order_${data?.id}`}</div>
          <span></span>
          <div className="date">{data?.created_at?.slice(0, 16)}</div>
        </div>
        <div className="tab-pane">
          <div className="tab-pane-header">
            <div className="title">{tl("Order status")}</div>
            <div className="row">
              {data?.status !== "canceled" &&
                (!data?.transaction?.status ||
                  data?.transaction?.status === "canceled") && (
                  <button className="btn-success" onClick={payLater}>
                    <BankCardLineIcon /> {tl("Pay")}
                  </button>
                )}
              {Boolean(data?.status === "delivered") && (
                <button
                  className="btn-success"
                  onClick={() => getInvoiceFile(data.id)}
                >
                  <FileDownloadLineIcon /> {tl("Download")}
                </button>
              )}
            </div>
          </div>

          <div className="order-status">
            <div className="main-data">
              <div className="status-warpper">
                {data?.status !== "canceled" ? (
                  <div className="status">
                    {status.map((item, key) => {
                      return (
                        <div key={key} className="item">
                          {item.id !== "delivered" && (
                            <div
                              className={
                                key <= index - 1 ? "line active" : "line"
                              }
                            />
                          )}
                          <span
                            className={key <= index ? "dot active" : "dot"}
                          />
                          <div className="label">
                            {item.icon}
                            <label>{tl(item.label)}</label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="status d-block">
                    <div className="item">
                      <span className="dot active" />
                      <label>{tl("canceled")}</label>
                    </div>
                  </div>
                )}
              </div>
              <div className="method-item">
                <div className="shipping-type">
                  <div className="type">
                    <span>{data?.delivery?.translation?.title}</span>
                  </div>
                  <div className="price">
                    {`${
                      data?.currency?.symbol
                    } ${data.total_delivery_fee?.toFixed(2)}`}
                  </div>
                </div>
                <div className="delivery-time">
                  {`${data?.delivery?.times[0]} - ${data?.delivery?.times[1]} days`}
                </div>
              </div>
              {data?.transaction && (
                <div className="method-item">
                  <div className="shipping-type">
                    <div className="type">
                      <span>{data?.transaction?.payment_system?.tag}</span>
                    </div>
                    <div className="price">
                      {`${
                        data?.currency?.symbol
                      } ${data?.transaction?.price?.toFixed(2)}`}
                    </div>
                  </div>
                  <div className="delivery-time">
                    {data?.transaction?.payment_system?.translation?.title}
                  </div>
                </div>
              )}
              {data?.user_address && (
                <div className="method-item" style={{ height: "max-content" }}>
                  <div className="shipping-type">
                    <div className="type">
                      <span>{tl("Delivery address")}</span>
                    </div>
                  </div>
                  <div
                    className="delivery-time"
                    style={{ fontSize: 16, fontWeight: 500 }}
                  >
                    {data?.user_address?.address}
                  </div>
                </div>
              )}
              <div className="total-amoun-wrapper">
                <div className="total-amount">
                  <div className="amount-item">
                    <div className="key">{tl("Total product price")}</div>
                    <div className="value">
                      {`${data?.currency?.symbol} ${Number(
                        totalProductPrice + totalDiscount
                      ).toFixed(2)}`}
                    </div>
                  </div>
                  <div className="amount-item">
                    <div className="key">{tl("Discount")}</div>
                    <div className="value">{`${data?.currency?.symbol} ${totalDiscount}`}</div>
                  </div>
                  <div className="amount-item">
                    <div className="key">{tl("Delivery")}</div>
                    <div className="value">{`${data?.currency?.symbol} ${data.total_delivery_fee}`}</div>
                  </div>
                  <div className="amount-item">
                    <div className="key">{tl("VAT Tax")}</div>
                    <div className="value">{`${data?.currency?.symbol} ${totalTax}`}</div>
                  </div>
                  <div className="amount-item">
                    <div className="key">{tl("Shop Tax")}</div>
                    <div className="value">{`${data?.currency?.symbol} ${shopTax}`}</div>
                  </div>
                  {data?.coupon?.price && (
                    <div className="amount-item">
                      <div className="key">{tl("Coupon")}</div>
                      <div className="value">{`${data?.currency?.symbol} ${data?.coupon?.price}`}</div>
                    </div>
                  )}
                  <span></span>
                  <div className="amount-item">
                    <div className="key">{tl("Total amount")}</div>
                    <div className="value">{`${
                      data?.currency?.symbol
                    } ${data?.price?.toFixed(2)}`}</div>
                    <div
                      className={`payment-status ${data?.transaction?.status}`}
                    >
                      {t(data?.transaction?.status)}
                    </div>
                  </div>
                </div>
                <div className="btn-group">
                  <button
                    disabled={
                      !(data.status === "new" || data?.status === "ready")
                    }
                    className="btn-danger"
                    onClick={cancelOrder}
                  >
                    {tl("Cancel order")}
                  </button>
                  {Boolean(data?.status === "delivered") && (
                    <button className="btn-dark" onClick={click}>
                      {tl("Leave feedback")}
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="suppliers">
              {data?.details?.map((item) => (
                <div className="supplier-item">
                  <div className="ordered-products">
                    {item?.order_stocks?.map((item, key) => (
                      <OrderHistoryProduct
                        key={key}
                        orderedProduct={item.stock.product}
                        extras={item.stock.extras}
                        stock={item}
                        currency={data?.currency}
                      />
                    ))}
                  </div>
                  <Supplier
                    shop={item.shop}
                    products={item.order_stocks}
                    item={item}
                  />
                  <div className="add-review">
                    {data?.deliveryman && (
                      <div className="delivery-boy">
                        <div className="avatar">
                          {data?.deliveryman?.img ? (
                            Boolean(
                              data?.deliveryman?.img.includes("https")
                            ) ? (
                              <img src={data?.deliveryman?.img} />
                            ) : (
                              <img src={imgBaseUrl + data?.deliveryman?.img} />
                            )
                          ) : (
                            <div className="circle">
                              {data?.deliveryman?.firstname.slice(0, 1)}
                            </div>
                          )}
                        </div>
                        <div className="data">
                          <div className="name">{`${data?.deliveryman?.firstname} ${data?.deliveryman?.lastname}`}</div>
                          <div className="position">
                            {data?.deliveryman?.role}
                          </div>
                        </div>
                        {Boolean(data?.status === "delivered") && (
                          <div
                            className="online-chat"
                            onClick={() =>
                              dispatch(handleDeliverymanRate(true))
                            }
                          >
                            <div className="icon">
                              <NavigationFillIcon size={20} />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="action-btn">
                      <div
                        className="online-chat"
                        onClick={() => setOpenChat(true)}
                      >
                        <div className="icon">
                          <Chat1FillIcon size={20} />
                        </div>
                        <span>{tl("Online chat")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <CustomDrawer open={open} setOpen={setOpen}>
          {drawerContent === "payment" ? (
            <PayLater
              getOrderDetail={getOrderDetail}
              data={data}
              setOpen={setOpen}
              open={open}
            />
          ) : (
            <OrderReview data={data} setOpen={setOpen} />
          )}
        </CustomDrawer>
        <DeliverymanRate data={data} />
      </div>
    </>
  );
};

export default SingleOrderHistory;
