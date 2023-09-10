import React, { useEffect, useState } from "react";
import { InviteApi } from "../../api/main/invite";
import Breadcrumb from "../../components/breadcrumb";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import useWindowSize from "../../utils/hooks/useWindowSize";
import Pagination from "rc-pagination";
import { imgBaseUrl } from "../../constants";
import { images } from "../../constants/images";
import Empty from "../../components/empty-data";
import SEO from "../../components/seo";

const Invite = () => {
  const { t: tl } = useTranslation();
  const router = useRouter();
  const cookies = parseCookies();
  const [inviteList, setInviteList] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const windowSize = useWindowSize();
  useEffect(() => {
    if (cookies.access_token) {
      InviteApi.get({ perPage: 10 })
        .then((res) => {
          setInviteList(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.error("Please register first");
      router.push(`/auth/sign-in`);
    }
  }, []);
  const updatePage = (p) => {
    setCurrentPage(p);
  };
  return (
    <>
      <SEO />
      <div className="container">
        <Breadcrumb />

        <div className="tab-pane">
          <div className="order-history web">
            <div className="history-header">
              <div className="header-data">{tl("ID")}</div>
              <div className="header-data">{tl("Status")}</div>
              <div className="header-data">{tl("Shop")}</div>
              <div className="header-data">{tl("Shop address")}</div>
              <div className="header-data">{tl("Shop phone")}</div>
              <div className="header-data">{tl("Date")}</div>
            </div>
            <div className="history-body ">
              {inviteList?.data?.length !== 0 ? (
                inviteList?.data?.map((item, key) => {
                  return (
                    <div key={key} className="history-item">
                      <div className="body-data">{`Invite_${item.id}`}</div>
                      <div className="body-data">{item.status}</div>
                      <div className="body-data">
                        <div className="store-logo">
                          <img
                            src={imgBaseUrl + item.shop.logo_img}
                            alt="logo"
                          />
                        </div>
                        {item?.shop?.translation?.title}
                      </div>
                      <div className="body-data">
                        {item?.shop?.translation?.address}
                      </div>
                      <div className="body-data">{item?.shop?.phone}</div>
                      <div className="body-data">
                        {item.created_at.slice(0, 10)}
                      </div>
                    </div>
                  );
                })
              ) : (
                <Empty
                  image={images.ViewedProduct}
                  text1={`There are no items in the order`}
                />
              )}
            </div>
          </div>
          {windowSize.width <= 768 && (
            <div className="order-history mobile">
              <div className="history-header">
                <div className="left">
                  <span>{tl("ID")}</span>
                  <span>{tl("Status")}</span>
                  <span>{tl("Shop")}</span>
                </div>
                <div className="right">
                  <span>{tl("Shop address")}</span>
                  <span>{tl("Shop phone")}</span>
                  <span>{tl("Date")}</span>
                </div>
              </div>
              {inviteList?.data?.length !== 0 ? (
                inviteList?.data?.map((item, key) => {
                  return (
                    <div key={key} className="history-item">
                      <div className="item-body">
                        <div className="left">
                          <div className="body-data">{`Invite_${item.id}`}</div>
                          <div className="body-data">{item.status}</div>
                          <div className="store-logo-wrapper">
                            <div className="body-data">
                              <div className="store-logo">
                                <img
                                  src={imgBaseUrl + item.shop.logo_img}
                                  alt="logo"
                                />
                              </div>
                              {item?.shop?.translation?.title}
                            </div>
                          </div>
                        </div>
                        <div className="right">
                          <div className="body-data">
                            {item?.shop?.translation?.address}
                          </div>
                          <div className="body-data">{item?.shop?.phone}</div>
                          <div className="body-data">
                            {item.created_at.slice(0, 10)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <Empty
                  image={images.ViewedProduct}
                  text1={`There are no items in the order`}
                />
              )}
            </div>
          )}
        </div>
        {inviteList?.data?.length > 5 && (
          <Pagination
            pageSize={5}
            onChange={updatePage}
            current={currentPage}
            total={inviteList.meta.total}
          />
        )}
      </div>
    </>
  );
};

export default Invite;
