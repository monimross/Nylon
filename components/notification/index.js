import React, { useEffect, useRef, useState } from "react";
import Notification4LineIcon from "remixicon-react/Notification4LineIcon";
import { useTranslation } from "react-i18next";
import { NotificationApi } from "../../api/main/notification";
import { t } from "i18next";
import moment from "moment";
import NotificationLoader from "../loader/notification-loader";
import Empty from "../empty-data";
import { images } from "../../constants/images";
import OutsideAlerter from "../../utils/hooks/useClickOutside";
import { NotificationStatus } from "../../constants";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  fetchNotification,
  fetchNotificationStats,
} from "../../redux/slices/notification";
import { useCallback } from "react";
import LoaderSm from "../loader/loader-sm";

const Notification = () => {
  const { t: tl } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const observer = useRef();
  const {
    notification,
    loading,
    notificationStats: data,
    meta: initialMeta,
  } = useSelector((state) => state.notificationList, shallowEqual);

  const [meta, setMeta] = useState(initialMeta);
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [notificationList, setNotificationList] = useState(notification || []);

  const { current_page, last_page } = meta || {};

  useEffect(() => {
    if (!parseCookies()?.access_token) {
      return;
    }
    if (visible) {
      batch(() => {
        dispatch(fetchNotification({ type, perPage: 10, page: 1 }));
        dispatch(fetchNotificationStats({ type }));
      });
    }
  }, [visible, type]);

  // useEffect(() => {
  //   if (!parseCookies()?.access_token) {
  //     return;
  //   }

  //   const interval = setInterval(() => {
  //     dispatch(fetchNotificationStats({ type }));
  //   }, 5000); // 5000 milliseconds = 5 seconds

  //   return () => {
  //     clearInterval(interval); // Clear the interval when the component unmounts
  //   };
  // }, []);

  useEffect(() => {
    setNotificationList(notification);
    setMeta(initialMeta);
  }, [notification, initialMeta]);

  const getNotification = ({ page, perPage = 10 }) => {
    setLoader(true);
    NotificationApi.get({ perPage, page })
      .then((res) => {
        setNotificationList((prev) => [...prev, ...res.data]);
        setMeta(res.meta);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoader(false));
  };

  const readMessage = (data) => {
    NotificationApi.readById(data)
      .then(() => dispatch(fetchNotificationStats()))
      .catch((error) => {
        console.log(error);
      });
  };

  const readAll = (e) => {
    e.stopPropagation();
    NotificationApi.readAll({})
      .then(() => {
        batch(() => {
          dispatch(fetchNotification({ type }));
          dispatch(fetchNotificationStats({ type }));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReadMessage = (item) => {
    switch (item.type) {
      case NotificationStatus.NEW_ORDER:
        router.push(`/order-history/${item.data?.id}`);
        break;
      case NotificationStatus.STATUS_CHANGED:
        router.push(`/order-history/${item.data?.id}`);
        break;
      case NotificationStatus.NEWS_PUBLISH:
        router.push(`/notification/${item.data?.uuid}`);
        break;
      default:
        break;
    }
    if (!item.read_at) {
      readMessage(item.id);
    }
  };

  const CustomTabs = () => {
    const tabs = [
      {
        label: "all",
        type: "notification",
      },
      {
        label: "news",
        type: "news_publish",
      },
      {
        label: "orders",
        type: "status_changed",
      },
    ];

    const handleTabClick = ({ e, index, type }) => {
      e.stopPropagation();
      setActiveTab(index);
      setType(type);
    };

    return (
      <div className="custom-tabs">
        <div className="tab-buttons">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-button ${activeTab === index ? "active" : ""}`}
              onClick={(e) => handleTabClick({ e, index, type: tab.type })}
            >
              {t(tab.label)}
              {!!data && data[tab.type] ? (
                <div className="badge">{data[tab.type]}</div>
              ) : (
                ""
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const hasMore = Boolean(last_page > current_page);

  const lastBookElementRef = useCallback(
    (node) => {
      if (loader) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          getNotification({ type, perPage: 10, page: current_page + 1 });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loader, hasMore]
  );

  return (
    <div
      className="square notification-wrapper cart-amount"
      onClick={() => setVisible((prev) => !prev)}
    >
      <Notification4LineIcon size={20} />
      <div className="qty-badge">{data?.notification || 0}</div>
      <OutsideAlerter visible={visible} setVisible={setVisible}>
        <div className={visible ? "notification visible" : "notification"}>
          <div className="header">
            <div className="title">{tl("Notification")}</div>
            {!!data?.notification && (
              <div className="mark-all" onClick={(e) => readAll(e)}>
                {tl("Mark all")}
              </div>
            )}
          </div>
          <CustomTabs />

          {loading ? (
            <NotificationLoader />
          ) : (
            notificationList?.map((item, key) => (
              <React.Fragment>
                <div key={key} onClick={() => handleReadMessage(item)}>
                  <div className="item">
                    <div className="header">
                      <div className="title">#{item.title}</div>
                      <div className="time">{item.published_at}</div>
                      {!item.read_at && <span></span>}
                    </div>
                    <div className="content">{item.body}</div>
                    <div className="content">
                      {moment(item.created_at).format("DD.MM.YYYY, HH:mm")}
                    </div>
                  </div>
                </div>

                <div ref={lastBookElementRef} />
              </React.Fragment>
            ))
          )}
          {loader && <LoaderSm />}
          {!notificationList?.length && !loading && (
            <Empty
              image={images.ViewedProduct}
              text1="There are no notifications."
            />
          )}
        </div>
      </OutsideAlerter>
    </div>
  );
};

export default Notification;
