import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { imgBaseUrl } from "../../constants";
import { Autoplay } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../../redux/slices/banner";
import ImageLoader from "../loader/image";
import Link from "next/link";
const SmBanner = () => {
  const dispatch = useDispatch();
  const bannerList = useSelector((state) => state.banners.data.data);
  const { t: tl } = useTranslation();
  useEffect(() => {
    if (!bannerList?.length) {
      dispatch(
        getBanners({
          params: { perPage: 8, page: 1, active: 1, type: "banner" },
        })
      );
    }
  }, []);

  return (
    <Swiper
      spaceBetween={17}
      slidesPerView={3}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        360: {
          slidesPerView: 1.15,
        },
        375: {
          slidesPerView: 1.2,
        },
        412: {
          slidesPerView: 1.3,
        },
        450: {
          slidesPerView: 1.5,
        },
        550: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2.5,
        },
        945: { slidesPerView: 3 },
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {bannerList ? (
        bannerList?.map((banner, key) => {
          return (
            <SwiperSlide key={key}>
              <Link href={`/banner/${banner.id}`}>
                <a className="sm-banner-wrapper">
                  <div className="banner-sm">
                    <img src={imgBaseUrl + banner.img} alt="Banner" />
                    <div className="category">{banner.translation?.title}</div>
                    <div className="read-more">{tl("see more")}</div>
                  </div>
                </a>
              </Link>
            </SwiperSlide>
          );
        })
      ) : (
        <>
          <SwiperSlide>
            <ImageLoader />
          </SwiperSlide>
          <SwiperSlide>
            <ImageLoader />
          </SwiperSlide>
          <SwiperSlide>
            <ImageLoader />
          </SwiperSlide>
        </>
      )}
    </Swiper>
  );
};

export default SmBanner;
